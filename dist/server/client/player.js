"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
const three_1 = require("three");
const states_1 = require("./states");
//classe Player è la classe base per tutti giocatori
class Player {
    constructor() {
        //inizializzo
        this.init();
    }
    init() {
        this.stato = states_1.state.IDLE;
        this.player = new three_1.Object3D();
        this.player.position.set(0, 0, 0);
        this.moveSpeed = 5;
        this.rotateSpeed = 0.05;
        //aggiungo una immagine
        this.addModel();
    }
    addModel() {
        var box = new three_1.BoxGeometry(2, 10, 2);
        var mat = new three_1.MeshBasicMaterial({ color: 0x00ff00 });
        this.model = new three_1.Mesh(box, mat);
        //aggiungo l'immagine alla root
        this.player.add(this.model);
    }
    //metodo animate verrà richiamato nel loop del gioco
    animate() {
        throw new Error('Method not implemented.');
    }
}
exports.default = Player;
//classe Hero estende la classe Base ma si specializza per il giocatore protagonista
class Hero extends Player {
    constructor() {
        super();
        this.init();
    }
    init() {
        super.init();
        this.cameraFront = new three_1.Object3D();
        this.cameraBack = new three_1.Object3D();
        this.cameraRight = new three_1.Object3D();
        this.cameraLeft = new three_1.Object3D();
        this.createCameras();
    }
    createCameras() {
        this.cameraBack.position.set(0, 5, 10);
        this.player.add(this.cameraBack);
        this.setActiveCamera(this.cameraBack);
    }
    setActiveCamera(camera) {
        this.camera = camera;
    }
    addLight(light) {
        this.player.add(light);
    }
}
exports.Hero = Hero;
//# sourceMappingURL=player.js.map