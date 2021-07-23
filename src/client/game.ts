import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Matrix4,  Mesh, Vector3, PlaneBufferGeometry, MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default class Game{
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  ocontrol: OrbitControls;
  constructor(){
      this.init();
  } 
    init() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1 , 10000);
        this.camera.position.z = 500;
        this.camera.position.y = 400;
        this.camera.lookAt(new Vector3(0,0,0));
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.addOrbitControl();
    }
    addOrbitControl() {
        this.ocontrol = new OrbitControls(this.camera,this.renderer.domElement)
    }

    makeCity(){
        //aggiungo il suolo 
        var plane = new PlaneBufferGeometry(2000,2000,20,20);
        var mat = new MeshBasicMaterial({color:0x9db3b5});
        var mesh = new Mesh(plane,mat);
        mesh.rotation.x = -90*Math.PI/180;
        this.scene.add(mesh);

        //aggiungo gli edifici
        var geo = new BoxGeometry(1,1,1);
        geo.applyMatrix4(new Matrix4().makeTranslation(0,0.5,0));
        var material = new MeshBasicMaterial({color: 0x00ff00,wireframe:true});
        for (let index = 0; index < 300; index++) {
            var building = new Mesh(geo.clone(),material.clone());
            building.position.x = Math.floor(Math.random()*200-100)*6;
            building.position.z = Math.floor(Math.random()*200-100)*6;
            building.scale.x = Math.random()*50+10;
            building.scale.y = Math.random()*building.scale.x*8+8;
            building.scale.z = building.scale.x;
            console.log('aggiungo un edificio');
            this.scene.add(building);
        }

    }
    animate(){
        requestAnimationFrame(()=>{
            this.animate();
        });
        this.renderer.render(this.scene,this.camera);
       // console.log('update');
    }
}


