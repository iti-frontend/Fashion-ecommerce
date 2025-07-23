
// slider

var img = document.getElementById("heroimg");
var myimg = ["assets/fashionable-woman-brown-coat-beige-hat-posing.jpg", "assets/stylish-woman-leather-coat-black-hat-demonstrate-winter-fashion-trends-white.jpg", "assets/portrait-handsome-confident-hipster-lumbersexual-businessman-model-wearing-casual-white-sweater-trousers.jpg"]
var i = 0;


function next() {
    i++
    if (i >= myimg.length) { i = 0 }
    img.src = myimg[i]
    img.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 2000,
    });
}

function prev() {
    i--
    if (i < 0) { i = myimg.length - 1 } else if (i >= myimg.length) { i - 1 }
    img.src = myimg[i]
    img.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 3000,
    });
}


window.onload = function () {
    setInterval(next, 6000);
};

// slider

// shop now button

document.querySelector(".herobtn").addEventListener("click", function () {
    open("sub-pages/shop.html", "_self");
});

// shop now button

// cart counter

var cartCounter = document.getElementById("cartcounter");
var cartCount = 0;
var cart = document.querySelectorAll(".cart");
var maincart = document.getElementById("maincart");

cart.forEach((item) => {
    item.addEventListener("click", () => {
        cartCount++;
        console.log(cartCount);
        cartCounter.innerText = cartCount;
        cartCounter.style.backgroundColor = "green";
        cart.style.color = "white";
    });
});

// cart counter
