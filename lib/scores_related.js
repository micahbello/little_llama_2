//display high scores
let numberOfNormalScoreEntries = 0;
let numberOfFlightScoreEntries = 0;
let lowestNormalScore = 0;
let lowestFlightScore = 0;


document.getElementById("high-scores-button").addEventListener("click", ()=> {

  let scores = document.getElementById("high-scores-modal");
  scores.style.display = "flex";
});

document.getElementById("high-scores-close-button").addEventListener("click", ()=> {
  let scores = document.getElementById("high-scores-modal");
  scores.style.display = "";
});

//RETREIVE SCORES and order them
let database = firebase.database();
let ref = database.ref("scores");
ref.on('value', gotScores, errData);

function gotScores(data){
  let scores = data.val();

  //display normal mode scores
  let normalModeDisplay = document.getElementById("normal-high-scores");
  normalModeDisplay.innerHTML = ""

  //convert the object into an array to then sort
  let scoresObjectToArray = [];
  Object.keys(scores.normalMode).map((key) => {
    scoresObjectToArray.push([scores.normalMode[key].name, scores.normalMode[key].score])
  });

  let sortedScores = quickSortOderScores(scoresObjectToArray);
  //save the important variables to decide if a score is to be
  //saved
  numberOfNormalScoreEntries = Object.keys(scores.normalMode).length;
  lowestNormalScore = scoresObjectToArray[scoresObjectToArray.length - 1][1];

  for (let i = 0; i < sortedScores.length; i++) {
    let name = sortedScores[i][0];
    let score = sortedScores[i][1];
    let entry = document.createElement("li");
    entry.innerHTML = `${name}: ${score}`;
    normalModeDisplay.appendChild(entry);
  }

  //display flightMode scores
  let flightModeDisplay = document.getElementById("flight-high-scores");
  flightModeDisplay.innerHTML = "";

  scoresObjectToArray = [];
  Object.keys(scores.flightMode).map((key) => {
    scoresObjectToArray.push([scores.flightMode[key].name, scores.flightMode[key].score])
  });

  sortedScores = quickSortOderScores(scoresObjectToArray);
  //save the important variables to decide if a score is to be
  //saved
  numberOfFlightScoreEntries = Object.keys(scores.flightMode).length;
  lowestFlightScore = scoresObjectToArray[scoresObjectToArray.length - 1][1];

  for (let i = 0; i < sortedScores.length; i++) {
    let name = sortedScores[i][0];
    let score = sortedScores[i][1];
    let entry = document.createElement("li");
    entry.innerHTML = `${name}: ${score}`;
    flightModeDisplay.appendChild(entry);
  }


}

function errData(err) {
  console.log("Error!");
  console.log(err);
}


//SAVE SCORE
document.getElementById("save-score-button").addEventListener("click", () => {

  let gameMode = document.getElementById("mode-played").innerHTML;
  let finalScore = Number.parseInt(document.getElementById("final-coin-count").innerHTML);

  let ref = gameMode === "normal" ? database.ref('scores/normalMode') : database.ref('scores/flightMode');
  let numberOfEntries = undefined;
  let lowestScore = undefined;
  let lowestScoreId = undefined;

  ref.on('value', (data) => {
    numberOfEntries = Object.keys(data.val()).length;

    Object.keys(data.val()).forEach(key => {
      if (lowestScore === undefined) {
        lowestScore = [data.val()[key].name, data.val()[key].score];
        lowestScoreId = key;
      }

      if (data.val()[key].score < lowestScore[1]) {
        lowestScore = [data.val()[key].name, data.val()[key].score];
        lowestScoreId = key;
      }
    });
  });

  let data = {
    name: document.getElementById("name-to-save").value,
    score: finalScore
  };

  if (data.name.length > 0) { //prevent empty name saves
    ref.push(data);
    document.getElementById("score-save-section").style.display = "";

    if (numberOfEntries >= 11) { //assures that only 10 are kept
      if (gameMode === "normal") {
        database.ref(`scores/normalMode/${lowestScoreId}`).remove();
      } else {
        database.ref(`scores/flightMode/${lowestScoreId}`).remove();
      }
    }
  }

});

//quickSort
function quickSortOderScores(array) {
  if (array.length < 2) {
    return array;
  }

  let pivot = array[0];
  let left = [];
  let right = [];

  array.slice(1).forEach((nameAndScore) => {
    if (nameAndScore[1] >= pivot[1]) {
      left.push(nameAndScore);
    } else {
      right.push(nameAndScore);
    }
  });

  return (quickSortOderScores(left).concat([pivot]).concat(quickSortOderScores(right)));
}
