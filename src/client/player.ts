import { Object3D, BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { animable } from './interfaces';

//classe Player è la classe base per tutti giocatori
export default class Player implements animable{
    moveSpeed;
    rotateSpeed;
    player: Object3D;
    model: Mesh;
    constructor(){
        this.init();
    }
    init(){

        this.player = new Object3D();
        this.player.position.set(0,0,0);
        this.moveSpeed=5;
        this.rotateSpeed = 0.05;
        this.addModel();
    }
    addModel(){
        var box = new BoxGeometry(2,10,2);
        var mat = new MeshBasicMaterial({color: 0x00ff00});
        this.model = new Mesh(box,mat);
        this.player.add(this.model);
    }
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
        this.cameraBack.position.set(0,5,50)
        this.player.add(this.cameraBack);

        this.setActiveCamera(this.cameraBack);
    }
    setActiveCamera(camera: Object3D) {
        this.camera = camera;
    }
}