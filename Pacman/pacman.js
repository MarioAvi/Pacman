    let xDerecha, xIzquierda, yArriba, yAbajo, miPacman, id1, id2, i, i2, j, j2, direccionActual, direccionPendiente;
    let posicion = 0;
    let puntos = 0;
    let imagen = new Image();
    imagen.src= "assets/img/spritePacman.png";
    

    class Pacman {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.spritePacmanDerecha = [[0, 0], [32, 0]];
            this.spritePacmanIzquierda = [[0, 64],[32, 64]];
            this.spritePacmanArriba = [[0, 96],[32, 96]];
            this.spritePacmanAbajo = [[0, 32], [32, 32]];
            this.spritePacman = this.spritePacmanDerecha;
            this.velocidad = 1.7;
            this.tamañoX = 30;
            this.tamañoY = 30;
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

    function detectarColisionesAbajo(x, y, velocidad) {

        i = Math.trunc(x / 30);
        j = Math.trunc((y + 28) / 30);
        i2 = Math.trunc((x + 28)/ 30);
        j2 = Math.trunc(y / 30); 

        if (esMuro(i,j) || esMuro(i2,j2) || esMuro(i,j2 ) || esMuro(i2,j)) {
            y = y - velocidad;
        };
        return y;
    };

    function detectarColisionesArriba(x, y, velocidad) {

        i = Math.trunc(x / 30);
        j = Math.trunc((y + 28) / 30);
        i2 = Math.trunc((x + 28)/ 30);
        j2 = Math.trunc(y / 30); 

        if (esMuro(i,j) || esMuro(i2,j2) || esMuro(i,j2 ) || esMuro(i2,j)) {
            y = y + velocidad;
        };
        return y;
    };

    function detectarColisionesDerecha(x, y, velocidad) {

        i = Math.trunc(x / 30);
        j = Math.trunc((y + 28) / 30);
        i2 = Math.trunc((x + 28)/ 30);
        j2 = Math.trunc(y / 30); 

        if (esMuro(i,j) || esMuro(i2,j2) || esMuro(i,j2 ) || esMuro(i2,j)) {
            x = x - velocidad;
        };
        return x;
    };

    function detectarColisionesIzquierda(x, y, velocidad) {

        i = Math.trunc(x / 30);
        j = Math.trunc((y + 28) / 30);
        i2 = Math.trunc((x + 28)/ 30);
        j2 = Math.trunc(y / 30); 

        if (esMuro(i,j) || esMuro(i2,j2) || esMuro(i,j2 ) || esMuro(i2,j)) {
            x = x + velocidad;
        };
        return x;

        
    };

    function dibujarPacman() {

        teletransporte();
		
		if (direccionPendiente && puedeMoverse(miPacman.x, miPacman.y, direccionPendiente)) {
            direccionActual = direccionPendiente;
            direccionPendiente = null;
        }
    
        switch (direccionActual) {
            case "derecha":
                miPacman.movimientoDerecha();
                break;
            case "izquierda":
                miPacman.movimientoIzquierda();
                break;
            case "arriba":
                miPacman.movimientoArriba();
                break;
            case "abajo":
                miPacman.movimientoAbajo();
                break;
        }

        ctx.drawImage(miPacman.imagen, // Imagen completa con todos los comecocos (Sprite)
            miPacman.spritePacman[posicion][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            miPacman.spritePacman[posicion][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            miPacman.tamañoX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
            miPacman.tamañoY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
            miPacman.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
            miPacman.y,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
            28,		    // Tamaño X del comecocos que voy a dibujar
            28);         // Tamaño Y del comecocos que voy a dibujar
    };
    
   

    function abreCierraBoca() {
		
        posicion = (posicion + 1) % 2;
            
    }

    function activaMovimiento(evt) {
        switch (evt.keyCode) {
            case 39:
                direccionPendiente = "derecha";
                break;
            case 37:
                direccionPendiente = "izquierda";
                break;
            case 38:
                direccionPendiente = "arriba";
                break;
            case 40:
                direccionPendiente = "abajo";
                break;
            case 68:
                direccionPendiente = "derecha";
                break;
            case 65:
                direccionPendiente = "izquierda";
                break;
            case 87:
                direccionPendiente = "arriba";
                break;
            case 83:
                direccionPendiente = "abajo";
                break;
        }
    }

    function teletransporte() {
        if (miPacman.x <= -25) {
            miPacman.x = 650;
        } else if (miPacman.x >= 655) {
            miPacman.x = -20;
        } 
    } 

    function puedeMoverse(x, y, direccion) {
        let nuevoX = x;
        let nuevoY = y;
        switch (direccion) {
            case "derecha":
                nuevoX += miPacman.velocidad;
                break;
            case "izquierda":
                nuevoX -= miPacman.velocidad;
                break;
            case "arriba":
                nuevoY -= miPacman.velocidad;
                break;
            case "abajo":
                nuevoY += miPacman.velocidad;
                break;
        }
    
        i = Math.trunc(nuevoX / 30);
        j = Math.trunc(nuevoY / 30);
        i2 = Math.trunc((nuevoX + 28) / 30);
        j2 = Math.trunc((nuevoY + 28) / 30);
    
        return !(esMuro(i, j) || esMuro(i2, j) || esMuro(i, j2) || esMuro(i2, j2));
    }

    function comerBolas() {
        console.log(puntos);
        i = Math.trunc(miPacman.x / 30);
        j = Math.trunc(miPacman.y / 30);

        if (mapa[j][i] === 2) { 
            mapa[j][i] = 0;
            puntos += 25
            mostrarPuntos.textContent = puntos;
        } 
    }

    function comerBolasGrandes() {
        console.log(puntos);
        i = Math.trunc(miPacman.x / 30);
        j = Math.trunc(miPacman.y / 30);

        if (mapa[j][i] === 3) { 
            mapa[j][i] = 0;
            puntos += 100
            mostrarPuntos.textContent = puntos;
        } 
    }

    function juego() {

        dibujar();
        dibujarPacman();
        comerBolas();
        comerBolasGrandes()
    } 

    document.addEventListener("keydown", activaMovimiento, false);


    miPacman = new Pacman(32, 31)
    miPacman.imagen = imagen;
    id1 = setInterval(juego, 1000/50);	
    id2 = setInterval(abreCierraBoca, 1000/8);