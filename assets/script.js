//Creating a functional quiz
//Use Local Storage for highscore
//Use event.preventDefault() to avoid page resetting
//Maybe use Javascript to create new pages?
//localStorage.setItem() stores an item 
//JSON.stringify can convert an object to a string
//JSON.parse() can convert a string back into an object.

//STEP ONE: Get a functioning quiz. DONE
//STEP TWO: Include a start screen. DONE
//STEP THREE: Create a timer and include lose conditions
//STEP FOUR: Wrong answers subtract time.
//STEP FIVE: Input and save name and score.
//EXTRA STEP: Include confirmations/responses to user input. Hover effects, pop-ups for wrong answers and reduced time, 'game over' screen.

//Ojbect conataining an array of the quiz questions.
const quizData = [
    {
        question: 'Who loves Orange Soda?',
        a:'Mike loves orange soda!',
        b:'Kenan loves orange soda!',
        c:'Ben loves orange soda!',
        d:'Kel loves orange soda! I do! I do! I do-ooo!',
        correct: 'd'
    },
    {
        question: 'What movie is know for being on an orange VHS tape?',
        a:'Robo Cop',
        b:'Rugrats: In Paris',
        c:'Power Rangers',
        d:'Beetleborgs',
        correct: 'b'
    },
    {
        question: 'Who was the original evil power ranger?',
        a:'Tommy, the Green Ranger',
        b:'Trent, the White Ranger',
        c:'Mike, the Wolf Ranger',
        d:'Norman, the Purple Ranger',
        correct: 'a'
    },
    {
        question: 'What was the name of the show about three girls made in a lab?',
        a:'90210',
        b:'Rowdy Ruff Boyz',
        c:'Powerpuff Girls',
        d:'Buffy, The Vampire Slayer',
        correct: 'c'
    },
];

//DOM elements

const quiz = document.getElementById('quiz');
//the label element with the class name answer.
const answerEl = document.querySelectorAll('.answer');
//the H2 containing the question
const questionEl = document.querySelector('.question');
//the text for each answer choice
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
//Submit Button
const submitBtn = document.getElementById('submit');
//Start button
const startBtn = document.getElementById('start');

//Using this variable to choose from the quiz array.
let currentQuiz = 0;
let score = 0;
var answer;

//setting the quiz div element to be hidden
quiz.style.display = 'none';

//Timer variables.
var timer = {
    minutes: document.querySelector('.timer__part--minutes'),
    seconds: document.querySelector('.timer__part--seconds')
};
var time_El = document.querySelector('.timer');
var interval = null;
var remainingSeconds = 180;

time_El.style.display = 'none';
//Start and Update the timer
function startTimer()
{
    if(remainingSeconds === 0) 
    {
        return;
    }
    else
    {
        timer.interval = setInterval(() =>
        {
            remainingSeconds--;
            updateInterfaceTime();
            if(remainingSeconds === 0)
            {
                clearInterval(timer.interval);
                //Insert a call to a function
                //gameOver();
            }
        }, 1000);
    }
}

//Update the visible timer.
function updateInterfaceTime()
{
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    
    timer.minutes.textContent = minutes.toString().padStart(2, "0");
    timer.seconds.textContent = seconds.toString().padStart(2, "0");
}

//Load quiz with the first set of questions.
function loadQuiz()
{
    //setting the quiz element to be visible
    quiz.style.display = 'block';
    //setting the start screen to hidden
    startBtn.style.display = 'none';
    //make timer visible.
    time_El.style.display = 'block';
    //Make each choice empty
    deselectAnswers();
    //Using currentQuiz, pull the first question from the array quizData.
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers()
{
    //Start timer
    startTimer();
    answerEl.forEach(answerEl => answerEl.check = false)
}
//get the option selected
function getSelected()
{
    
    answerEl.forEach(answerEl => {
        if(answerEl.checked)
        {
            answer = answerEl.id;
        }
    })
    return answer;
}
//Submit button functionality
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if(answer)
    {
        //What to do if the answer submitted is correct
        if (answer === quizData[currentQuiz].correct) {
            score++;
            console.log('Correct!');
        }
        else //What happens if the submitted answer is wrong
        {
            remainingSeconds = remainingSeconds - 5; //SUPPOSED to take 5 seconds off the timer, but seems to only make it faster.
            console.log('Wrong answer! You lose 5 seconds of time!');
        }
        //Move to the next question.
        currentQuiz++;

        //Are we at the end os the quiz?
        if(currentQuiz < quizData.length)
        {
            loadQuiz();
        }
        else //Display the results
        {
            quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="location.reload()">Reload</button>`;
        }
    }
})