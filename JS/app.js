let listaPalabras = []
let palabra = ""
let barras = []
let LetrasUsadas = []
let fallos = 0
let aciertos = 0
let hangman = `\"../img/Hangman-${fallos}.png\"` //cambiar imagen
let comenzado = false

function leerListaPalabras(){
    fetch("../data/words.json")
        .then(resp => resp.json())
        .then(respJSON => {
            listaPalabras = respJSON.words
            palabra = cogePalabraAleatoria(listaPalabras)
            separarPalabra(palabra)
        })
        .catch(error => console.log(error))
    }

function cogePalabraAleatoria(listaPalabras){
    let palabraAleatoriaIndice = Math.floor(Math.random() * listaPalabras.length)
    return listaPalabras[palabraAleatoriaIndice].item
    }

function separarPalabra(palabra){

    for(let i = 0; i < palabra.length; i++){
        if (i != palabra.length){
            barras.push('_')
        }
    }
    document.getElementById("p1").innerText = barras.join('') //join para mostrarlo sin
}


function comprobarInput(e){
    e.preventDefault()
    let letraAcertada = false
    
    //Coge el valor del input, lo vuelve mayúscula
    const letra = document.getElementById("letra").value.toUpperCase()

    //Si el valor se utilizó ya, omitir
    if (LetrasUsadas.includes(letra)) {
        document.getElementById("letra").value = ""
        document.getElementById("letra").focus()
        return}

    //Si se introduce un numero, no hace falta que se compruebe o que pierda vidas// no necesario si se comprueba letras solo

    else if (letra.match(/[a-zA-Z\u00d1]/)){
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] == letra){
                barras[i] = letra     //Si una letra coincide se actualiza la variable de barras
                letraAcertada = true
                aciertos++
            }
        }
        
    }
    else {
        document.getElementById("letra").value = ""
        document.getElementById("letra").focus()
        return
    }
    //Perder vida si se falló
        if (comenzado == false) {
        document.getElementById("letrasusadas").style.visibility = "visible"; // Mostrar el contenedor
        comenzado = true;
    }
    if (letraAcertada == false) {
        fallos++

        document.getElementById("imagen").src = `../img/Hangman-${fallos}.png`
        if (fallos == 8) { //Si llega a 8 se pierde.
            document.getElementById("fin").innerText = "... que tengo Colgado"
            document.getElementById("fin").style.color = "red"
            document.getElementById("entrada").style.display = "none"
        }
    }

    //Añadir letra a las letras comprobadas
    if (!LetrasUsadas.includes(letra)){
        LetrasUsadas.push(letra)
        }
    document.getElementById("p1").innerText = barras.join('')

    //Ganar
    if (aciertos == palabra.length) {
        document.getElementById("fin").innerText = "... a quien has Ayudado"
        document.getElementById("fin").style.color = "green"
        document.getElementById("entrada").style.display = "none"
    }
    document.getElementById("listaletras").innerText = LetrasUsadas.join(", ")
    document.getElementById("letra").value = ""
    document.getElementById("letra").focus()


}


leerListaPalabras()
document.getElementById("letra").focus()

