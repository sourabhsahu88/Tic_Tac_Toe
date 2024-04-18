const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const xWin = document.querySelector(".X-win");
const yWin = document.querySelector(".Y-win");
const winnerClass = document.querySelector(".hidden");
const resetBtn = document.querySelector(".magic");

let currentPlayer;
let gameGrid;
let player=["X","O"];

const wininingPosition=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

initGame();

//intialising function 
function initGame(){
    currentPlayer = player[Math.floor(Math.random()*2)];
    gameGrid = ["","","","","","","","",""];
    //update on UI
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";

    });

    boxes.forEach((box,index)=>{
      box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `current player - ${currentPlayer}`;
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer="O"
    }
    else{
        currentPlayer="X" 
    }
    gameInfo.innerText = `current player - ${currentPlayer}`;
}

function checkGameOver(){
   let winner = "";
   wininingPosition.forEach((position)=>{
       
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]]!=="")
         &&(gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))
        {
           //check winnner
           if(gameGrid[position[0]]==="X"){
              winner="X"
           }
           else{
              winner="O"
           }

           //if we found winner
           boxes.forEach((box)=>{
            box.style.pointerEvents = "none";
           });

           //highlight the winning set of boxes
           boxes[position[0]].classList.add("win");
           boxes[position[1]].classList.add("win");
           boxes[position[2]].classList.add("win");
        }
   });
  
   resetBtn.classList.add("active");

   //if we have a winner
   if(winner !== ""){
      gameInfo.innerText = `winner player - ${winner}`;
      newGameBtn.classList.add("active");
      winnerClass.classList.add("active");

      if(winner==="X"){
         let value = parseInt(xWin.innerText);
         value=value+1;
         xWin.innerText=value;
      }
      else{
         let value = parseInt(yWin.innerText);
         value=value+1;
         yWin.innerText=value;
      }
      return;
   }

   //check for tie
   let fillCount=0;
   gameGrid.forEach((box)=>{
      if(box !=="")
      fillCount++;
   });

  if(fillCount === 9){
    gameInfo.innerText = 'game tied!';
    newGameBtn.classList.add("active");
    winnerClass.classList.add("active");
  }

}


function handleClick(index){
   if(gameGrid[index]===""){
      boxes[index].innerText = currentPlayer;
      gameGrid[index] = currentPlayer;
      boxes[index].style.pointerEvents = "none";
      //swap turn
      swapTurn();
      //check game over or not
      checkGameOver();
   } 
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
      handleClick(index);
    });
});

newGameBtn.addEventListener("click",initGame);

resetBtn.addEventListener("click",()=>{
   winnerClass.classList.remove("active");
 
   let value1 = parseInt(xWin.innerText);
   value1=0;
   xWin.innerText=value1;

   let value2 = parseInt(yWin.innerText);
   value2=0;
   yWin.innerText=value2;

   initGame();
   resetBtn.classList.remove("active");

});
