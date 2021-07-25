
import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, PCFShadowMap } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import City from './city';
import { Hero } from './player';
import { animable } from './interfaces';
export default class Game{
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  ocontrol: OrbitControls;
  domelement: HTMLElement;
  hero: Hero;
  animationist: animable[];
  constructor(){
      this.init();
  } 
    init() {
        
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
        this.scene.add(this.hero.player);

        this.hero.camera.add(this.camera);
        this.camera.lookAt(new Vector3(this.hero.player.position.x,this.hero.player.position.y,this.hero.player.position.z))


        this.domelement = this.renderer.domElement;
        document.body.appendChild(this.domelement);

    }
    addOrbitControl() {
        this.ocontrol = new OrbitControls(this.camera,this.renderer.domElement)
    }

    addKeyControl(){
        document.onkeydown = (evt)=>{
            console.log(evt.key);
            switch(evt.key){
                case "ArrowUp":
                   this.hero.player.translateZ(-this.hero.moveSpeed);
                break;
                case "ArrowDown":
                   // console.log('indietro');
                   this.hero.player.translateZ(this.hero.moveSpeed);
                break;
                case "ArrowRight":
                   // console.log('destra');
                    this.hero.player.rotateY(-this.hero.rotateSpeed);
                break;
                case "ArrowLeft":
                  //  console.log('sinistra');
                  this.hero.player.rotateY(this.hero.rotateSpeed);
                break;
                default:
                    return;
                break;
            }
        }
        document.onkeyup = (evt)=>{
            console.log(evt.key);
            switch(evt.key){
                case "ArrowUp":
                  //  this.hero.player.position.x = this.hero.player.position.x;
                break;
                case "ArrowDown":
                    console.log('smetti indietro');

                break;
                case "ArrowRight":
                    console.log('smetti destra');

                break;
                case "ArrowLeft":
                    console.log('smetti sinistra');

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
    }
    animate(){
        requestAnimationFrame(()=>{
            this.animate();
        });
        this.renderer.render(this.scene,this.camera);
       // console.log('update');
    }
}


