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
  return this.getName(false) === freq || this.getName(true) === freq;
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
  this.name = name;
}
// Add methods like this.  All Person objects will be able to invoke this
Chord.prototype.getName = function(){
  return this.name;
};
Chord.prototype.hasNote = function(note){
  var res = false;
  this.notes.forEach(function(oNote){
    if(note.getName() == oNote.getName() ){ 
      res = true;
    }
  });
  return res;
};
Chord.prototype.is = function(astrNotes){
/*
  if(astrNotes.length != this.notes.length)
    return false;
*/  
  var res = true;
  this.notes.forEach(function(oNote){
    if(
      astrNotes.indexOf(oNote.getName(true)) == -1 &&
      astrNotes.indexOf(oNote.getName(false)) == -1
    ){ 
      res = false;
    }
  });
  
  var that = this;
  astrNotes.forEach(function(strNote){
    if(!that.hasNote(new Note(strNote) ))
      res = false;
  });
  
  return res;
};



/*
// Instantiate new objects with 'new'
var person = new Person("Bob", "M");

// Invoke methods like this
person.speak(); // alerts "Howdy, my name is Bob"
*/






var gCorrectAnswer = new Note(0);
var gCurrentAnswer = [];
var gCurrentClef = 'g'; //g (normal) or f (bas)
var gaCurrentChords = [];
var gaChords = [
  new Chord('A', [new Note('A'), new Note('C#'), new Note('E')] ),
  new Chord('Am', [new Note('A'), new Note('C'), new Note('E')] ),
  new Chord('B', [new Note('B'), new Note('D#'), new Note('F#')] ),
  new Chord('Bb', [new Note('Bb'), new Note('D'), new Note('F')] ),
  new Chord('C', [new Note('C'), new Note('E'), new Note('G')] ),
  new Chord('Cm', [new Note('C'), new Note('D#'), new Note('G')] ),
  new Chord('C#', [new Note('C#'), new Note('F'), new Note('G#')] ),
  new Chord('D', [new Note('D'), new Note('F#'), new Note('A')] ),
  new Chord('Dm', [new Note('D'), new Note('F'), new Note('A')] ),
  new Chord('E', [new Note('E'), new Note('G#'), new Note('B')] ),
  new Chord('Em', [new Note('E'), new Note('G'), new Note('B')] ),
  new Chord('Eb', [new Note('Eb'), new Note('F#'), new Note('A#')] ),
  new Chord('Ebm', [new Note('Eb'), new Note('F'), new Note('A#')] ),
  new Chord('F', [new Note('F'), new Note('A'), new Note('C')] ),
  new Chord('Fm', [new Note('F'), new Note('G#'), new Note('C')] ),
  new Chord('G', [new Note('G'), new Note('B'), new Note('D')] ),
  new Chord('Gm', [new Note('G'), new Note('Bb'), new Note('D')] )
];

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
    if(document.getElementById('radChord').checked){
      return;
    } else {
      if( gTrombone.doesNoteAndPositionMatch(gCorrectAnswer, answer) ){
        document.querySelector('#nrCorrect').innerHTML++;
        return randomNote();
      }
    }
  }
  
  // Saying the actual note: A, B, C osv...
  if(document.getElementById('radChord').checked){
    if(gCorrectAnswer.hasNote(new Note(answer))){
      gCurrentAnswer.push(answer);
    } else {
      document.querySelector('#nrError').innerHTML++;
    }
    if(gCorrectAnswer.is(gCurrentAnswer)){
      document.querySelector('#nrCorrect').innerHTML++;
      return randomNote();
    }
  } else {
    if( gCorrectAnswer.isNote(answer) ){
      //gTrombone.doesNoteAndPositionMatch(gCurrectAnswer, answer) )
      document.querySelector('#nrCorrect').innerHTML++;
      return randomNote();
    }
  
    document.querySelector('#nrError').innerHTML++;
  }
}


function randomNote(){

  if(document.getElementById('radChord').checked){  // if Chord practice:
    var randChordPos;
    do{
      randChordPos = Math.floor(Math.random()* (gaCurrentChords.length) );
    }while(gaCurrentChords[randChordPos].name == gCorrectAnswer.name);
    setChorde(gaCurrentChords[randChordPos]);
  } else { // else note practice:
    var randFreq;
    var lowFreq = parseInt(document.querySelector('#lowBoundSelect').value);
    var highFreq = parseInt(document.querySelector('#highBoundSelect').value);
    do{
      randFreq = lowFreq + Math.floor(Math.random()* (highFreq - lowFreq) );
    } while(randFreq == gCorrectAnswer.frequency );
    setNote( new Note(randFreq) );
  }
}


function setChorde(chord){
  var chordPos = gaCurrentChords.indexOf(chord);
  if(chordPos == -1)
    return;
    
  var svg = document.getElementById("sheet");
  var svgDoc = svg.contentDocument;
  
  var noteLineUp = svgDoc.getElementById("noteLineUp");
  var noteLineDown = svgDoc.getElementById("noteLineDown");
  
  var note = svgDoc.getElementById("note");

  var chordLetter = svgDoc.getElementById("chordLetter");
 
  resetNote();
  note.setAttribute("display", 'none');
  
  chordLetter.setAttribute("display", "");
  
  chordLetter.textContent = chord.getName();
  gCurrentAnswer.length = 0;
  gCorrectAnswer = chord;
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
  var chordLetter = svgDoc.getElementById("chordLetter");
 
 
  chordLetter.setAttribute("display", "none");
  note.setAttribute("display", '');
  
  resetNote();

  var y = 0; //noteYValue
  var bB = Math.random() < 0.5;
  var extra = "";
  switch(oNote.frequency){
    case 9:  y = 140; extra = ""; break; // Lo A
    case 10: if(bB){y = 130; extra = "b"; }else{y = 140;  extra = "#";} break;
    case 11: y = 130; extra = ""; break; // Lo B
    case 12: y = 120; extra = ""; break; // Lo C
    case 13: if(bB){y = 110; extra = "b"; }else{y = 120;  extra = "#";} break;
    case 14: y = 110; extra = ""; break; // Lo D
    case 15: if(bB){y = 100; extra = "b"; }else{y = 110;  extra = "#";} break;
    case 16: y = 100; extra = ""; break; // Lo E
    case 17: y = 90;  extra = ""; break; // Lo F
    case 18: if(bB){y = 80;  extra = "b"; }else{y = 90;   extra = "#";} break;
    case 19: y = 80;  extra = ""; break; // Lo G
    case 20: if(bB){y = 70;  extra = "b"; }else{y = 80;   extra = "#";} break;
    case 21: y = 70;  extra = ""; break; // A
    case 22: if(bB){y = 60;  extra = "b"; }else{y = 70;   extra = "#";} break;
    case 23: y = 60;  extra = ""; break; // B
    case 24: y = 50;  extra = ""; break; // C
    case 25: if(bB){y = 40;  extra = "b"; }else{y = 50;   extra = "#";} break;
    case 26: y = 40;  extra = ""; break; // D
    case 27: if(bB){y = 30;  extra = "b"; }else{y = 40;   extra = "#";} break;
    case 28: y = 30;  extra = ""; break; // E
    case 29: y = 20;  extra = ""; break; // F
    case 30: if(bB){y = 10;  extra = "b"; }else{y = 20;   extra = "#";} break;
    case 31: y = 10;  extra = ""; break; // G
    case 32: if(bB){y = 0;   extra = "b"; }else{y = 10;   extra = "#";} break;
    case 33: y = 0;   extra = ""; break; // Hi A
    case 34: if(bB){y = -10; extra = "b"; }else{y = 0;    extra = "#";} break;
    case 35: y = -10; extra = ""; break; // Hi B
    case 36: y = -20; extra = ""; break; // Hi C
    case 37: if(bB){y = -30; extra = "b"; }else{y = -20;  extra = "#";} break;
    case 38: y = -30; extra = ""; break; // Hi D
    case 39: if(bB){y = -40; extra = "b"; }else{y = -30;  extra = "#";} break;
    case 40: y = -40; extra = ""; break; // Hi E
    case 41: y = -50; extra = ""; break; // Hi F
    case 42: if(bB){y = -60; extra = "b"; }else{y = -50;  extra = "#";} break;
    case 43: y = -60; extra = ""; break; // Hi G
    case 44: if(bB){y = -70; extra = "b"; }else{y = -60;  extra = "#";} break;
    case 45: y = -70; extra = ""; break; // Hihi A
    case 46: if(bB){y = -80; extra = "b"; }else{y = -70;  extra = "#";} break;
    case 47: y = -80; extra = ""; break; // Hihi B
  }
  y -= 70;

  if(gCurrentClef == 'g') y += 50;
  
  if(extra === '#')
    major.setAttribute("display", '');
  if(extra === 'b')
    minor.setAttribute("display", '');

  if(y > -25) {
    noteLineUp.setAttribute("display", '');
    noteLineDown.setAttribute("display", 'none');
  }else{
    noteLineUp.setAttribute("display", 'none');
    noteLineDown.setAttribute("display", '');
  }
  if(y <= -130)  threeOver.setAttribute('display', '');
  if(y <= -110)  twoOver.setAttribute('display', '');
  if(y <= -90)   oneOver.setAttribute('display', '');
  if(y >= 30)    oneUnder.setAttribute('display', '');
  if(y >= 50)    twoUnder.setAttribute('display', '');

  note.setAttribute("y", y); //noteYValue
  
  gCorrectAnswer = oNote;
  
}


function resetNote(){
  gCurrentAnswer.length = 0;
  
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

function makeChordArray(){
  var domChords = document.querySelectorAll('#chordPicker label input');
  
  var chords = [];
  
  for(var i=0; i<domChords.length; i++){
    if(domChords[i].checked) chords.push(gaChords[i]);
  }
  
  if(chords.length < 2){
    document.querySelectorAll('#chordPicker input')[1].checked = true;
    document.querySelectorAll('#chordPicker input')[4].checked = true;
    return makeChordArray();
  }
  
  gaCurrentChords = chords;
  randomNote();
  
}

// function used at startUp to fill the HTML
function fillChords(){
  for(var i=0; i<gaChords.length; i++){
    var input = document.createElement('input');
    var label = document.createElement('label');
    input.type="checkbox";
    if(i==1 || i==4) input.checked = true;
    label.appendChild(input);
    label.appendChild(document.createTextNode(gaChords[i].name));
    label.addEventListener('click', makeChordArray);
    document.getElementById('chordPicker').appendChild(label);
  }
}

function showHideChords(){
  var aNotes, aChords, i;
  if(document.getElementById('radChord').checked){
    aNotes = document.querySelectorAll('.noteRelated');
    aChords = document.querySelectorAll('.chordRelated');
    for(i=0; i<aNotes.length; i++){aNotes[i].style.display = "none";}
    for(i=0; i<aChords.length; i++){aChords[i].style.display = "";}
  } else {
    aNotes = document.querySelectorAll('.noteRelated');
    aChords = document.querySelectorAll('.chordRelated');
    for(i=0; i<aNotes.length; i++){aNotes[i].style.display = "";}
    for(i=0; i<aChords.length; i++){aChords[i].style.display = "none";}
  }
}

function setAllChords(){
  var aChords = document.getElementById('chordPicker').children;
  for(var i=0; i<aChords.length; i++){
    aChords[i].children[0].checked = true;
  }
  makeChordArray();
}

function setBluesFChords(){
  var aChords = document.getElementById('chordPicker').children;
  for(var i=0; i<aChords.length; i++){
    /**/ if(gaChords[i].name == "F") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Bb") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "C") aChords[i].children[0].checked = true;
    else aChords[i].children[0].checked = false;
  }
  makeChordArray();
}

function set4MostCommon(){
  
  var aChords = document.getElementById('chordPicker').children;
  for(var i=0; i<aChords.length; i++){
    /**/ if(gaChords[i].name == "G") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "F") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "C") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Am") aChords[i].children[0].checked = true;
    else aChords[i].children[0].checked = false;
  }
  makeChordArray();
}
function set8MostCommon(){
  
  var aChords = document.getElementById('chordPicker').children;
  for(var i=0; i<aChords.length; i++){
    /**/ if(gaChords[i].name == "G") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "F") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "C") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Am") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Dm") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Em") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "E") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "D") aChords[i].children[0].checked = true;
    else aChords[i].children[0].checked = false;
  }
  makeChordArray();
}

function setCommonPianoChords(){
  var aChords = document.getElementById('chordPicker').children;
  for(var i=0; i<aChords.length; i++){
    /**/ if(gaChords[i].name == "C") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Cm") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "D") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Dm") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "E") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Em") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "F") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Fm") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "G") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Gm") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "A") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Am") aChords[i].children[0].checked = true;
    else aChords[i].children[0].checked = false;
  }
  makeChordArray();
}
function setCommonGuitarChords(){
  var aChords = document.getElementById('chordPicker').children;
  for(var i=0; i<aChords.length; i++){
    /**/ if(gaChords[i].name == "A") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Am") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "C") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "D") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Dm") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "D7") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "E") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "Em") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "F") aChords[i].children[0].checked = true;
    else if(gaChords[i].name == "G") aChords[i].children[0].checked = true;
    else aChords[i].children[0].checked = false;
  }
  makeChordArray();
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

function listenForChordsPreset(){
  document.getElementById('setAllChords')
    .addEventListener('click', setAllChords);
  document.getElementById('setBluesFChords')
    .addEventListener('click', setBluesFChords);
  document.getElementById('setCommonPianoChords')
    .addEventListener('click', setCommonPianoChords);
  document.getElementById('setCommonGuitarChords').
    addEventListener('click', setCommonGuitarChords);
  document.getElementById('set4MostCommon').
    addEventListener('click', set4MostCommon);
  document.getElementById('set8MostCommon').
    addEventListener('click', set8MostCommon);
    
//    set4MostCommon
}

window.onload = function() {
  randomNote();
  fillChords();
  showHideChords();
  makeChordArray();
  setGClef();
  listenForChordsPreset();
  document.addEventListener('keydown', keyboardKeydown);
  document.getElementById('gClefButton').addEventListener('click', setGClef);
  document.getElementById('fClefButton').addEventListener('click', setFClef);
  
  
  var aElements = document.querySelectorAll('.radMode');
  for(var i=0; i<aElements.length; i++){
    aElements[i].addEventListener('click', randomNote, false);
    aElements[i].addEventListener('click', showHideChords, false);
  }

  
  /*  why o why does not this work?
    $('.shareClass').click(function(){
    
      console.info("shareClass ->");
    }, false);
    $('#sheetId').click(function(){
      console.info("333");
    })
  */
  setInterval(blurHackFunk,1000);
};
function blurHackFunk(){document.getElementById('blur-hack').focus();}
/* 
  Supprisingly, this hack - both the interval and the blur-hack - does
  not seem to take any reasourses other that when they where being used!
*/

