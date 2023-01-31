var ProductLocalStorage = JSON.parse(localStorage.getItem("Basketitems"));

document.title = "Panier"

let products = [];

async function getDataFromAPI(productId) {
    response = fetch('http://localhost:3000/api/products/' + productId)
        .then(data => {
            return data.json();
        })
        .catch(error => {
            error = `Une erreur s'est produite au chargement de la page, veuillez réessayer.`;
            alert(error);
        })

    return response;
}


async function displayBasket() {

    if (ProductLocalStorage === null || ProductLocalStorage.length === 0) {
        document.querySelector('h1').textContent = 'Votre panier est vide';
    } else {
        document.querySelector('h1').textContent = ' Voici votre panier ';

        for (let i = 0; i < ProductLocalStorage.length; i++) {
            let items = ProductLocalStorage[i];

            let data =  await getDataFromAPI(items.id);

            //.innerHTML injecte le nouveau contenu dans le DOM
            document.getElementById('cart__items').innerHTML +=
                `<article class="cart__item" data-id="${items.id}" data-color="${items.color}">
            <div class="cart__item__img">
              <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${items.color}</p>
                <p>${data.price}€</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${items.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                          </div>
              </div>
            </div>
          </article>`;

            // on push les infos dans products[]
            // products.push(items.id);
            // console.log(products);


        }
    }
}


displayBasket();