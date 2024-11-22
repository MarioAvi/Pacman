    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    let fps = 30;
    let tamañoBloque = 30;
    let colorPared = "#342DCA" // Color de la pared #342DCA
    let colorRellenoPared = "black"; // Color del relleno
    let colorBolas = "#F0E99F"
    let anchoMapa = 630;
    let altoMapa = 700;
    let interiorPared = tamañoBloque / 1.2; // Segun por que lo divida es más o menos pequeño (18)
    let bordePared = (tamañoBloque - interiorPared) / 2; // Calculo la diferencia del tamaño del bloque y del interior y lo divido entre 2 para repartir el hueco sobrante
    

    
    
    let mapa = [ //array del mapa, según el numero son casillas fuera del mapa, paredes o camino por el que pasar
    //   0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//0
        [1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],//1
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],//2

        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],//3
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],//4
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],//5

        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],//6
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],//7
        [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 3, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],//8

        [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],//9
        [2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2],//10
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1],//11

        [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],//12
        [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],//13
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],//14

        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],//15
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],//16
        [1, 2, 2, 3, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 3, 2, 2, 1],//17

        [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],//18
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],//19
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],//20

        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],//21
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//22
    ]; 

    function crearBloque(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height)
        ctx.closePath();
    } 

    function crearBola(x, y, radio, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, radio, 0, Math.PI * 2); 
        ctx.fillStyle = color; 
        ctx.fill(); 
        ctx.closePath();
    } 

    function esMuro(i,j)
    { 
        console.log(j,"-",i,"-", mapa[j][i]);
        if (mapa[j][i] === 1) {
            return true;
        } else {
            return false
        }
    }

    function bucleJuego() {

        dibujar();

    };


    function dibujar() {

        crearBloque(0, 0, anchoMapa, altoMapa, "black") //Creo que mapa entero
        dibujarParedes(); //Dentro del mapa creo todos los bloques de las paredes

    };


    function dibujarParedes() {
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
                if (mapa[i][j] == 1) {
                    crearBloque(
                        j * tamañoBloque, //posicion eje x
                        i * tamañoBloque, //posicion eje y
                        tamañoBloque, //ancho bloque
                        tamañoBloque, //alto bloque
                        colorPared //color bloque
                    );
                    
        //si j no es la primera fila y el bloque de la izquierda es una pared
        //para diferenciar ciertos bloques
                    if (j > 0 && mapa[i][j - 1 ] == 1) {
                        crearBloque(
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
                        crearBloque(
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
                        crearBloque(
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
                        crearBloque(
                            j * tamañoBloque + bordePared, // le sumo el borde de la pared(1) para que el bloque negro se posicione centrado hacia la derecha
                            i * tamañoBloque + bordePared, // le sumo el borde de la pared(1) para que el bloque negro se posicione centrado hacia abajo
                            interiorPared, 
                            interiorPared + bordePared, //(18 + 1)
                            colorRellenoPared // lo relleno de negro
                        );
                    };
                };

                if (mapa[i][j] === 2)  {
                    crearBola(
                        j * tamañoBloque + tamañoBloque / 2,
                        i * tamañoBloque + tamañoBloque / 2,
                        tamañoBloque / 10,
                        colorBolas
                    );
                }

                if (mapa[i][j] === 3)  {
                    crearBola(
                        j * tamañoBloque + tamañoBloque / 2,
                        i * tamañoBloque + tamañoBloque / 2,
                        tamañoBloque / 4,
                        colorBolas
                    );
                }
            };
        };
    };