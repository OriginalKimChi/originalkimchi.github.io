const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let loadedQuestions = [];
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        if (localStorage.getItem('firstScore') == null) {
            localStorage.setItem('firstScore', score);    
        }
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

try {
    loadedQuestions = [
        
        {
            "question": "What renewable energy source powers Nottingham Forest's Fan Zone??",
            "correct_answer": "Solar Panels",
            "incorrect_answers": [
                "Wind Turbines",
                "Hydroelectric Power",
                "GerGeothermal Energyms"
            ]
        },
        {
            "question": "Approximately how much energy does the Fan Zone's solar canopy generate annually?",
            "correct_answer": "12,000 kWh",
            "incorrect_answers": [
                "5,000 kWh",
                "8,000 kWh",
                "15,000 kWh"
            ]
        },
        {
            "question": "Which energy company has partnered with Nottingham Forest to enhance sustainability?",
            "correct_answer": "E.ON",
            "incorrect_answers": [
                "Octopus Energy",
                "Bulb",
                "Shell Energy"
            ]
        },
        {
            "question": "What certification has Nottingham Forest pledged towards in its sustainability efforts?",
            "correct_answer": "Carbon Neutral Now",
            "incorrect_answers": [
                "Energy Positive Club",
                "Net Zero Heroes",
                "Green Alliance"
            ]
        },
        {
            "question": "Which single-use plastic items have been eliminated from Nottingham Forest's stadium to reduce plastic waste?",
            "correct_answer": "All of the others",
            "incorrect_answers": [
                "Straws and cutlery",
                "Cups and stirrers",
                "Sauce sachets"
            ]
        },
        {
            "question": "How does Nottingham Forest's Community Trust contribute to sustainability?",
            "correct_answer": "Engaging over 94,000 local participants in community support sessions",
            "incorrect_answers": [
                "Hosting environmental workshops",
                "Installing wind turbines",
                "Offering discounts on eco-friendly products"
            ]
        },
        {
            "question": "Which organization recognized Nottingham Forest's commitment to sustainability by featuring their initiatives?",
            "correct_answer": "BBC Sport",
            "incorrect_answers": [
                "The Guardian",
                "Sky Sports",
                "The Independent"
            ]
        },
        {
            "question": "What is the expected capacity of the new City Ground stadium after redevelopment?",
            "correct_answer": "50,000 seats",
            "incorrect_answers": [
                "30,000 seats",
                "60,000 seats",
                "40,000 seats"
            ]
        },
        {
            "question": "What innovative feature inspired by the Qatar World Cup has been added to The City Ground?",
            "correct_answer": "Hospitality pods made from shipping containers",
            "incorrect_answers": [
                "Retractable roof",
                "Underground heating system",
                "LED pitch lighting"
            ]
        },
        {
            "question": "How has Nottingham Forest addressed waste management in its sustainability policies?",
            "correct_answer": "All of the others",
            "incorrect_answers": [
                "Implemented zero-waste initiatives",
                "Introduced comprehensive recycling programs",
                "Banned single-use plastics"
            ]
        },
        {
            "question": "Which global framework has Nottingham Forest joined for climate action?",
            "correct_answer": "UN Sports for Climate Action",
            "incorrect_answers": [
                "Green Alliance for Football",
                "Global Sustainability Pact",
                "None"
            ]
        },
        {
            "question": "Which stand at The City Ground is planned to be replaced with a two-tiered structure as part of the redevelopment?",
            "correct_answer": "Peter Taylor Stand",
            "incorrect_answers": [
                "Bridgford Stand",
                "Brian Clough Stand",
                "Trent End"
            ]
        }
    ];

    questions = loadedQuestions.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
            formattedQuestion['choice' + (index + 1)] = choice;
        });

        return formattedQuestion;
    });

    startGame();
} catch (error) {
    console.error(error);
}
