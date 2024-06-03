export default class Enemy {
    constructor() {
        this.width = 128;
        this.height = 80;
        this.posX = window.innerWidth - this.width; // 128px es el ancho del enemigo
        //lo mismo que el posicionX pero con el eje Y
        //le resto la altura del personaje y un numero aleatorio entre
        //0 y 250 para que no se salga del camino
         this.posY = window.innerHeight-this.height-this.getRandomNumber(0,250); // Posición Y aleatoria entre 0 y 250 píxeles
 
        this.speed = 15;

        this.enemy = document.createElement('div'); // Crea un nuevo elemento HTML para representar al enemigo
        this.enemy.classList.add('enemy');
        this.enemy.style.width = this.width + 'px'; // Establece el ancho del div igual al ancho de la imagen
        this.enemy.style.height = this.height + 'px'; // Establece la altura del div igual al alto de la imagen
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

    colition(element) {
        const rectEnemigo = this.adjustedRect(this.enemy.getBoundingClientRect(), 20); // Ajustar el rectángulo del enemigo
        const rectElemento = this.adjustedRect(element.getBoundingClientRect(), 20); // Ajustar el rectángulo del elemento
        
        // Verificar si los rectángulos de colisión ajustados se superponen
        return rectEnemigo.left < rectElemento.right &&
               rectEnemigo.right > rectElemento.left &&
               rectEnemigo.top < rectElemento.bottom &&
               rectEnemigo.bottom > rectElemento.top;
    }
    
    // Método para ajustar un rectángulo de colisión
    adjustedRect(rect, padding) {
        return {
            top: rect.top + padding,
            bottom: rect.bottom - padding,
            left: rect.left + padding,
            right: rect.right - padding
        };
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
