export default class Enemy {
    constructor() {
        this.width = 128;
        this.height = 128;
        this.posX = window.innerWidth - this.width; // 128px es el ancho del enemigo
        //lo mismo que el posicionX pero con el eje Y
        //le resto la altura del personaje y un numero aleatorio entre
        //0 y 250 para que no se salga del camino
         this.posY = window.innerHeight-this.height-this.getRandomNumber(0,250); // Posición Y aleatoria entre 0 y 250 píxeles
 
        this.speed = 5;

        this.enemy = document.createElement('div'); // Crea un nuevo elemento HTML para representar al enemigo
        this.enemy.classList.add('enemy');
        this.enemy.style.width = this.ancho + 'px'; // Establece el ancho del div igual al ancho de la imagen
        this.enemy.style.height = this.alto + 'px'; // Establece la altura del div igual al alto de la imagen
        this.transform(this.posX, this.posY);
        this.enemy.classList.add('runEnemy');
        document.getElementById('wrapper-game').appendChild(this.enemy);

    }

    move() {
        // Mueve el enemigo hacia la izquierda
            this.posX -= this.speed;
            this.transform(this.posX, this.posY);


    }

    transform(NewPosX, NewPosY) {
        this.enemy.style.transform = `translate(${NewPosX}px, ${NewPosY}px)`;
    }

    // Método para verificar colisión con otro elemento
    colisionCon(element) {
        const rectEnemigo = this.enemy.getBoundingClientRect();
        const rectElemento = element.getBoundingClientRect();
        
        // Verificar si los rectángulos de colisión se superponen
        return rectEnemigo.left < rectElemento.right &&
               rectEnemigo.right > rectElemento.left &&
               rectEnemigo.top < rectElemento.bottom &&
               rectEnemigo.bottom > rectElemento.top;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
