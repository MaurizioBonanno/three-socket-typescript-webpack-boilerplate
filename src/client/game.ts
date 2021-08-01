
import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, PCFShadowMap } from 'three';
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
  constructor(){
      this.init();
  } 
    init() {
        this.socket = io();
        this.animationist = new Array();


        this.scene = new Scene();

        this.camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1 , 10000);
        this.camera.position.z = 10;
       // this.camera.position.y = 400;
       // this.camera.lookAt(new Vector3(0,0,0));


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
            console.log(evt.key);
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

    makeCity(){
        var city = new City(this.scene);
        city.makeCity();
        //provo a costruire una mappa
        var map = new Map(this.scene);
        map.createMap();
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


