
import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, PCFShadowMap, FogExp2, DirectionalLight, AmbientLight, Clock } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import City from './city';
import { Hero } from './player';
import { animable } from './interfaces';
import { io } from 'socket.io-client';
import Player from './player';
import { KeyControl } from './keycontrols';
import Map from './maps';


export default class Game{
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  ocontrol: OrbitControls;
  domelement: HTMLElement;
  hero: Hero;
  animationist: animable[];
  socket: any;
  clock: Clock;
  constructor(){
      this.init();
  } 
    init() {
        
        this.animationist = new Array();
        this.clock = new Clock();

        this.scene = new Scene();

        this.camera = new PerspectiveCamera(120, window.innerWidth/window.innerHeight, 1 , 10000);
        this.camera.position.z = 15;
        this.camera.position.y = 0.7;


        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFShadowMap;

        //aggiungo il mio eroe
        this.hero = new Hero();        
        this.addPlayer(this.hero);

        this.hero.camera.add(this.camera);
        this.camera.lookAt(new Vector3(this.hero.player.position.x,this.hero.player.position.y,this.hero.player.position.z))


        this.domelement = this.renderer.domElement;
        document.body.appendChild(this.domelement);

       this.addSocket();

    }
//questa funzione controlla il codice socket
    addSocket(){
        this.socket = io();
        this.socket.on('setId', function(player){
            console.log('Nuovo giocatore');
            console.log(player.userData.x);
        });
    }
    addOrbitControl() {
        this.ocontrol = new OrbitControls(this.camera,this.renderer.domElement)
    }

    addControlsKey(){
        var controls = new KeyControl(this.hero.player);
        controls.arrowMovement();
    }

    //muove con wasd
    addKeyControl(){
        document.onkeydown = (evt)=>{
          //  console.log(evt.key);
            switch(evt.key){
                case "w":
                   this.hero.player.translateZ(-this.hero.moveSpeed);
                break;
                case "s":
                   // console.log('indietro');
                   this.hero.player.translateZ(this.hero.moveSpeed);
                break;
                case "d":
                   // console.log('destra');
                    this.hero.player.rotateY(-this.hero.rotateSpeed);
                break;
                case "a":
                  //  console.log('sinistra');
                  this.hero.player.rotateY(this.hero.rotateSpeed);
                break;
                default:
                    return;
                break;
            }
        }
    }

    addLight(){
        var light =  new DirectionalLight(0xf6e86c, 1);
        light.position.set(500,1500,1000);
        light.castShadow = true
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 1000;
        light.shadow.camera.far = 25000;
        
        var light2 = new AmbientLight();

        this.scene.add(light2);
        this.scene.fog = new FogExp2(0x9db3b5,0.0007);
        
        this.hero.addLight(light);
    }

    makeCity(){
        /* var city = new City(this.scene);
        city.makeCity(); */
        //provo a costruire una mappa
        var map = new Map(this.scene);
        map.createMap();
        this.addLight();
    }
    addPlayer(player: Player){
        this.scene.add(player.player);
    }
    animate(){
        requestAnimationFrame(()=>{
            this.animate();
        });
        this.renderer.render(this.scene,this.camera);
       // console.log('update');
    }
}


