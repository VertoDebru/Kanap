/* Global Variables */
const productId = new URLSearchParams(document.location.search).get('id');
const url = 'http://localhost:3000/api/products/'+productId;
const titlePage = document.getElementsByTagName('title')[0];

const titleProduct = document.getElementById('title');
const priceProduct = document.getElementById('price');
const descProduct = document.getElementById('description');
const colorsProduct = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const btn = document.getElementById('addToCart');
// Initialise le panier.
let cart;
// Verifie si localStorage est vide.
if(!localStorage.getItem("basket")) {
  cart = new Array();
} else {
  cart = JSON.parse(localStorage.getItem("basket"));
}

// Recupere tous les produits de Kanap.
fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    console.log(data);
    // Appel de la fonction SetProduct()
    SetProduct(data);
    // Appel d'autres fonctions.
    SetActionButton(data);
  })
  .catch(function(err) {
    // Une erreur est survenue
    console.log("Error : "+err);
  });

// Fonction pour inserer les infos du produit sur la page HTML.
function SetProduct(data) {
    // Modifie le titre de la page.
    titlePage.innerHTML = data.name;
    // Insertion de l'image du produit.
    let imageDiv = document.getElementsByClassName('item__img')[0];
    imageDiv.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    // Insertion du nom du produit.
    titleProduct.textContent = data.name;
    // Insertion du prix du produit.
    priceProduct.textContent = data.price;
    // Insertion de la description du produit.
    descProduct.textContent = data.description;
    // Boucle sur toutes les couleurs du produit.
    for(let i = 0; i < data.colors.length; i++) {
      // Insertion de la couleur.
      let newOption = document.createElement('option');
      newOption.setAttribute('value', data.colors[i]);
      let optionText = document.createTextNode(data.colors[i]);
      // Insertion du texte de la couleur 
      newOption.appendChild(optionText);
      // Insertion de la couleur dans le menu deroulant.
      colorsProduct.appendChild(newOption);
    }
}

// Fonction pour inserer l'evenement sur le bouton.
function SetActionButton(data) {
  // Ajout de l'evenement sur le bouton.
  btn.addEventListener("click", (e) => {
    /* Bugs : - Add & Edit
     *        D : if product exists in cart edit quantity and add one more article. ( view loop in cart )
     * ************* */
    // N.B : Manque d'affichage d'informations a la validation du formulaire.
    // Verifie si les champs formulaire sont bien rempli.
    if(!colorsProduct.value) {
      console.log("Aucune couleur!");
      // Selection de la couleur par défaut.
      colorsProduct.value = data.colors[0];
    }
    if(quantity.value <= 0) {
      console.log("Aucune quantité!");
      // Selection de la quantité par défaut.
      quantity.value = 1;
    }
    // Verifie si le panier n'est pas vide.
    if(cart.length) {
      // Boucle sur les produits dans le panier. (BUGS HERE)
      for(let i in cart) {
        // Si le produit est dans le panier.
        if(cart[i][0] == data._id && cart[i][2] == colorsProduct.value) {
          console.log(`Debug : ${data.name} in ${colorsProduct.value} exists in cart.`);
          // Mise a jour de la quantité (Quantité actuelle + Quantité souhaité).
          cart[i][1] = parseInt(cart[i][1])+parseInt(quantity.value);
          // Mise a jour du panier local.
          localStorage.setItem('basket', JSON.stringify(cart));
          console.log(`Information : La quantité de ${data.name} en ${colorsProduct.value} à été modifié aux nombre de ${cart[i][1]}.`);
        } else if(cart[i][0] == data._id) {
          if(cart[i][2] != colorsProduct.value) {
            console.log(`Debug : ${data.name} in ${colorsProduct.value} no exists in cart.`);
            cart.push([data._id,quantity.value,colorsProduct.value]);
            // Mise a jour du panier local.
            localStorage.setItem('basket', JSON.stringify(cart));
            console.log(`Debug : ${data.name} in ${colorsProduct.value} adding in cart.`);
          }
        } else {
          console.log(`Debug : ${data.name} in ${colorsProduct.value} add in cart.`);
          cart.push([data._id,quantity.value,colorsProduct.value]);
          // Mise a jour du panier local.
          localStorage.setItem('basket', JSON.stringify(cart));
          console.log(`Information : ${quantity.value} ${data.name} en ${colorsProduct.value} ajoutés au panier.`);
        }
      }
    }
    // Verifie si le panier est vide.
    if(!cart.length) {
      cart.push([data._id,quantity.value,colorsProduct.value]);
      // Mise a jour du panier local.
      localStorage.setItem('basket', JSON.stringify(cart));
      console.log(`Information : ${quantity.value} ${data.name} en ${colorsProduct.value} ajoutés au panier.`);
    }
    console.log(cart);
  });
}