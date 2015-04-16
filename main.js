/*
This file is part of Noppi.

Noppi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Noppi is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Noppi.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
notipra
nopra

nopi - note practice for instruments

Noppi - note & pitch practice for instruments

Kram - Know ? and musicschors ????

note and instrument practice 

chords
note 
music
score
sheet 
pitch
bar
clef
key

instrument

practise
learn
train
*/

/*
function Note(ke, lev, minMaj){
  this.key = ke || 'A';
  this.level = lev || 0;
  this.minorMajor = minMaj || 0;

  
  this.isSameAs = function(note){
    console.log(note.key + ",  " +this.key);
    
    return this.key == note.key && this.level == note.level && this.minorMajor == note.minorMajor;
  };
  

}
*/

var gCorrectAnswerPos;
var gCurrentClef = 'g'; //g (normal) or f (bas)
var gaNote = [
  '0A', '0B', '0C', '0D', '0E', '0F', '0G',
  '1A', '1B', '1C', '1D', '1E', '1F', '1G',
  '2A', '2B', '2C', '2D', '2E', '2F', '2G'
];
var gaTrombone = [
  '2', '-', '-', '-', '7', '6', '4',
  '2', '7', '6', '4', '2', '1', '4',
  '2', '4', '3', '1', '2', '1', '2'
];



function setGClef(){
  var svg = document.getElementById("sheet");
  var svgDoc = svg.contentDocument;

  svg.style.height = "330px";
  svg.style.marginTop= "-80px";

  var gClef = svgDoc.getElementById("gClef");
  var fClef = svgDoc.getElementById("fClef");
  
  
  gClef.setAttribute('display', '');
  fClef.setAttribute('display', 'none');
  
  gCurrentClef = 'g';
  setNote(gaNote[gCorrectAnswerPos]);
}
function setFClef(){
  var svg = document.getElementById("sheet");
  var svgDoc = svg.contentDocument;

  svg.style.height = "280px";
  svg.style.marginTop= "-30px";

  var gClef = svgDoc.getElementById("gClef");
  var fClef = svgDoc.getElementById("fClef");
  
  
  gClef.setAttribute('display', 'none');
  fClef.setAttribute('display', '');
  
  gCurrentClef = 'f';
  setNote(gaNote[gCorrectAnswerPos]);
}

function checkAnswer(answer){
  // checking if the trombone slider is correct:
  if( answer == gaTrombone[gCorrectAnswerPos] ){
    document.querySelector('#nrCorrect').innerHTML++;
    return randomNote();
  }

  // Saying the actual note: A, B, C osv...
  if( answer == gaNote[gCorrectAnswerPos].slice(-1) ){
    document.querySelector('#nrCorrect').innerHTML++;
    return randomNote();
  }
  document.querySelector('#nrError').innerHTML++;
}


function randomNote(){
  var randPos;
  var lowPos = parseInt(document.querySelector('#lowBoundSelect').value);
  var highPos = parseInt(document.querySelector('#highBoundSelect').value);
  do{
    randPos = lowPos + Math.floor(Math.random()* (highPos - lowPos) );
  } while(randPos == gCorrectAnswerPos );
  setNote(gaNote[randPos]);
}

function setNote(tone){
  tone = tone.toUpperCase();
  
  var tonePos = gaNote.indexOf(tone);
  if(tonePos == -1)
    return;
  
  var svg = document.getElementById("sheet");
  var svgDoc = svg.contentDocument;


  var noteLineUp = svgDoc.getElementById("noteLineUp");
  var noteLineDown = svgDoc.getElementById("noteLineDown");
  
  noteLineUp.setAttribute("display", 'none');
  noteLineDown.setAttribute("display", '');


  var note = svgDoc.getElementById("note");
  var threeOver = svgDoc.getElementById("threeOver");
  var twoOver = svgDoc.getElementById("twoOver");
  var oneOver = svgDoc.getElementById("oneOver");
  var oneUnder = svgDoc.getElementById("oneUnder");
  var twoUnder = svgDoc.getElementById("twoUnder");
 
  threeOver.setAttribute('display', 'none');
  twoOver.setAttribute('display', 'none');
  oneOver.setAttribute('display', 'none');
  oneUnder.setAttribute('display', 'none');
  twoUnder.setAttribute('display', 'none');

  var noteYValue = 0;
  /**/ if(tone == '0A') noteYValue = 70;
  else if(tone == '0B') noteYValue = 60;
  else if(tone == '0C') noteYValue = 50;
  else if(tone == '0D') noteYValue = 40;
  else if(tone == '0E') noteYValue = 30;
  else if(tone == '0F') noteYValue = 20;
  else if(tone == '0G') noteYValue = 10;
  else if(tone == '1A') noteYValue = 0;
  else if(tone == '1B') noteYValue = -10;
  else if(tone == '1C') noteYValue = -20;
  else if(tone == '1D') noteYValue = -30;
  else if(tone == '1E') noteYValue = -40;
  else if(tone == '1F') noteYValue = -50;
  else if(tone == '1G') noteYValue = -60;
  else if(tone == '2A') noteYValue = -70;
  else if(tone == '2B') noteYValue = -80;
  else if(tone == '2C') noteYValue = -90;
  else if(tone == '2D') noteYValue = -100;
  else if(tone == '2E') noteYValue = -110;
  else if(tone == '2F') noteYValue = -120;
  else if(tone == '2G') noteYValue = -130;
  
  if(gCurrentClef == 'g') noteYValue += 50;
  
  if(noteYValue > -25) {
    noteLineUp.setAttribute("display", '');
    noteLineDown.setAttribute("display", 'none');
  }else{
    noteLineUp.setAttribute("display", 'none');
    noteLineDown.setAttribute("display", '');
  }
  if(noteYValue <= -130)  threeOver.setAttribute('display', '');
  if(noteYValue <= -110)  twoOver.setAttribute('display', '');
  if(noteYValue <= -90)   oneOver.setAttribute('display', '');
  if(noteYValue >= 30)    oneUnder.setAttribute('display', '');
  if(noteYValue >= 50)    twoUnder.setAttribute('display', '');

  note.setAttribute("y", noteYValue);
  gCorrectAnswerPos = tonePos;
  
}


function keyboardKeydown(event){
  
if(event.keyCode>=48 && event.keyCode<=57) {
    // pressed a number
  var number = event.keyCode - 48;
  checkAnswer(number);
  return;
}
  
switch(event.keyCode){
  case 65: // A
    checkAnswer('A');
    break;
  case 66: // B
    checkAnswer('B');
    break;
  case 67: // C
    checkAnswer('C');
    break;
  case 68: // D
    checkAnswer('D');
    break;
  case 69: // E
    checkAnswer('E');
    break;
  case 70: // F
    checkAnswer('F');
    break;
  case 71: // G
    checkAnswer('G');
    break;
  default:
      //console.info("key " + event.keyCode);
      //nothing
  }// end switch
}

window.onload = function() {
  randomNote();
  setGClef();
  document.addEventListener('keydown', keyboardKeydown);
  document.getElementById('gClefButton').addEventListener('click', setGClef);
  document.getElementById('fClefButton').addEventListener('click', setFClef);
};


