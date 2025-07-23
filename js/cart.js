var localStorageCart = JSON.parse(localStorage.getItem("cartItems")) || [];
var cartTableBody = document.getElementById("cartTableBody");

if (localStorageCart.length == 0) {
  alert("your cart is empty please add some products");
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
    <a href="#"><i class="fa-regular fa-circle-xmark"></i></a>
    </td>
    <td><img src="${product.image}" alt="${product.title}" /></td>
        <td>${product.title}</td>
            <td>${product.price}</td>
            <td><input type="number" value="1" /></td>
            <td>${product.price}</td>
          `;
  return tr;
}
