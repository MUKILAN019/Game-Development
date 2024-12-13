const grid = document.querySelector('.grid')
const score = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
const userStart = [230,10]
let currentPosition = userStart
let timerId
let xD = 2
let yD = 2
let scores = 0
const ballStart = [270, 40]
let ballCurrentPosition = ballStart

class Block{
    constructor(xA,yA){
        this.bottomLeft = [xA, yA]
        this.bottomRight = [xA + blockWidth, yA]
        this.topLeft = [xA, yA + blockHeight]
        this.topRight = [xA + blockWidth, yA + blockHeight] 
    }
}

const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),

]

console.log(blocks)

function addBlocks(){
    for(let i=0;i<blocks.length;i++){
        const block =  document.createElement('div');
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

//add user

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user

function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball 
function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'   
}

// Move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if (currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move ball

function moveBall(){
     ballCurrentPosition[0] += xD
     ballCurrentPosition[1] += yD
     drawBall()
     checkCollisions()
}

timerId = setInterval(moveBall, 20)

// check for collisions

function checkCollisions(){
    //block collisions
    for(let i=0;i<blocks.length;i++){
        if (
            (ballCurrentPosition[0]> blocks[i].bottomLeft[0] && ballCurrentPosition[0]<blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1]<blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            scores++
            score.innerHTML = scores

            //check win

            if(blocks.length==0){
                score.innerHTML = 'You Win'
                alert('You win '+ scores)
                clearInterval(timerId)
                document.removeEventListener('keydown',moveUser)
            }
        }
    }
    if(ballCurrentPosition[0]>=(boardWidth - ballDiameter) || ballCurrentPosition[1]>=(boardHeight - ballDiameter)
    || ballCurrentPosition[0]<= 0){
        changeDirection()
    }

    //check for user collisions
    if(ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0]< currentPosition[0]+blockWidth
        && ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1]+ blockHeight
    ){
     changeDirection()
    }
    //check for game over
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId)
        score.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection(){
   if(xD ===2 && yD===2){
    yD = -2
    return
   }
   if(xD === 2 && yD === -2){
    xD = -2
    return
   }
   if(xD === -2 && yD === -2 ){
    yD = 2
    return
   }
   if(xD ===-2 && yD ===2){
    xD = 2
    return 
   }
}
