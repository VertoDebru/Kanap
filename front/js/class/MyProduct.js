class Myproduct {
    constructor(data) {
        this.data = data;
        this.cart = "";
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
            this.Check();
        });
    }
}