/* Global Variables */
const url = 'http://localhost:3000/api/products/';
const itemsBox = document.getElementById('cart__items');
let cart;

// Check if localStorage is empty.
if(!localStorage.getItem('basket')) {
  cart = new Array();
} else {
  cart = JSON.parse(localStorage.getItem('basket'));
}
//console.log(cart);

// Get all Kanap products.
fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    // Change page title
    let titlePage = document.getElementsByTagName('title')[0];
    titlePage.innerHTML = `${cart.length} articles dans votre panier | Kanap`;
    //console.log(data);
    let totalPrice = 0;
    let myDivTotalQte = document.getElementById('totalQuantity');
    let myDivTotalPrice = document.getElementById('totalPrice');
    // Loop on all article in basket
    for(let v in cart)
    {
      //console.log(`Article ${v}: ${cart[v][0]}`);
      // Loop on all product
      for(let i in data)
      {
        if(data[i]._id == cart[v][0]) {
          //console.log(`Kanap ${i}: ${data[i]._id}`);
          //console.log('==> '+data[i].name);
          let myTotalPrice = 0;
          // Insert here HTML
          // Create article Tag
          let myArticle = document.createElement('article');
          myArticle.setAttribute('class', 'cart__item');
          myArticle.setAttribute('data-id', data[i]._id);
          myArticle.setAttribute('data-color', cart[v][2]);
          itemsBox.appendChild(myArticle);
          // Create div image
          let myDivImg = document.createElement('div');
          myDivImg.setAttribute('class', 'cart__item__img');
          // Create image Tag
          let myImage = document.createElement('img');
          myImage.setAttribute('src', data[i].imageUrl);
          myImage.setAttribute('alt', data[i].altTxt);
          myDivImg.appendChild(myImage);
          myArticle.appendChild(myDivImg);

          // Create div content
          let myContent = document.createElement('div');
          myContent.setAttribute('class', 'cart__item__content');
          // Create div description
          let myDescription = document.createElement('div');
          myDescription.setAttribute('class', 'cart__item__content__description');
          // Create title product
          let myTitle = document.createElement('h2');
          myTitle.innerHTML = data[i].name;
          // Create color product
          let myColor = document.createElement('p');
          myColor.innerHTML = cart[v][2];
          // Create price product
          let myPrice = document.createElement('p');
          myPrice.innerHTML = data[i].price+'€';
          myDescription.appendChild(myTitle);
          myDescription.appendChild(myColor);
          myDescription.appendChild(myPrice);
          myContent.appendChild(myDescription);

          // Create div settings
          let myDivSettings = document.createElement('div');
          myDivSettings.setAttribute('class', 'cart__item__content__settings');
          // Create div quantity
          let myDivQuantity = document.createElement('div');
          myDivQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
          myDivSettings.appendChild(myDivQuantity);

          let myQte = document.createElement('p');
          myQte.innerHTML = 'Qté : '
          myDivQuantity.appendChild(myQte);

          myTotalPrice = cart[v][1]*data[i].price;
          let myInputQte = document.createElement('input');
          myInputQte.setAttribute('type', 'number');
          myInputQte.setAttribute('class', 'itemQuantity');
          myInputQte.setAttribute('name', 'itemQuantity');
          myInputQte.setAttribute('min', '1');
          myInputQte.setAttribute('max', '100');
          myInputQte.setAttribute('value', cart[v][1]);
          myInputQte.addEventListener('change', (e) => {
            // Reset totalprice
            totalPrice = totalPrice-myTotalPrice;
            // Change value in localStorage ...
            cart[v][1] = myInputQte.value;
            localStorage.setItem('basket', JSON.stringify(cart));
            // Update totals
            //console.log(`Price total for ${cart[v][1]} = ${cart[v][1]*data[i].price}€`);
            myTotalPrice = cart[v][1]*data[i].price;
            totalPrice = totalPrice+myTotalPrice;
            myDivTotalPrice.innerHTML = totalPrice;
          });
          myDivQuantity.appendChild(myInputQte);

          // Create Div delete
          let myDivDelete = document.createElement('div');
          myDivDelete.setAttribute('class', 'cart__item__content__settings__delete');
          let myDelete = document.createElement('p');
          myDelete.setAttribute('class', 'deleteItem');
          myDelete.innerHTML = 'Supprimer';
          myDelete.addEventListener('click', (e) => {
            // Get element for delete
            let myItem = e.target;
            var item = myItem.closest("article");
            // Reset totalprice
            totalPrice = totalPrice-myTotalPrice;
            // Delete item
            cart.splice(v);
            localStorage.setItem('basket', JSON.stringify(cart));
            item.remove();
            // Update totals
            myTotalPrice = 0;
            totalPrice = totalPrice+myTotalPrice;
            myDivTotalQte.innerHTML = cart.length;
            myDivTotalPrice.innerHTML = totalPrice;
            titlePage.innerHTML = `${cart.length} articles dans votre panier | Kanap`;
          });
          myDivDelete.appendChild(myDelete);
          myDivSettings.appendChild(myDivDelete);

          myArticle.appendChild(myContent);
          myContent.appendChild(myDivSettings);

          totalPrice += cart[v][1]*data[i].price;
        }
      }
    }
    // Insert Totals
    myDivTotalQte.innerHTML = cart.length;
    myDivTotalPrice.innerHTML = totalPrice;
  })
  .catch(function(err) {
    // Une erreur est survenue
    console.log("Error : "+err);
  });