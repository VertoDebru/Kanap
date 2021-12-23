class Mycart {
    constructor(data) {
        this.data = data;
        this.cart = CheckCart();
        this.totalPrice = 0;
    }

    // Mise en page du panier.
    Set() {
        // Verifie si une commande est passée.
        this.postOrder();

        // Si le panier est vide.
        if(this.isEmptyCart()) {
            // Modifie le titre de la page.
            document.title = `Votre panier est vide. | Kanap`;
            // Affichage des informations.
            itemsBox.innerHTML = "<p>Votre panier est vide.</p>";
            myDivTotalQte.innerHTML = 0;
            myDivTotalPrice.innerHTML = this.totalPrice;
            // Cache le formulaire de commande.
            document.getElementsByClassName("cart__order")[0].setAttribute("style", "display:none");
        } else {
            // Boucle sur tous les articles du panier.
            for(let articleId in this.cart) {
                let productId = this.getProductId(articleId);
                // Si getProductId() renvoi un identifiant.
                if(productId) this.setArticle(articleId,productId);
            }
            // Affichage des informations.
            document.title = `${this.cart.length} articles dans votre panier | Kanap`;
            myDivTotalQte.innerHTML = this.cart.length;
            myDivTotalPrice.innerHTML = this.totalPrice;
        }
    }

    // Mise en page d'un article du panier.
    setArticle(articleId,productId) {
        // Calcul le prix total de l'article selon le nombre de quantité.
        let myTotalPrice = this.cart[articleId][1]*this.data[productId].price;

        /* ************** *
         *  Mise en page  *
         * ************** */
        // Creation de la balise 'article'.
        let tagArticle = document.createElement("article");
        tagArticle.classList.add("cart__item");
        tagArticle.setAttribute("data-id",this.data[productId]._id);
        tagArticle.setAttribute("data-color",this.cart[articleId][2]);
        // Creation des elements pour l'image.
        let divImage = document.createElement("div");
        divImage.classList.add("cart__item__img");
        // Creation de la balise 'img'.
        let tagImage = document.createElement("img");
        tagImage.setAttribute("src",this.data[productId].imageUrl);
        tagImage.setAttribute("alt",this.data[productId].altTxt);
        // Creation des elements du contenu.
        let divContent = document.createElement("div");
        divContent.classList.add("cart__item__content");
        // Creation du contenu de la description.
        let divDescription = document.createElement("div");
        divDescription.classList.add("cart__item__content__description");
        // Insertion des elements dans la description.
        divDescription.innerHTML = `<h2>${this.data[productId].name}</h2><p>${this.cart[articleId][2]}</p><p>${this.data[productId].price}€</p>`;
        // Creation des elements des options.
        let divSettings = document.createElement("div");
        divSettings.classList.add("cart__item__content__settings");
        // Creation du contenu des options de quantité.
        let divQuantity = document.createElement("div");
        divQuantity.classList.add("cart__item__content__settings__quantity");
        // Creation du paragraphe quantité.
        let pQuantity = document.createElement("p");
        pQuantity.textContent = "Qté : ";
        // Creation du input quantité.
        let inputQuantity = document.createElement("input");
        inputQuantity.classList.add("itemQuantity");
        inputQuantity.type = "number";
        inputQuantity.name = "itemQuantity";
        inputQuantity.setAttribute("min","1");
        inputQuantity.setAttribute("max","100");
        inputQuantity.setAttribute("value",this.cart[articleId][1]);
        // Insertion des elements dans les options de quantité.
        divQuantity.appendChild(pQuantity);
        divQuantity.appendChild(inputQuantity);
        // Creation du contenu des options de suppression.
        let divDelete = document.createElement("div");
        divDelete.classList.add("cart__item__content__settings__delete");
        // Creation du paragraphe de suppression.
        let pDelete = document.createElement("p");
        pDelete.classList.add("deleteItem");
        pDelete.textContent = "Supprimer";

        // Ajout des evenements.
        this.addEvent(articleId,inputQuantity);
        this.addEvent(articleId,pDelete);

        // Insertion des elements.
        divDelete.appendChild(pDelete);
        itemsBox.appendChild(tagArticle);
        divImage.appendChild(tagImage);
        divContent.appendChild(divDescription);
        divContent.appendChild(divSettings);
        divSettings.appendChild(divQuantity);
        divSettings.appendChild(divDelete);
        tagArticle.appendChild(divImage);
        tagArticle.appendChild(divContent);
        /* ************** */
        // Mise a jour du prix total du panier.
        this.totalPrice += myTotalPrice;
    }

    // Ajout des evenements sur les options.
    addEvent(articleId,element) {
        if(element.name == "itemQuantity") {
            element.addEventListener("change", (e) => {
                var productId = this.getProductId(articleId);
                // Calcul le prix total de l'article selon le nombre de quantité.
                let myTotalPrice = this.cart[articleId][1]*this.data[productId].price;
                // Reinitialise le prix total du panier.
                this.totalPrice -= myTotalPrice;
                // Modifie la quantité selon la valeur du input.
                this.cart[articleId][1] = parseInt(e.target.value);
                // Mise a jour du localStorage.
                localStorage.setItem("basket", JSON.stringify(this.cart));
                // Modifie le prix total de l'article selon la quantité.
                myTotalPrice = this.cart[articleId][1]*this.data[productId].price;
                // Mise a jour du prix total du panier.
                this.totalPrice += myTotalPrice;
                // Mise a jour de l'affichage.
                myDivTotalPrice.innerHTML = this.totalPrice;
            });
        } else {
            element.addEventListener("click", (e) => {
                var productId = this.getProductId(articleId);
                // Calcul le prix total de l'article selon le nombre de quantité.
                let myTotalPrice = this.cart[articleId][1]*this.data[productId].price;
                // Mise a jour du panier.
                this.cart.splice(articleId,1);
                localStorage.setItem("basket", JSON.stringify(this.cart));
                this.totalPrice -= myTotalPrice;
                // Mise a jour du titre de la page.
                document.title = `${this.cart.length} articles dans votre panier | Kanap`;
                // Mise a jour de l'affichage.
                myDivTotalQte.innerHTML = this.cart.length;
                myDivTotalPrice.innerHTML = this.totalPrice;
                // Recupere l'article a supprimer et le supprime.
                e.target.closest("article").remove();
                // Si le panier est vide on affiche l'information.
                if(this.isEmptyCart()) {
                    // Mise a jour de l'affichage.
                    itemsBox.innerHTML = "<p>Votre panier est vide.</p>";
                    document.title = `Votre panier est vide. | Kanap`;
                    // Cache le formulaire de commande.
                    document.getElementsByClassName("cart__order")[0].setAttribute("style", "display:none");
                }
                // Si le panier n'est pas vide.
                else window.location.reload();
            });
        }
    }
    
    // Traitement de la commande.
    postOrder() {
        // Le formulaire est envoyé par l'url
        if(urlParams.has('firstName')) {
            if(this.checkInfos()) this.sendOrder();
        }
    }

    // Envoie de la commande.
    sendOrder() {
        // Creation des informations pour l'envoi.
        let bodyOrder = {
            "contact": {
            "firstName": urlParams.get("firstName"),
            "lastName": urlParams.get("lastName"),
            "address": urlParams.get("address"),
            "city": urlParams.get("city"),
            "email": urlParams.get("email")
            },
            "products": this.getAllProductsId()
        }
        let urlOrder = "http://localhost:3000/api/products/order/";
        let initOrder = {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(bodyOrder)
        }
        // Envoi des informations.
        fetch(urlOrder, initOrder).then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((resOrder) => {
            localStorage.clear();
            window.location.href = `./../html/confirmation.html?id=${resOrder.orderId}`;
          })
          .catch((err) => {
            console.error(err);
          });
    }

    // Verification des informations.
    checkInfos() {
        let check = true;
        let urlParams = new URLSearchParams(document.location.search);
        urlParams.forEach((result, key) => {
            // Insertion des valeurs dans le formulaire.
            let myInput = document.getElementById(`${key}`);
            myInput.value = result;
            // Si il s'agit du parametre 'email'.
            if(key == "email") {
                let errorBox = document.getElementById(`${key}ErrorMsg`);
                // Email doit contenir commencer par des caracteres suivi d'@ puis des caracteres et termine avec un point et deux caracteres minimum.
                let regExp = new RegExp(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})/g);
                
                // Si le format ne correspond pas a une adresse email.
                if (!myInput.value.match(regExp)) {
                    document.getElementById(`${key}`).focus();
                    errorBox.textContent = "L'adresse email n'est pas correct! (exemple@test.com)";
                    check = false;
                }
            }
        });
        return check;
    }

    // Renvoi Array[ProductID]
    getAllProductsId() {
        let products = [];
        this.cart.forEach(article => {
            products.push(article[0]);
        });
        return products;
    }

    // Recupere l'identifiant de l'article
    // si il correspond a l'identifiant du produit.
    getProductId(Id) {
        for(let i in this.data) {
            if(this.data[i]._id == this.cart[Id][0]) return i;
        }
    }
    
    // Verifie si le panier est vide. (Renvoi : true/false)
    isEmptyCart() {
        if(!this.cart.length)
            return true;
        else
            return false;
    }
}