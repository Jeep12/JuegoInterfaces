"use strict";

import Runner from './Runner.js';

let runner = new Runner();


document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'Space':
                runner.jump();
                break;
            case 'KeyD':
                runner.moveRight();
                break;
            case 'KeyA':
                runner.moveLeft();
                break;
            case 'KeyW':
                runner.moveUp();
                break;
            case 'KeyS':
                runner.moveDown();
                break;
        }
});

setInterval(gameLoop, 50);
setInterval(generarEnemigo, 5544);




function gameLoop() {
  
}



function generarEnemigo() {

}
