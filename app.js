
let userSeq=[], gameSeq=[], level=0, started=false, difficulty=800;
const btns = ["red","blue","pink","yellow","green","orange","purple","cyan"];
const levelTitle = document.getElementById("level-title");
const highScoreDisplay = document.getElementById("high-score");
let highestScore = localStorage.getItem("simonHighScore") || 0;
highScoreDisplay.textContent = highestScore;

const allBtns = document.querySelectorAll(".btn");
document.getElementById("difficulty").addEventListener("change", e=>difficulty=Number(e.target.value));
document.addEventListener("keypress", ()=>{ if(!started) startGame(); });

allBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        const color = btn.id;
        userSeq.push(color);
        animatePress(color);
        checkAnswer(userSeq.length-1);
    });
});

function startGame(){
    level=0; gameSeq=[]; userSeq=[]; started=true;
    nextSequence();
}

function nextSequence(){
    userSeq=[];
    level++;
    levelTitle.textContent = `Level ${level}`;
    const randColor = btns[Math.floor(Math.random()*btns.length)];
    gameSeq.push(randColor);
    gameSeq.forEach((color,i)=> setTimeout(()=> animatePress(color), difficulty*i));
}

function animatePress(color){
    const btn = document.getElementById(color);
    btn.classList.add("flash");
    setTimeout(()=> btn.classList.remove("flash"), 300);
}

function checkAnswer(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length) setTimeout(nextSequence, 500);
    } else {
        document.body.style.background = "#ff4d4d";
        setTimeout(()=> document.body.style.background = "#1e3c72", 300);
        if(level-1 > highestScore){
            highestScore = level-1;
            localStorage.setItem("simonHighScore", highestScore);
            highScoreDisplay.textContent = highestScore;
        }
        levelTitle.innerHTML = `Game Over!<br>Score: ${level-1}<br>Press any key to restart`;
        started=false; level=0; gameSeq=[]; userSeq=[];
    }
}

// Modal
const rulesModal = document.getElementById("rules-modal");
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.querySelector(".close-btn");
rulesBtn.onclick = ()=> rulesModal.style.display="flex";
closeBtn.onclick = ()=> rulesModal.style.display="none";
window.onclick = e=>{ if(e.target===rulesModal) rulesModal.style.display="none"; }

