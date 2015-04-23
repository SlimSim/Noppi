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



function Trombone(){
  
}
Trombone.prototype.doesNoteAndPositionMatch = function(note, pos){
  var freq = note.frequency;
  switch(pos){
    case 1: if([22,29,34,38,41,46].indexOf(freq) !== -1) return true; break;
    case 2: if([21,28,33,37,40,45].indexOf(freq) !== -1) return true; break;
    case 3: if([20,27,32,36,39,44].indexOf(freq) !== -1) return true; break;
    case 4: if([19,26,31,35,38,43].indexOf(freq) !== -1) return true; break;
    case 5: if([18,25,30,34,37,42].indexOf(freq) !== -1) return true; break;
    case 6: if([17,24,29,33,36,41].indexOf(freq) !== -1) return true; break;
    case 7: if([16,23,28,32,35,40].indexOf(freq) !== -1) return true; break;
  }
  return false;
};


function Note(freq){

  if(Number.isInteger(freq))
    this.frequency = freq;
  else {
//    freq = freq.toUpperCase();
    /**/ if(freq == 'C') freq = 0;
    else if(freq == 'C#' || freq == 'Db') freq = 1;
    else if(freq == 'D') freq = 2;
    else if(freq == 'D#' || freq == 'Eb') freq = 3;
    else if(freq == 'E') freq = 4;
    else if(freq == 'F') freq = 5;
    else if(freq == 'F#' || freq == 'Gb') freq = 6;
    else if(freq == 'G') freq = 7;
    else if(freq == 'G#' || freq == 'Ab') freq = 8;
    else if(freq == 'A') freq = 9;
    else if(freq == 'A#' || freq == 'Bb') freq = 10;
    else if(freq == 'B') freq = 11;
    else return -1;
    freq += 24;
    this.frequency = freq;
  }
}
Note.prototype.getName = function(flat){
  flat = flat!==undefined?flat:false;
  var name = '';
  var reducedFrequency = this.frequency % 12;
  switch(reducedFrequency){
    case 0: name = ['C','C']; break;
    case 1: name = ['C#','Db']; break;
    case 2: name = ['D','D']; break;
    case 3: name = ['D#','Eb']; break;
    case 4: name = ['E','E']; break;
    case 5: name = ['F','F']; break;
    case 6: name = ['F#','Gb']; break;
    case 7: name = ['G','G']; break;
    case 8: name = ['G#','Ab']; break;
    case 9: name = ['A','A']; break;
    case 10: name = ['A#','Bb']; break;
    case 11: name = ['B','B']; break;
  }
  if(flat)
    return name[1];
  else
    return name[0];
};
Note.prototype.isNote = function(freq){
  if(Number.isInteger(freq))
    return this.frequency === freq;
//freq = freq.toUpperCase();
  console.log("freq    = " + freq);
  console.log("getName = " + this.getName(false) );
  console.log("getName = " + this.getName(true) );
  return this.getName(false) === freq || this.getName(true) === freq;
};
Note.prototype.isNoteName = function(name){
  
  return this.getName(false) === name || this.getName(true) === name;
};


//http://stackoverflow.com/questions/387707/what-techniques-can-be-used-to-define-a-class-in-javascript-and-what-are-their :
// Define a class like this
function Chord(name, notes){
  // Add object properties like this
//  this.name = name.toUpperCase();
  
  // make note-array uppercase:
  notes.forEach(function(a,b,c){
    if(! (a instanceof Note) )
      console.error("Trying to set a Chord with something else than a note");
  });
  
  this.notes = notes;
}
// Add methods like this.  All Person objects will be able to invoke this
Chord.prototype.getName = function(){
  return this.name;
};
Chord.prototype.hasNote = function(note){
//  note = note.toUpperCase();
  var pos = this.notes.indexOf(note);
  if(pos == -1) return false;
  else return true;
};



/*
// Instantiate new objects with 'new'
var person = new Person("Bob", "M");

// Invoke methods like this
person.speak(); // alerts "Howdy, my name is Bob"
*/






var gCorrectAnswer = new Note(0);
var gCurrentClef = 'g'; //g (normal) or f (bas)

var gTrombone = new Trombone();

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
  setNote(gCorrectAnswer);
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
  setNote(gCorrectAnswer);
}

function checkNoteAnswer(/* note */ oAnswer){

  
}


function checkAnswer(/* int or char */ answer){
  
  // typing trombone possition:
  if( Number.isInteger(answer) ){
    if( gTrombone.doesNoteAndPositionMatch(gCorrectAnswer, answer) ){
      document.querySelector('#nrCorrect').innerHTML++;
      return randomNote();
    }
  }
  
  // Saying the actual note: A, B, C osv...
//  var noteAnswer = new Note(answer);

  // checking if the trombone slider is correct:
  if( gCorrectAnswer.isNote(answer) ){
    //gTrombone.doesNoteAndPositionMatch(gCurrectAnswer, answer) )
    document.querySelector('#nrCorrect').innerHTML++;
    return randomNote();
  }

  document.querySelector('#nrError').innerHTML++;
}


function randomNote(){
  var randPos;
  
  var lowFreq = parseInt(document.querySelector('#lowBoundSelect').value);
  var highFreq = parseInt(document.querySelector('#highBoundSelect').value);
  do{
    randFreq = lowFreq + Math.floor(Math.random()* (highFreq - lowFreq) );
  } while(randFreq == gCorrectAnswer.frequency );
  
  setNote( new Note(randFreq) );
}


//TODO: det blir fel när man kör setNote(23) vilket är ett lågt B, som 
function setChorde(chord){
//  chord = chord.toUpperCase();
  var chordPos = gaChord.indexOf(chord);
  if(chordPos == -1)
    return;
    
  var svg = document.getElementById("sheet");
  var svgDoc = svg.contentDocument;
  
  var noteLineUp = svgDoc.getElementById("noteLineUp");
  var noteLineDown = svgDoc.getElementById("noteLineDown");
  
  var note = svgDoc.getElementById("note");
  var threeOver = svgDoc.getElementById("threeOver");
  var twoOver = svgDoc.getElementById("twoOver");
  var oneOver = svgDoc.getElementById("oneOver");
  var oneUnder = svgDoc.getElementById("oneUnder");
  var twoUnder = svgDoc.getElementById("twoUnder");
  var chordLetter = svgDoc.getElementById("chordLetter");
 
  resetNote();
  note.setAttribute("display", 'none');
  
  chordLetter.setAttribute("display", "");
  
  chordLetter.textContent = chord;
}

function setNote(oNote){
  if( !(oNote instanceof Note) )
    return;
  
  var svg = document.getElementById("sheet");
  var svgDoc = svg.contentDocument;


  var noteLineUp = svgDoc.getElementById("noteLineUp");
  var noteLineDown = svgDoc.getElementById("noteLineDown");

  var major = svgDoc.getElementById("major");
  var minor = svgDoc.getElementById("minor");
  
  var note = svgDoc.getElementById("note");
  var threeOver = svgDoc.getElementById("threeOver");
  var twoOver = svgDoc.getElementById("twoOver");
  var oneOver = svgDoc.getElementById("oneOver");
  var oneUnder = svgDoc.getElementById("oneUnder");
  var twoUnder = svgDoc.getElementById("twoUnder");
 
  resetNote();

  var noteYValue = 0;
  
  var bB = Math.random() < 0.5;

  
  var extra = "";
  switch(oNote.frequency){
    case 9:  noteYValue = 140;     extra = ""; break; // Lo A
    case 10: if(bB){noteYValue = 130; extra = "b"; }else{noteYValue = 140; extra = "#"; } break;
    case 11: noteYValue = 130;   extra = ""; break; // Lo B
    case 12: noteYValue = 120;   extra = ""; break; // Lo C
    case 13: if(bB){noteYValue = 110; extra = "b"; }else{noteYValue = 120; extra = "#";} break;
    case 14: noteYValue = 110;   extra = ""; break; // Lo D
    case 15: if(bB){noteYValue = 100; extra = "b"; }else{noteYValue = 110; extra = "#";} break;
    case 16: noteYValue = 100;   extra = ""; break; // Lo E
    case 17: noteYValue = 90;   extra = ""; break; // Lo F
    case 18: if(bB){noteYValue = 80; extra = "b";  }else{noteYValue = 90; extra = "#";} break;
    case 19: noteYValue = 80;   extra = ""; break; // Lo G
    case 20: if(bB){noteYValue = 70;  extra = "b"; }else{noteYValue = 80; extra = "#";} break;
    case 21: noteYValue = 70;    extra = ""; break; // A
    case 22: if(bB){noteYValue = 60; extra = "b";  }else{noteYValue = 70; extra = "#"; } break;
    case 23: noteYValue = 60;  extra = ""; break; // B
    case 24: noteYValue = 50;   extra = ""; break; // C
    case 25: if(bB){noteYValue = 40; extra = "b";  }else{noteYValue = 50; extra = "#";} break;
    case 26: noteYValue = 40;   extra = ""; break; // D
    case 27: if(bB){noteYValue = 30; extra = "b";  }else{noteYValue = 40; extra = "#";} break;
    case 28: noteYValue = 30;   extra = ""; break; // E
    case 29: noteYValue = 20;   extra = ""; break; // F
    case 30: if(bB){noteYValue = 10; extra = "b";  }else{noteYValue = 20; extra = "#";} break;
    case 31: noteYValue = 10;   extra = ""; break; // G
    case 32: if(bB){noteYValue = 0;  extra = "b";  }else{noteYValue = 10; extra = "#";} break;
    case 33: noteYValue = 0;    extra = ""; break; // Hi A
    case 34: if(bB){noteYValue = -10; extra = "b"; }else{noteYValue = 0; extra = "#"; } break;
    case 35: noteYValue = -10;  extra = ""; break; // Hi B
    case 36: noteYValue = -20;   extra = ""; break; // Hi C
    case 37: if(bB){noteYValue = -30; extra = "b";  }else{noteYValue = -20; extra = "#";} break;
    case 38: noteYValue = -30;   extra = ""; break; // Hi D
    case 39: if(bB){noteYValue = -40; extra = "b";  }else{noteYValue = -30; extra = "#";} break;
    case 40: noteYValue = -40;   extra = ""; break; // Hi E
    case 41: noteYValue = -50;   extra = ""; break; // Hi F
    case 42: if(bB){noteYValue = -60; extra = "b";  }else{noteYValue = -50; extra = "#";} break;
    case 43: noteYValue = -60;   extra = ""; break; // Hi G
    case 44: if(bB){noteYValue = -70;  extra = "b";  }else{noteYValue = -60; extra = "#";} break;
    case 45: noteYValue = -70;    extra = ""; break; // Hihi A
    case 46: if(bB){noteYValue = -80; extra = "b"; }else{noteYValue = -70; extra = "#"; } break;
    case 47: noteYValue = -80;  extra = ""; break; // Hihi B
  }
  noteYValue -= 70;

  if(gCurrentClef == 'g') noteYValue += 50;
  
  if(extra === '#')
    major.setAttribute("display", '');
  if(extra === 'b')
    minor.setAttribute("display", '');

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
  
  console.log("oNote:");
  console.log(oNote);
  console.log(oNote.getName());
  gCorrectAnswer = oNote;
  
}


function resetNote(){
  
  var svg = document.getElementById("sheet");
  var svgDoc = svg.contentDocument;


  var noteLineUp = svgDoc.getElementById("noteLineUp");
  var noteLineDown = svgDoc.getElementById("noteLineDown");
  
  var major = svgDoc.getElementById("major");
  var minor = svgDoc.getElementById("minor");
  
  noteLineUp.setAttribute("display", 'none');
  noteLineDown.setAttribute("display", '');

  major.setAttribute("display", 'none');
  minor.setAttribute("display", 'none');

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

}


function keyboardKeydown(event){
  
if(event.keyCode>=48 && event.keyCode<=57) {
    // pressed a number
  var number = event.keyCode - 48;
  checkAnswer(number);
  return;
}
  
function keypress(char){
  if(event.shiftKey==1)
    checkAnswer(char + '#');
  else if(event.altKey==1)
    checkAnswer(char + 'b');
  else
    checkAnswer(char);
}
  
switch(event.keyCode){
  case 65: // A
    keypress('A');
    break;
  case 66: // B
    keypress('B');
    break;
  case 67: // C
    keypress('C');
    break;
  case 68: // D
    keypress('D');
    break;
  case 69: // E
    keypress('E');
    break;
  case 70: // F
    keypress('F');
    break;
  case 71: // G
    keypress('G');
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


