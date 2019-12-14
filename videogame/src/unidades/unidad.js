import GameObjectsGO from "../gameObjects.js";

export default class Unidad extends GameObjectsGO {
    constructor(scene, daño, x, y, posRelativa, cad, type){ 
        super(scene, daño, x, y, cad, type);
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(0.1);
        
        //VARIABLES AUXILIARES
        this.t = posRelativa;    //REPRESENTA LA POSICIÓN RELATIVA X EN EL MAPA
        this.n = y + Phaser.Math.Between(-50, 50);  //REPRESENTA LA POSICIÓN Y EN EL MAPA
        this.r = y;
        this.m = x + Phaser.Math.Between(-50, 50);  //REPRESENTA LA POSICIÓN X EN EL MAPA
        this.dir = Phaser.Math.Between(0, 1);
        this.pausa = false;
        this.vida;
        this.enemigo = undefined;
        this.funcion = 0;

        scene.children.moveDown(this);
    }

    //MOVIMIENTO DE LA UNIDAD
    mov(){
        if (!this.pausa) {
            switch (this.game.nivel) {
                case 1:
                    this.setPosition(this.t * 25, this.n + 150 * Math.sin(this.t/7));
                    this.t -= 0.1;
                    if (this.t <= 10) { this.pausa = true; }
                    break;
                case 2:
                    //DISPONEMOS DE 2 CAMINOS EN ESTE NIVEL (DIR)
                    //CADA CAMINO ESTÁ FORMADO POR 2 FUNCIONES CADA UNO
                    if (this.funcion == 0) {
                        let y0 = Math.sqrt(1 - (Math.pow(Math.abs(this.t/7) - 1, 2)));
                        if (!isNaN(y0)) {
                            this.setPosition(this.m + this.t * 25, this.r - 200 * y0);
                        }
                        else {
                            if (this.dir == 0) this.t = 14;
                            if (this.dir == 1) this.t = -14;
                            this.funcion = 1;
                        }
                        if (this.dir == 0) this.t += 0.1;
                        if (this.dir == 1) this.t -= 0.1;
                    }
                    if (this.funcion == 1) {
                        let y1 = -2.5 * Math.sqrt(1 - Math.sqrt(Math.abs(this.t/7) / 2));
                        if (!isNaN(y1)) {
                            this.setPosition(this.m + this.t * 25, this.r - 200 * y1);
                        }
                        if (this.dir == 0) this.t -= 0.1;
                        if (this.dir == 1) this.t += 0.1;
                    }
                    if (this.y >= 700) { this.pausa = true; }
                    break;
            }
        }
    }

    //ATAQUE UNIDAD <-> ENEMIGO (SÓLO COGE LA COLISIÓN UNA VEZ, NO SE PUEDE HACER EN LAS DOS CLASES)
    //OBJ1 == UNIDAD    OBJ2 == ENEMIGO
    ataque(obj1, obj2){ 
        if (obj1.enemigo == undefined && obj2.unidad == undefined) {    //AMBOS HAN DE ESTAR UNDEFINED PARA SABER QUE NO ESTÁN YA ATACANDO A ALGUIEN
            obj1.pausa = true;
            obj2.pausa = true;
            obj1.enemigo = obj2;
            obj2.unidad = obj1;
        }
        //NOS ASEGURAMOS QUE EL ATAQUE ES UNO A UNO
        if (obj1.enemigo == obj2)   super.ataque(obj1, obj2);
        if (obj2.unidad == obj1)   super.ataque(obj2, obj1);

        //SI ALGÚN OBJ SE QUEDA SIN VIDA LO DESTRUIMOS
        if (obj1.vida <= 0) {
            obj1.onDestroy();
            obj1.destroy();
        }
        if (obj2.vida <= 0) {
            obj2.onDestroy();
            obj2.destroy();
        }
    }

    //ACCIONES CORRESPONDIENTES TRAS LA ELIMINACIÓN DE UNA UNIDAD
    onDestroy(){
        if(this.enemigo != undefined){
            this.enemigo.pausa = false;
            this.enemigo.unidad = undefined;
            this.enemigo.cadenciaAux = 0;
        }
    }

    preUpdate(time, delta) {
        this.mov();
    }
}