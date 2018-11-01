//display high scores
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

  let sortedScores = quickSortOderScores(scoresObjectToArray)
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

  let flightKeys = Object.keys(scores.flightMode);
  for (let i = 0; i < flightKeys.length; i++) {
    let k = flightKeys[i];
    let name = scores.flightMode[k].name;
    let score = scores.flightMode[k].score;
    let entry = document.createElement("li");
    entry.innerHTML = `${name}: ${score}`;
    flightModeDisplay.appendChild(entry);
  }

}

function errData(err) {
  console.log("Error!");
  console.log(err);
}


//SAVE SCORE is found on the little_llama.js file because it needs reference to
//gameView

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
