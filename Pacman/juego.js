    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    function crearRect(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height)
    } 

    function comprobarMuro(mapa){ //comprobar si la siguiente posición del array es una pared
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
                if (mapa[i][j] == 1) {
                    return true;
                }
            }
        }
    };



    let fps = 30;
    let tamañoBloque = 20;
    let colorPared = "red" // Color de la pared #342DCA
    let anchoMapa = 420;
    let altoMapa = 440;
    let interiorPared = tamañoBloque / 1.1; // Segun por que lo divida es más o menos pequeño (18)
    let bordePared = (tamañoBloque - interiorPared) / 2; // Calculo la diferencia del tamaño del bloque y del interior y lo divido entre 2 para repartir el hueco sobrante
    let colorRellenoPared = "black"; // Color del relleno

    
    
    let mapa = [ //array del mapa, según el numero son casillas fuera del mapa, paredes o camino por el que pasar
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]; 

    function bucleJuego() {

        dibujar();

    };


    function dibujar() {

        crearRect(0, 0, anchoMapa, altoMapa, "black") //Creo que mapa entero
        dibujarParedes(); //Dentro del mapa creo todos los bloques de las paredes

    };

    let intervaloJuego = setInterval(bucleJuego, 1000 / fps);

    function dibujarParedes() {
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
                if (mapa[i][j] == 1) {
                    crearRect(
                        j * tamañoBloque, //posicion eje x
                        i * tamañoBloque, //posicion eje y
                        tamañoBloque, //ancho bloque
                        tamañoBloque, //alto bloque
                        colorPared //color bloque
                    );
                    
        //si j no es la primera fila y el bloque de la izquierda es una pared
        //para diferenciar ciertos bloques
                    if (j > 0 && mapa[i][j - 1 ] == 1) {
                        crearRect(
                            j * tamañoBloque, 
                            i * tamañoBloque + bordePared, //le sumo el borde de la pared(1) para que baje más el bloque negro de relleno
                            interiorPared + bordePared, // le sumo al interior(18) el borde(1) porque por los lados se junta con otros bloques y sino se queda mas gordo
                            interiorPared, //(18)
                            colorRellenoPared // lo relleno de negro
                        );
                    };

        //si j(horizontal) es menor que el numero de bloques horizontales y j a la derecha tiene otra pared
        //para rellenar horizontalmente
                    if (j < mapa[i].length - 1 && mapa[i][j + 1] == 1){
                        crearRect(
                            j * tamañoBloque + bordePared, // le sumo el borde de la pared(1) para que se ponga por encima del borde que hay entre cada bloque
                            i * tamañoBloque + bordePared, // le sumo el borde de la pared(1) para que baje más el bloque negro de relleno
                            interiorPared + bordePared, // le sumo al interior(18) el borde(1) porque por los lados se junta con otros bloques y sino se queda mas gordo
                            interiorPared, // (18)
                            colorRellenoPared // lo relleno de negro
                        );
                    };

        //si i(vertical) es mayor que 0 y la posicion de arriba es una pared
        //separar bloques verticalmente
                    if (i > 0 && mapa[i - 1][j] == 1){
                        crearRect(
                            j * tamañoBloque + bordePared, // le sumo el borde de la pared(1) para que el bloque negro se posicione centrado la derecha
                            i * tamañoBloque, 
                            interiorPared, 
                            interiorPared + bordePared, //(18 + 1)
                            colorRellenoPared // lo relleno de negro
                        );
                    };
                    
        //si i(vertical) es menor que el numero de bloques verticales y el bloque de abajo es un bloque
        //para rellenar verticalmente
                    if (i < mapa.length - 1 && mapa[i + 1][j] == 1){
                        crearRect(
                            j * tamañoBloque + bordePared, // le sumo el borde de la pared(1) para que el bloque negro se posicione centrado hacia la derecha
                            i * tamañoBloque + bordePared, // le sumo el borde de la pared(1) para que el bloque negro se posicione centrado hacia abajo
                            interiorPared, 
                            interiorPared + bordePared, //(18 + 1)
                            colorRellenoPared // lo relleno de negro
                        );
                    };
                };
            };
        };
    };