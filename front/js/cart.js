/* Global Variables */
const url = "http://localhost:3000/api/products/";
const itemsBox = document.getElementById("cart__items");
const myDivTotalQte = document.getElementById("totalQuantity");
const myDivTotalPrice = document.getElementById("totalPrice");
const btnOrder = document.getElementById("order");
const isOrder = new URLSearchParams(document.location.search).has('firstName');

// Initialise la page cart.html
loadProducts();

/* *********** *
 *  Fonctions  *
 * *********** */
// Chargement et mise en page.
function loadProducts() {
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    // Appel de la class MyProduct.
    new Mycart(data).Set();
  })
  .catch((err) => {
    // Une erreur est survenue
    console.error(err);
  });
}

// Fonction pour initialiser le panier.
function CheckCart() {
  // Verifie si localStorage est actif sur le navigateur.
  if (typeof(Storage) !== "undefined") {
    let myCart = [];
    // Verifie si localStorage est vide.
    if(localStorage.getItem('basket')) {
      myCart = JSON.parse(localStorage.getItem('basket'));
    }
    return myCart;
  }
  else return console.log("Browser not support localStorage!");
}
/* *********** */