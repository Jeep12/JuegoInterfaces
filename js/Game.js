"use strict";

import Runner from './Runner.js';
import Enemy from './Enemy.js';
let runner = new Runner();
let enemys = [];


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
setInterval(createEnemy, 5000);




function gameLoop() {
  

    enemys.forEach(element => element.move());
}



function createEnemy() {

    let enemy = new Enemy();
    enemys.push(enemy);
}
