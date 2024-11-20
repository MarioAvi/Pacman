
  
    const limiteDerecha     = this.x - 25;
    const limiteIzquierda   = this.x + 25;
    const limiteArriba      = this.y + 25;
    const limiteAbajo       = this.y - 25;


    let xDerecha, xIzquierda, yArriba, yAbajo, miPacman, id1, id2;
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




            let i = Math.trunc((this.x + 25)/ 30)
            let j = Math.trunc((this.y + 25) / 30)

            //(console.log((this.x + 25/ 30),"-", i,"-",j);
            if (esMuro(i,j)) {
                console.log("es muro");
                
                this.x = this.x - this.velocidad;
                
            } 
        };

        movimientoIzquierda() {
            this.x = this.x - this.velocidad;
            this.spritePacman = this.spritePacmanIzquierda;
            // i = (this.x + 25)/ 30
            // j = (this.y + 25) / 30
            // if (esMuro(i,j)) {
            //     this.x = limiteDerecha;
            // } 

        };
        
        movimientoArriba() {
            this.y = this.y - this.velocidad;
            this.spritePacman = this.spritePacmanArriba;
            // i = (this.x + 25)/ 30
            // j = (this.y + 25) / 30
            // if (esMuro(i,j)) {
            //     this.x = limiteDerecha;
            // } 

        };
        
        movimientoAbajo() {
            this.y = this.y + this.velocidad;
            this.spritePacman = this.spritePacmanAbajo;
            // i = (this.x + 25)/ 30
            // j = (this.y + 25) / 30
            // if (esMuro(i,j)) {
            //     this.x = limiteDerecha;
            // } 
        };
    }

    miPacman = new Pacman(32, 32)
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