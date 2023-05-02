
/*
fetch('../assets/data.json')
.then(response => {
   return response.json();
})
.then(jsondata => console.log(jsondata));
*/

//console.log(squads);


const btnVerCamara = document.querySelector('#btnVerCamara');
btnVerCamara.addEventListener('click', verCamara);

const btnVerCronometro = document.querySelector('#btnVerCronometro');
btnVerCronometro.addEventListener('click', verCronometro);

const btnAgregar = document.querySelector('#btnAgregar');
btnAgregar.addEventListener('click', agregar);

const btnGirar = document.querySelector('#btnGirar');
btnGirar.addEventListener('click', girar);

const btnPlayTimer = document.querySelector('#btnPlayTimer');
btnPlayTimer.addEventListener('click', playtimer);

const btnStopTimer = document.querySelector('#btnStopTimer');
btnStopTimer.addEventListener('click', stoptimer);

const btnAddPersona = document.querySelector('#btnAddPersona');
btnAddPersona.addEventListener('click', mostarAgregar);

const btnChangeBg = document.querySelector('#btnChangeBg');
btnChangeBg.addEventListener('click', changeBg);

const btnIniciar = document.querySelector('#btnIniciar');
btnIniciar.addEventListener('click', iniciar);

const btnFinalizar = document.querySelector('#btnFinalizar');
btnFinalizar.addEventListener('click', finalizar);

const pnlvideo = document.querySelector('#video');
//pnlvideo.addEventListener('click', takePhoto);

let clockBtn = document.getElementById("clock-btn");
clockBtn.addEventListener('click', turnOnOffTv);

var myInputExaminar = myForm.myInput;
myInputExaminar.addEventListener('change', onChangeExaminar);


var contador = 0;
var nombres = [];
var tiempos = [];
var nombresOriginal = [];
var giros = 0;
var selNombres = [];
var timerInerval;
var arrayTrovadores = [];
/*
const wrapper = document.querySelector(".wrapper"),
    header = wrapper.querySelector("header");

function onDrag({movementX, movementY}){
  let getStyle = window.getComputedStyle(wrapper);
  let leftVal = parseInt(getStyle.left);
  let topVal = parseInt(getStyle.top);
  wrapper.style.left = `${leftVal + movementX}px`;
  wrapper.style.top = `${topVal + movementY}px`;
}

header.addEventListener("mousedown", ()=>{
  header.classList.add("active");
  header.addEventListener("mousemove", onDrag);
});

document.addEventListener("mouseup", ()=>{
  header.classList.remove("active");
  header.removeEventListener("mousemove", onDrag);
});
*/
function onChangeExaminar() {
    const file = this.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            //$("#imgPreview").attr("src", event.target.result);
            document.body.style.backgroundImage = 'url(' + event.target.result + ')';
            myInputExaminar.value = "";
            document.getElementById("panelChangeBg").style.display = 'none';
        }

            ;
        reader.readAsDataURL(file);
    }
}

;
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function searchSquad() {
    document.getElementById("panelDropdown").style.display = '';
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("lblSquad").style.display = 'none';
    document.getElementById("btnIniciar").style.display = 'none';
    var myDropdown = document.getElementById("myDropdown");
    myDropdown.style.marginLeft = (window.innerWidth / 2) - 170 + "px";
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInputdropdown");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        }

        else {
            a[i].style.display = "none";
        }

    }
}



function loadPage() {
    $("#scrumBoard").draggable({ handle: "header" });
    $("#tvBoard").draggable({ handle: "header" });
    $("#panelSorteo").draggable({ handle: "header" });

    $("#divCounter").draggable();
    $("#panelMenu").draggable();
    $('.select2').select2({ width: '300px' });
    $(".files-tree").resizable();
    $(".tvBoard").resizable();
    $(".panelSorteo").resizable();
    $(".scrum-board").resizable() //disable page back history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function (event) {
        history.pushState(null, document.title, location.href);
    });
    // //var panelCalendario = document.getElementById("panelCalendario");
    //panelCalendario.style.marginLeft = (window.innerWidth - 300)+"px";
    for (x of squads.equipos) {
        //console.log(x.nombre);
        var data =

        {
            id: x.nombre, text: x.nombre
        }

            ;

        var newOption = new Option(data.text, data.id, false, false);
        $('#mySelect2').append(newOption).trigger('change');
    }
}

$('#mySelect2').on('select2:select', function (e) {
    var data = e.params.data;
    //(data);
    //console.log($("#mySelect2").val())

    btnIniciar.style.display = '';
    var lblSquad = document.getElementById('lblSquad');
    lblSquad.addEventListener('click', searchSquad);

    lblSquad.style.display = '';
    lblSquad.innerHTML = $("#mySelect2").val();


    document.getElementById("panelDropdown").style.display = 'none';
    $("#mySelect2").val("-Seleccionar-");

});

function obtenerDimensionesScreen() {
    // Get the size of the device screen var screenWidth = screen.width;
    var screenHeight = screen.height;
    // Get the browser window size var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    // Showing the sizes on the webpage console.log("Device Screen: width: " + screenWidth + ", height: " + screenHeight + ".") console.log("Browser Window: width: " + windowWidth + ", height: " + windowHeight + ".")
}


function changeBg() {
    //examinar y setear var panelChangeBg = document.getElementById("panelChangeBg");
    panelChangeBg.style.display = panelChangeBg.style.display === 'none' ? '' : 'none';
}

function verCamara() {
    var tvBoard = document.getElementById("tvBoard");
    tvBoard.style.display = tvBoard.style.display === 'none' ? '' : 'none';
}


function verCronometro() {
    var divCounter = document.getElementById("divCounter");
    divCounter.style.display = divCounter.style.display === 'none' ? '' : 'none';
}

function turnOnOffTv() {
    if (clockBtn.classList.contains("active")) {
        // Stop timer clearInterval(timerInterval);
        clockBtn.classList.remove("active");
        clockBtn.innerHTML = "";
        clockBtn.style.backgroundColor = "";
        //timerDisplay.innerHTML = formatTime(elapsedTime);
        //takePhoto();
        stopCapture();
    }

    else {
        // Start timer startTime = Date.now();
        timerInterval = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            //timerDisplay.innerHTML = formatTime(elapsedTime);
        }, 10);
        clockBtn.classList.add("active");
        clockBtn.innerHTML = "";
        clockBtn.style.backgroundColor = "red";
        startCapture();
    }

}

function showVideo() {
    var imgElem = document.getElementById("imagen");
    imgElem.style.display = 'none';
    var vidElem = document.getElementById("video");
    vidElem.style.display = '';
}

function takePhoto() {
    stopCapture();
}

function finalizar() {
    document.getElementById("divAgregar").style.display = "none";
    document.getElementById("btnAddPersona").style.display = "none";
    document.getElementById("btnVerCronometro").style.display = "none";
    document.getElementById("btnFinalizar").style.display = "none";
    document.getElementById("divCounter").style.display = "none";
    //console.log(tiempos);
    var result = [];
    for (var i = 0; i < tiempos.length; i++) {
        var timeSpeak = tiempos[i];
        if (timeSpeak != null) {
            if (timeSpeak.indexOf(":") != -1) {
                var timeSpeakSplit = timeSpeak.split(":");
                //console.log(timeSpeakSplit);
                var horas = parseFloat(0);
                var minutos = parseFloat(timeSpeakSplit[0]);
                var segundos = parseFloat(timeSpeakSplit[1]);
                var horas_Segundos = horas * 3600;
                var minutos_Segundos = minutos * 60;
                var segundos = segundos + minutos_Segundos + horas_Segundos;
                result.push(segundos);
            }

        }
    }

    if (result.length > 0) {
        var segundos = result.reduce((a, b) => a + b, 0);
        var hours = Math.floor(segundos / 3600);
        var minutes = Math.floor((segundos % 3600) / 60);
        var seconds = segundos % 60;
        //Anteponiendo un 0 a los minutos si son menos de 10 minutes = minutes < 10 ? '0' + minutes : minutes;
        //Anteponiendo un 0 a los segundos si son menos de 10 seconds = seconds < 10 ? '0' + seconds : seconds;
        result = minutes + ":" + seconds;
        // 2:41:30 //console.log(result);
        var lblTiempoFinal = document.getElementById("lblTiempoFinal");
        lblTiempoFinal.style.display = '';
        lblTiempoFinal.innerHTML = "El tiempo total fue de " + result;
    }

}

function iniciar() {
    var lblSquad = document.getElementById('lblSquad');
    var valor = lblSquad.innerHTML;
    var mysquads = [];
    for (var i = 0; i < squads.equipos.length; i++) {
        if (valor == squads.equipos[i].nombre) {
            mysquads = squads.equipos[i].miembros;
            break;
        }

    }

    if (mysquads.length == 0) {
        document.getElementById("textoModal").innerHTML = "Mensaje";
        document.getElementById("lblGanador").innerHTML = "Debe seleccionar un team para iniciar!";
        document.getElementById("modalContent").style.backgroundImage = "";
        $('#exampleModal').modal('show');
        // abrir return;
    }


    for (x of mysquads) {
        //console.log(x.nombre);
        arrayTrovadores.push(x.nombre);
    }

    for (var i = 0; i < arrayTrovadores.length; i++) {
        addPersona(arrayTrovadores[i]);
    }

    btnIniciar.style.display = 'none';
    lblSquad.removeAttribute("onclick");
    lblSquad.style.pointerEvents = 'none'; //to disable click

    // To re-enable:
    //document.getElementById('id').style.pointerEvents = 'auto';

    var panelSorteo = document.getElementById("panelSorteo");
    //panelSorteo.style.marginLeft = "230px";


    //array tiempos
    tiempos.length = arrayTrovadores.length;

    showVideo();
}

function changeColor() {
    for (var i = 0; i < nombresOriginal.length; i++) {
        var objNombre = document.getElementById("item_" + i);
        if (objNombre != null)
            objNombre.style.borderColor = generarNuevoColor();

        //let rand = Math.random() * 7200;
        //calcularGiroRuleta(rand);
    }

}

function stoptimer() {
    var yourUlbtnStopTimer = document.getElementById("btnStopTimer");
    yourUlbtnStopTimer.style.display = yourUlbtnStopTimer.style.display === 'none' ? '' : 'none';
    var yourUlbtnPlayTimer = document.getElementById("btnPlayTimer");
    yourUlbtnPlayTimer.style.display = yourUlbtnPlayTimer.style.display === 'none' ? '' : 'none';
    document.getElementById("btnGirar").disabled = false;
    document.getElementById("btnFinalizar").disabled = false;
    clearInterval(timerInerval);
    var lastIndexElement = selNombres.length - 1;
    var parrafoId = "p_" + lastIndexElement;
    var objParrafo = document.getElementById(parrafoId);
    if (objParrafo != null) {
        var timerValue = document.getElementById("playtimer").innerHTML;
        var textoOriginal = objParrafo.innerHTML;
        objParrafo.innerHTML = textoOriginal;
        var tiempoParticipanteId = "TiempoParticipante_" + lastIndexElement;
        document.getElementById(tiempoParticipanteId).innerHTML = timerValue;
        //console.log(lastIndexElement)
        tiempos[lastIndexElement] = timerValue;
        //console.log(tiempos)
        var board = document.getElementById("field_wrapper_clock");
        var color = board.style.borderColor;
        //console.log(color);
        var tiempoBtnParticipanteId = "time-btn_" + lastIndexElement;
        var timeBtnObj = document.getElementById(tiempoBtnParticipanteId)
        var rgbArr = color.substring(4, color.length - 1).replace(/ /g, '').split(',');
        //console.log(rgbArr);
        timeBtnObj.style.backgroundColor = rgb(rgbArr[0], rgbArr[1], rgbArr[2]);
        board.style.boxShadow = "";
        //box-shadow: 0 0 100px #03f;
        board.style.borderColor = "#FFFFFF";
    }

    document.getElementById("playtimer").innerHTML = "00:00";
}

function rgb(r, g, b) {
    return ["rgb(", r, ",", g, ",", b, ")"].join("");
}

function mostarAgregar() {
    var divAgregar = document.getElementById("divAgregar");
    divAgregar.style.display = divAgregar.style.display === 'none' ? '' : 'none';
    var text = document.querySelector('#txtName');
    text.focus();
}

function pulsar(event) {
    //console.log(event.keyCode);
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        agregar();
    }

    if (event.code === 'Escape' || event.keyCode === 27) {
        var divAgregar = document.getElementById("divAgregar");
        divAgregar.style.display = 'none';
    }

}


function agregar() {
    var text = document.querySelector('#txtName');
    if (text.value != '') {
        var exist = nombresOriginal.indexOf(text.value);
        //console.log(exist);
        if (exist != -1) {
            if (nombres.length > 0) {
                document.getElementById("textoModal").innerHTML = "El nombre ya fue ingresado!";
                document.getElementById("lblGanador").innerHTML = text.value;
                document.getElementById("modalContent").style.backgroundImage = "";
                $('#exampleModal').modal('show');
                // abrir return;
            }

            else {
                nombresOriginal = [];
                contador = 0;
                selNombres = [];
                var yourUlbtnGirar = document.getElementById("btnGirar");
                yourUlbtnGirar.style.display = 'none';
            }

        }

        addPersona(text.value);

        text.value = "";
        text.focus();
    }
}

function addPersona(value) {
    var yourUlbtnIniciar = document.getElementById("btnIniciar");
    yourUlbtnIniciar.style.display = 'none';
    var yourUlbtnFinalizar = document.getElementById("btnFinalizar");
    yourUlbtnFinalizar.style.display = 'none';
    var yourUlbtnGirar = document.getElementById("btnGirar");
    yourUlbtnGirar.style.display = '';
    var panelSorteo = document.getElementById("panelSorteo");
    panelSorteo.style.display = '';
    var btnVerCronometro = document.getElementById("btnVerCronometro");
    btnVerCronometro.style.display = '';
    var btnVerCamara = document.getElementById("btnVerCamara");
    btnVerCamara.style.display = '';
    var div = document.createElement('div');
    div.id = "item_" + contador;
    div.innerHTML = value;
    div.className = 'flexbox pad col-4 col-sm-4';
    div.style.borderColor = generarNuevoColor();
    const container = document.querySelector('#container');
    container.append(div);
    nombres.push(value);
    nombresOriginal.push(value);
    contador++;
    var numeroParticipantes = document.getElementById("numeroParticipantes");
    numeroParticipantes.innerHTML = nombres.length;
    var textoParticipantes = document.getElementById("textoParticipantes");
    if (numeroParticipantes.innerHTML == 1) textoParticipantes.innerHTML = "participante";
    else textoParticipantes.innerHTML = "participantes";
    document.getElementById("panelDropdown").style.display = 'none';
    lblSquad.style.pointerEvents = 'none';
    //to disable click
}

function girar() {
    var board = document.getElementById("field_wrapper_clock");
    board.style.borderColor = "#FFFFFF";
    var yourUlbtnGirar = document.getElementById("btnGirar");
    yourUlbtnGirar.disabled = true;
    var yourUlbtnPlayTimer = document.getElementById("btnPlayTimer");
    yourUlbtnPlayTimer.disabled = true;
    //yourUlbtnGirar.style.display = 'none';
    //var sonido = document.querySelector('#audio');
    //sonido.setAttribute('src', 'sonido/ruleta.mp3');
    //var divCounter= document.getElementById("divCounter");
    //divCounter.style.display = 'none';
    var timer = document.getElementById("timer");
    //timer.style.display = '';
    //const spinnerQuerySelector = document.querySelector('#spinner');
    //var src="assets/images/"+randImg+".gif";
    //spinnerQuerySelector.setAttribute('src', src);
    var minute = 0;
    var sec = 3;
    //document.getElementById("timer").innerHTML = sec;
    identificadorDeTemporizador = setInterval(function () {
        changeColor();

        timer.innerHTML = sec;
        timer.style.display = '';

        sec--;

        if (sec == -1) {
            //alert("termino el tiempo");
            ejecutaGiro();
            clearInterval(identificadorDeTemporizador);
            timer.style.display = "none";

            //divCounter.style.display = "";  //se apaga cuando sortea solo se prende con el boton cronometro

            yourUlbtnGirar.style.display = '';
        }
    }, 1000);
}

function ejecutaGiro() {
    if (nombres.length > 0) {
        giros++;
        var objSelect;
        var randText = nombres[Math.floor(Math.random() * nombres.length)];
        var rand = nombresOriginal.indexOf(randText);
        //console.log("Nombre "+randText);
        //console.log("Indice en array original "+rand);
        //console.log(nombresOriginal);
        objSelect = document.querySelector('#item_' + rand);
        nombres = nombres.filter((item) => item !== randText);
        if (objSelect !== null) {
            objSelect.style.backgroundColor = 'orange';
            selNombres.push(randText);
            //console.log(selNombres);
            setTimeout(() => {
                objSelect.remove();
                //objSelect.innerHTML = "";

                var indexNombre = selNombres.indexOf(randText);
                //var mybtn = " <div type='button' class='btn btn-info' id='btnPlay_"+indexNombre+"'><i class='bi bi-play-fill'></i>go</div>";

                var parrafo = document.createElement('p');
                parrafo.id = "p_" + indexNombre;
                //parrafo.innerHTML = (indexNombre+1)+". "+randText + " <span id='TiempoParticipante_"+indexNombre+"'></span>";
                parrafo.innerHTML = "&nbsp&nbsp&nbsp&nbsp" + (indexNombre + 1) + ". &nbsp" + randText + "&nbsp&nbsp&nbsp&nbsp<span id='TiempoParticipante_" + indexNombre + "'></span>&nbsp&nbsp&nbsp&nbsp<button class='time-btn btn' id='time-btn_" + indexNombre + "'></button>";
                parrafo.className = 'parrafos';

                const selection = document.querySelector('#seleccion');
                selection.append(parrafo);


                //var divCounter= document.getElementById("divCounter"); 
                //divCounter.style.display = '';

                document.getElementById("btnGirar").disabled = false;
                document.getElementById("btnPlayTimer").disabled = false;


                //var exampleModal = document.getElementById("exampleModal");

                document.getElementById("textoModal").innerHTML = "Tenemos un ganador!"
                document.getElementById("lblGanador").innerHTML = randText;
                document.getElementById("modalContent").style.backgroundImage = "url(../images/confetti-large.gif)"
                $('#exampleModal').modal('show'); // abrir

                //
                var numeroParticipantes = document.getElementById("numeroParticipantes");
                numeroParticipantes.innerHTML = arrayTrovadores.length - selNombres.length;
                //

                var scrumBoard = document.getElementById("scrumBoard");
                //scrumBoard.style.display = '';

                //var tvTop = tvBoard.style.top.replace("px",'');
                //console.log(tvTop);
                //tvBoard.style.top = (tvTop - 38) + 'px';

                var tvBoard = document.getElementById("tvBoard");


                if (scrumBoard.style.display == 'none') {

                    if (tvBoard.style.display == '') {
                        //console.log(tvBoard);
                        scrumBoard.style.marginLeft = '1050px';
                    }
                    else {
                        scrumBoard.style.marginLeft = (window.innerWidth / 2) - 190 + "px";

                    }
                }

                scrumBoard.style.display = '';


                var numeroParticipantes = document.getElementById("numeroParticipantes");
                numeroParticipantes.innerHTML = nombres.length;

                var textoParticipantes = document.getElementById("textoParticipantes");
                if (numeroParticipantes.innerHTML == 1)
                    textoParticipantes.innerHTML = "participante";
                else
                    textoParticipantes.innerHTML = "participantes";


                //console.log(nombres.length);
                if (nombres.length == 0) {
                    var yourUlbtnGirar = document.getElementById("btnGirar");
                    yourUlbtnGirar.style.display = 'none';
                    var yourUlbtnFinalizar = document.getElementById("btnFinalizar");
                    yourUlbtnFinalizar.style.display = '';
                    var panelSorteo = document.getElementById("panelSorteo");
                    panelSorteo.style.display = 'none';

                }

            }, 1000);
            //confirmAction(objSelect);
        }

    }
}

function playtimer() {
    var lastIndexElement = selNombres.length - 1;
    var parrafoId = "p_" + lastIndexElement;
    var objParrafo = document.getElementById(parrafoId);
    var board = document.getElementById("field_wrapper_clock");
    var yourUlbtnStopTimer = document.getElementById("btnStopTimer");
    yourUlbtnStopTimer.style.display = yourUlbtnStopTimer.style.display === 'none' ? '' : 'none';
    var yourUlbtnPlayTimer = document.getElementById("btnPlayTimer");
    yourUlbtnPlayTimer.style.display = yourUlbtnPlayTimer.style.display === 'none' ? '' : 'none';
    document.getElementById("btnGirar").disabled = true;
    document.getElementById("btnFinalizar").disabled = true;
    var minute = 0;
    //cero min por default
    var sec = 0;
    board.style.borderColor = '#FFFFFF';
    board.style.boxShadow = "0 0 100px #FFFFFF";
    timerInerval = setInterval(function () {
        document.getElementById("playtimer").innerHTML = minute.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0');
        sec++;

        if (sec <= 5 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#E0FFFF';
            board.style.boxShadow = "0 0 100px #E0FFFF";
        }
        if (sec > 5 && sec <= 10 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#81D4FA';
            board.style.boxShadow = "0 0 100px #81D4FA";
        }
        if (sec > 10 && sec <= 15 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#80DEEA';
            board.style.boxShadow = "0 0 100px #80DEEA";
        }
        if (sec > 15 && sec <= 20 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#80CBC4';
            board.style.boxShadow = "0 0 100px #80CBC4";
        }
        if (sec > 20 && sec <= 25 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#A5D6A7';
            board.style.boxShadow = "0 0 100px #A5D6A7";
        }
        if (sec > 25 && sec <= 30 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#C5E1A5';
            board.style.boxShadow = "0 0 100px #C5E1A5";
        }
        if (sec > 30 && sec <= 35 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#E6EE9C';
            board.style.boxShadow = "0 0 100px #E6EE9C";
        }
        if (sec > 35 && sec <= 40 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#FFF59D';
            board.style.boxShadow = "0 0 100px #FFF59D";
        }
        if (sec > 40 && sec <= 45 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#FFE082';
            board.style.boxShadow = "0 0 100px #FFE082";
        }
        if (sec > 45 && sec <= 50 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#FFCC80';
            board.style.boxShadow = "0 0 100px #FFCC80";
        }
        if (sec > 50 && sec <= 55 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#FFAB91';
            board.style.boxShadow = "0 0 100px #FFAB91";
        }
        if (sec > 55 && sec <= 60 && minute == 0) {
            if (objParrafo != null)
                board.style.borderColor = '#F44336';
            board.style.boxShadow = "0 0 100px #F44336";
        }
        if (sec <= 15 && minute == 1) {
            if (objParrafo != null)
                board.style.borderColor = '#FF0000';
            board.style.boxShadow = "0 0 100px #FF0000";
        }
        if (sec > 15 && sec <= 25 && minute == 1) {
            if (objParrafo != null)
                board.style.borderColor = '#8B0000';
            board.style.boxShadow = "0 0 100px #8B0000";
        }
        if (sec > 25 && sec <= 35 && minute == 1) {
            if (objParrafo != null)
                board.style.borderColor = '#4B0082';
            board.style.boxShadow = "0 0 100px #4B0082";
        }
        if (sec > 35 && sec <= 45 && minute == 1) {
            if (objParrafo != null)
                board.style.borderColor = '#00008B';
            board.style.boxShadow = "0 0 100px #00008B";
        }
        if (sec > 45 && minute == 1) {
            if (objParrafo != null)
                board.style.borderColor = '#191970';
            board.style.boxShadow = "0 0 100px #191970";
        }

        if (minute >= 2) {
            if (objParrafo != null)
                board.style.borderColor = '#000000';
            board.style.boxShadow = "0 0 100px #000000";
        }

        //var colorHexa = rgbToHex(color);
        //console.log(colorHexa);

        if (sec == 60) {
            minute++;
            sec = 0;

            if (minute == 60) {
                minute = 0; //cero min por default
            }
        }
    }, 1000);
}


function confirmAction(objSelect) {
    let confirmAction = confirm("Remove?");
    if (confirmAction) {
        //alert("Action successfully executed");
        objSelect.remove();
    }

    else {
        //alert("Action canceled");
    }

}


function generarNuevoColor() {
    var simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";
    for (var i = 0;
        i < 6;
        i++) {
        color = color + simbolos[Math.floor(Math.random() * 16)];
    }

    return color;
}


////////////////////////

var screenshotPage;
var generate;

function myScreenshot() {
    screenshotPage = screenshotPage;
    //console.log(screenshotPage);
    generate();
}

function urlsToAbsolute(nodeList) {
    if (!nodeList.length) {
        return [];
    }

    var attrName = 'href';
    if (nodeList[0].__proto__ === HTMLImageElement.prototype
        || nodeList[0].__proto__ === HTMLScriptElement.prototype) {
        attrName = 'src';
    }

    nodeList = [].map.call(nodeList, function (el, i) {
        var attr = el.getAttribute(attrName);
        if (!attr) {
            return;
        }
        var absURL = /^(https?|data):/i.test(attr);
        if (absURL) {
            return el;
        } else {
            return el;
        }
    });
    return nodeList;
}

function screenshotPage() {
    urlsToAbsolute(document.images);
    urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
    var screenshot = document.documentElement.cloneNode(true);
    var b = document.createElement('base');
    b.href = document.location.protocol + '//' + location.host;
    var head = screenshot.querySelector('head');
    head.insertBefore(b, head.firstChild);
    screenshot.style.pointerEvents = 'none';
    screenshot.style.overflow = 'hidden';
    screenshot.style.webkitUserSelect = 'none';
    screenshot.style.mozUserSelect = 'none';
    screenshot.style.msUserSelect = 'none';
    screenshot.style.oUserSelect = 'none';
    screenshot.style.userSelect = 'none';
    screenshot.dataset.scrollX = window.scrollX;
    screenshot.dataset.scrollY = window.scrollY;
    var script = document.createElement('script');
    script.textContent = '(' + addOnPageLoad_.toString() + ')();';
    screenshot.querySelector('video').appendChild(script);
    var blob = new Blob([screenshot.outerHTML], {
        type: 'text/html'
    });
    return blob;
}

function addOnPageLoad_() {
    window.addEventListener('DOMContentLoaded', function (e) {
        var scrollX = document.documentElement.dataset.scrollX || 0;
        var scrollY = document.documentElement.dataset.scrollY || 0;
        window.scrollTo(scrollX, scrollY);
    });
}

function generate() {
    //console.log("antesdeGenerate");
    window.URL = window.URL || window.webkitURL;
    //console.log(window.URL);
    window.open(window.URL.createObjectURL(screenshotPage()));
}

///////////////////////


const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
var imgElem = document.getElementById("imagen");

async function startCapture(displayMediaOptions) {
    let captureStream = null;
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    }

    catch (err) {
        console.error(`Error: ${err}`);
    }

    return captureStream;
}

async function startCapture() {
    try {
        videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        dumpOptionsInfo();
        var tvBoard = document.getElementById("tvBoard");
        //tvBoard.style.left = 0;
    }

    catch (err) {
        console.error(`Error: ${err}`);
    }

}

function dumpOptionsInfo() {
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];
    //console.info("Track settings:");
    //console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    //console.info("Track constraints:");
    //console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

function stopCapture(evt) {
    //MFG var video = document.querySelector("video");
    let canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let image = canvas.toDataURL('image/jpeg');
    //console.log(image);
    imgElem.src = image //videoElem.style.display ='none';
    //imgElem.style.display = imgElem.style.display === 'none';
    /// stop video if (videoElem.srcObject != null)

    {
        let tracks = videoElem.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoElem.srcObject = null;
    }

    var tvBoard = document.getElementById("tvBoard");
    //tvBoard.style.left = 0;
}

// Options for getDisplayMedia()

const displayMediaOptions = {
    video:

    {
        displaySurface: "window",
    }

    ,
    audio: false,
}

    ;


///////

function _timer(callback) {
    var time = 0;     //  The default time of the timer
    var mode = 1;     //    Mode: count up or count down
    var status = 0;    //    Status: timer is running or stoped
    var timer_id;    //    This is used by setInterval function

    // this will start the timer ex. start the timer with 1 second interval timer.start(1000) 
    this.start = function (interval) {
        interval = (typeof (interval) !== 'undefined') ? interval : 1000;

        if (status == 0) {
            status = 1;
            timer_id = setInterval(function () {
                switch (mode) {
                    default:
                        if (time) {
                            time--;
                            generateTime();
                            if (typeof (callback) === 'function') callback(time);
                        }
                        break;

                    case 1:
                        if (time < 86400) {
                            time++;
                            generateTime();
                            if (typeof (callback) === 'function') callback(time);
                        }
                        break;
                }
            }, interval);
        }
    }

    //  Same as the name, this will stop or pause the timer ex. timer.stop()
    this.stop = function () {
        if (status == 1) {
            status = 0;
            clearInterval(timer_id);
        }
    }

    // Reset the timer to zero or reset it to your own custom time ex. reset to zero second timer.reset(0)
    this.reset = function (sec) {
        sec = (typeof (sec) !== 'undefined') ? sec : 0;
        time = sec;
        generateTime(time);
    }

    // Change the mode of the timer, count-up (1) or countdown (0)
    this.mode = function (tmode) {
        mode = tmode;
    }

    // This methode return the current value of the timer
    this.getTime = function () {
        return time;
    }

    // This methode return the current mode of the timer count-up (1) or countdown (0)
    this.getMode = function () {
        return mode;
    }

    // This methode return the status of the timer running (1) or stoped (1)
    this.getStatus
    {
        return status;
    }

    // This methode will render the time variable to hour:minute:second format
    function generateTime() {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;
        var hour = Math.floor(time / 3600) % 60;

        second = (second < 10) ? '0' + second : second;
        minute = (minute < 10) ? '0' + minute : minute;
        hour = (hour < 10) ? '0' + hour : hour;

        $('div.timer span.second').html(second);
        $('div.timer span.minute').html(minute);
        $('div.timer span.hour').html(hour);
    }
}

/////////////////


function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ? Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function rgbToHexOld(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ((result = rgbRegex.exec(rgb))) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);
        hex = "0x" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    return hex;
}


function valueToHex(c) {
    var hex = c.toString(16);
    return hex
}

function rgbToHex(rbg) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ((result = rgbRegex.exec(rgb))) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);
        //hex = "0x" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    return (valueToHex(r) + valueToHex(g) + valueToHex(b));
}

