/* Global Variables */
const productId = new URLSearchParams(document.location.search).get('id');
const url = 'http://localhost:3000/api/products/'+productId;
const titleProduct = document.getElementById('title');
const priceProduct = document.getElementById('price');
const descProduct = document.getElementById('description');
const colorsProduct = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const addButton = document.getElementById('addToCart');

// Recupere tous les produits de Kanap.
fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    // Appel de la class MyProduct.
    new MyProduct(data).Set();
  })
  .catch(function(err) {
    // Une erreur est survenue
    console.error(err);
  });

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

// Chargement des scripts
function loadClasses() {
  let scripts = [
      'MyCart',
      'MyProduct'
  ];
  scripts.forEach((script) => {
      $('footer').append('<script src="../js/class/' + script + '.js"></script>');
  });
}
loadClasses(); //Appel de la fonction