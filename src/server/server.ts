import express from "express"
import path from "path"
import http from "http"
import socketIO from 'socket.io';
import Player from '../client/player';

const port: any = process.env.port || 3000;

enum Actions {
    Idle,
    Walking,
    Running,
    Backwards
}

class App {
    private server: http.Server
    private port: number
    io: any;
    players = new Array();

    constructor(port: number) {
        this.port = port
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        app.use('/build/three.module.js', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')))
        app.use('/jsm/controls/OrbitControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')))
        app.use('/jsm/loaders/FBXLoader', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/loaders/FBXLoader.js')))
        app.use('/jsm/libs/inflate.module.min.js', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/inflate.module.min.js')))
        app.use('/jsm/curves/NURBSCurve.js', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/curves/NURBSCurve.js')))
        app.use('/jsm/curves/NURBSUtils.js', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/curves/NURBSUtils.js')))
        app.use('/jsm/libs/stats.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/stats.module.js')))
        app.use('/jsm/libs/fflate.module.min.js', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/fflate.module.min.js')))

        app.get('/',(req,res)=>{
            res.sendFile(__dirname+'../client/index.html');
        })
        app.get('/login',(req,res)=>{
            res.send('pagina di login');
        })
        this.server = new http.Server(app);
        this.io = new socketIO.Server(this.server);

        //codice socket

        this.io.sockets.on('connection',(socket)=>{
            //provo a creare un nuovo Player
            this.players[socket.id]={x:0,y:0,heading:0,id: socket.id}
            //--fine codice nuovo Player
            socket.userData = {x:0, y:0, z:0, heading: 0};//valori di default
            console.log(`socket : ${socket.id}, è connesso`);
            socket.emit('setId',{id: socket.id,userData:socket.userData,players: this.players });
            socket.emit('currentPlayers',this.players);
           // socket.broadcast.emit('newPlayer',player);

            socket.on('init',(data)=>{
                socket.userData.model = data.model;
                socket.userData.color = data.colour;
                socket.userData.x = data.x;
                socket.userData.y = data.y;
                socket.userData.heading = data.h;
                socket.userData.pb = data.pb;
                socket.userData.action = Actions.Idle;
            });

            socket.on('update',(data)=>{
                /* socket.userData.model = data.model;
                socket.userData.color = data.color;
                socket.userData.x = data.x;
                socket.userData.y = data.y;
                socket.userData.heading = data.h;
                socket.userData.pb = data.pb;
                socket.userData.action = data.action; */
                console.log(`aggiorno i dati`);
            });

            socket.on('chat message',(data)=>{
                console.log(`chat message ${data.id}: ${data.message}`);
                this.io.to(data.id).emit('chat message',{id: socket.id, message: data.message});
            })

            socket.on('disconnect',()=>{
                console.log(`socket disconnesso id: ${socket.id}`);
                delete this.players[socket.id];
                socket.broadcast.emit('deletePlayer',{ id: socket.id });
            })
        })

        //mainLoop
        setInterval(()=>{
            const nsp = this.io.of('/');//creo una route sul socket
            let pack = [];
            for (const id in this.io.sockets.sockets) {
                const socket = nsp.connected[id];
                //solo i socket che sono stati inizialiati
                if (socket.userData.model !== undefined) {
                    pack.push({
                        id: socket.id,
                        model: socket.userData.model,
                        colour: socket.userData.colour,
                        x: socket.userData.x,
                        y: socket.userData.y,
                        z: socket.userData.z,
                        heading: socket.userData.heading,
                        pb: socket.userData.pb,
                        action: socket.userData.action
                    })
                }
            }
            if(pack.length > 0){
                console.log('abbiamo un array di utenti');
                this.io.emit('remoteData',pack);
            }
        },40)
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`)
        })
    }
}

new App(port).Start()