
let letra = prompt("Elige una letra(Poner varias letras de una o caracteres que no sean estas cuentan como intento fallido)")
let i = 0
let intentos = 0
let acierto = false

function ComprobarLetra(){
    for (i = 0, i < palabra.length; i++;) {
        if (letra === palabra[i]) {
            guiones[i] = letra;
            acierto = true;
        }
    }

    if (acierto === false) {
        intentos = intentos + 1;
        imagen = cambiarImagen()
    }
}

function cambiarImagen(){
    const imgHangman = document.getElementById("imgHangman")
    const mensajeAbogado = document.getElementById("mensajeAbogado")
    //<h3 id="mensajeAbogado">Texto inyectado</h3>
    //<input type="text" value="hola">    
    
    if(imgHangman.src.includes("imgHangman8")){
        imgHangman.src = "img/hangman8.jpeg"
        mensajeAbogado.innerText = "...que tengo aquí colgado"
        mensajeAbogado.style.color = "red"
    }else{
        mensajeAbogado.innerText = "...a quien has ayudado"
        mensajeAbogado.style.color = "green"
    }
}
