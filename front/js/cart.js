//On pense à suppr. Les Console.Log!
//on récupère le localStorage
let purchaseStorage = JSON.parse(localStorage.getItem('produit'));

console.table(purchaseStorage);
//Fonction pour la création de l'article ou l'affichage du panier vide.
function getItem() {
  //Affichage si panier vide
  if (purchaseStorage === null) {
    let emptyStorage = document.createElement('article');
    document.querySelector('#cart__items').appendChild(emptyStorage);
    emptyStorage.textContent = 'Votre panier est vide';
  } else {
    //si le panier n'est pas vide creation des cart article
    for (let produit in purchaseStorage) {
      let article = document.createElement('article');
      document.querySelector('#cart__items').appendChild(article);
      article.classList.add('cart__item');
      article.setAttribute('data-id', purchaseStorage[produit].idProduit);
      article.setAttribute('data-color', purchaseStorage[produit].color);

      //creation de la div img
      let divImage = document.createElement('div');
      article.appendChild(divImage);
      divImage.classList.add('cart__item__img');

      //Insertion de l'image dans la div img
      let imageInDiv = document.createElement('img');
      divImage.appendChild(imageInDiv);
      imageInDiv.src = purchaseStorage[produit].imageUrl;
      imageInDiv.alt = purchaseStorage[produit].imgAlt;

      //creation de la div cart__item__content
      let divContent = document.createElement('div');
      article.appendChild(divContent);
      divContent.classList.add('cart__item__content');

      //creation de la div cart__item__content__description dans cart__item__content
      let divContentDescription = document.createElement('div');
      divContent.appendChild(divContentDescription);
      divContentDescription.classList.add('cart__item__content__description');

      //creation du h2 dans cart__item__content__description
      let divContentDescriptionH2 = document.createElement('h2');
      divContentDescription.appendChild(divContentDescriptionH2);
      divContentDescriptionH2.textContent = purchaseStorage[produit].nom;

      //creation du <p></p> pour la color
      let divContentDescriptionP = document.createElement('p');
      divContentDescription.appendChild(divContentDescriptionP);
      divContentDescriptionP.textContent = purchaseStorage[produit].color;

      //creation du <p></p> pour le prix
      let divContentDescriptionPrice = document.createElement('p');
      divContentDescription.appendChild(divContentDescriptionPrice);
      divContentDescriptionPrice.textContent =
        purchaseStorage[produit].prix + ' €';

      //creation de la div cart__item__content__settings dans la div cart__item__content
      let divContentSettings = document.createElement('div');
      divContent.appendChild(divContentSettings);
      divContentSettings.classList.add('cart__item__content__settings');

      //creation de la div class="cart__item__content__settings__quantity
      let divContentSettingsQuantity = document.createElement('div');
      divContentSettings.appendChild(divContentSettingsQuantity);
      divContentSettingsQuantity.classList.add(
        'cart__item__content__settings__quantity'
      );

      //creation du p dans la div cart__item__content__settings__quantity
      let divContentSettingsQuantityP = document.createElement('p');
      divContentDescription.appendChild(divContentSettingsQuantityP);
      divContentSettingsQuantityP.textContent =
        'Qté :' + purchaseStorage[produit].quantity;

      //création de <input>

      let itemQuantity = document.createElement('input');
      divContentSettings.appendChild(itemQuantity);
      itemQuantity.setAttribute('type', 'number');
      itemQuantity.classList.add('itemQuantity');
      itemQuantity.setAttribute('name', 'itemQuantity');
      itemQuantity.setAttribute('min', 1);
      itemQuantity.setAttribute('max', 100);
      itemQuantity.setAttribute('value', 1); // explication sur input et sa value

      //création de la div cart__item__content__settings__delete
      let itemDelete = document.createElement('div');
      divContentSettings.appendChild(itemDelete);
      itemDelete.classList.add('cart__item__content__settings__delete');

      let itemDeleteP = document.createElement('p');
      itemDelete.appendChild(itemDeleteP);
      itemDeleteP.classList.add('deleteItem');
      itemDeleteP.textContent = 'Supprimer';
    }
  }
}
getItem();

/*!
-Concernant la modification, recourir à l'événement de
modification (addEventListener de type change) pour observer le
changement de la quantité.
-la méthode Element.closest() permet de cibler le
produit à supprimer (où dont vous souhaitez
modifier la quantité) grâce à son identifiant et sa couleur
-!Attention à bien penser à modifier le DOM, mais aussi localStorage,
sinon les modifications effectuées dans le panier ne seront pas
conservées en cas de changement de page / de rafraîchissement de
la page.
*/

//fonction pour quantité total et prix total des articles
function totalItems() {}

//fonction pour delete un Item
function removeItem() {}

//function message d'erreur pour input  id="firstNameErrorMsg">