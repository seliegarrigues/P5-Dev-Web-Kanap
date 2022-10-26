//On pense à suppr. Les Console.Log!
//on récupère le localStorage
let purchaseStorage = JSON.parse(localStorage.getItem('produit'));

console.table(purchaseStorage);
//Fonction pour la création de l'article ou l'affichage du panier vide.
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((data) => {
    if (purchaseStorage) {
      for (p of purchaseStorage) {
        const product = data.find((d) => d._id === p.idProduit);
        if (product) {
          p.price = product.price;
        }
      }
    }
    getItem();
    totalItems();
    modifyQuantity();
    deleteItem();
    getForm();
  });
  function getItem() {
  //Affichage si panier vide
  if (purchaseStorage === null || purchaseStorage.length === 0) {
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

      let inputQuantity = document.createElement('input');
      divContentSettings.appendChild(inputQuantity);
      inputQuantity.setAttribute('type', 'number');
      inputQuantity.classList.add('inputQuantity');
      inputQuantity.setAttribute('name', 'inputQuantity');
      inputQuantity.setAttribute('min', 1);
      inputQuantity.setAttribute('max', 100);
      inputQuantity.value = purchaseStorage[p].quantity; // A REVOIR
      
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

//fonction pour quantité total et prix total des articles
function totalItems() {
  //Calcul de la quantité
  let eltQuantity = document.getElementsByClassName('itemQuantity');
  let totalQuantitySelect = 0;

  for (let i = 0; i < eltQuantity.length; i++) {
    totalQuantitySelect += eltQuantity[i].valueAsNumber;
  }
  let totalQuantityItems = document.getElementById('totalQuantity');
  totalQuantityItems.textContent = totalQuantitySelect;
  console.log(totalQuantitySelect);

  //calcul du Prix
  let totalPrice = 0;
  for (let i = 0; i < eltQuantity.length; i++) {
    totalPrice += eltQuantity[i].valueAsNumber * purchaseStorage[i].price;
  }
  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.textContent = totalPrice;
  console.log(totalPrice);
}
//fonction de modification de la quantité des produits avec addEventListener change
function modifyQuantity() {
  const modifQuantity = document.querySelectorAll('.itemQuantity');

  for (let i = 0; i < modifQuantity.length; i++) {
    modifQuantity[i].addEventListener('change', function (event) {
      event.preventDefault();
      purchaseStorage[i].quantity = event.target.value;
      localStorage.setItem('produit', JSON.stringify(purchaseStorage));
      totalItems();
    });
  }
}
//fonction pour delete un Item
function deleteItem() {
  const delItem = document.querySelectorAll('.deleteItem');
  console.log(delItem);
  for (let d = 0; d < delItem.length; d++) {
    delItem[d].addEventListener('click', (e) => {
      e.preventDefault();
      //demande de confirmation de la suppression de l'article
      if (
        window.confirm(
          `Êtes- vous sur de vouloir supprimer ${purchaseStorage[d].quantity} ${purchaseStorage[d].nom} de couleur ${purchaseStorage[d].color} ?`
        )
      ) {
        let idDelItem = purchaseStorage[d].idProduit;
        let colorDelItem = purchaseStorage[d].color;

        purchaseStorage = purchaseStorage.filter(
          (element) =>
            element.idProduit !== idDelItem || element.color !== colorDelItem
        );
        localStorage.setItem('produit', JSON.stringify(purchaseStorage));
        location.reload();
      }
    });
  }
}

/*************************************FORMULAIRE**********************************************/
//function pour different element du formulaire
function getForm() {
  //regex
  let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
  let emailRegex = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
  );
  let adressRegex = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
  );

  //évenement sur le champs prénom et validation du format
  let firstName = document.getElementById('firstName');
  firstName.addEventListener('input', function () {
    if (nameRegex.test(firstName.value) === false) {
      document.getElementById('firstNameErrorMsg').textContent =
        'Format du prénom incorrect';
    } else {
      document.getElementById('firstNameErrorMsg').textContent = '';
    }
  });

  //évenement sur le champs nom et validation du format
  let lastName = document.getElementById('lastName');
  lastName.addEventListener('input', function () {
    if (nameRegex.test(lastName.value) === false) {
      document.getElementById('lastNameErrorMsg').textContent =
        'Format du nom incorrect';
    } else {
      document.getElementById('lastNameErrorMsg').textContent = '';
    }
  });

  //évenement sur le champs adresse et validation du format
  let address = document.getElementById('address');
  address.addEventListener('input', function () {
    if (adressRegex.test(address.value) === false) {
      document.getElementById('addressErrorMsg').textContent =
        "Format du l'adresse incorrect";
    } else {
      document.getElementById('addressErrorMsg').textContent = '';
    }
  });

  //évenement sur le champs ville et validation du format
  let city = document.getElementById('city');
  city.addEventListener('input', function () {
    if (nameRegex.test(city.value) === false) {
      document.getElementById('cityErrorMsg').textContent =
        'Format de la ville incorrecte';
    } else {
      document.getElementById('cityErrorMsg').textContent = '';
    }
  });

  //évenement sur le champs email et validation du format
  let email = document.getElementById('email');
  email.addEventListener('input', function () {
    if (emailRegex.test(email.value) === false) {
      document.getElementById('emailErrorMsg').textContent =
        "Format de l'email incorrect";
    } else {
      document.getElementById('emailErrorMsg').textContent = '';
    }
  });
}
function OrderForm() {
  let order = document.querySelector('#order');
  console.log(order);
}