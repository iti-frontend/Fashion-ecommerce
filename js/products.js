// Featured Products
var featuredProductsContainer = document.getElementById(
  "featuredProductsContainer"
);

var featuredProducts = new XMLHttpRequest();
featuredProducts.open("GET", "data/products.json", true);

featuredProducts.onreadystatechange = function () {
  if (featuredProducts.readyState === 4 && featuredProducts.status === 200) {
    var featured = JSON.parse(featuredProducts.responseText).slice(4, 8);

    for (var i = 0; i < featured.length; i++) {
      var card = createCard(featured[i]);
      featuredProductsContainer.appendChild(card);
    }
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

    for (var i = 0; i < featured.length; i++) {
      var card = createCard(featured[i]);
      NewArrivalsProductsContainer.appendChild(card);
    }
  }
};
NewArrivals.send();

// All Products + Search
var shopContainer = document.getElementById("shopContainer");
var searchInput = document.getElementById("searchInput");
var allProducts = [];

var shopProducts = new XMLHttpRequest();
shopProducts.open("GET", "../data/products.json", true);

shopProducts.onreadystatechange = function () {
  if (shopProducts.readyState === 4 && shopProducts.status === 200) {
    allProducts = JSON.parse(shopProducts.responseText);
    renderProducts(allProducts);
  }
};
shopProducts.send();

function renderProducts(products) {
  shopContainer.innerHTML = "";
  products.forEach(function (product) {
    var card = createCard(product);
    shopContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", function () {
  var keyword = searchInput.value.toLowerCase();
  var filtered = [];

  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].title.toLowerCase().indexOf(keyword) !== -1) {
      filtered.push(allProducts[i]);
    }
  }

  if (filtered.length > 0 || keyword !== "") {
    renderProducts(filtered);
  } else {
    renderProducts(allProducts);
  }
});

function createCard(product) {
  function createStars(rating) {
    var fullStars = Math.round(rating);
    var starsHTML = "";
    for (var i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
      } else {
        starsHTML += '<i class="fa-regular fa-star"></i>';
      }
    }
    return starsHTML;
  }

  var card = document.createElement("div");
  card.className = "pro";

  card.innerHTML =
    '<img src="' +
    product.mainImage +
    '" alt="' +
    product.title +
    '">' +
    '<div class="des">' +
    '<span class="summerCollection">' +
    product.category +
    "</span>" +
    "<h5>" +
    product.title +
    "</h5>" +
    '<div class="star">' +
    createStars(product.rating.rate) +
    "</div>" +
    "<h4>$" +
    product.price +
    "</h4>" +
    "</div>" +
    '<button class="cart"><i class="fa-solid fa-cart-shopping"></i></button>';

  var cartButton = card.querySelector(".cart");
  cartButton.addEventListener("click", function (e) {
    e.stopPropagation();
    addProductToLocalStorage(product);
  });

  return card;
}

function updateCartCounter() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var counter = document.getElementsByClassName("counter")[0];
  if (counter) {
    counter.textContent = cartItems.length;
  }
}

function addProductToLocalStorage(product) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCounter();
}

updateCartCounter();
