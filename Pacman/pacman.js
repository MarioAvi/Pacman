
  
    const limiteDerecha     = this.x - 25;
    const limiteIzquierda   = this.x + 25;
    const limiteArriba      = this.y + 25;
    const limiteAbajo       = this.y - 25;


    let xDerecha, xIzquierda, yArriba, yAbajo, miPacman, id1, id2, i, i2, j, j2;
    let posicion = 0;
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


            this.velocidad = 1.5;
            this.tamañoX = 30;
            this.tamañoY = 30;
        };

        movimientoDerecha() {
            
            this.spritePacman = this.spritePacmanDerecha;
            this.x = this.x + this.velocidad;


            this.x = detectarColisionesIzquierda(this.x, this.y, this.velocidad);

        };

        movimientoIzquierda() {
            this.x = this.x - this.velocidad;
            this.spritePacman = this.spritePacmanIzquierda;
            
            this.x = detectarColisionesDerecha(this.x, this.y, this.velocidad);

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

    function detectarColisionesDerechaX(x) {
        i = Math.trunc((x + 25)/ 30);
        return i;
    }

    function detectarColisionesArribaY(y) {
        j = Math.trunc(y / 30);
        return j;
    }

    function detectarColisionesIzquierdaX(x) {
        i = Math.trunc(x / 30);
        return i;
    }

    function detectarColisionesAbajoY(y) {
        j = Math.trunc((y + 25) / 30);
        return j;
    }

    function detectarColisionesAbajo(x, y, velocidad) {

        i = Math.trunc(x / 30);
        j = Math.trunc((y + 25) / 30);
        i2 = Math.trunc((x + 25)/ 30);
        j2 = Math.trunc(y / 30); 

        if (esMuro(i,j) || esMuro(i2,j2) || esMuro(i,j2 ) || esMuro(i2,j)) {
            console.log("es muro");
            y = y - velocidad;
        };
        return y;
    };

    function detectarColisionesArriba(x, y, velocidad) {

        i = Math.trunc(x / 30);
        j = Math.trunc((y + 25) / 30);
        i2 = Math.trunc((x + 25)/ 30);
        j2 = Math.trunc(y / 30); 

        if (esMuro(i,j) || esMuro(i2,j2) || esMuro(i,j2 ) || esMuro(i2,j)) {
            console.log("es muro");
            y = y + velocidad;
        };
        return y;
    };

    function detectarColisionesDerecha(x, y, velocidad) {

        i = Math.trunc(x / 30);
        j = Math.trunc((y + 25) / 30);
        i2 = Math.trunc((x + 25)/ 30);
        j2 = Math.trunc(y / 30); 

        if (esMuro(i,j) || esMuro(i2,j2) || esMuro(i,j2 ) || esMuro(i2,j)) {
            console.log("es muro");
            x = x + velocidad;
        };
        return x;
    };

    function detectarColisionesIzquierda(x, y, velocidad) {

        i = Math.trunc(x / 30);
        j = Math.trunc((y + 25) / 30);
        i2 = Math.trunc((x + 25)/ 30);
        j2 = Math.trunc(y / 30); 

        if (esMuro(i,j) || esMuro(i2,j2) || esMuro(i,j2 ) || esMuro(i2,j)) {
            console.log("es muro");
            x = x - velocidad;
        };
        return x;

        
    };

    miPacman = new Pacman(64, 124)
    miPacman.imagen = imagen;

    function dibujarPacman() {
		
		if (xDerecha) {
			
			miPacman.movimientoDerecha();
	   
		};
		if (xIzquierda) {
			
			miPacman.movimientoIzquierda();
	   
		};
		if (yArriba) {
			
			miPacman.movimientoArriba();
	   
		};
		if (yAbajo) {
			
			miPacman.movimientoAbajo();
	   
		};
        ctx.drawImage(miPacman.imagen, // Imagen completa con todos los comecocos (Sprite)
            miPacman.spritePacman[posicion][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            miPacman.spritePacman[posicion][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            miPacman.tamañoX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
            miPacman.tamañoY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
            miPacman.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
            miPacman.y,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
            25,		    // Tamaño X del comecocos que voy a dibujar
            25);         // Tamaño Y del comecocos que voy a dibujar
    };
    
   

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

    function juego() {

        dibujar();
        dibujarPacman();
    } 

    document.addEventListener("keydown", activaMovimiento, false);


    id1 = setInterval(juego, 1000/50);	
    id2 = setInterval(abreCierraBoca, 1000/8);