const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const firstScore = localStorage.getItem('firstScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 8;

getScore();

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

function getScore() {
    if (mostRecentScore >= MAX_HIGH_SCORES) {
        scoreTextHigh.innerHTML = "You Did It! A True Forest Fan. With a fantastic score of<br>" + 
            "<strong style='color: red;'> " + mostRecentScore + "/10 " + "</strong><br>" +
            "you’ve shown you truly know what Nottingham Forest FC stands for—on and off the pitch!";
        guide1.innerText = "Your passion for the Reds and sustainability makes a real difference. Let’s keep building a greener future together."
        guide2.innerText = "Want to stay ahead of the game? Learn more about our sustainability goals by visiting our official page."
        if (firstScore >= MAX_HIGH_SCORES) {
            couponGuide.style = "display : inline; color: black; text-align: center; margin-bottom: 30px;";
            generateBarcode();
        }
    } else {
        scoreTextHigh.innerHTML = "Thank You for Taking Part! You scored<br>" + 
            "<strong style='color: red;'> " + mostRecentScore + "/10 " + "</strong><br>" +
            "— just a little shy of earning a free drink this time.";
    }
    finalScore.innerText = mostRecentScore + "/10";
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