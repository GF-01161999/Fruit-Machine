//Mr Seagull Wrote this - IT IS AWESOMMMMMMMEEEEEEEEEEE

const spinBtn = document.getElementById("start");
const balanceDisplay = document.getElementById("balanceDisplay");
const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2"); 
const r3 = document.getElementById("r3");
const userMsg = document.getElementById("user-message");
let status = document.getElementById("status");
let betBal = document.getElementById("bet-amount");
let incBet = document.getElementById("increase");
let decBet = document.getElementById("decrease");


//Set balance to 500
let balance = 500;
let bet = 1;

// Increase bet by one token
const increaseBet = () =>{
    if(bet < 100){
        bet += 1;
        betBal.textContent = bet
    } else {
        userMsg.textContent = "You may not bet any more!" 
    }
};

incBet.addEventListener("click", () =>{
    increaseBet();
})

// Decrease bet by 1 token - if bet = 1, then we cannot decrement any lower. Otherwise, it is okay.
const decreaseBet = () =>{
    if(bet == 1){
        userMsg.textContent = "You may not decrease your bet any further!"
    } else {
        bet -= 1;
        betBal.textContent = bet
    }
}; 

decBet.addEventListener("click", () => { 
    decreaseBet();
})

function loser(){
    status.style.display = "flex"
    status.src = "images/Fail.png"
}

function winner(){
    console.log(balance)
    status.style.display = "flex"
    if (r1.getAttribute("src") == "images/Cherry.png") {
        balance += bet * 2
    } else if(r1.getAttribute("src") == "images/Grapes.png"){
        balance += bet * 2
    } else if(r1.getAttribute("src") == "images/Lemon.png"){
        balance += bet * 3
    } else if(r1.getAttribute("src") == "images/Orange.png"){
        balance += bet * 6
    } else if(r1.getAttribute("src") == "images/Strawberry.png"){
        balance += bet * 5
    } else if(r1.getAttribute("src") == "images/Watermelon.png"){
        balance += bet * 4
    }
    status.src = "images/BigWin.png"
    console.log(balance)
}

function spin(){
    balance -= bet
    //alert(bet)
    let final = []
    final.push(spinReel(r1))
    final.push(spinReel(r2))
    final.push(spinReel(r3))
    let winning = final[0] == final[1] && final[0] == final[2]
    //Check if the reels match up by checking 1 and 0 & 0 and 2
        if(winning){
            winner()
        } else {
            loser()
        }
    updateBalance()
}    

function spinReel(reel){
    let i = Math.floor(Math.random()*6)
    if (i == 0){
        reel.src = "images/Cherry.png"
    }
    if (i == 1){
        reel.src = "images/Grapes.png"
    }
    if (i == 2){
        reel.src = "images/Lemon.png"
    }
    if (i == 3){
        reel.src = "images/Orange.png"
    }
    if (i == 4){
        reel.src = "images/Strawberry.png"
    }
    if (i == 5){
        reel.src = "images/Watermelon.png"
    }
    return i
}

const updateBalance = () => {
    balanceDisplay.innerHTML = balance
};

spinBtn.addEventListener("click", () => {
    spin();
});