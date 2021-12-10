/* Global Variables */
const productId = new URLSearchParams(document.location.search).get('id');
const url = 'http://localhost:3000/api/products/'+productId;
let cart;

// Check if localStorage is empty.
if(!localStorage.getItem('basket')) {
  cart = new Array();
} else {
  cart = JSON.parse(localStorage.getItem('basket'));
}
console.log(cart);

// Get all Kanap products.
fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    // Change page title
    let titlePage = document.getElementsByTagName('title')[0];
    titlePage.innerHTML = value.name;

    // Insert image product
    let imageDiv = document.getElementsByClassName('item__img')[0];
    let image = document.createElement('img');
    image.setAttribute('src', value.imageUrl);
    image.setAttribute('alt', value.altTxt);
    imageDiv.appendChild(image);

    // Insert name product
    let titleProduct = document.getElementById('title');
    titleProduct.innerHTML = value.name;

    // Insert price product
    let priceProduct = document.getElementById('price');
    priceProduct.innerHTML = value.price;
    
    // Insert description product
    let descProduct = document.getElementById('description');
    descProduct.innerHTML = value.description;

    // Insert color product in option
    let colorsProduct = document.getElementById('colors');
    // Loop on all colors.
    for(let i = 0; i < value.colors.length; i++) {
      // Add option
      let newOption = document.createElement('option');
      let optionText = document.createTextNode(value.colors[i]);
      newOption.appendChild(optionText);
      // and option value
      newOption.setAttribute('value', value.colors[i]);
      colorsProduct.appendChild(newOption);
    }

    // Insert action on button
    let btn = document.getElementById('addToCart');
    btn.setAttribute('onclick', 'AddInCart("'+productId+'")');
  })
  .catch(function(err) {
    // Une erreur est survenue
    console.log("Error : "+err);
  });

// Add in cart
function AddInCart(id) {
  let quantity = document.getElementById('quantity');
  let color = document.getElementById('colors');

  // Si le panier est vide
  if(!cart.length) {
    console.log('Add article.');
    cart.push([id,quantity.value,color.value]);
    localStorage.setItem('basket', JSON.stringify(cart));
  } else {
    let exist = false;
    console.log('No empty cart.');
    for(let i = 0; i < cart.length; i++) {
      if(cart[i][0] == id) {
        console.log('Id exist in cart...');
        if(cart[i][2] == color.value) {
          console.log(cart[i][0]+' already exist in '+color.value+'!');
          console.log('No add article!');
          exist = true;
        }
      }
    }
    if(!exist) {
      console.log('Add article.');
      cart.push([id,quantity.value,color.value]);
      localStorage.setItem('basket', JSON.stringify(cart));
    }
  }

  //localStorage.setItem('basket', JSON.stringify(cart));

  // Get an array from local storage

  // Retrieve the array from local storage
  //var array = localStorage.getItem('myArray');
  // Parse it to something usable in js
  //array = JSON.parse(array);

  console.log(localStorage.getItem('basket'));
}