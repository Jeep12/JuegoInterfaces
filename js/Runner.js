import Character from "./Character.js";

export default class Runner extends Character {
    constructor() {
        super();
        this.runner = document.getElementById("runner");
        this.velocidadMovimiento = 35; // Velocidad de movimiento del personaje
        this.posX = 0; // Nueva propiedad para almacenar la posición horizontal
        this.posY = 0; // Nueva propiedad para almacenar la posición vertical
        


        this.estaMoviendose = false;
        // Vinculamos los métodos a `this` para que puedan ser usados como event listeners
        this.startDrop = this.startDrop.bind(this);
        this.finalizarCaida = this.finalizarCaida.bind(this);
    }

    status() {
        return this.runner.getBoundingClientRect();
    }

    correr() {
        this.clean();
        this.runner.classList.add("runCharacter");
    }

    moveRight() {
        if (this.posX < window.innerWidth) {
            this.posX += this.velocidadMovimiento;
            this.transform(this.posX, this.posY);
            this.runner.style.transitionDuration='0.1s';

            this.estaMoviendose = true;
        } else {
            this.posX = 0;
            this.transform(this.posX, this.posY);
        }
    }



    moveLeft() {
        if (this.posX >= 0) {
            this.posX -= this.velocidadMovimiento;
            this.transform(this.posX, this.posY);
            this.runner.style.transitionDuration='0.1s';

            this.estaMoviendose = true;
        } else {
            this.posX = 0;
            this.transform(this.posX, this.posY);
        }
    }

    moveUp() {
        if (this.posY > -350) { // Verifica que no supere una altura máxima de -200px
            this.posY -= 50;
            this.transform(this.posX, this.posY);
            this.runner.style.transitionDuration='0.1s';
            this.estaMoviendose = true;
            console.log("pos y " + this.posY);
        }
    }

    moveDown() {
        if (this.posY < 0) { // Verifica que no baje más allá de 0px en el eje Y
            this.posY += 50;
            this.transform(this.posX, this.posY);
            this.runner.style.transitionDuration='0.1s';

            this.estaMoviendose = true;
            console.log("pos y " + this.posY);
        }
    }

    jump() {
        this.clean();
        this.runner.style.backgroundImage = "url('../assets/characters/Runner/Jump.png')"; // Cambia la imagen a saltar
        this.runner.style.backgroundSize = "1920px 128px";
        this.runner.classList.add("jump");

        this.runner.addEventListener("animationend", this.startDrop);
    }

    startDrop() {
        this.runner.removeEventListener("animationend", this.startDrop);
        this.fall();
    }

    fall() {
        this.clean();
        this.runner.classList.add("fall");
        
        this.runner.addEventListener("animationend", this.finalizarCaida);
    }

    finalizarCaida() {
        this.runner.removeEventListener("animationend", this.finalizarCaida);
        this.clean();
        this.runner.style.backgroundImage = "url('../assets/characters/Runner/Run.png')"; // Cambia la imagen a saltar
        this.runner.style.backgroundSize = "1024px 128px";
        this.correr(); //vuelvo a correr una vez terminada la caida
    }

    clean() {
        this.runner.classList.remove("runCharacter");
        this.runner.classList.remove("jump");
        this.runner.classList.remove("fall");

        //REMUEVO 
        this.runner.removeEventListener("animationend", this.startDrop);
        this.runner.removeEventListener("animationend", this.finalizarCaida);
    }

    //Modifico las posiciones en x,y con la propiedad translate
    transform(NewPosX, NewPosY) {
        this.runner.style.transform = `translate(${NewPosX}px, ${NewPosY}px)`;
    }
}
