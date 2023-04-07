console.log('js is running')

//Variable Resource
const well = document.getElementById('well');
const wellContainer = document.getElementById('ingredients-container');
const shaker = document.getElementById('shaker');
const shakerContents = document.createElement('div')
const bartop = document.getElementById('bar-top');

const startBtn = document.getElementById('start');
const pleaseBtn = document.getElementById('please');
const shakeBtn = document.getElementById('shake');
const resetBtn = document.getElementById('reset');
const searchBtn = document.getElementById('search');
const clearBtn = document.getElementById('clear');

let cocktails = [];
let baseArray = ['Vodka', 'Gin', 'Tequila', 'Whiskey', 'Rum'];


//Fetch for cocktail files and start Happy Hour Countdown
fetch("http://localhost:3000/Cocktails")
.then(resp => resp.json())
.then(data => { 
    cocktails = data //stores all cocktails into array
    countDownClock();
})

//MIX A DRINK FEATURE

//Handles Start Mixing Button
startBtn.addEventListener('click', () => {
    renderBaseLiquor(baseArray);
    startBtn.hidden = true; //hides initial buttons from Well
    searchBtn.hidden = true;
})

//Render Base Liquor buttons to Well
function renderBaseLiquor(array) {
    let h3Well = document.createElement('h3');
    h3Well.textContent = 'Pick your POISON...';
    wellContainer.append(h3Well);
    
    let h3Shaker = document.createElement('h3');
    h3Shaker.textContent = '...and drop here.';
    shaker.append(h3Shaker, shakerContents);
    
    renderDraggables(array) //Renders the draggable base liquors to the Well
}

//Renders Draggable Buttons to the DOM
function renderDraggables(array) {
    let btnDiv = document.createElement('div');
    array.forEach((item) => {
        let btn = document.createElement('button');
        btn.textContent = item;
        btn.draggable = true; //enables draggability
        btn.classList.add('draggables')
        btn.setAttribute('id', `${item}`);

        btn.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id); //sets data that will make button transferable
            setTimeout(() => {e.target.hidden = true;}) //hides button being dragged from the display while in transit
        }, 0)        
        
        btnDiv.append(btn)
    })
    wellContainer.append(btnDiv);
}

//SETS DRAG AND DROP EVENTS

//Dropzone Drag functions
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

//adds dragenter, dragleave, and dragover to dropzones
addDragEvents(well); 
addDragEvents(shaker);

//adds drop events to dropzones
well.addEventListener('drop', (e) => {
    e.target.classList.remove('dragover');
    const id = e.dataTransfer.getData('text/plain'); //retrieves transferable data and sets it to variable so button can be identified
    const draggable = document.getElementById(id); //finds the button by Id and sets it to variable for access
    draggable.hidden = false; //unhides the button from being displayed

    wellContainer.appendChild(draggable);
})

shaker.addEventListener('drop', (e) => {
    e.target.classList.remove('dragover');

    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.hidden = false;
    
    //If statement to make sure Id of what is being dragged is one of the base liquors
    if (baseArray.includes(id)) {
        wellContainer.innerHTML = ""; //clears container holding first draggables so ingredients can replace it
        draggable.draggable = false; //locks in the base liquor button for easier identification later
        let ingredients = grabIngredients(id); //finds ingredients specific only to drinks with base liquor
        renderIngredients(ingredients); //renders ingreident section to well
    };
    
    shakerContents.appendChild(draggable);
})

//Grabs unique indredients for each drink by base liquor
function grabIngredients(liquor) {
    let ingredients = [];
    let drinks = cocktails.filter(cocktail => cocktail.base === liquor); //filters through cocktails to find only ones matching base liquor
    
    //checks each drink to find ingredients as long as they are 'strings' and pushes them to array
    drinks.forEach((drink) => {
        if (typeof drink.ingredient1 === 'string') {
        ingredients.push(drink.ingredient1)
        };
        
        if (typeof drink.ingredient2 === 'string') {
            ingredients.push(drink.ingredient2)
        };
    })

    ingredients = new Set(ingredients); //condenses array to remove duplicates
    return ingredients;
}

//Renders ingredient buttons to Well once Base liquor is selected
function renderIngredients(array) {
    let h3 = document.createElement('h3');
    h3.textContent = 'Pick 2 Ingredients';
    wellContainer.append(h3);
    
    renderDraggables(array);
}

//SHAKE BUTTON

//Handles SHAKE button and Bartop Card Rendering
shakeBtn.addEventListener('click', renderBartop);

//Renders Drink to Bartop
function renderBartop() {
    let shakerIngredients = [];
    let shakerElements = shaker.querySelectorAll('button'); //grabs and stores each "ingredient" from shaker
    
    //grabs the text content and pushes it into array
    shakerElements.forEach((element) => {
        shakerIngredients.push(element.textContent);
    })
    
    //Finds drinks only associated with base liquor in shaker, since it was locked, base will always be index 0
    let drinksByBase = cocktails.filter(cocktail => cocktail.base === shakerIngredients[0]);
    
    //Finds matching drink based on ingrdients
    let matchingDrink = drinksByBase.find((drink) => {
        let values = Object.values(drink); //grabs values from drink obj for easier iteration

        if (shakerIngredients.length === 2) {
            if (values.includes(shakerIngredients[1])){
                return drink;
            }
        } else if (values.includes(shakerIngredients[1]) && values.includes(shakerIngredients[2])) {
            return drink;
        }
    })
    
    resetWell(); //resets well and shaker
    renderDrinkToBartop(matchingDrink); //renders card for matching drink to bar top
}

//Renders Full details to bartop card
function renderDrinkToBartop(cocktail) {
    bartop.innerHTML = ""; //resets bartop if card is present

    if (cocktail) { //makes sure cocktail is a valid selection
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
        
    } else { //If drink is not valid, message will display
        let h4 = document.createElement('h4');
        h4.textContent = 'How creative!  Unfortunately, we will be unable to serve you your fine concoction at this time.  Hit reset to try again!'

        bartop.append(h4);
    }
}

//SURPRISE ME BUTTON

pleaseBtn.addEventListener('click', () => {
    let id = Math.floor(Math.random() * 26) //sets random number 1 - 25
    let randomCocktail = cocktails.find(cocktail => cocktail.id === id); //finds cocktail via random id #
    
    renderDrinkToBartop(randomCocktail);
    resetWell();
});

//RESET BUTTON

resetBtn.addEventListener('click', () => {
    resetWell();
    bartop.innerHTML = "";
})

//Clears the shaker and resets the well to base liquor draggables
function resetWell(){
    shaker.innerHTML = "";
    shakerContents.innerHTML = "";
    wellContainer.innerHTML = "";
    
    form.hidden = true;
    clearBtn.hidden = true;
    startBtn.hidden = false;
    searchBtn.hidden = false;
};

//COUNTDOWN CLOCK

let clock = document.getElementById('countdown');

function countDownClock() {
        let today = new Date();
        let countDownDate = today.setHours(17, 0, 0);
        let now = new Date().getTime();
        let timeLeft;

        if (countDownDate - now < 0) {
            countDownDate = countDownDate + (1000 * 60 * 60 * 24);
            timeLeft = countDownDate - now; 
        } else {
            timeLeft = countDownDate - now;
        }
        
        let hours = Math.floor(timeLeft % (1000 * 60 * 60 *24) / (1000 * 60 * 60))
        let minutes = Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60))
        let seconds = Math.floor(timeLeft % (1000 * 60) / 1000)
        
        clock.textContent = `${hours}hrs, ${minutes}min and ${seconds}sec left 'till happy hour!`
        setInterval(countDownClock, 1000);
}

//SEARCH BAR - CLEAR BUTTON

let form = document.getElementById('search-form');

//hides initial button and unhides form buttons
searchBtn.addEventListener('click', () => {
    startBtn.hidden = true;
    searchBtn.hidden = true;
    form.hidden = false;
    clearBtn.hidden = false;
});

//Submits value in search bar and matches it to correct cocktail
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let input = e.target.text.value;
    let rawInput = input.trim().toLowerCase();

    let matchingDrink = cocktails.find((cocktail) => rawInput === cocktail.name.toLowerCase());
    renderDrinkToBartop(matchingDrink);
})

//Clears bartop and resets form
clearBtn.addEventListener('click', () => {
    bartop.innerHTML = "";
    form.reset();
})