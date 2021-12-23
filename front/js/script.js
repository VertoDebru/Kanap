/* Global Variables */
const url = 'http://localhost:3000/api/products/';
const itemsBox = document.getElementById('items');

// Initialise la page index.html
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
    data.forEach(product => {
      // Creation du lien de l'article.
      let myLink = document.createElement("a");
      myLink.setAttribute("href", `./product.html?id=${product._id}`);
      myLink.innerHTML = `<article><img src="${product.imageUrl}" alt="${product.altTxt}"><h3 class="productName">${product.name}</h3><p class="productDescription">${product.description}</p></article>`;
      itemsBox.appendChild(myLink);
    });
  })
  .catch((err) => {
    console.error(err);
  });
}
/* *********** */