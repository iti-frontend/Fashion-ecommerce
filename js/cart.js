var localStorageCart = JSON.parse(localStorage.getItem("cartItems")) || [];
var cartTableBody = document.getElementById("cartTableBody");

if (localStorageCart.length == 0) {
  alert("your cart is empty please add some products");
  open("shop.html", "_self");
}

if (localStorageCart.length > 0) {
  localStorageCart.forEach((product) => {
    var tr = createTr(product);
    cartTableBody.appendChild(tr);
  });
}

function createTr(product) {
  var tr = document.createElement("tr");
  tr.innerHTML = `
    <td>
      <div class="delete-icon">Delete</div>
    </td>
    <td><img src="${product.image}" alt="${product.title}" /></td>
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td><input type="number" value="1" id="counter" /></td>
    <td id="total">${product.price}</td>
  `;

  tr.querySelector("#counter").addEventListener("change", function () {
    var quantity = parseInt(this.value);

    if (isNaN(quantity) || quantity <= 0) {
      this.value = 1;
      quantity = 1;
    }

    var totalPriceCell = tr.querySelector("#total");
    totalPriceCell.innerHTML = (product.price * quantity);

    var totalValue = document.querySelector("#totalvalue");
    totalValue.innerHTML = totalPriceCell.innerHTML;
  })

  var discount = document.querySelector("#discount");
  var copun = document.querySelector("#copoun");


  // discount

  copun.addEventListener("input", function () {
    if (this.value === "DISCOUNT10") {
      discount.innerHTML = "10% off";
      var afterdiscount = document.querySelector("#afterdiscount");
      var totalValue = document.querySelector("#totalvalue");
      afterdiscount.innerHTML = Math.ceil(totalValue.innerHTML * 0.9);
    } else {
      discount.innerHTML = "Invalid coupon";
    }

  })


  // delete row from body & localstorage

  tr.querySelector('.delete-icon').addEventListener('click', function () {
    tr.remove();
    localStorage.removeItem("cartItems");

  })

  return tr;
}

document.querySelector(".proceed").addEventListener("click", function () {
  alert("Thank you for your purchase!");
  localStorage.removeItem("cartItems");
});