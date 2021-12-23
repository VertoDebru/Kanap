class Myproduct {
    constructor(data) {
        this.data = data;
        this.cart = CheckCart();
    }

    // Mise en page du produit.
    Set() {
        // Modifie le titre de la page.
        document.title = this.data.name;
        // Insertion de l'image du produit.
        let imageDiv = document.getElementsByClassName('item__img')[0];
        imageDiv.innerHTML = `<img src="${this.data.imageUrl}" alt="${this.data.altTxt}">`;

        // Insertion des details du produit.
        titleProduct.textContent = this.data.name;
        priceProduct.textContent = this.data.price;
        descProduct.textContent = this.data.description;

        // Boucle sur toutes les couleurs du produit.
        for(let i = 0; i < this.data.colors.length; i++) {
            // Insertion de la couleur.
            let newOption = document.createElement('option');
            newOption.setAttribute('value', this.data.colors[i]);
            let optionText = document.createTextNode(this.data.colors[i]);
            // Insertion du texte de la couleur 
            newOption.appendChild(optionText);
            // Insertion de la couleur dans le menu deroulant.
            colorsProduct.appendChild(newOption);
        }
        // Définition de la valeur par defaut pour la quantité.
        quantity.value = 1;
        // Ajout de l'evenement sur le bouton.
        addButton.addEventListener("click", () => {
            this.checkForm();
        });
    }

    // Verification du formulaire.
    checkForm() {
        // Verifie si les champs formulaire sont bien rempli.
        if(!colorsProduct.value) {
            alert("Aucune couleur défini!");
            colorsProduct.focus();
        }
        if(quantity.value <= 0) {
            alert("Aucune quantité défini!");
            quantity.focus();
        }
        // Verifie si le formulaire est bien rempli.
        if(colorsProduct.value && quantity.value >= 1) {
            // Si le panier est vide, on ajoute le produit.
            if(this.isEmptyCart()) {
                this.addProduct();
            // Si le panier contient des articles.
            } else {
                // Si le produit est deja present dans le panier.
                if(this.checkInCart(this.data._id)) {
                    let articleId = this.getArticleId(this.data._id);
                    // Si on recois un identifiant.
                    if(articleId) {
                        // Boucle sur tous les produits contenu dans le panier.
                        for(let i in this.cart)
                            if(i == articleId) this.editProduct(i);
                    // Si on recois aucun identifiant.
                    } else {
                        this.addProduct();
                    }
                // Si le produit n'est pas dans le panier.
                } else {
                    this.addProduct();
                }
            }
        }
    }

    // Ajout d'un produit dans le panier.
    addProduct() {
        // On ajoute un nouveau produit au panier.
        this.cart.push([this.data._id,parseInt(quantity.value),colorsProduct.value]);
        localStorage.setItem('basket', JSON.stringify(this.cart));
        alert(`${quantity.value} ${this.data.name} en ${colorsProduct.value} ajouté au panier.`);
        return;
    }

    // Modification de la quantité du produit.
    editProduct(Id) {
        // Mise a jour de la quantité. (Quantité actuelle + Quantité souhaité)
        this.cart[Id][1] = parseInt(this.cart[Id][1])+parseInt(quantity.value);
        localStorage.setItem('basket', JSON.stringify(this.cart));
        alert(`${quantity.value} ${this.data.name} en ${colorsProduct.value} à été rajouté. (Actuellement : ${this.cart[Id][1]})`);
        return;
    }

    // Recupere l'identifiant de l'article
    // Selon l'Id et la couleur.
    getArticleId(Id) {
        for(let i in this.cart) {
            if(this.cart[i][0] == Id && this.cart[i][2] == colorsProduct.value) return i;
        }
    }
    
    // Verifie si un produit existe dans le panier. (Renvoi: true/false)
    checkInCart(Id) {
        for(let i in CheckCart()) {
            if(CheckCart()[i][0] == Id) return true;
        }
        return false;
    }

    // Verifie si le panier est vide. (Renvoi : true/false)
    isEmptyCart() {
        if(!this.cart.length)
            return true;
        else
            return false;
    }
}