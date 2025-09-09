// ------------- Particle Background -----------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ["#ff4d4d","#4d4dff","#ff4da6","#ffff4d","#4dff4d","#ffb84d","#9b4dff","#4dffff"];
function initParticles(){
    particles = [];
    for(let i=0;i<200;i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            radius: Math.random()*2+1,
            dx: (Math.random()-0.5)*0.5,
            dy: (Math.random()-0.5)*0.5,
            color: colors[Math.floor(Math.random()*colors.length)]
        });
    }
}
function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
    });
    requestAnimationFrame(animateParticles);
}
initParticles(); animateParticles();
window.addEventListener('resize', ()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; initParticles(); });

// ------------- Simon Game Logic -----------------
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
