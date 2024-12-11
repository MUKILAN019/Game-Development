const cardArray = [
    {
        name: 'dog',
        img: './images/Dog.avif'
    },
    {
        name: 'cat',
        img: './images/cat.jpg'
    },
    {
        name: 'snake',
        img: './images/snake.jpg'
    },
    {
        name: 'donkey',
        img: './images/donkey.avif'
    },
    {
        name: 'pig',
        img: './images/pig.avif'
    },
    {
        name: 'rat',
        img: './images/rat.jpg'
    },
    {
        name: 'rabbit',
        img: './images/rabbit.jpg'
    },
    {
        name: 'dog',
        img: './images/Dog.avif'
    },
    {
        name: 'cat',
        img: './images/cat.jpg'
    },
    {
        name: 'snake',
        img: './images/snake.jpg'
    },
    {
        name: 'donkey',
        img: './images/donkey.avif'
    },
    {
        name: 'pig',
        img: './images/pig.avif'
    },
    {
        name: 'rat',
        img: './images/rat.jpg'
    },
    {
        name: 'rabbit',
        img: './images/rabbit.jpg'
    }
];


cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector('#grid');
 
const result = document.querySelector('#result')

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', './images/cover.jpg'); 
        card.setAttribute('data-id', i); 
        card.addEventListener('click', flipCard); 
        grid.appendChild(card);
    }
}

var cardChosen = []
var cardChosenIds = []

function flipCard() {
    const cardId = this.getAttribute('data-id'); 
    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);
    console.log(cardChosen);
    console.log(cardChosenIds);
    this.setAttribute('src', cardArray[cardId].img);
    console.log(cardChosen)
    if(cardChosen.length ===2){
        setTimeout(checkMatch,500)
    }
}
const cardWon = []
function checkMatch(){
     const cards = document.querySelectorAll('img')
     const optionOneId = cardChosenIds[0]
     const optionTwoId = cardChosenIds[1]
     console.log('checking....')
     if(optionOneId === optionTwoId){
        cards[optionOneId].setAttribute('src','images/cover.jpg')
        cards[optionTwoId].setAttribute('src','images/cover.jpg')
        alert('You have clicked the same images ')
     }
     if (cardChosen[0]==cardChosen[1]){
        alert('You found a match')
        cards[optionOneId].setAttribute('src','images/white.jpg')
        cards[optionTwoId].setAttribute('src','images/white.jpg')
        cards[optionOneId].removeEventListener('click',flipCard)
        cards[optionTwoId].removeEventListener('click',flipCard)
        cardWon.push(cardChosen)
     }else{
        cards[optionOneId].setAttribute('src','images/cover.jpg')
        cards[optionTwoId].setAttribute('src','images/cover.jpg')
     }
     result.textContent = cardWon.length
     cardChosen=[]
     cardChosenIds=[]

     if(cardWon.length==(cardArray.length/2)){
         result.textContent = 'Congratulations you found them all!'
     }
}


createBoard();
