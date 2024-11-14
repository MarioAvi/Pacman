    const limiteDerecha = this.x - 20;
    const limiteIzquierda = this.x + 20;
    const limiteArriba = this.y + 20;
    const limiteAbajo = this.y - 20;

    class Pacman {
        constructor(x, y, tamañoX, tamañoY, velocidad) {
            this.x = x;
            this.y = y;
            (this.spritePorDefecto = [0, 0]), [32, 0];
            this.velocidad = velocidad;
            this.tamañoX = tamañoX;
            this.tamañoY = tamañoY;
        }
    }

    Pacman.movimientoDerecha = function () {
        this.x = this.x + this.velocidad;
        this.spritePorDefecto = [
            [0, 0],
            [32, 0],
        ];
        if (recorrerMapa(mapa)) {
            this.x = limiteDerecha
        };
    };
