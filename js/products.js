// FeaturedProducts
var featuredProductsContainer = document.getElementById(
  "featuredProductsContainer"
);

var featuredProducts = new XMLHttpRequest();
featuredProducts.open("GET", "https://fakestoreapi.com/products?limit=4", true);

featuredProducts.onreadystatechange = function () {
  if (featuredProducts.readyState === 4 && featuredProducts.status === 200) {
    var featured = JSON.parse(featuredProducts.responseText);

    featured.forEach(function (product) {
      var card = createCard(product);
      featuredProductsContainer.appendChild(card);
    });
  }
};
featuredProducts.send();

function createCard(product) {
  var card = document.createElement("div");
  card.className = "pro";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
              <div class="des">
            <span class="summerCollection">${product.category}</span>
            <h5>${product.title}</h5>
            <div class="star">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <h4>$78</h4>
          </div>
          <a href="#" class="cart"><i class="fa-solid fa-cart-shopping"></i></a>

  `;

  return card;
}
