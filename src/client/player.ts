
import { Object3D, BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { animable } from './interfaces';
import { state } from './states';

//classe Player è la classe base per tutti giocatori
export default class Player implements animable{

    //valori che servono a identificare il player
    id;
    name;
    //uno stato di default
    //velocità e rotazione
    moveSpeed;
    rotateSpeed;
    //un oggetto da usare come genitore
    player: Object3D;
    //il modello immagine del giocatore
    model: Mesh;
    //stato del personaggio
    stato: state;
    constructor(){
        //inizializzo
        this.init();
    }
    init(){
        this.stato = state.IDLE;
        this.player = new Object3D();
        this.player.position.set(0,0,0);
        this.moveSpeed=5;
        this.rotateSpeed = 0.05;
        //aggiungo una immagine
        this.addModel();
    }
    addModel(){
        var box = new BoxGeometry(2,10,2);
        var mat = new MeshBasicMaterial({color: 0x00ff00});
        this.model = new Mesh(box,mat);
        //aggiungo l'immagine alla root
        this.player.add(this.model);
    }
    //metodo animate verrà richiamato nel loop del gioco
    animate() {
        throw new Error('Method not implemented.');
    }
}
//classe Hero estende la classe Base ma si specializza per il giocatore protagonista
export class Hero extends Player{
    camera: Object3D;
    cameraFront: Object3D;
    cameraBack: Object3D;
    cameraLeft: Object3D;
    cameraRight: Object3D;
    constructor(){
        super();
        this.init();   
    }
    init(){
        super.init();
        this.cameraFront = new Object3D();
        this.cameraBack = new Object3D();
        this.cameraRight = new Object3D();
        this.cameraLeft = new Object3D();
        this.createCameras();
    }

    createCameras(){
        this.cameraBack.position.set(0,5,10)
        this.player.add(this.cameraBack);

        this.setActiveCamera(this.cameraBack);
    }
    setActiveCamera(camera: Object3D) {
        this.camera = camera;
    }
}