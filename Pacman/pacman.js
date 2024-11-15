    const limiteDerecha     = this.x - 20;
    const limiteIzquierda   = this.x + 20;
    const limiteArriba      = this.y + 20;
    const limiteAbajo       = this.y - 20;
    const imagen            = document.getElementById("animacionPacman");
    

    let xDerecha, xIzquierda, yArriba, yAbajo, miPacman, id1, id2;
    let posicion = 0;
    

    class Pacman {
        constructor(x, y, tamañoX, tamañoY, velocidad) {
            this.x = x;
            this.y = y;
            this.spritePacman = [0, 0], [32, 0];
            this.velocidad = velocidad;
            this.tamañoX = tamañoX;
            this.tamañoY = tamañoY;
        }
    }

    Pacman.movimientoDerecha = function () {
        this.x = this.x + this.velocidad;
        this.spritePacman = [
            [0, 0],
            [32, 0],
        ];
        if (comprobarMuro(mapa)) {
            this.x = limiteDerecha;
        };
    };

    Pacman.movimientoIzquierda = function () {
        this.x = this.x - this.velocidad;
        this.spritePacman = [
            [0, 32],
            [32, 32],
        ];
        if (comprobarMuro(mapa)) {
            this.x = limiteIzquierda;
        };
    };
    
    Pacman.movimientoArriba = function () {
        this.y = this.y - this.velocidad;
        this.spritePacman = [
            [0, 64],
            [32, 64],
        ];
        if (comprobarMuro(mapa)) {
            this.y = limiteArriba;
        };
    };
    
    Pacman.movimientoAbajo = function () {
        this.y = this.y + this.velocidad;
        this.spritePacman = [
            [0, 96],
            [32, 96],
        ];
        if (comprobarMuro(mapa)) {
            this.y = limiteAbajo;
        };
    };

    function movimientosPacman() {
		
		// borramos el canvas
		ctx.clearRect(0, 0, 500, 500);		
		
		if (xDerecha) {
			
			miPacman.generaPosicionDerecha();
	   
		};
		if (xIzquierda) {
			
			miPacman.generaPosicionIzquierda();
	   
		};
		if (yArriba) {
			
			miPacman.generaPosicionArriba();
	   
		};
		if (yAbajo) {
			
			miPacman.generaPosicionAbajo();
	   
		};
    };
    ctx.drawImage(miPacman.imagen, // Imagen completa con todos los comecocos (Sprite)
        miPacman.spritePacman[posicion][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
        miPacman.spritePacman[posicion][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
        miPacman.tamañoX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
        miPacman.tamañoY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
        miPacman.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
        miPacman.y,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
        miPacman.tamañoX,		    // Tamaño X del comecocos que voy a dibujar
        miPacman.tamañoY);         // Tamaño Y del comecocos que voy a dibujar

    function abreCierraBoca() {
		
        posicion = (posicion + 1) % 2;
            
    }

    function activaMovimiento(evt) {

        xDerecha   = false;
        xIzquierda = false;
        yAbajo     = false;
        yArriba    = false;

        switch (evt.keyCode) {
		

			case 39:
			  xDerecha = true;
			  break;
			
			case 37:
			  xIzquierda = true;
			  break;

			case 38:
			  yArriba = true;
			  break;

			case 40:
			  yAbajo = true;
			  break;
		 
		}
	}
    document.addEventListener("keydown", activaMovimiento, false);
    imagen = new Image();
    imagen.src= document.getElementById("animacionPacman")
    miPacman.imagen = imagen;
    miPacman = new Pacman(20, 20, 20, 20, 1.1)


    id1 = setInterval(pintaRectangulo, 1000/50);	
	
	id2 = setInterval(abreCierraBoca, 1000/8);
