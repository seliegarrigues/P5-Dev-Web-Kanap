//emplacement sur page accueil
const sectionItems = document.querySelector('#items');
//une requête HTTP avec la méthode GET, afin de récupérer des données.Appel de l'API
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => { for (const getProducts of data){
    console.log(getProducts)

  //création des articles des produits
  let A = document.createElement('a');
      A.setAttribute("href", `./product.html?id=${getProducts._id}`);
      sectionItems.appendChild(A);

    let article = document.createElement('article');
    A.appendChild(article);

    let image = document.createElement('img');
    image.setAttribute("src",getProducts.imageUrl);
    image.setAttribute("alt", getProducts.altTxt);
    article.appendChild(image);
    
    let h3 = document.createElement('h3');
    h3.setAttribute("class","productName");
      h3.innerText = getProducts.name;
      article.appendChild(h3);

    let p = document.createElement('p');
    p.setAttribute("class","productDescription");
      p.innerText = getProducts.description;
      article.appendChild(p);
    }})
  .catch((error) => console.error(error));