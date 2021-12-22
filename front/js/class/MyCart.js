class Mycart {
    constructor(data) {
        this.data = data;
        this.cart = CheckCart();
        this.totalPrice = 0;
    }

    // Mise en page du panier.
    Set() {
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
        console.log(this.data[productId].name);
        // Calcul le prix total de l'article selon le nombre de quantité.
        let myTotalPrice = this.cart[articleId][1]*this.data[productId].price;
        console.log(`${this.data[productId].name} * ${this.cart[articleId][1]} = ${myTotalPrice}`);
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
        // Ajout de l'evenement.
        this.addEvent(articleId,inputQuantity);
        // Creation du contenu des options de suppression.
        let divDelete = document.createElement("div");
        divDelete.classList.add("cart__item__content__settings__delete");
        // Creation du paragraphe de suppression.
        let pDelete = document.createElement("p");
        pDelete.classList.add("deleteItem");
        pDelete.textContent = "Supprimer";
        // Ajout de l'evenement.
        this.addEvent(articleId,pDelete);
        // Insertion du paragraphe dans les options de suppression.
        divDelete.appendChild(pDelete);

        // Insertion de l'article.
        itemsBox.appendChild(tagArticle);
        // Insertion de l'image dans son DIV.
        divImage.appendChild(tagImage);
        // Insertion du contenu de la description.
        divContent.appendChild(divDescription);
        // Insertion des options.
        divContent.appendChild(divSettings);
        // Insertion de la quantité dans les options.
        divSettings.appendChild(divQuantity);
        // Insertion de la suppression dans les options.
        divSettings.appendChild(divDelete);

        // Insertion des elements de l'image dans l'article.
        tagArticle.appendChild(divImage);
        // Insertion du contenu dans l'article
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
                console.log("Delete article!");
                // Mise a jour du panier.
                this.cart.splice(articleId,1);
                localStorage.setItem("basket", JSON.stringify(this.cart));
                // Mise a jour du titre de la page.
                document.title = `${this.cart.length} articles dans votre panier | Kanap`;
                // Calcul le prix total de l'article selon le nombre de quantité.
                let myTotalPrice = this.cart[articleId][1]*this.data[productId].price;
                // Mise a jour du prix total du panier.
                this.totalPrice -= myTotalPrice;
                // Mise a jour de l'affichage.
                myDivTotalQte.innerHTML = this.cart.length;
                myDivTotalPrice.innerHTML = this.totalPrice;
                // Recupere l'article a supprimer et le supprime.
                e.target.closest("article").remove();
                // Si le panier est vide on affiche l'information.
                if(this.isEmptyCart()) {
                    itemsBox.innerHTML = "<p>Votre panier est vide.</p>";
                    // Modifie le titre de la page.
                    document.title = `Votre panier est vide. | Kanap`;
                    // Cache le formulaire de commande.
                    document.getElementsByClassName("cart__order")[0].setAttribute("style", "display:none");
                }
            });
        }
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