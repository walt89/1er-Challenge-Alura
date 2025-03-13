let listaDinamicaAmigos = [];
let listaDefinitiva = []; // esta lista la uso para exceptuar los primeros condicionales de la función sortearAmigo
let yaEmpezoElSorteo = false;
let fueronSorteados = [];
let habilitarAgregarAmigo = true;
let contador = 0;

function agregarAmigo(){
    if (habilitarAgregarAmigo === true){
    let inputAmigo = document.getElementById('amigo'); 
    let nombreAmigo = inputAmigo.value;
    /* si se da click a "enviar" y la caja está vacía, entonces mande un alert
    diciendo que ponga un nombre.*/
    if(nombreAmigo == false){
        alert("Debe ingresar un nombre.");
        inputAmigo.value = ""; 
        inputAmigo.focus(); 
        return;
    }

    if(nombreAmigo >=0 || nombreAmigo < 0){
        alert("Debe ingresar un nombre válido.");
        inputAmigo.value = ""; 
        inputAmigo.focus(); 
        return;
    }

    // Veamos si el nombre se repite:
    for (let indice = 0; indice < listaDinamicaAmigos.length; indice++){
            if (listaDinamicaAmigos[indice] === nombreAmigo){
                alert("No debe haber nombres repetidos.");
                inputAmigo.value = ""; 
                inputAmigo.focus(); 
                return;
            }
    }

    // Ahora agregamos ese nombre a la lista "listaDinamicaAmigos":
    listaDinamicaAmigos.push(nombreAmigo);
    // Hago la listaDefinitiva
    listaDefinitiva = [...listaDinamicaAmigos];
    // Vaciamos la cajita:
    inputAmigo.value = ""; 
    //Al agregar un nombre, el cursor se vuelve a ubicar en la cajita:
    inputAmigo.focus(); 
    amigosEnPantalla();
    }
    else {
        return;
    }
}

function amigosEnPantalla(){
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; /*lo que hace es que al agregar nombres a la lista no se
    muestren de manera repetida los nombres que componen la listaDinamicaAmigos*/
    for(let i = 0; i < listaDinamicaAmigos.length; i++){
        let item = document.createElement("li");
        item.textContent = listaDinamicaAmigos[i];
        listaAmigos.appendChild(item);
    }
} 

// Hago la listaDefinitiva
listaDefinitiva = [...listaDinamicaAmigos];

// Hagamos una función que sortee a los amigos:
function sortearAmigo(){
    yaEmpezoElSorteo = true;

    if (listaDinamicaAmigos.length === 0){
        alert("No hay amigos para sortear.");
        document.getElementById('amigo').focus(); 
        return;
    }
    
    if (listaDinamicaAmigos.length === 1){
        alert("Número de amigos insuficiente para comenzar el juego. Debe agregar al menos uno más");
        document.getElementById('amigo').focus(); 
        return;
    }

    if (yaEmpezoElSorteo && listaDinamicaAmigos.length >= 2 ){
        habilitarAgregarAmigo = false;
        document.getElementById("amigo").placeholder = "¡El juego ha comenzado! Ya no puedes agregar nombres";
        contador++;
    }

    let indiceAmigoAleatorio = Math.floor(Math.random()*listaDefinitiva.length);
    let amigoSorteado = listaDefinitiva[indiceAmigoAleatorio];
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `El amigo sorteado es: ${contador}) ${amigoSorteado}`;
    listaDefinitiva.splice(indiceAmigoAleatorio, 1);


    if (listaDefinitiva.length === 0){
        document.getElementById("amigo").placeholder = "¡El juego ha finalizado!";
        sortearAmigo = function(){};
        return;
    }

    return;
}