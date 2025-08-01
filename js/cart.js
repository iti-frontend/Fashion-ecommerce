var localStorageCart = JSON.parse(localStorage.getItem("cartItems")) || [];
var cartTableBody = document.getElementById("cartTableBody");
var clearCart = document.getElementById("clearCart");

if (localStorageCart.length === 0) {
  alert("Your cart is empty. Please add some products.");
  window.location.href = "shop.html";
}

var productIdToRow = {};

if (localStorageCart.length > 0) {
  localStorageCart.forEach((product) => {
    var existingRow = productIdToRow[product.id];

    if (existingRow) {
      var quantitySpan = existingRow.querySelector(".product-quantity");
      var newQuantity = parseInt(quantitySpan.textContent) + 1;
      quantitySpan.textContent = newQuantity;

      var totalCell = existingRow.querySelector(".total-price");
      totalCell.textContent = (newQuantity * product.price).toFixed(2);
    } else {
      var tr = createTr(product);
      cartTableBody.appendChild(tr);
      productIdToRow[product.id] = tr;
    }
  });
  updateTotalCart();
}

function createTr(product) {
  var tr = document.createElement("tr");
  tr.innerHTML = `
    <td>
      <button class="delete__button">Delete</button>
    </td>
    <td><img src="${product.mainImage}" alt="${product.title}" width="50"/></td>
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td>
      <button class="decrease-qty">-</button>
      <span class="product-quantity">${product.quantity || 1}</span>
      <button class="increase-qty">+</button>
    </td>
    <td>$ <span class="total-price">${(
      product.price * (product.quantity || 1)
    ).toFixed(2)}</span></td>
  `;

  var quantitySpan = tr.querySelector(".product-quantity");
  var totalPriceSpan = tr.querySelector(".total-price");

  var increaseBtn = tr.querySelector(".increase-qty");
  var decreaseBtn = tr.querySelector(".decrease-qty");

  increaseBtn.addEventListener("click", function () {
    var quantity = parseInt(quantitySpan.textContent);
    quantity++;
    quantitySpan.textContent = quantity;
    totalPriceSpan.textContent = (quantity * product.price).toFixed(2);
    updateProductQuantity(product.id, quantity);
    updateTotalCart();
  });

  decreaseBtn.addEventListener("click", function () {
    var quantity = parseInt(quantitySpan.textContent);
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
      totalPriceSpan.textContent = (quantity * product.price).toFixed(2);
      updateProductQuantity(product.id, quantity);
      updateTotalCart();
    } else if (quantity === 1) {
      deleteItem(tr, product);
    }
  });
  function updateProductQuantity(productId, newQuantity) {
    for (let i = 0; i < localStorageCart.length; i++) {
      if (localStorageCart[i].id === productId) {
        localStorageCart[i].quantity = newQuantity;
        break;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(localStorageCart));
  }

  var deleteButton = tr.querySelector(".delete__button");
  deleteButton.addEventListener("click", function () {
    deleteItem(tr, product);
  });

  return tr;
}

function deleteItem(tr, product) {
  tr.remove();

  var i = 0;
  while (i < localStorageCart.length) {
    if (localStorageCart[i].id === product.id) {
      localStorageCart.splice(i, 1);
    } else {
      i++;
    }
  }

  localStorage.setItem("cartItems", JSON.stringify(localStorageCart));
  updateTotalCart();

  if (localStorageCart.length === 0) {
    alert("Your cart is now empty. Please add some products.");
    window.location.href = "shop.html";
  }
}

function updateTotalCart() {
  var total = 0;
  var totalPrices = document.querySelectorAll(".total-price");

  totalPrices.forEach(function (priceElement) {
    var price = parseFloat(priceElement.textContent);
    if (!isNaN(price)) {
      total += price;
    }
  });

  document.getElementById("cartTotal").textContent =
    "Total: $" + total.toFixed(2);

  return total;
}

var checkoutButton = document.getElementById("checkout");

checkoutButton.addEventListener("click", function () {
  if (localStorageCart.length === 0) {
    alert("Your cart is already empty!");
    window.location.href = "shop.html";

    return;
  }

  alert("Thank you for your purchase! 🛒");

  localStorage.removeItem("cartItems");
  localStorageCart = [];

  cartTableBody.innerHTML = "";

  updateTotalCart();
  window.location.href = "shop.html";
});

clearCart.addEventListener("click", function () {
  localStorage.removeItem("cartItems");
  cartTableBody.innerHTML = "";
  alert("Your cart has been cleared.");
  window.location.href = "shop.html";
});
