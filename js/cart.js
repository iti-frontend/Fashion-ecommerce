var localStorageCart = JSON.parse(localStorage.getItem("cartItems")) || [];
var cartTableBody = document.getElementById("cartTableBody");

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
      totalCell.textContent = "$" + (newQuantity * product.price).toFixed(2);
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
    <td><img src="${product.image}" alt="${product.title}" width="50"/></td>
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td><span class="product-quantity">1</span></td>
    <td>$ <span class="total-price">${product.price}</span></td>
  `;

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
