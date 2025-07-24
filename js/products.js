// FeaturedProducts
var featuredProductsContainer = document.getElementById(
  "featuredProductsContainer"
);

var featuredProducts = new XMLHttpRequest();
featuredProducts.open("GET", "data/products.json", true);

featuredProducts.onreadystatechange = function () {
  if (featuredProducts.readyState === 4 && featuredProducts.status === 200) {
    var featured = JSON.parse(featuredProducts.responseText).slice(4, 8);

    featured.forEach(function (product) {
      var card = createCard(product);
      featuredProductsContainer.appendChild(card);
    });
  }
};
featuredProducts.send();

// New Arrivals
var NewArrivalsProductsContainer = document.getElementById(
  "NewArrivalsProductsContainer"
);

var NewArrivals = new XMLHttpRequest();
NewArrivals.open("GET", "data/products.json", true);

NewArrivals.onreadystatechange = function () {
  if (NewArrivals.readyState === 4 && NewArrivals.status === 200) {
    var featured = JSON.parse(NewArrivals.responseText).slice(0, 4);

    featured.forEach(function (product) {
      var card = createCard(product);
      NewArrivalsProductsContainer.appendChild(card);
    });
  }
};
NewArrivals.send();

// get all products
var shopContainer = document.getElementById("shopContainer");

var shopProducts = new XMLHttpRequest();
shopProducts.open("GET", "../data/products.json", true);

shopProducts.onreadystatechange = function () {
  if (shopProducts.readyState === 4 && shopProducts.status === 200) {
    var featured = JSON.parse(shopProducts.responseText);

    featured.forEach(function (product) {
      var card = createCard(product);
      shopContainer.appendChild(card);
    });
  }
};
shopProducts.send();

function createCard(product) {
  function createStars(rating) {
    var fullStars = Math.round(rating);
    var starsHTML = "";
    for (var i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHTML += `<i class="fa-solid fa-star"></i>`;
      } else {
        starsHTML += `<i class="fa-regular fa-star"></i>`;
      }
    }
    return starsHTML;
  }

  var card = document.createElement("div");
  card.className = "pro";

  card.innerHTML = `
    <img src="${product.mainImage}" alt="${product.title}">
    <div class="des">
      <span class="summerCollection">${product.category}</span>
      <h5>${product.title}</h5>
      <div class="star">
        ${createStars(product.rating.rate)}
      </div>
      <h4>$${product.price}</h4>
    </div>
    <button class="cart">
      <i class="fa-solid fa-cart-shopping"></i>
    </button>
  `;

  const cartButton = card.querySelector(".cart");
  cartButton.addEventListener("click", function (e) {
    e.stopPropagation();
    addProductToLocalStorage(product);
  });

  return card;
}

var localStorageCart = JSON.parse(localStorage.getItem("cartItems")) || [];

function addProductToLocalStorage(product) {
  localStorageCart.push(product);
  localStorage.setItem("cartItems", JSON.stringify(localStorageCart));
}
