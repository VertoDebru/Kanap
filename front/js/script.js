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
  .then(function(value) {
    console.log(value);
    // Loop on all products.
    for(let i = 0; i < value.length; i++) {
        var data = value[i];
        // Create 'a' Tag
        let linkProduct = document.createElement('a');
        linkProduct.setAttribute('href', './product.html?id='+data._id);
        itemsBox.appendChild(linkProduct);
        // Create 'article' Tag
        let article = document.createElement('article');
        linkProduct.appendChild(article);
        // Create 'img' Tag
        let image = document.createElement('img');
        image.setAttribute('src', data.imageUrl);
        image.setAttribute('alt', data.altTxt);
        article.appendChild(image);
        // Create 'h3' Tag
        let title = document.createElement('h3');
        title.innerHTML = data.name;
        article.appendChild(title);
        // Create 'p' Tag
        let desc = document.createElement('p');
        desc.innerHTML = data.description;
        article.appendChild(desc);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
    console.log("Error : "+err);
  });
  
  console.log(localStorage.getItem('basket'));