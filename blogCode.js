var backToTopButton = document.querySelector("#to-top");
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
