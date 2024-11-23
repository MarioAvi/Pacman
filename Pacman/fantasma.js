let fantasmaRojo, fantasmaRosa, fantasmaAzul, fantasmaAmarillo, id3;
let posicionAnimación = 0;
let imagenFantasma = new Image();
imagenFantasma.src = "assets/img/spriteFantasmas.png";

class Fantasma {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.spriteFantasmaRojoAbajo = [[0, 0], [0, 103]];
        this.spriteFantasmaRojoArriba = [[102, 0],[102, 103]];
        this.spriteFantasmaRojoIzquierda = [[0, 206],[0, 309]];
        this.spriteFantasmaRojoDerecha = [[102, 206], [102, 309]];
        this.spriteFantasmaRojo = this.spriteFantasmaRojoArriba;

        this.spriteFantasmaRosaAbajo = [[204, 0], [204, 103]];
        this.spriteFantasmaRosaArriba = [[306, 0],[306, 103]];
        this.spriteFantasmaRosaIzquierda = [[204, 206],[204, 309]];
        this.spriteFantasmaRosaDerecha = [[306, 206], [306, 309]];
        this.spriteFantasmaRosa = this.spriteFantasmaRosaIzquierda;

        this.spriteFantasmaAzulAbajo = [[408, 0], [408, 103]];
        this.spriteFantasmaAzulArriba = [[510, 0],[510, 103]];
        this.spriteFantasmaAzulIzquierda = [[408, 206],[408, 309]];
        this.spriteFantasmaAzulDerecha = [[510, 206], [510, 309]];
        this.spriteFantasmaAzul = this.spriteFantasmaAzulDerecha;

        this.spriteFantasmaAmarilloAbajo = [[612, 0], [612, 103]];
        this.spriteFantasmaAmarilloArriba = [[714, 0],[714, 103]];
        this.spriteFantasmaAmarilloIzquierda = [[612, 206],[612, 309]];
        this.spriteFantasmaAmarilloDerecha = [[718, 206], [718, 309]];
        this.spriteFantasmaAmarillo = this.spriteFantasmaAmarilloAbajo;


        this.velocidad = 1.4;
        this.tamañoX = 102;
        this.tamañoY = 103;
    };

    movimientoDerecha() {
            
            this.spritePacman = this.spritePacmanDerecha;
            this.x = this.x + this.velocidad;
            this.x = detectarColisionesDerecha(this.x, this.y, this.velocidad);

        };

        movimientoIzquierda() {

            this.x = this.x - this.velocidad;
            this.spritePacman = this.spritePacmanIzquierda;
            this.x = detectarColisionesIzquierda(this.x, this.y, this.velocidad);

        };
        
        movimientoArriba() {

            this.y = this.y - this.velocidad;
            this.spritePacman = this.spritePacmanArriba;
            this.y = detectarColisionesArriba(this.x, this.y, this.velocidad);

        };
        
        movimientoAbajo() {
            
            this.y = this.y + this.velocidad;
            this.spritePacman = this.spritePacmanAbajo;
            this.y = detectarColisionesAbajo(this.x, this.y, this.velocidad); 
         
        };

    
}

function moverFantasma(fantasma) {
    let direcciones = ["arriba", "abajo", "izquierda", "derecha"];
    let direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    
    switch (direccion) {
        case "arriba":
            fantasma.y = colisionFantasma(fantasma.x, fantasma.y, "arriba", fantasma.velocidad);
            break;
        case "abajo":
            fantasma.y = colisionFantasma(fantasma.x, fantasma.y, "abajo", fantasma.velocidad);
            break;
        case "izquierda":
            fantasma.x = colisionFantasma(fantasma.x, fantasma.y, "izquierda", fantasma.velocidad);
            break;
        case "derecha":
            fantasma.x = colisionFantasma(fantasma.x, fantasma.y, "derecha", fantasma.velocidad);
            break;
    }
}

function colisionFantasma(x, y, direccion, velocidad) {
    
}

function dibujarFantasma() {

    ctx.drawImage(fantasmaRojo.imagen, // Imagen completa con todos los comecocos (Sprite)
            fantasmaRojo.spriteFantasmaRojo[posicionAnimación][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            fantasmaRojo.spriteFantasmaRojo[posicionAnimación][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            fantasmaRojo.tamañoX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
            fantasmaRojo.tamañoY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
            fantasmaRojo.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
            fantasmaRojo.y,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
            28,		    // Tamaño X del comecocos que voy a dibujar
            28);

    ctx.drawImage(fantasmaRosa.imagen, // Imagen completa con todos los comecocos (Sprite)
            fantasmaRosa.spriteFantasmaRosa[posicionAnimación][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            fantasmaRosa.spriteFantasmaRosa[posicionAnimación][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            fantasmaRosa.tamañoX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
            fantasmaRosa.tamañoY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
            fantasmaRosa.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
            fantasmaRosa.y,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
            28,		    // Tamaño X del comecocos que voy a dibujar
            28);

    ctx.drawImage(fantasmaAzul.imagen, // Imagen completa con todos los comecocos (Sprite)
            fantasmaAzul.spriteFantasmaAzul[posicionAnimación][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            fantasmaAzul.spriteFantasmaAzul[posicionAnimación][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            fantasmaAzul.tamañoX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
            fantasmaAzul.tamañoY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
            fantasmaAzul.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
            fantasmaAzul.y,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
            28,		    // Tamaño X del comecocos que voy a dibujar
            28);

    ctx.drawImage(fantasmaAmarillo.imagen, // Imagen completa con todos los comecocos (Sprite)
            fantasmaAmarillo.spriteFantasmaAmarillo[posicionAnimación][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            fantasmaAmarillo.spriteFantasmaAmarillo[posicionAnimación][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            fantasmaAmarillo.tamañoX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
            fantasmaAmarillo.tamañoY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
            fantasmaAmarillo.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
            fantasmaAmarillo.y,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
            28,		    // Tamaño X del comecocos que voy a dibujar
            28);
    

}

function animacionFantasma() {

    posicionAnimación = (posicionAnimación + 1) % 2

}

function juego() {

    dibujarMapa();
    dibujarPacman();
    comerBolas();
    comerBolasGrandes()
    dibujarFantasma();
    moverFantasma(fantasmaAmarillo);
    moverFantasma(fantasmaAzul);
    moverFantasma(fantasmaRojo);
    moverFantasma(fantasmaRosa)
} 

fantasmaRosa = new Fantasma(271, 301);
fantasmaRosa.imagen = imagenFantasma;

fantasmaAzul = new Fantasma(331, 301);
fantasmaAzul.imagen = imagenFantasma;

fantasmaRojo = new Fantasma(271, 331);
fantasmaRojo.imagen = imagenFantasma;

fantasmaAmarillo = new Fantasma(331, 331);
fantasmaAmarillo.imagen = imagenFantasma;

id1 = setInterval(juego, 1000/50);	
id2 = setInterval(abreCierraBoca, 1000/8);
id3 = setInterval(animacionFantasma, 1000/8);
