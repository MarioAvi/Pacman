    const limiteDerecha = this.x - 20;
    const limiteIzquierda = this.x + 20;
    const limiteArriba = this.y + 20;
    const limiteAbajo = this.y - 20;

    class Pacman {
        constructor(x, y, tamañoX, tamañoY, velocidad) {
            this.x = x;
            this.y = y;
            this.spritePorDefecto = [0, 0], [32, 0];
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
        if (comprobarMapa(mapa)) {
            this.x = limiteDerecha;
        };
    };
    Pacman.movimientoIzquierda = function () {
        this.x = this.x - this.velocidad;
        this.spritePorDefecto = [
            [0, 32],
            [32, 32],
        ];
        if (comprobarMapa(mapa)) {
            this.x = limiteIzquierda;
        };
    };Pacman.movimientoArriba = function () {
        this.y = this.y - this.velocidad;
        this.spritePorDefecto = [
            [0, 64],
            [32, 64],
        ];
        if (comprobarMapa(mapa)) {
            this.y = limiteArriba;
        };
    };Pacman.movimientoAbajo = function () {
        this.y = this.y + this.velocidad;
        this.spritePorDefecto = [
            [0, 96],
            [32, 96],
        ];
        if (comprobarMapa(mapa)) {
            this.y = limiteAbajo;
        };
    };
