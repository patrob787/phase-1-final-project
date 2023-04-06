console.log('js is running')

//Variable Resource
const well = document.getElementById('well');
const shaker = document.getElementById('shaker');
const shakerContents = document.createElement('div')
const bartop = document.getElementById('bar-top');
const startBtn = document.getElementById('start');
const pleaseBtn = document.getElementById('please');
const shakeBtn = document.getElementById('shake');
const resetBtn = document.getElementById('reset');

let cocktails = [];
let baseArray = ['Vodka', 'Gin', 'Tequila', 'Whiskey', 'Rum'];


//Fetch for cocktail files and manipulate data
fetch("http://localhost:3000/Cocktails")
.then(resp => resp.json())
.then(data => { cocktails = data })


//BUTTONS

//Handles Start Button
startBtn.addEventListener('click', () => {
    renderBaseLiquor(baseArray);
    startBtn.hidden = true;
})

//Handles Bartop Rendering
shakeBtn.addEventListener('click', renderBartop);

//Handles Randomizer
pleaseBtn.addEventListener('click', () => {
    let id = Math.floor(Math.random() * 26)
    let randomCocktail = cocktails.find(cocktail => cocktail.id === id);

    renderDrinkToBartop(randomCocktail);
    resetWell();
});

//Handles Reset
resetBtn.addEventListener('click', () => {
    resetWell();
    bartop.innerHTML = "";
})


//SETS DRAG AND DROP EVENTS

addDragEvents(well);
addDragEvents(shaker);

well.addEventListener('drop', (e) => {
    e.target.classList.remove('dragover');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.hidden = false;

    well.appendChild(draggable);
})


shaker.addEventListener('drop', (e) => {
    e.target.classList.remove('dragover');

    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.hidden = false;
    
    if (baseArray.includes(id)) {
        well.innerHTML = "";
        draggable.draggable = false;
        let ingredients = grabIngredients(id);
        renderIngredients(ingredients);
    };
    
    shakerContents.appendChild(draggable);
})


//FUNCTION LIBRARY

//Render Base Liquor buttons to Well
function renderBaseLiquor(array) {
    let h3Well = document.createElement('h3');
    h3Well.textContent = 'Pick your POISON...';
    well.append(h3Well);

    let h3Shaker = document.createElement('h3');
    h3Shaker.textContent = '...and drop here.';
    
    shaker.append(h3Shaker, shakerContents);
    
    renderDraggables(array)
}

//Renders ingredient buttons to Well once Base liquor is selected
function renderIngredients(array) {
    let h3 = document.createElement('h3');
    h3.textContent = 'Pick 2 Ingredients';
    well.append(h3);
    
    renderDraggables(array);
}

//Render Draggables
function renderDraggables(array) {
    let btnDiv = document.createElement('div');
    array.forEach((item) => {
        let btn = document.createElement('button');
        btn.textContent = item;
        btn.draggable = true;
        btn.classList.add('draggables')
        btn.setAttribute('id', `${item}`);

        btn.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.target.classList.add('enroute');
            setTimeout(() => {e.target.hidden = true;})
        }, 0)        
        
        btnDiv.append(btn)
    })
    well.append(btnDiv);
}

//Grabs unique indredients for each drink by base liquor
function grabIngredients(liquor) {
    let ingredients = [];
    let drinks = cocktails.filter(cocktail => cocktail.base === liquor);
    drinks.forEach((drink) => {
        if (typeof drink.ingredient1 === 'string') {
        ingredients.push(drink.ingredient1)
        };
        
        if (typeof drink.ingredient2 === 'string') {
            ingredients.push(drink.ingredient2)
        };
    })

    ingredients = new Set(ingredients);
    return ingredients;
}

//Drag and Drop functions
function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('dragover')
};

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('dragover')
};

function dragLeave(e) {
    e.target.classList.remove('dragover')
};

function addDragEvents(div) {
div.addEventListener('dragenter', dragEnter);
div.addEventListener('dragover', dragOver);
div.addEventListener('dragleave', dragLeave);
};

//Renders Drink to Bartop
function renderBartop() {
    let shakerIngredients = [];
    let shakerElements = shaker.querySelectorAll('button');
    shakerElements.forEach((element) => {
        shakerIngredients.push(element.textContent);
    })
    
    let drinksByBase = cocktails.filter(cocktail => cocktail.base === shakerIngredients[0]);
    
    let matchingDrink = drinksByBase.find((drink) => {
        let values = Object.values(drink);

        if (shakerIngredients.length === 2) {
            if (values.includes(shakerIngredients[1])){
                return drink;
            }
        } else if (values.includes(shakerIngredients[1]) && values.includes(shakerIngredients[2])) {
            return drink;
        }
    })
    
    resetWell();
    renderDrinkToBartop(matchingDrink);
}

//Renders Full details to bartop div
function renderDrinkToBartop(cocktail) {
    bartop.innerHTML = "";

    if (cocktail) {
        let nameBaseDiv = document.createElement('div');
        let combineDiv = document.createElement('div');

        let name = document.createElement('h4');
        let img = document.createElement('img')
        let base = document.createElement('p');
        let desc = document.createElement('p');

        name.textContent = cocktail.name;
        img.src = cocktail.image;
        base.textContent = `Base Liquor: ${cocktail.base}`;
        desc.textContent = `Description: ${cocktail.description}`;

        nameBaseDiv.append(name, base);
        combineDiv.append(nameBaseDiv, img);

        bartop.append(combineDiv, desc);
        
    } else {
        let h4 = document.createElement('h4');
        h4.textContent = 'How creative!  Unfortunately, we will be unable to serve you your fine concoction at this time.  Hit reset to try again!'

        bartop.append(h4);
    }
}

//Clears the shaker and resets the well to base liquor draggables
function resetWell(){
    well.innerHTML = "";
    shaker.innerHTML = "";
    shakerContents.innerHTML = "";
    renderBaseLiquor(baseArray);
};