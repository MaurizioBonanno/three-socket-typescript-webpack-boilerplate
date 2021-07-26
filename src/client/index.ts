import Game from './game';
const game = new Game();
import { io } from  'socket.io-client';
//game.addOrbitControl();
game.addKeyControl();
game.makeCity();
//game.animate();
const socket = io();
//uso una funzione animate senza utilizzare quella della classe game
function animate(){
    requestAnimationFrame(()=>{
        animate();
    });

    game.renderer.render(game.scene,game.camera);
};
animate();
