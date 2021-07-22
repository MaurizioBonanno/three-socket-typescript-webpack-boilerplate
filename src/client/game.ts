import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
export default class Game{
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  constructor(){
      this.init();
  } 
    init() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1 , 1000);
        this.camera.position.z = 500;
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate(){
        requestAnimationFrame(()=>{
            this.animate();
        });
        this.renderer.render(this.scene,this.camera);
        console.log('update');
    }
}