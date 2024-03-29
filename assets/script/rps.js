const allChoices = document.querySelectorAll('.choice');
const lockinBtn = document.getElementById('vs');
const leftpickture = document.querySelector(".bets.left");
const rightpickture = document.querySelector(".bets.right");
const selectionPage = document.querySelector(".default");
const resultsPage = document.querySelector(".results");
const rockbtn = document.getElementById('rock');
const paperbtn = document.getElementById('paper');
const scissorsbtn = document.getElementById('scissors');
const roundView = document.getElementById('rounds');

let playerChoice = '';
let tally = '';
let playerScore = 0;
let comScore = 0;
let round = 1;


displayRound(roundView, round);

// Event Listeners
lockinBtn.addEventListener('click', lockIn);


// Display round number
function displayRound() {
    if (round == 6){
        getTally()
    }
    else
        roundView.textContent = "Round " + round;
    round++;
}


// Lock in functions
function lockIn(){
    if (playerChoice != ''){
        let comChoice = getComChoice();
        console.log("player: " + playerChoice);
        console.log("computer: " + comChoice);
        let results = winnerCheck(playerChoice, comChoice);
        display_results(results);
    }
    else
        alert('Pick your bet first before you LOCK IN')
}


// Selecting Player Choice
allChoices.forEach(btn => {
    btn.addEventListener('click', (e) => {
        playerChoice = e.target.value;
        console.log("You hover: " + playerChoice);

        if (playerChoice == 'rock'){
            rockbtn.style.cssText = "background-color: gray;";
            paperbtn.style.cssText = "background-color: rgb(83, 209, 255)";
            scissorsbtn.style.cssText = "background-color: rgb(255, 186, 83)";
            leftpickture.src = "assets/image/rock.png";
        }
        else if (playerChoice == 'paper'){
            rockbtn.style.cssText = "background-color: rgb(83, 255, 129);";
            paperbtn.style.cssText = "background-color: gray";
            scissorsbtn.style.cssText = "background-color: rgb(255, 186, 83)";
            leftpickture.src = "assets/image/paper.png";
        }
        else if (playerChoice == 'scissors'){
            rockbtn.style.cssText = "background-color: rgb(83, 255, 129);";
            paperbtn.style.cssText = "background-color: rgb(83, 209, 255)";
            scissorsbtn.style.cssText = "background-color: gray";
            leftpickture.src = "assets/image/scissors.png";
        }
        else console.log(playerChoice)
    })
});


// Randomizing Computer Choice
function getComChoice(){
    let rannum = Math.floor(Math.random() * 3) + 1;
    let comChoice = (rannum == 1) ? "rock":
        (rannum == 2) ? "paper": 
        (rannum == 3) ?'scissors': rannum;
    if (comChoice == 'rock'){
        rightpickture.src = "assets/image/rock.png";
    }
    else if (comChoice == 'paper'){
        rightpickture.src = "assets/image/paper.png";
    }
    else if (comChoice == 'scissors')
        rightpickture.src = "assets/image/scissors.png";
    return comChoice;
}


// Checks who wins
function winnerCheck (playerSelection, computerSelection){
    let verdict =
     (playerSelection == computerSelection) ? "You both pick " + playerSelection + ", We have a DRAW!":
     (playerSelection == 'rock' && computerSelection == 'paper') ?  "You pick " +playerSelection+ " against " +computerSelection+ ", You Lose!":
     (playerSelection == 'rock' && computerSelection == 'scissors') ?  "You pick " +playerSelection+ " against " +computerSelection+ ", You Win!!":
     (playerSelection == 'scissors' && computerSelection == 'rock') ?  "You pick " +playerSelection+ " against " +computerSelection+ ", You Lose!":
     (playerSelection == 'scissors' && computerSelection == 'paper') ?  "You pick " +playerSelection+ " against " +computerSelection+ ", You Win!!":
     (playerSelection == 'paper' && computerSelection == 'scissors') ?  "You pick " +playerSelection+ " against " +computerSelection+ ", You Lose!":
     (playerSelection == 'paper' && computerSelection == 'rock') ?  "You pick " +playerSelection+ " against " +computerSelection+ ", You Win!!":
     playerSelection + " is an invalid bet";
    let whoWin = (verdict.includes('You Win')) ? "player" : 
        (verdict.includes('You Lose')) ? "computer" : 
        "draw";
    if (whoWin == 'player'){
        playerScore++;
    }
    else if(whoWin == 'computer'){
        comScore++;
    }
    console.log("Player: " + playerScore + "    Computer: " + comScore);
    return {announcement:verdict, winner: whoWin}
}

// Display results
function display_results(results){
    console.log(results.announcement);
    console.log("winner: " + results.winner);
    let displayResult = document.createElement('p');
    displayResult.textContent = results.announcement;
    displayResult.setAttribute('id', 'resultAnnounce');
    let displayWinner = document.createElement('p');
    results.winner = results.winner.toUpperCase();
    displayWinner.textContent = "PLAYER: " + playerScore + " | COMPUTER: " + comScore;
    displayWinner.setAttribute('id', 'winnerAnnounce');
    resultsPage.appendChild(displayResult);
    resultsPage.appendChild(displayWinner);
    displayRound();

    let tryAgainBtn = document.createElement('button');
    if (tally != ''){
        tryAgainBtn.textContent = tally;
        playerScore = 0;
        comScore = 0;
        round = 1;
        displayRound();
        console.log(tally);
        tryAgainBtn.setAttribute('id', 'tryAgain');
        tryAgainBtn.style.cssText= "background-color: rgb(220, 149, 255)"
        resultsPage.appendChild(tryAgainBtn);
        tally='';
    }
    else{
        tryAgainBtn.textContent = 'TRY AGAIN';
        tryAgainBtn.setAttribute('id', 'tryAgain');
        resultsPage.appendChild(tryAgainBtn);
    }
        
    selectionPage.style.cssText = "display: none";
    resultsPage.style.cssText = "display: block";
    const tryAgain = document.getElementById('tryAgain')
    tryAgain.addEventListener('click', resetPage);
}

function resetPage(){
    selectionPage.style.cssText = "display: block";
    resultsPage.style.cssText = "display: none";
    playerChoice = '';

    leftpickture.src = "assets/image/unknown.gif";
    rightpickture.src = "assets/image/unknown.gif";
    rockbtn.style.cssText = "background-color: rgb(83, 255, 129);";
    paperbtn.style.cssText = "background-color: rgb(83, 209, 255)";
    scissorsbtn.style.cssText = "background-color: rgb(255, 186, 83)";
    
    const delResult = document.getElementById('resultAnnounce');
    const delWinner = document.getElementById('winnerAnnounce');
    const delTryAgain = document.getElementById('tryAgain');
    delResult.remove();
    delTryAgain.remove();
    delWinner.remove();
}

function getTally(){
    tally = (playerScore > comScore) ? "You Beat em AI" : 
    (playerScore < comScore) ? "AI Supremacy" : 
    "Its a Draw"
}