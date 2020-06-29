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
//Face Recognition
var UploadedImage = document.querySelector(".UploadedImage");
const ImageSection = document.querySelector(".ImageSection");
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
]).then(Compute);

async function Compute() {
  const FaceContainer = document.createElement("div");
  FaceContainer.style.position = "relative";
  ImageSection.append(FaceContainer);

  const LabeledFaces = await LoadingIndividualTestImages();
  console.log(LabeledFaces);

  ImageSection.append("Loaded");

  let image;
  let FaceSquares;

  UploadedImage.addEventListener("change", async () => {
    if (image) {
      image.remove();
    }
    if (FaceSquares) {
      FaceSquares.remove();
    }
    image = await faceapi.bufferToImage(UploadedImage.files[0]);
    FaceSquares = faceapi.createCanvasFromMedia(image);
    ImageSection.append(image);
    ImageSection.append(FaceSquares);
    const theSizes = { width: image.width, height: image.height };
    faceapi.matchDimensions(FaceSquares, theSizes);

    const detected = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedSquares = faceapi.resizeResults(detected, theSizes);
    resizedSquares.forEach((detected) => {
      const square = detected.detection.box;
      const drawSquares = new faceapi.draw.DrawBox(square, {
        label: "Face",
      });
      drawSquares.draw(FaceSquares);
    });
  });
}

function LoadingIndividualTestImages() {
  const names = [
    "Angela Bassett",
    "Danai Gurira",
    "Letitia Wright",
    "Lupita Nyong'o",
  ];
  return Promise.all(
    names.map(async (label) => {
      const Faces = [];
      for (let i = 1; i <= 3; i++) {
        const pics = faceapi.fetchImage(
          "Access-Control-Allow-Origin:https://github.com/Khutso95/WSOA3028A_884200/tree/master/test_individial_images/${label}/${i}.jpg"
        );
        const detectedFaces = await faceapi
          .detectSingleFace(pics)
          .withFaceLandmarks()
          .withFaceDescriptors();
      }
      return new faceapi.LabeledFaceDescriptors(label, Faces);
    })
  );
}
