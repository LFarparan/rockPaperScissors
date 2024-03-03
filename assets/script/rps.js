{/*
    <div class="whiteContainer">
        <h1> R.P.S. TOURNAMENT</h1>
        <div class="betContainer">
            <div id="playerPick"> <img class="bets left" src="assets/image/rock.png" alt="player bet"></div>
            <div> <button id="vs"> vs </button></div> 
            <div id="comPick"> <img class="bets right" src="assets/image/rock.png" alt="Computer bet"></div>
        </div>
        <div id="interactZone">
            <div class="instructions">
                <p id="rounds"> Round 1 </p>
                <p> Press VS to LOCK IN ur bet </p>
            </div>
            <div class="choiceContainer">
                <button class='choice' id="rock" value="rock"> ROCK </button>
                <button class='choice' id="paper" value="paper"> PAPER </button>
                <button class='choice' id="scissors" value="scissors"> SCISSORS </button>
            </div>
        </div>
    </div>
*/}

const allChoices = document.querySelectorAll('.choice');
const lockinBtn = document.getElementById('vs');
let playerChoice = '';
lockinBtn.addEventListener('click', lockIn);

const leftpickture = document.querySelector(".bets.left");
const rightpickture = document.querySelector(".bets.right");

// Lock in functions
function lockIn(){
    if (playerChoice != ''){
        let comChoice = getComChoice();
        console.log("player: " + playerChoice);
        console.log("computer: " + comChoice);
        let results = winnerCheck(playerChoice, comChoice);
        console.log(results);
        display_results(results);
    }
    else
        alert('Pick your bet first before you LOCK IN')
}

// Display results
function display_results(results){
    console.log(results.announcement)
    console.log("winner: " + results.winner)
}





// Selecting Player Choice
allChoices.forEach(btn => {
    btn.addEventListener('click', (e) => {
        playerChoice = e.target.value;
        console.log("You hover: " + playerChoice);
        const rockbtn = document.getElementById('rock');
        const paperbtn = document.getElementById('paper');
        const scissorsbtn = document.getElementById('scissors');

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
    else (comChoice == 'scissors')
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
    let whoWin = (verdict.includes('You Win')) ? "player" : (verdict.includes('You Lose')) ? "computer" : "draw";
    return {announcement:verdict, winner: whoWin}
}