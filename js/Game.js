"use strict";

import Runner from './Runner.js';
import Enemy from './Enemy.js';
document.addEventListener("DOMContentLoaded", () => {


    const parallaxElements = document.querySelectorAll("#sky, #jungle_bg, #tree_and_bushes, #grasses, #lianas, #floor, #back_trees,#treeface,#fireflys");

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

    //Iniciar contador
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
    enemyCreationInterval = setInterval(createEnemy, 3000);


    let restoreGame = document.querySelector('.restoreGame');
    restoreGame.addEventListener('click', function () {
        resumeGame();
        runner.resetPosition(); // Restablecer la posición del corredor
        wrapperRestoreGame.style.display = 'none';

    });


    let wrapperRestoreGame = document.querySelector('.wrapper-restore-game');
    function gameLoop() {
        if (!isPaused) {
            score += 2;
            showScore.textContent = score;

            if (score % 200 === 0) {
                // Ajusta la velocidad de generación de enemigos
                clearInterval(enemyCreationInterval); // Detiene el intervalo actual
                const enemyCreationSpeed = 3000 - (score / 200) * 200; // Ajusta la velocidad de generación de enemigos
                enemyCreationInterval = setInterval(createEnemy, enemyCreationSpeed);
            }

            if (score % 100 ===0) {
          
                

            } 
            enemys.forEach(element => {
                element.move();

                if (element.colition(document.getElementById('runner'))) {
                    pauseGame();
                    lifes = lifes - 1;
                    showLifes.textContent = lifes;
                    if (lifes > 0 && lifes <= 3) {
                        wrapperRestoreGame.style.display = 'block';
                    } else {
                        let gameOver = confirm("Game Over! Quieres volver a jugar?");
                        if (gameOver) {
                            // Reiniciar el juego
                            window.location.reload();
                        }else {
                            window.location.href = "index.html";

                        }
                    }
                }
            });
        }
    }


    function createEnemy() {
        if (!isPaused) {
            let enemy = new Enemy();
            enemys.push(enemy);
        }
    }


    const pauseIcon = '<i class="fas fa-pause"></i>';
    const playIcon = '<i class="fas fa-play"></i>';
    let pauseButton = document.getElementById("pauseButton");
    pauseButton.addEventListener("click", () => {
        if (isPaused) {
            pauseButton.innerHTML = pauseIcon;
            resumeGame();
        } else {
            pauseButton.innerHTML = playIcon;
            pauseGame();

        }
    });
    // Pausar el juego
    function pauseGame() {
        isPaused = true;
        toggleMute();
        clearInterval(enemyCreationInterval); // Detener la creación de enemigos
        document.getElementById('wrapper-game').classList.add('paused');
        parallaxElements.forEach(element => element.classList.add('paused'));
        // Pausar el sprite de los enemigos
        let enemigos = document.querySelectorAll(".enemy");
        enemigos.forEach(e => {
            e.classList.remove('runEnemy');
        });
        runner.pause();
        stopCounter();

    }

    // Reanudar el juego
    function resumeGame() {
        isPaused = false;
        toggleMute();
        enemyCreationInterval = setInterval(createEnemy, 5000); // Reanudar la creación de enemigos
        document.getElementById('wrapper-game').classList.remove('paused');
        parallaxElements.forEach(element => element.classList.remove('paused'));

        let enemigos = document.querySelectorAll(".enemy");
        enemigos.forEach(e => {
            e.classList.add('runEnemy');
        });

        runner.run();
        startCounter();

    }


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



    let audio = document.getElementById('audioGame');

    audio.play();
    audio.loop = true;

    let muteButton = document.getElementById('muteButton');


    // Función para alternar entre mute y unmute
    function toggleMute() {
        if (audio.muted) {
            audio.muted = false;
            muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; // Cambiar ícono a mute
        } else {
            audio.muted = true;
            muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; // Cambiar ícono a unmute
        }
    }

    // Evento click para el botón de mute/unmute
    muteButton.addEventListener('click', function () {
        toggleMute();
    });



    const goOutButton = document.getElementById("goOutButton");

    goOutButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevenir la acción por defecto del enlace
        const confirmed = confirm("¿Estás seguro de que deseas salir?");
        if (confirmed) {
            window.location.href = "index.html";
        }
    });




    //PAUSO Y RESUMO  EL JUEGO CUANDO CAMBIA DE VENTANA

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (!isPaused) {
                pauseGame();
            }
        } else {
            
                resumeGame();
        
        }
    });
});



