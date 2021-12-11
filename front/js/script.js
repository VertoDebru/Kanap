/* Global Variables */
const url = 'http://localhost:3000/api/products/';
const itemsBox = document.getElementById('items');

// Get all Kanap products.
fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    // Boucle sur tous les produits de Kanap.
    for(let i in data) {
      let article = data[i];
      // Creation du lien de l'article.
      let myLink = document.createElement("a");
      myLink.setAttribute("href", `./product.html?id=${article._id}`);
      myLink.innerHTML = `<article><img src="${article.imageUrl}" alt="${article.altTxt}"><h3 class="productName">${article.name}</h3><p class="productDescription">${article.description}</p></article>`;
      // Insertion du lien dans le parent.
      itemsBox.appendChild(myLink);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue.
    console.log("Error : "+err);
  });