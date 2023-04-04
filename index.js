console.log('js is running')

//Variable Resource
const well = document.getElementById('well');
const startBtn = document.getElementById('start');
let cocktails = [];
let baseArray = ['Vodka', 'Gin', 'Tequila', 'Whiskey', 'Rum'];
let ingredientArray = ['Triple Sec', 'Campari', 'Vermouth', 'Bitters', 'Lemon Juice', 'Lime Juice', 'Ginger Beer', 'Sugar', 'Grapefruit', 'Cranberry', 'Pineapple', 'Mint', 'Grenadine', 'Honey', 'Sparkling Wine', 'Tomato Juice'];

//Fetch for cocktail files and assignment to a variable
fetch("http://localhost:3000/Cocktails")
.then(resp => resp.json())
.then(data => {cocktails = data})

//startBtn.addEventListener()