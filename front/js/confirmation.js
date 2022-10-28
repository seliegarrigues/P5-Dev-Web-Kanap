//on récupère l' id 
// recuperation du lien et de l'orderId
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let orderId = urlParams.get('orderId');
//insertion de l'orderId dans l'HTML
let orderNumber = document.querySelector('#orderId');
orderNumber.textContent = orderId;

//suppression du localStorage
//let removeStorage = window.localStorage;
//removeStorage.clear();

