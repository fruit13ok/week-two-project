// ask the following:
// how to refactor code that working with DOM? break code into function but limited by context scoope.
// how to pass context scoope? like where I clicked? from within callback function to globel?
// DOM remove element give me error. need to find out why? fix?
// need to understand more about how to get where I clicked? different ways / situation.

// https://www.w3schools.com/jsref/prop_win_localstorage.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// https://www.w3schools.com/tags/att_global_data.asp
// https://api.jquery.com/jquery.data/
// https://www.w3schools.com/jquery/eff_animate.asp
// https://api.jquery.com/animate/
var mgFoods = [
    {imgUrl: './images/mg_charcoal_egg.jpg', pText: 'charcoal egg', h4Price: 10},
    {imgUrl: './images/mg_clear_pie.jpg', pText: 'clear pie', h4Price: 11},
    {imgUrl: './images/mg_cocktail_gel.jpg', pText: 'cocktail gel', h4Price: 12},
    {imgUrl: './images/mg_liquid_popcorn.jpg', pText: 'liquid popcorn', h4Price: 13},
    {imgUrl: './images/mg_olive_gel.jpg', pText: 'olive gel', h4Price: 14}
];
var gmoFoods = [
    {imgUrl: './images/gmo_banana.jpg', pText: 'banana', h4Price: 15},
    {imgUrl: './images/gmo_carret.jpg', pText: 'carret', h4Price: 16},
    {imgUrl: './images/gmo_corn.jpg', pText: 'corn', h4Price: 17},
    {imgUrl: './images/gmo_watermelon.jpg', pText: 'watermelon', h4Price: 18},
    {imgUrl: './images/gmo_impossible_burger.png', pText: 'impossible burger', h4Price: 19}
];
var exFoods = [
    {imgUrl: './images/ex_balut.jpg', pText: 'balut', h4Price: 20},
    {imgUrl: './images/ex_casu_marzu.jpg', pText: 'casu marzu', h4Price: 21},
    {imgUrl: './images/ex_durian.jpg', pText: 'duria', h4Price: 22},
    {imgUrl: './images/ex_fugu.jpg', pText: 'fugu', h4Price: 23},
    {imgUrl: './images/ex_spider.jpg', pText: 'spider', h4Price: 24}
];

// arraies for food displaying in categories and in cart
var curFoods = [];
var curCart = [];
var totalPrice = 0 || parseInt(localStorage.totalPrice);

// locations of categories to populate images and cart to populate text
var categoriesPageSection = document.querySelector('body main section');
var cartPageSection = document.querySelector('body aside section');
var totalPriceP = document.querySelector('body aside nav p');
totalPriceP.innerText = 'Total: ' + totalPrice;

// select and listen to 4 buttons
var btnMolecularGastronomy = document.querySelector('#btnMG');
btnMolecularGastronomy.addEventListener('click', populateFood);
var btnGeneticallyModifiedOrganism = document.querySelector('#btnGMO');
btnGeneticallyModifiedOrganism.addEventListener('click', populateFood);
var btnExotic = document.querySelector('#btnEX');
btnExotic.addEventListener('click', populateFood);
var btnClearCart = document.querySelector('#btnClear');
btnClearCart.addEventListener('click', clearCart);

// populate Food, remove before populate, and start listen to food click
function populateFood(e){
    if(this.id === 'btnMG'){
        curFoods = mgFoods.slice();
    }else if(this.id === 'btnGMO'){
        curFoods = gmoFoods.slice();
    }else if(this.id === 'btnEX'){
        curFoods = exFoods.slice();
    }
    removeAllNodeFrom(categoriesPageSection);
    curFoods.forEach(function(food, index){
        addElementToCategoriesPage(food, index);
        $("div").fadeIn("slow");    //jquery effect
    });
    foodSelectListener();
}

// actully use DOM to add food items to the categories page
function addElementToCategoriesPage (obj, index) {
    // variables from object
    var imgUrl = obj.imgUrl;
    var pText = obj.pText;
    var h4Price = obj.h4Price;
    // create new element 
    var newDiv = document.createElement("div");
    var newDivImg = document.createElement("img");
    var newDivP = document.createElement("p");
    var newDivH4 = document.createElement("h4");
    // insert class to element
    newDiv.className += "card";
    newDiv.id = (pText);
    newDiv.style = "display:none";
    // set attribute to element
    newDivImg.setAttribute('src', imgUrl);
    // set text to p element
    newDivP.innerText = pText;
    // set data attribute to h4 element
    newDivH4.setAttribute('data-price', h4Price);
    newDivH4.innerText = "$ " + newDivH4.getAttribute('data-price');
    // append child to parent
    newDiv.appendChild(newDivImg);
    newDiv.appendChild(newDivP);
    newDiv.appendChild(newDivH4);
    categoriesPageSection.appendChild(newDiv);
}

// remove node from parent node
function removeAllNodeFrom(parentNode){
    parentNode.innerHTML = '';
}

// locate all element inside section with .card class
// add a click listener to each of them, and call addToCart function but don't invoke it
function foodSelectListener(){
    var cards = document.querySelectorAll('.card'); 
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', addToCart);
    }
}

// identify the clicked on food, add that food'd pText to cart, show it on the cart page
function addToCart (e) {
    // console.log(e);                         //see what event
    // console.log(e.target);                  //see line of code
    // console.log(e.target.nodeName);         //see element name
    // console.log(this.className);            //see its class
    // this.style.backgroundColor = "red";
    // console.log(this.id);                       //see selected id
    // console.log("Add to Cart: ", e)
    var clickedFood = curFoods.filter((food)=>{
         return (food.pText === this.id);
    }).pop();
    // console.log('clickedFood', clickedFood);
    curCart.push(clickedFood);
    // console.log('clickedFood',typeof clickedFood.h4Price);
    totalPrice += clickedFood.h4Price;
    
    totalPriceP.innerText = 'Total: ' + totalPrice;
    showCart();
    saveLocalData();
}

// remove what was showing, show the whole list to cart page
function showCart(){
    removeAllNodeFrom(cartPageSection);
    curCart.forEach(function(food, index){
        addToCartPage(food, index);
    });
}

// actully use DOM to add food name to the cart page
function addToCartPage(obj, index) {
    // variables from object
    var pText = obj.pText;
    var h4Price = obj.h4Price;
    // create new element 
    var newP = document.createElement("p");
    // insert id to element
    newP.id = pText;
    newP.setAttribute('data-price2', h4Price);
    // set text to p element
    newP.innerText = pText + " $" + h4Price;
    // append child to parent
    cartPageSection.appendChild(newP);
}

// use Event Delegation for items inside the cart
cartPageSection.addEventListener('click', function(e) {
    var child = e.target
    var i = 0;
    while( (child = child.previousSibling) != null ){
        i++;
    } 
    if(e.target && e.target.nodeName == 'P'){
        totalPrice -= parseInt(e.target.getAttribute('data-price2'));
        totalPriceP.innerText = 'Total: ' + totalPrice;
        curCart.splice(i, 1);
        e.target.remove();
        saveLocalData();
    }
});

function clearCart(){
    cartPageSection.innerHTML = '';
    curCart = [];
    totalPrice = 0;
    totalPriceP.innerText = 'Total: ' + totalPrice;
    saveLocalData();
}

function saveLocalData(){
    if(typeof(Storage) !== "undefined") {
        if (localStorage.totalPrice) {
            localStorage.totalPrice = parseInt(totalPrice);
        } else {
            localStorage.totalPrice = 0;
        }
    }
}