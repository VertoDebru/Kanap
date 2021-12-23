/* Global Variables */
const urlParams = new URLSearchParams(document.location.search);
const urlAPI = "http://localhost:3000/api/products/";
const itemsBox = document.getElementById("cart__items");
const myDivTotalQte = document.getElementById("totalQuantity");
const myDivTotalPrice = document.getElementById("totalPrice");
const btnOrder = document.getElementById("order");

// Si on est la page confirmation.html
if(urlParams.has("id")) {
    let orderId = urlParams.get("id");
    let spanId = document.getElementById("orderId");
    spanId.textContent = orderId;
// Si il s'agit de la page cart.html
} else {
    // Initialise la page cart.html
    loadProducts();
}

/* *********** *
 *  Fonctions  *
 * *********** */
// Chargement et mise en page.
function loadProducts() {
  fetch(urlAPI).then((res) => {
    if (res.ok) return res.json();
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
    if(localStorage.getItem('basket')) {
      myCart = JSON.parse(localStorage.getItem('basket'));
    }
    return myCart;
  }
  else return console.log("Browser not support localStorage!");
}
/* *********** */