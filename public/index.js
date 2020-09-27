
//making a socket connection after client connect to the page//
window.addEventListener('DOMContentLoaded',function(){
    var socket = io('http://127.0.0.1:3000');
    socket.on('connect',function(){
        console.log('client connected au web socket server')
    })
 })

let ready = false;
let enemyReady = false;
let currentPlayer = 'user';
let score = 0;
/*
const readytoplay = document.querySelector('#ready');
readytoplay.addEventListener('click', startGame)
function startGame(){
    const socket = io();
      socket.on('player-number', num=>{
        if(num === -1){
          infoDisplay.innerHTML='sorry it full'
          }else{
            playerNumber = parseInt(num)
               if(playerNumber === 1) currentPlayer = "enemy"
                 console.log(playerNumber)
               }
      })
//another player has connected/:
    socket.on('player-connection', num =>{
        console.log(`Player Number ${num}has connected`)
          playerConnected(num)
})

function playerConnected(num){
    let player = `.z${parseInt(num) + 1}`
    document.querySelector(`${player} .connected span`).classList.toggle('violet')
    if (parseInt(num)=== playerNumber) document.querySelector(player).style.fontWeight='bold';
}
}

*/
//my colors cards//
const cardsColor = ["red","red","cadetblue","cadetblue","yellow","yellow","green","green","blue","blue","pink","pink","brown","brown","purple","purple","grey","grey"];
let cards = document.querySelectorAll("div");
//making an array from nodelist//
cards= Array.from(cards);

let activeCard = "";// card witch was clicked//
let activeCards = [];//two cards are stock here to be compare//
const gamePairs = cards.length/2;//nombre the pairs to see if the game is over//
let gameResult = 0;
const startTime = new Date().getTime();//timer//
let pointsPlayerOne=0;//points of the player will go here//
let pointsPlayerTwo=0;


const clickCard = function() {
activeCard = this;
if (activeCard == activeCards[0]) return;
activeCard.classList.remove("hidden");
if (activeCards.length === 0){
    activeCards[0]=activeCard;
    return;
}
else{
cards.forEach(card=> card.removeEventListener("click", clickCard))
activeCards[1] = activeCard;

setTimeout(function(){
    if (activeCards[0].className === activeCards[1].className)
    {
    console.log("Good job, you found the pair")
          activeCards.forEach(card =>card.classList.add("off"))
          if(gameResult == gamePairs){
              const endTime = new Date().getTime();
              const gameTime = (endTime - startTime)/1000;
              alert("Done ")
              location.reload();
        }
    }
    else{
    console.log("sorry it's not a pair")
          activeCards.forEach(card => card.classList.add("hidden"))
    }
    //the table is clean up and ready for another clicks//
          activeCard="";
          activeCards.length = 0;
          cards.forEach(card=> card.addEventListener("click",
           clickCard))
}, 1000)

}
function clikMsg(){
    var data = clickCard
    socket.emit('clik', data);
}
}

//preparing the game , random method whill shuffle the cards//
const init = function(){
    cards.forEach(card=>{
    const position = Math.floor(Math.random()*cardsColor.length);
    card.classList.add(cardsColor[position]);
    cardsColor.splice(position,1);
    })
    setTimeout(function(){
        cards.forEach(card=>{
            card.classList.add("hidden")
            card.addEventListener("click",clickCard)
        })
    },2000)
}

init()