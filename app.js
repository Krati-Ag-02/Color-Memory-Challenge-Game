let userseq=[];
let gameseq=[];
let level=0;
let started=false;
let btns=["red","pink","yellow","blue"];
let highestscore=0;

document.addEventListener("keypress",function(){
    if(started==false){
        
        started=true;
        levelup();
    }
});


let h2=document.querySelector("h2");

function levelup(){
  userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randidx=Math.floor(Math.random()*4);
    let randcolor=btns[randidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    
 btnflash(randbtn);
}

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);

}
function btnpress(){
    let btn=this;
    btnflash(btn);

    let usercolor=btn.getAttribute("id");
    userseq.push(usercolor);

   
    checkseq(userseq.length-1);

}

function checkseq(idx){
   
    if(gameseq[idx]==userseq[idx])
    {
        if(gameseq.length==userseq.length)
            setTimeout(levelup,1000);
    }
    else{
        if(highestscore<level)
            highestscore=level;
    h2.innerHTML=`Game Over!!<br>Your score was ${level}||||Highest score is ${highestscore}<br>Press any key to restart.`;
    
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },150)
    reset();
    }
}


let allbtn=document.querySelectorAll(".btn"); 
for(let btn of allbtn){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    userseq=[];
    gameseq=[];
    level=0;
}


// Get the modal, button, and close button
let modal = document.getElementById("rules-modal");
let btn = document.getElementById("rules-btn");
let closeBtn = document.getElementsByClassName("close-btn")[0];

// Open the modal when the user clicks on the "Game Rules" button
btn.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the user clicks the "X" button
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
