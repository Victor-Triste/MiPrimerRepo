//song data matriz de objetos(canciones)
const songList = [
  {
    title: "Te Ves Buena (Zhen Ross Bootleg)",
    file: "TeVesBuena(ZhenRossBootleg).mp3",
    cover: "1.jpg",
  },
  {
    title: "9V & DVTTY - Shake Dem",
    file: "9V&DVTTY-ShakeDem.mp3",
    cover: "2.jpg",
  },
  {
    title: "Tono Rosario - Kulikitaka",
    file: "TonoRosario-Kulikitaka.mp3",
    cover: "3.png",
  },
];

//capturar elementos del DOM para trabajar con JS

let cancionActual = null;

//cargar canciones y mostrar el listado
const canciones = document.getElementById("canciones");
const audio = document.getElementById("audio");
const caratula = document.getElementById("caratula");
const titulo = document.getElementById("titulo");
const volumen = document.getElementById("volumen");
const play = document.getElementById("play");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const volume = document.getElementById("volume");
const barraProgeso = document.getElementById("barraProgreso");
const barraContainer = document.getElementById("barraContainer");

//escuchar click en el boton play
play.addEventListener("click", () => establecerPlayPause());
//escuchar click en el boton anterior
prev.addEventListener("click",()=> anteriorCancion());
//escuchar click en el boton siguiente
next.addEventListener("click",()=> siguienteCancion());

volume.addEventListener("click",()=> cambiarVolumen());
//Escuchar el elemento audio
audio.addEventListener("timeupdate", actualizarBarraProgreso);
//barra clickleable
barraContainer.addEventListener("click", setProgress);
//escuchar al audio al detectar que finalizó la canción
audio.addEventListener("ended", ()=> siguienteCancion());

// volumen.addEventListener("change",function(event){
//   console.log(event);
//   console.log(getVolumen());
//   //audio.volume = this.currentTarget.value;
// });

volumen.addEventListener("change",inicializarVolumen);





function cargarCanciones() {
  //crear li
  songList.forEach((song, index) => {
    //crear li
    const li = document.createElement("li");
    //crear a
    const link = document.createElement("a");


    //hidratar a
    link.textContent = song.title;

    link.href = "#";

    //escuchar clicks
    link.addEventListener("click", () => cargarCancionSeleccionada(index));
    //añadir a li
    li.appendChild(link);
    //añadir li a ul
    canciones.appendChild(li);


    
    

    //let inputVolumen = volumen / 100;
    


  });
  
}

//cargar cancion seleccionada
function cargarCancionSeleccionada(indexCancion) {
    //si el usuario presiona en la misma canción que se esta reproduciendo, no se debe hacer nada
  if (indexCancion !== cancionActual) {
    cambiarClaseActive(cancionActual, indexCancion);
    cancionActual = indexCancion;
    //Obtiene la canción seleccionada
    audio.src = "./audio/" + songList[indexCancion].file;
    audio.play();
    actualizarControles();
    mostrarCaratula(indexCancion);
    mostrarTitulo(indexCancion);
    
  }
}

// Muestra la caratula de la canción dependiendo de la canción reproducida
function mostrarCaratula(indexCancion) {
  caratula.src = "./img/" + songList[indexCancion].cover;
}

// Muestra el título de la canción dependiendo de la canción reproducida
function mostrarTitulo(indexCancion) {
  titulo.innerText = songList[indexCancion].title;
}

function cambiarClaseActive(lastIndex, newIndex){
    const links = document.querySelectorAll("a")
    if(lastIndex !== null){
        links[cancionActual].classList.remove("active");
    }
    links[newIndex].classList.add("active");
}


function inicializarVolumen(event) {
    console.log(event);
    //let inputVolumen = volumen.value / 100;
    //let inputVolumen = volumen / 100;
    //audio.volume = inputVolumen;
    audio.volume = this.value;
    

}

function actualizarControles(){
  if(audio.paused){
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  } else {
    
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  }
  
  /*play.addEventListener("click", () => {
    console.log("Se ha pausado la reproducción");
    audio.pause();
    
  });*/


}
function establecerPlayPause(){
  if(audio.paused){
    reproducirCancion();
  } else {
    pausarCancion();
  }
}

function reproducirCancion(){
  if(cancionActual !== null){
    audio.play();
    actualizarControles();
  } else {
    cargarCancionSeleccionada(0);
  }

}

function pausarCancion(){
  
  audio.pause();
  actualizarControles();
}

function anteriorCancion(){
  if(cancionActual > 0){
    console.log("entro");
    cargarCancionSeleccionada(cancionActual - 1);
  } else {
    cargarCancionSeleccionada(songList.length - 1);
  }
}

function siguienteCancion(){
  if(cancionActual <songList.length-1){
    cargarCancionSeleccionada(cancionActual + 1);
  } else {
    cargarCancionSeleccionada(0);
  }
}

//actualizar barra de progreso de la cancion
function actualizarBarraProgreso(event){
  const{duration, currentTime} = event.srcElement;
  const porcentaje = (currentTime/duration) * 100
  
  barraProgeso.style.width = porcentaje + "%";
}


//hacer la barra de progreso clickleable
function setProgress(event){
  const totalBarraProgreso =  this.offsetWidth;
  let progresoActual = event.offsetX;
  const porcentaje = (progresoActual / totalBarraProgreso) * audio.duration;

  audio.currentTime = porcentaje;

}

function getVolumen(){
  return volumen.value;
}

function cambiarVolumen(){
  
}




cargarCanciones();
