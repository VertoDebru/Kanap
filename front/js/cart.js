/* Global Variables */
const url = "http://localhost:3000/api/products/";
const titlePage = document.getElementsByTagName("title")[0];
const itemsBox = document.getElementById("cart__items");
const myDivTotalQte = document.getElementById("totalQuantity");
const myDivTotalPrice = document.getElementById("totalPrice");
// Initialise le prix total du panier.
let totalPrice = 0;
// Initialise le panier.
let cart;
// Verifie si localStorage est vide.
if(!localStorage.getItem("basket")) {
  cart = new Array();
} else {
  cart = JSON.parse(localStorage.getItem("basket"));
}
// Modifie le titre de la page.
titlePage.innerHTML = `${cart.length} articles dans votre panier | Kanap`;
// Récupere tous les produits de Kanap.
fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    // Boucle sur tous les articles dans le panier.
    for(let v in cart)
    {
      // Boucle sur tous les produits de Kanap.
      for(let i in data)
      {
        // Si l'identifiant est égal a celui du produit du panier.
        if(data[i]._id == cart[v][0]) {
          // Initialise le prix total de l'article selon le nombre de quantité.
          let myTotalPrice = cart[v][1]*data[i].price;
          
          // Creation de la balise article.
          let myArticle = document.createElement("article");
          myArticle.classList.add("cart__item");
          myArticle.setAttribute("data-id", data[i]._id);
          myArticle.setAttribute("data-color", cart[v][2]);
          // Insertion de l'article dans la balise parent. 
          itemsBox.appendChild(myArticle);
          // Creation du bloc contenant l'image.
          let myDivImg = document.createElement("div");
          myDivImg.classList.add("cart__item__img");
          myDivImg.innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].altTxt}">`;
          // Insertion du bloc contenant l'image dans l'article.
          myArticle.appendChild(myDivImg);

          // Creation du bloc contenant les informations.
          let myContent = document.createElement("div");
          myContent.classList.add("cart__item__content");
          // Creation du bloc description.
          let myDescription = document.createElement("div");
          myDescription.classList.add("cart__item__content__description");
          // Insertion des éléments HTML.
          myDescription.innerHTML = `<h2>${data[i].name}</h2><p>${cart[v][2]}</p><p>${data[i].price}€</p>`;
          // Insertion du bloc description dans le bloc contenant les informations.
          myContent.appendChild(myDescription);

          // Creation du bloc contenant les options.
          let myDivSettings = document.createElement("div");
          myDivSettings.classList.add("cart__item__content__settings");
          // Creation du bloc contenant les options de quantité.
          let myDivQuantity = document.createElement("div");
          myDivQuantity.classList.add("cart__item__content__settings__quantity");
          myDivQuantity.innerHTML = "<p>Qté</p>";
          // Insertion du bloc quantité dans le bloc contenant les options.
          myDivSettings.appendChild(myDivQuantity);
          /* ----------------- *
           *  Option Quantity  *
           * ----------------- */
          // Creation de l'input pour modifier la quantité.
          let myInputQte = document.createElement("input");
          myInputQte.setAttribute("type", "number");
          myInputQte.setAttribute("class", "itemQuantity");
          myInputQte.setAttribute("name", "itemQuantity");
          myInputQte.setAttribute("min", "1");
          myInputQte.setAttribute("max", "100");
          myInputQte.setAttribute("value", cart[v][1]);
          // Ajout de l'evenement.
          myInputQte.addEventListener("change", (e) => {
            // Reinitialise le prix total du panier.
            totalPrice = totalPrice-myTotalPrice;
            // Mise a jour de la quantité selon la valeur du input.
            cart[v][1] = e.target.value;
            // Mise a jour du localStorage.
            localStorage.setItem("basket", JSON.stringify(cart));
            // Mise a jour du prix total de l'article selon la quantité.
            myTotalPrice = cart[v][1]*data[i].price;
            // Mise a jour du prix total du panier.
            totalPrice = totalPrice+myTotalPrice;
            // Mise a jour de l'affichage.
            myDivTotalPrice.innerHTML = totalPrice;
          });
          myDivQuantity.appendChild(myInputQte);
          /* ----------------- */

          /* --------------- *
           *  Option Delete  *
           * --------------- */
          // Creation du bloc contenant l'option "supprimer".
          let myDivDelete = document.createElement("div");
          myDivDelete.classList.add("cart__item__content__settings__delete");
          let myDelete = document.createElement("p");
          myDelete.classList.add("deleteItem");
          myDelete.textContent = "Supprimer";
          // Ajout de l'evenement.
          myDelete.addEventListener("click", (e) => {
            // Recupere l'article a supprimer et le supprime.
            e.target.closest("article").remove();
            // Mise a jour du panier.
            cart.splice(v);
            localStorage.setItem("basket", JSON.stringify(cart));
            // Mise a jour du titre de la page.
            titlePage.innerHTML = `${cart.length} articles dans votre panier | Kanap`;
            // Mise a jour du prix total du panier.
            totalPrice = totalPrice-myTotalPrice;
            // Mise a jour de l'affichage.
            myDivTotalQte.innerHTML = cart.length;
            myDivTotalPrice.innerHTML = totalPrice;
          });
          myDivDelete.appendChild(myDelete);
          myDivSettings.appendChild(myDivDelete);
          /* --------------- */
          myContent.appendChild(myDivSettings);
          myArticle.appendChild(myContent);
          // Mise a jour du prix total du panier.
          totalPrice += cart[v][1]*data[i].price;
        }
      }
    }
    // Mise a jour de l'affichage.
    myDivTotalQte.innerHTML = cart.length;
    myDivTotalPrice.innerHTML = totalPrice;
  })
  .catch(function(err) {
    // Une erreur est survenue.
    console.log("Error : "+err);
  });