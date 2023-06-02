document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0 //so first div in our grid
  let appleIndex = 0 //so first div in our grid
  let currentSnake = [2,1,0] 
  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0
  let prevAppleIndex = -1
  let forbiddenDirection = "ArrowLeft"

  //to start, and restart the game
  function startGame() {
    currentSnake = [2,1,0]
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
    randomApple()
  }


  //function that deals with ALL the ove outcomes of the Snake
  function moveOutcomes() {

    checkSnakeDeath();

    const tail = currentSnake.pop() //removes last ite of the array and shows it
    squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

    snakeGetsApple(tail);

    squares[currentSnake[0]].classList.add('snake')
  }

  //deals with snake getting apple
  function snakeGetsApple(tail){
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
  }

  //deals with snake hitting border and snake hitting self
  function checkSnakeDeath(){
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      alert("GAME OVER! Your Score: " + score)
      return clearInterval(interval) //this will clear the interval if any of the above happen
    }
  }


  //generate new apple once apple is eaten
  function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake') || appleIndex === prevAppleIndex ) //making sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple')
    prevAppleIndex = appleIndex
  }


  //assign functions to keycodes
  function control(e) {
    if(e.code === "ArrowRight" && forbiddenDirection !== "ArrowRight") {
      direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
      forbiddenDirection = "ArrowLeft"
    } else if (e.code === "ArrowUp" && forbiddenDirection !== "ArrowUp") {
      direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      forbiddenDirection = "ArrowDown"
    } else if (e.code === "ArrowLeft" && forbiddenDirection !== "ArrowLeft") {
      direction = -1 // if we press left, the snake will go left one div
      forbiddenDirection = "ArrowRight"
    } else if (e.code === "ArrowDown" && forbiddenDirection !== "ArrowDown") {
      direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
      forbiddenDirection = "ArrowUp"
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})
