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

const myfeed = document.getElementById("myfeed");
let Ages = [];
// myfeed.append(ImageSection);
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models"),
]).then(startLiveFeed);

function startLiveFeed() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (myfeed.srcObject = stream),
    (err) => console.error(err)
  );
}

myfeed.addEventListener(
  "play",
  () => {
    const drawCanvas = faceapi.createCanvasFromMedia(myfeed);
    document.body.append(drawCanvas);
    const displaySize = { width: myfeed.width, height: myfeed.height };
    faceapi.matchDimensions(drawCanvas, displaySize);
    setInterval(async () => {
      const FaceDetections = await faceapi
        .detectAllFaces(myfeed, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();
      const resizeBoxes = faceapi.resizeResults(FaceDetections, displaySize);
      drawCanvas
        .getContext("2d")
        .clearRect(0, 0, drawCanvas.width, drawCanvas.height);

      faceapi.draw.drawDetections(drawCanvas, resizeBoxes);
      faceapi.draw.drawFaceExpressions(drawCanvas, resizeBoxes);

      console.log(resizeBoxes);
      const age = resizeBoxes[0].age;
      const averagedAge = interpolatedAgePredictions(age);

      const bottomRight = {
        x: resizeBoxes[0].detection.box.bottomRight.x,
        y: resizeBoxes[0].detection.box.bottomRight.y,
      };
      new faceapi.draw.DrawTextField(
        [`${faceapi.utils.round(averagedAge, 0)} years`],
        bottomRight
      ).draw(drawCanvas);
    });
  },
  100
);
function interpolatedAgePredictions(age) {
  Ages = [age].concat(Ages).slice(0, 30);
  const avgAge = Ages.reduce((total, x) => total + x) / Ages.length;
  return avgAge;
}
