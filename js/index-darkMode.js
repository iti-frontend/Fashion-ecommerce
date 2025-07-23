

//// dark mode light mode
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;
const imgToggle = document.getElementById("img-toggle");
console.log("body.attributes");

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");

  modeToggle.textContent = isDark ? "☀️" : "🌙";
  imgToggle.setAttribute(
    "src",
    isDark ? "assets/dark-mode.png" : "assets/light-mode.png"
  );

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    modeToggle.textContent = "☀️";
    imgToggle.setAttribute("src", "assets/dark-mode.png");
  } else {
    body.classList.remove("dark-mode");
    modeToggle.textContent = "🌙";
    imgToggle.setAttribute("src", "assets/light-mode.png");
  }
  if (body.attributes) {
  }
});
