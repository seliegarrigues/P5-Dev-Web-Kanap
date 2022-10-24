//On pense à suppr. Les Console.Log!*/

//une requête HTTP avec la méthode GET, afin de récupérer des données.
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => getProducts(data))
  .catch((error) => console.error(error));
  
  function addProducts(data) {
    for (let i = 0; i < data.length; i++) {
      const { _id, imageUrl, altTxt, name, description } = data[i];
      
      const anchor = makeAnchor(_id);
      
      const image = inserImage(imageUrl, altTxt);
      const article = document.createElement('article');
      const h3 = inserH3(name);
      const p = inserParagraph(description);
     
      appendElmtsArticle(article, image, h3, p);
      appendArticleToAnchor(anchor, article);
    }
  }
  // append elements dans le lien
  function appendElmtsArticle(article, image, h3, p) {
    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);
  }
  
  // lien
  function makeAnchor(id) {
    const anchor = document.createElement('a');
    anchor.href = './product.html?id=' + id;
    return anchor;
  }
  
  function appendArticleToAnchor(anchor, article) {
    const items = document.getElementById('items');
    items.appendChild(anchor);
    anchor.appendChild(article);
  }
 
  //Création de l'image
  function inserImage(imageUrl, altTxt) {
    const image = document.createElement('img');
    image.src = imageUrl;
    image.Alt = altTxt;
    return image;
  }
  //Création du H3 et ajout de la classe
  function inserH3(name) {
    const h3 = document.createElement('h3');
    h3.textContent = name;
    h3.classList.add('productName');
    return h3;
  }
  //Création du paragraphe pour la description et ajout de la classe
  function inserParagraph(description) {
    const p = document.createElement('p');
    p.textContent = description;
    p.classList.add('productDescription');
    return p;
  }
  