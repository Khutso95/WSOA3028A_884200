var backToTopButton = document.querySelector(".to-top");
var backButton = document.querySelector(".back-button");
var forwardButton = document.querySelector(".forward-button");

//Back to top fuctions
window.addEventListener("scroll", ScrollController);
function ScrollController() {
  //display Back to Top Button
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}
backToTopButton.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

function BackToTopFuction() {
  setTimeout(function () {
    window.scroll(0, 0);
  }, 0);
}

//History Functions
backButton.addEventListener("click", BackFunction);
function BackFunction() {
  history.back();
}
forwardButton.addEventListener("click", ForwardFuction);
function ForwardFuction() {
  history.forward();
}

//Dropdown menu
var drop = document.querySelector(".Background .MobileNavigation");
var nav = document.querySelector(".BurgerNav");
nav.addEventListener("click", MobileNav);
var closing = document.querySelector(".CloseNav");
function MobileNav() {
  if (drop.style.display == "grid") {
    drop.style.display = "none";
  } else {
    drop.style.display = "grid";
  }
}
