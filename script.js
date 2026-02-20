const hamburger = document.getElementById("hamburger");
const offcanvas = document.getElementById("offcanvas");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  offcanvas.classList.toggle("active");
});

// Set your target date here (YYYY-MM-DD HH:MM:SS)
const targetDate = new Date("2026-03-10 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    // Timer finished
    document.getElementById("days").innerText = "0 days";
    document.getElementById("hours").innerText = "0 hrs";
    document.getElementById("minutes").innerText = "0 mins";
    document.getElementById("seconds").innerText = "0 secs";
    clearInterval(timer);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days + " days";
  document.getElementById("hours").innerText = hours + " hrs";
  document.getElementById("minutes").innerText = minutes + " mins";
  document.getElementById("seconds").innerText = seconds + " secs";
}

// Update every second
const timer = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to show immediately

// Popup functions
function addToCart(button) {

  let product = button.parentElement;
  let title = product.querySelector(".title").innerText;
  let image = product.querySelector("img").src;

  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-img").src = image;

  document.getElementById("popup").classList.add("active");
}

function closePopup() {
  document.getElementById("popup").classList.remove("active");
}

