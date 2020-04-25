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
backButton.addEventListener("click", BackFunction);
forwardButton.addEventListener("click", ForwardFuction);
function BackFunction() {
  history.back();
}
function ForwardFuction() {
  history.forward();
}
