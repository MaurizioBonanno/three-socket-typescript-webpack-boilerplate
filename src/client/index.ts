import Game from './game';
const game = new Game();
//game.addOrbitControl();
game.addKeyControl();
game.makeCity();
game.animate();