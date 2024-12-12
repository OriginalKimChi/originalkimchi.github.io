const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const firstScore = localStorage.getItem('firstScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 80;

getScore();

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

function getScore() {
    if (mostRecentScore >= MAX_HIGH_SCORES) {
        scoreTextHigh.innerText = "Congratuation!\nYou are familiar with Nottingham Forest FC's sustainability policy.";
        scoreTextLow.style = "display : none";
        if (firstScore >= MAX_HIGH_SCORES) {
            couponGuide.style = "display : inline; color: black; text-align: center; margin-bottom: 30px;";
            generateBarcode();
        }
    } else {
        scoreTextHigh.style = "display : none";
    }
    finalScore.innerText = mostRecentScore + "/100";
}

function generateBarcode() {
    JsBarcode("#barcode", '123124531451767', {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: false
    });
}

function viewInfos() {
    window.location.href = "./informations.html";
};

function goHome() {
    window.location.href = "./index.html";
};