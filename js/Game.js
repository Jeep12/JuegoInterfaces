"use strict";

import Runner from './Runner.js';
import Enemy from './Enemy.js';

const parallaxElements = document.querySelectorAll("#sky, #jungle_bg, #tree_and_bushes, #grasses, #lianas, #floor, #back_trees");

let runner = new Runner();
let enemys = [];
let isPaused = false;
let enemyCreationInterval; // Variable para almacenar el intervalo de creación de enemigos


let lifes = 3;
let showLifes = document.getElementById("countLifes");
showLifes.textContent = lifes;
//div  score
let showScore = document.querySelector(".score");
let score = 0;
showScore.textContent = score;

let seconds = 0;
let intervalCounter;
 // Guarda el intervalo para detenerlo más tarde si es necesario
const counterElement = document.querySelector('.time');
counterElement.textContent = `${seconds} `;
// Función para iniciar el contador
function startCounter() {
    intervalCounter = setInterval(updateCounter, 1000); // Actualizar cada segundo (1000 ms)
}

// Función para detener el contador
function stopCounter() {
    clearInterval(intervalCounter);
}

// Función para actualizar el contador
function updateCounter() {
    seconds++;
    counterElement.textContent = `${seconds} `;
}

// Ejemplo de cómo iniciar el contador
startCounter();



document.addEventListener('keydown', (event) => {
    if (!isPaused) {
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
    }
});


// Establecer intervalo para el bucle del juego
setInterval(gameLoop, 50);
// Establecer intervalo para la creación de enemigos
enemyCreationInterval = setInterval(createEnemy, 5000);
let restoreGame = document.querySelector('.restoreGame');
restoreGame.addEventListener('click', function (){
    resumeGame();
    wrapperRestoreGame.style.display = 'none';

});


let wrapperRestoreGame = document.querySelector('.wrapper-restore-game');
function gameLoop() {
    if (!isPaused) {
        score +=2;
        showScore.textContent=score;

        if (score % 200 === 0) {
            // Ajusta la velocidad de generación de enemigos
            clearInterval(enemyCreationInterval); // Detiene el intervalo actual
            const enemyCreationSpeed = 3000 - (score / 200) * 200; // Ajusta la velocidad de generación de enemigos
            console.log(enemyCreationSpeed);
            enemyCreationInterval = setInterval(createEnemy, enemyCreationSpeed);
        }

        enemys.forEach(element => {
            element.move();

            if (element.colition(document.getElementById('runner'))) {
                pauseGame();
                lifes = lifes-1;
                showLifes.textContent = lifes;
                if(lifes>0 && lifes<=3){
                    wrapperRestoreGame.style.display = 'block';
                }else {
                    alert("¡GAME OVER!")
                }
            }
        });
        console.log(enemyCreationInterval);
    }
}


function createEnemy() {
    if (!isPaused) {
        let enemy = new Enemy();
        enemys.push(enemy);
    }
}

// Pausar el juego
function pauseGame() {
    isPaused = true;
    clearInterval(enemyCreationInterval); // Detener la creación de enemigos
    document.getElementById('wrapper-game').classList.add('paused');
    parallaxElements.forEach(element => element.classList.add('paused'));
    // Pausar el sprite de los enemigos
   let enemigos = document.querySelectorAll(".enemy");
   enemigos.forEach(e => {
    console.log(e);
        e.classList.remove('runEnemy');
   });
   runner.pause();
   stopCounter();

}

// Reanudar el juego
function resumeGame() {
    isPaused = false;
    runner.resetPosition(); // Restablecer la posición del corredor

    enemyCreationInterval = setInterval(createEnemy, 5000); // Reanudar la creación de enemigos
    document.getElementById('wrapper-game').classList.remove('paused');
    parallaxElements.forEach(element => element.classList.remove('paused'));

    let enemigos = document.querySelectorAll(".enemy");
    enemigos.forEach(e => {
     console.log(e);
         e.classList.add('runEnemy');
    });

    runner.run();
    startCounter();

}


