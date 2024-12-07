window.onload = function() {
    actualizarPuntuacionMasAltaEnPantalla();
    let xDerecha, xIzquierda, yArriba, yAbajo, miPacman, id1, id2, id3, i, i2, j, j2, direccionActual, direccionPendiente, bolas;
    let faseActual = 0;
    let posicion = 0;
    let puntos = 0;
    let contadorPartida = 30;
    let pausada = false;
    let juegoBloqueado = true;
    const tiempoPorFase = [50, 40, 35, 30, 25, 20, 15, 10, 5, 0]
    let vidas = 3;
    let imagen = new Image();
    imagen.src= "assets/img/sprites.png";
    let imagenVidas = new Image();
    imagenVidas.src = "assets/img/Pacman.png";
    

    class Pacman {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.spritePacmanDerecha = [[0, 0], [213, 0]];
            this.spritePacmanIzquierda = [[0, 444],[213, 444]];
            this.spritePacmanArriba = [[0, 672],[213, 672]];
            this.spritePacmanAbajo = [[0, 220], [213, 220]];
            this.spritePacman = this.spritePacmanDerecha;
            this.velocidad = 5;
            this.tamañoX = 200;
            this.tamañoY = 200;
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
		
		if (direccionPendiente) {
            // Verificar si puede moverse en la dirección pendiente
            if (puedeMoverse(miPacman.x, miPacman.y, direccionPendiente)) {
                direccionActual = direccionPendiente;
                direccionPendiente = null; // Resetea la dirección pendiente al aceptarla
            }
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
        if (juegoBloqueado) return;

        switch (evt.keyCode) {
            case 39: // Flecha derecha
            case 68: // Tecla D
                direccionPendiente = "derecha";
                break;
            case 37: // Flecha izquierda
            case 65: // Tecla A
                direccionPendiente = "izquierda";
                break;
            case 38: // Flecha arriba
            case 87: // Tecla W
                direccionPendiente = "arriba";
                break;
            case 40: // Flecha abajo
            case 83: // Tecla S
                direccionPendiente = "abajo";
                break;
            case 27: // Escape
                pausarPartida();
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
        i = Math.trunc(miPacman.x / 30);
        j = Math.trunc(miPacman.y / 30);

        if (nivel[j][i] === 2) { 
            nivel[j][i] = 0;
            puntos += 10
            mostrarPuntos.textContent = puntos;
        } 
    }

    function comerBolasGrandes() {
        i = Math.trunc(miPacman.x / 30);
        j = Math.trunc(miPacman.y / 30);

        if (nivel[j][i] === 3) { 
            nivel[j][i] = 0;
            puntos += 100
            mostrarPuntos.textContent = puntos;
        } 
    }

    function juego() {

        perderVida();
        dibujarMapa();
        dibujarPacman();
        comerBolas();
        comerBolasGrandes();
        siguienteNivel();
    } 

    function tiempoRestante() {
        if (juegoBloqueado) return;
        mostrarTiempo.textContent = contadorPartida;
        contadorPartida--;
    }
    

    function perderVida() {
        if (contadorPartida < 0) {
            sonidoPerderVida.play();
            vidas--;
            actualizarVidas();
    
            if (vidas > 0) {
                // Bloquear el juego y mostrar mensaje de pausa
                mensajeVida.textContent = "¡Perdiste una vida!";
                mensajeVida.style.display = "block";
    
                juegoBloqueado = true; // Bloquea el movimiento
    
                clearInterval(id1);
                clearInterval(id2);
                clearInterval(id3);
    
                setTimeout(() => {
                    mensajeVida.style.display = "none";
    
                    reiniciarEstado();
                    juegoBloqueado = false;
                }, 4000);
            } else {
                // Manejo del Game Over
                almacenarPuntosEnLocalStorage(puntos); // Guarda los puntos en localStorage
                almacenarPuntuacionMasAlta(puntos); // Guarda la puntuación más alta
                actualizarPuntuacionMasAltaEnPantalla();
    
                clearInterval(id1);
                clearInterval(id2);
                clearInterval(id3);
                iniciar.disabled = false;
                iniciar.style.cursor = "pointer";
                pausar.disabled = true;
                pausar.style.cursor = "not-allowed";
                reiniciar.disabled = true;
                reiniciar.style.cursor = "not-allowed";
    
                // Mostrar mensaje de Game Over
                musicaFondo.pause();
                mensajeGameOver.textContent = "Game Over";
                mensajeGameOver.style.display = "block";
            }
        }
    }
    
    
    
    
    function reiniciarEstado() {

        clearInterval(id1);
        clearInterval(id2);
        clearInterval(id3);

        if (mapaActual === 2) {
            contadorPartida = 45;
        } else {
            contadorPartida = 30;
        }
        mostrarTiempo.textContent = contadorPartida;
    
        miPacman = new Pacman(31, 31);
        miPacman.imagen = imagen;
        miPacman.spritePacman = miPacman.spritePacmanDerecha;
    
        direccionActual = null;
        direccionPendiente = null;
    
        //Reinicia el mapa en el que este en ese momento
        reiniciarMapa(nivel);
    
        mostrarTiempo.textContent = contadorPartida;
        mostrarPuntos.textContent = puntos;
    
        // Reinicia temporizadores

    
        id1 = setInterval(juego, 1000 / 50);
        id2 = setInterval(abreCierraBoca, 1000 / 12);
        id3 = setInterval(tiempoRestante, 1000);
    }
    

    function actualizarVidas() {
        const vidasContainer = document.getElementById('vidasContainer');
        vidasContainer.innerHTML = '';
        for (let i = 0; i < vidas; i++) {
            const vidaImagen = new Image();
            vidaImagen.src = "assets/img/Pacman.png";
            vidaImagen.classList.add('vida');
            vidasContainer.appendChild(vidaImagen);
          }
    }

    function siguienteNivel() {
        bolas = nivel.some(fila => fila.includes(2));
    
        if (bolas === false) {

            sonidoNivelPasado.play();
            contadorPartida += tiempoPorFase[faseActual]; 
    
            mapaActual++;
    
            if (mapaActual >= 3) {
                // Reinicia el mapa y avanza a la siguiente fase
                faseActual++;
                mapaActual = 0;
                contadorPartida = 30;
    
                if (faseActual >= tiempoPorFase.length) {
                    console.log("¡Has completado todas las fases!");
                    return; // Finaliza si no hay más fases
                }
            }

            mostrarFase.textContent = `Fase: ${faseActual + 1}`;

    
            // Cambia el nivel actual al siguiente
            nivel = niveles[mapaActual];
            miPacman.x = 31;
            miPacman.y = 31;
    
            reiniciarMapa(mapaNivel1);
            reiniciarMapa(mapaNivel2);
            reiniciarMapa(mapaNivel3);
    
        }
    }

    function iniciarPartida() {
        // Resetea estados y temporizadores
        clearInterval(id1);
        clearInterval(id2);
        clearInterval(id3);
    
        pausada = false;
        juegoBloqueado = true; 
        juegoCorriendo = false;
    
        vidas = 3;
        puntos = 0;
        faseActual = 0;
        mapaActual = 0;
        contadorPartida = 30;
        nivel = niveles[0];
        direccionActual = null;
        direccionPendiente = null;
    
        mostrarPuntos.textContent = puntos;
        mostrarTiempo.textContent = contadorPartida;
        mostrarFase.textContent = `Fase: ${faseActual + 1}`;
        actualizarVidas();
        actualizarPuntuacionMasAltaEnPantalla();
    
        // Resetea Pacman y el mapa
        miPacman = new Pacman(31, 31);
        miPacman.imagen = imagen;
        dibujarPacman();
        dibujarMapa();
    
        reiniciarMapa(mapaNivel1);
        reiniciarMapa(mapaNivel2);
        reiniciarMapa(mapaNivel3);
    
        // Configura botones y mensajes
        mensajeGameOver.style.display = "none";
        iniciar.disabled = true;
        iniciar.style.cursor = "not-allowed";
        pausar.disabled = false;
        pausar.style.cursor = "pointer";
        reiniciar.disabled = false;
        reiniciar.style.cursor = "pointer";
    
        // Muestra mensaje de inicio y configura temporizadores
        mensajeInicio.textContent = "¡Preparados!";
        mensajeInicio.style.display = "block";
        musicaFondo.currentTime = 0;
        musicaFondo.play();
    
        setTimeout(() => {
            mensajeInicio.style.display = "none";
            juegoBloqueado = false; // Desbloquea el juego
            iniciarTemporizadores();
        }, 5700);
    }

    function reiniciarPartida() {
        // Reinicia estados y temporizadores
        clearInterval(id1);
        clearInterval(id2);
        clearInterval(id3);
    
        musicaFondo.pause();
        musicaFondo.currentTime = 0;
    
        pausada = false;
        juegoCorriendo = false;
        mensajePausa.style.display = "none";
        mensajeGameOver.style.display = "none";
    
        puntos = 0;
        vidas = 3;
        faseActual = 0;
        mapaActual = 0;
        contadorPartida = 30;
        nivel = niveles[0];
        direccionActual = null;
        direccionPendiente = null;
    
        mostrarPuntos.textContent = puntos;
        mostrarTiempo.textContent = contadorPartida;
        mostrarFase.textContent = `Fase: ${faseActual + 1}`;
        actualizarVidas();
        actualizarPuntuacionMasAltaEnPantalla();
    
        reiniciarMapa(mapaNivel1);
        reiniciarMapa(mapaNivel2);
        reiniciarMapa(mapaNivel3);
    
        juegoBloqueado = true;
    
        miPacman = new Pacman(31, 31);
        miPacman.imagen = imagen;
    
        dibujarMapa();
        dibujarPacman();
    
        mensajeReinicio.style.display = "block";
    
        setTimeout(() => {
            mensajeReinicio.style.display = "none";
            mensajeInicio.textContent = "¡Preparados!";
            mensajeInicio.style.display = "block";
    
            musicaFondo.play();
    
            setTimeout(() => {
                mensajeInicio.style.display = "none";
                iniciarTemporizadores();
                juegoBloqueado = false; // Desbloquea el movimiento después del mensaje
            }, 5700);
        }, 2000);
    }
    

    function iniciarTemporizadores() {
        // Detiene temporizadores existentes antes de iniciar nuevos
        clearInterval(id1);
        clearInterval(id2);
        clearInterval(id3);
    
        id1 = setInterval(juego, 1000 / 50);
        id2 = setInterval(abreCierraBoca, 1000 / 12);
        id3 = setInterval(tiempoRestante, 1000);
        juegoCorriendo = true;
    }
    

    function pausarPartida() {
        if (!pausada) {
            sonidoPausa.play();
        
            clearInterval(id1);
            clearInterval(id2);
            clearInterval(id3);
            pausada = true;
            juegoCorriendo = false; // Marca como detenido
        
            musicaFondo.pause();
            mensajePausa.style.display = "block";
        } else {
            sonidoPausa.pause();
            sonidoPausa.currentTime = 0;

            mensajePausa.style.display = "none";
            iniciarTemporizadores(); // Reinicia los intervalos
            pausada = false;
            musicaFondo.play();
        }
    }
    

    function almacenarPuntosEnLocalStorage(puntos) {
        localStorage.setItem('puntosGuardados', puntos); // Almacena los puntos
    }

    function almacenarPuntuacionMasAlta(puntos) {
        const puntuacionMasAlta = obtenerPuntuacionMasAlta();
        if (puntos > puntuacionMasAlta) {
            localStorage.setItem('puntuacionMasAlta', puntos); // Guarda la nueva puntuación más alta
        }
    }

    function obtenerPuntuacionMasAlta() {
        return parseInt(localStorage.getItem('puntuacionMasAlta')) || 0; // Recupera la puntuación más alta o devuelve 0 si no hay
    }

    function actualizarPuntuacionMasAltaEnPantalla() {
        const puntuacionMasAlta = obtenerPuntuacionMasAlta();
        document.getElementById('puntuacionMasAlta').textContent = `Record: ${puntuacionMasAlta}`;
    }

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            e.preventDefault(); // Bloquea cualquier acción predeterminada, al darle al espacio después de reiniciar me reiniciaba otra vez porque me detectaba el ultimo boton presionado
        }
    });
    
    document.addEventListener("keydown", activaMovimiento, false);


    miPacman = new Pacman(31, 31)
    miPacman.imagen = imagen;
    actualizarVidas();

    iniciar.addEventListener("click", iniciarPartida);
    reiniciar.addEventListener("click", reiniciarPartida);
    pausar.addEventListener("click", pausarPartida);


}
