/* Global Variables */
const urlParams = new URLSearchParams(document.location.search);
const urlAPI = 'http://localhost:3000/api/products/'+urlParams.get("id");
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
  fetch(urlAPI).then((res) => {
    if (res.ok) return res.json();
  })
  .then((data) => {
    new Myproduct(data).Set();
  })
  .catch((err) => {
    console.error(err);
  });
}
/* *********** */