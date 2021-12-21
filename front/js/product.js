/* Global Variables */
const productId = new URLSearchParams(document.location.search).get('id');
const url = 'http://localhost:3000/api/products/'+productId;
const titleProduct = document.getElementById('title');
const priceProduct = document.getElementById('price');
const descProduct = document.getElementById('description');
const colorsProduct = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const addButton = document.getElementById('addToCart');

// Initialise la page product.html
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
    new MyProduct(data).Set();
  })
  .catch((err) => {
    // Une erreur est survenue
    console.error(err);
  });
}
/* *********** */