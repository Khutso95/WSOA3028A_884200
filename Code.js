const backToTopButton = document.querySelector("#back-to-top");
const backButton = document.querySelector("#back-button");
const forwardButton = document.querySelector("#forward-button");

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
backToTopButton.addEventListener("click", BackToTopFuction);

function BackToTopFuction() {
  window.scrollTo(0, 0);
}
//History Functions

function BackFunction() {
  backButton.addEventListener("click", BackFunction);
  history.back();
}
function ForwardFuction() {
  forwardButton.addEventListener("click", ForwardFuction);
  history.forward();
}

//Dropdown menu
var drop = document.querySelector(".Background .MobileNavigation");
var nav = document.querySelector(".BurgerNav");
nav.addEventListener("click", MobileNav);
function MobileNav() {
  if (drop.style.display == "grid") {
    drop.style.display = "none";
  } else drop.style.display = "grid";
}
