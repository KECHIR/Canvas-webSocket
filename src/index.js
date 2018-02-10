import './index.css';
import nameGenerator from './name-generator';
import isDef from './is-def';
  
  

// Store/retrieve the name in/from a cookie.
const cookies = document.cookie.split(';');
console.log(cookies)
let wsname = cookies.find(function(c) {
  if (c.match(/wsname/) !== null) return true;
  return false;
});
if (isDef(wsname)) {
  wsname = wsname.split('=')[1];
} else {
  wsname = nameGenerator();
  document.cookie = "wsname=" + encodeURIComponent(wsname);
}
// Set the name in the header
document.querySelector('header>p').textContent = decodeURIComponent(wsname);

// Create a WebSocket connection to the server
const ws = new WebSocket("ws://" + window.location.host+ "/socket");

// We get notified once connected to the server
ws.onopen = (event) => {
  console.log("connecté");
};

// modifier 

window.onload = function()

{

    var canvas = document.getElementById('mon_canvas');

        if(!canvas)

        {

            alert("Impossible de récupérer le canvas");

            return;

        }


    var context = canvas.getContext('2d');

        if(!context)

        {
          
          
            alert("Impossible de récupérer le context du canvas");

            return;

        }



    
}  //tester si notre navigature supporte le canvas 





function draw() {
    contexte.beginPath();
    contexte.moveTo(prevX, prevY);
    contexte.lineTo(currX, currY);
    contexte.strokeStyle = linecolor;
    contexte.lineWidth = linewidth;
    contexte.stroke();
    contexte.closePath();
}
 var ishere=0;
function findxy(res, e) {
    if (res == 'down') {
   flag=true;
        contexte.beginPath();
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
 
         
        contexte.fillStyle = linecolor;
        contexte.fillRect(currX, currY, 2, 2);

        contexte.closePath();
        ishere=1;
sendMessage(e);

    }
    if (res == 'move') {
     
        if (flag) {
            ishere=2;
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
 draw();
 sendMessage(e);
 
        }
        
    }
   
    if (res == 'up' || res == "out") {
        flag = false;
    }
    ;
}
 





//  fin modification  
var canvas, contexte, flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0;

var linewidth = 4,
linecolor = "red";



const messages = document.querySelector('#messages');
let line;


canvas = document.getElementById('mon_canvas');
contexte = canvas.getContext("2d");

    
    
    canvas.addEventListener("mousemove", function (e) {findxy('move', e)}, false);
    canvas.addEventListener("mousedown", function (e) {findxy('down', e)}, false);
    canvas.addEventListener("mouseup", function (e) {findxy('up', e)}, false);
    canvas.addEventListener("mouseout", function (e) {findxy('out', e)}, false);

ws.onmessage = (event) => {
   

var cord=event.data;
   if (cord.split(';')[4]=='1'){
    contexte.fillStyle = linecolor;
    contexte.fillRect(cord.split(';')[0], cord.split(';')[1], 2, 2);

   }  else if (cord.split(';')[4]=='2') {
    contexte.beginPath();
    contexte.moveTo(cord.split(';')[2],cord.split(';')[3]);
    contexte.lineTo(cord.split(';')[0],cord.split(';')[1] );
    contexte.strokeStyle = linecolor;
    contexte.lineWidth = linewidth;
    contexte.stroke();
    contexte.closePath();

   }
//  line = document.createElement('li');
// line.textContent =event.data;
  // messages.appendChild(line);

  
};


// Retrieve the input element. Add listeners in order to send the content of the input when the "return" key is pressed.
function sendMessage(event) {
  event.preventDefault();
  event.stopPropagation();

   ws.send(currX+";"+currY+";"+prevX+";"+prevY+";"+ishere);
 // if (sendInput.value !== '') {
     //Send data through the WebSocket
//ws.send(sendInput.value);
  //  sendInput.value = '';
  //}
}















   //canvas.onmousemove = function (e){
    

    //ws.send("cx="+currX +"px="+prevX+"cy"+currY+"py="+prevY);
    //"x"+currX+""+prevY+"y"+currY );
   
  // };
    // console.log(contexte.getImageData(prevX,currX,prevY,currY));




/*
const sendForm = document.querySelector('form');
const sendInput = document.querySelector('form input');
sendForm.addEventListener('submit', sendMessage, true);
sendForm.addEventListener('blur', sendMessage, true);
//canvas.addEventListener("mousemove",sendMessage,true);
*/