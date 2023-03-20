const highScoresList = document.getElementsByClassName('.highScoreList');
const highScores = JSON.parse(localStorage.getItem('highscores')) || [];

highScores.map(score =>{
    console.log(`<li class="high-score">${score.name}-${score.score}</li>`);
})