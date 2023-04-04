console.log('js is running')

//Variable Resource
const well = document.getElementById('well');
const shaker = document.getElementById('shaker');
const startBtn = document.getElementById('start');
const pleaseBtn = document.getElementById('please');
let cocktails = [];
let baseArray = ['Vodka', 'Gin', 'Tequila', 'Whiskey', 'Rum'];
let ingredientArray = ['Triple Sec', 'Campari', 'Vermouth', 'Bitters', 'Lemon Juice', 'Lime Juice', 'Ginger Beer', 'Sugar', 'Grapefruit', 'Cranberry', 'Pineapple', 'Mint', 'Grenadine', 'Honey', 'Sparkling Wine', 'Tomato Juice'];
let teqIngredients = [];
let whiskeyIngredients = [];
let vodkaIngredients = [];
let rumIngredients = [];
let ginIngredients = [];



//Fetch for cocktail files and manipulate data
fetch("http://localhost:3000/Cocktails")
.then(resp => resp.json())
.then(data => {
    cocktails = data
    
    teqIngredients = grabIngredients('Tequila');
    vodkaIngredients = grabIngredients('Vodka');
    rumIngredients = grabIngredients('Rum');
    ginIngredients = grabIngredients('Gin');
    whiskeyIngredients = grabIngredients('Whiskey');
})

startBtn.addEventListener('click', () => {
    renderBaseLiquor(baseArray);
    startBtn.hidden = true;
})



//Function Library

//Grabs unique indredients for each base
function grabIngredients(liquor) {
    let ingredients = [];
    let drinks = cocktails.filter(drink => drink.base === liquor);
    drinks.forEach((drink) => {
        ingredients.push(drink.ingredient1, drink.ingredient2)
    })
    ingredients = new Set(ingredients);
    return ingredients;
}

//Render Base Liquor buttons to Well
function renderBaseLiquor(array) {
    let h3 = document.createElement('h3');
    h3.textContent = 'Pick a Base';
    well.append(h3);
    
    array.forEach((item) => {
        let btn = document.createElement('button');
        btn.textContent = item;
        btn.draggable = true;
        btn.classList.add('draggables')
        btn.setAttribute('id', `${item}`);

        btn.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => {e.target.hidden = true;})
        }, 0)        

        well.append(btn);
    })
}

//Renders ingredient elements to well
function renderIngredients(array) {
    let h3 = document.createElement('h3');
    h3.textContent = 'Pick 2 Ingredients';
    well.append(h3);
    
    array.forEach((item) => {
        let btn = document.createElement('button');
        btn.textContent = item;
        btn.draggable = true;
        btn.classList.add('draggables')
        btn.setAttribute('id', `${item}`);

        btn.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => {e.target.hidden = true;})
        }, 0)        

        well.append(btn);
    })
}

//Drag and Drop functions
function dragEnter(e) {
    e.preventDefault();
};

function dragOver(e) {
    e.preventDefault();
};

function dragLeave(e) {
    //console.log(e)
};


//Make below into function
well.addEventListener('dragenter', dragEnter);
well.addEventListener('dragover', dragOver);
well.addEventListener('dragleave', dragLeave);

shaker.addEventListener('dragenter', dragEnter);
shaker.addEventListener('dragover', dragOver);
shaker.addEventListener('dragleave', dragLeave);

well.addEventListener('drop', (e) => {
    
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.hidden = false;
    e.target.appendChild(draggable);
})

shaker.addEventListener('drop', (e) => {
    
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.hidden = false;
    
    if (baseArray.includes(id)) {
        well.innerHTML = "";
        let ingredients = grabIngredients(id);
        renderIngredients(ingredients);
    };
    
    e.target.appendChild(draggable);
})