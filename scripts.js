/*the whole game*/
//?code is organized in a way to keep everything in its own scope. Dont want to declare things in the main function if you never use it there. Also, every  function has its use. Try to separate every action with its own function 
const game = () => {
    /*scoping everything inside this function (no globals)*/
    let pScore = 0;
    let cScore = 0;

    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const matchScreen = document.querySelector('.match');

        //every time we click play button: fade out intro screen */
        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            matchScreen.classList.add('fadeIn');
        });
    };

    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand => {
            hand.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });

        //computer options 
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach(option => {
            option.addEventListener('click', function() {
                //console.log(this) means whatever we click on 
                console.log(this);
                //using a regular function will allow us to use this above 
                const computerNumber = Math.floor(Math.random() * 3);

                //RESET IMAGES
                //playerHand.src = `./images/rock.png`;
                //computerHand.src = `./images/rock.png`;

                const computerChoice = computerOptions[computerNumber]; //will give us random choice of rock paper or scissors 

                setTimeout(() => {
                    compareHands(this.textContent,computerChoice);
                    //update imgs
                    playerHand.src = `./images/${this.textContent}.png`
                    computerHand.src = `./images/${computerChoice}.png`
                }, 2000);

                //call comapreHands to update text
                playerHand.style.animation = 'shakePlayer 2s ease';
                computerHand.style.animation = 'shakeComputer 2s ease';
            });
        });
    };

    //updateScore 
    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');//only affects p inside player score
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore; 
        computerScore.textContent = cScore;
    };

    //comparison function to determine who is winning 
    const compareHands = (playerChoice, computerChoice) => {
        //need to get the text that says choose an option and update that 
        const winner = document.querySelector('.winner');

        //checking for tie 
        if (playerChoice === computerChoice) {
            winner.textContent = 'It is a tie';
            return; //best to not check again 
        }

        //check for rock 
        if (playerChoice === 'rock') {
            //compare it to computer choices 
            if (computerChoice === 'scissors') {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                return;
            } else {
                //only other choice is rock vs paper 
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            } 
        } 
        if (playerChoice === 'paper') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                return;
            } else {
                //only other choice is paper vs scissors 
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }

        if (playerChoice === 'scissors') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                return;
            } else {
                //only other choice is scissors vs rock
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }
    };

    //calling all inner functions 
    startGame(); 
    playMatch();
};

//call game function 
game();