var data = JSON.parse(localStorage.getItem("selectedproduct"));
var loggedInUser = localStorage.getItem("loggedInUser");

document.addEventListener("DOMContentLoaded", function () {
  if (data && document.querySelector(".productData")) {
    document.querySelector(".productData").innerHTML = `
    <div class="images"> 
    <img src="${data.mainImage}" alt="Product Image" id="productImage" width="400px">
    <div class="subimages">
    <img src="${data.images[0]}" width="100px"></img>
    <img src="${data.images[1]}" width="100px"></img>
    <img src="${data.images[2]}" width="100px"></img>
    </div>
    </div>
    <div class="info">
        <h2>${data.title}</h2>
        <p> <span>price </span> : ${data.price} $</p>
        <p> <span>Category</span> : ${data.category} </p>
        <p> <span>Availability</span> : In Stock</p>
        
        <p class="desc">${data.description}</p>
        <button class="cartbtn">Add to cart</button>
      </div>
    `;

    const subImages = document.querySelectorAll(".subimages img");
    const mainImage = document.getElementById("productImage");

    subImages.forEach((img) => {
      img.addEventListener("mouseover", function () {
        mainImage.src = img.src;
      });
    });

    var localStorageCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    var cartButton = document.querySelector(".cartbtn");

    cartButton.addEventListener("click", function () {
      if (loggedInUser) {
        addProductToLocalStorage(data);
        alert("Product added to cart!");
      } else {
        alert("please login first");
        window.location.href = "../login.html";
        return;
      }
    });

    function addProductToLocalStorage(data) {
      localStorageCart.push(data);
      localStorage.setItem("cartItems", JSON.stringify(localStorageCart));
    }
  }
});
