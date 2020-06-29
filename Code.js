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
// var UploadedImage = document.querySelector(".UploadedImage");
// const ImageSection = document.querySelector(".ImageSection");
// Promise.all([
//   faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//   faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//   faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
// ]).then(Compute);

// async function Compute() {
//   const FaceContainer = document.createElement("div");
//   FaceContainer.style.position = "relative";
//   ImageSection.append(FaceContainer);

//   const LabeledFaces = await LoadingIndividualTestImages();
//   // console.log(LabeledFaces);
//   const MatchedFaces = new faceapi.FaceMatcher(LabeledFaces, 0.65);
//   ImageSection.append("Loaded");

//   let image;
//   let FaceSquares;

//   UploadedImage.addEventListener("change", async () => {
//     if (image) {
//       image.remove();
//     }
//     if (FaceSquares) {
//       FaceSquares.remove();
//     }
//     image = await faceapi.bufferToImage(UploadedImage.files[0]);
//     FaceSquares = faceapi.createCanvasFromMedia(image);
//     ImageSection.append(image);
//     ImageSection.append(FaceSquares);
//     const theSizes = { width: image.width, height: image.height };
//     faceapi.matchDimensions(FaceSquares, theSizes);

//     const detected = await faceapi
//       .detectAllFaces(image)
//       .withFaceLandmarks()
//       .withFaceDescriptors();

//     const resizedSquares = faceapi.resizeResults(detected, theSizes);

//     const results = resizedSquares.map((d) =>
//       FaceMatcher.findBestMatch(d.descriptor)
//     );

//     results.forEach((result, i) => {
//       const square = resizedSquares[i].detection.box;
//       const drawSquares = new faceapi.draw.DrawBox(square, {
//         label: result.toString(),
//       });
//       drawSquares.draw(FaceSquares);
//     });
//   });
// }

// // var xmlhttp = new XMLHttpRequest();
// // var url =
// //   "https://github.com/Khutso95/WSOA3028A_884200/tree/master/test_individial_images";
// // xmlhttp.open("GET", url, false);
// // xmlhttp.setRequestHeader("Access-Control-Allow-Origin:", "*");
// // xmlhttp.send();
// faceapi.env.monkeyPatch({
//   fetch: fetch,
//   Canvas: window.HTMLCanvasElement,
//   Image: window.HTMLImageElement,
//   ImageData: canvas.ImageData,
//   createCanvasElement: () => document.createElement("canvas"),
//   createImageElement: () => document.createElement("img"),
// });
// function LoadingIndividualTestImages() {
//   const names = [
//     "Angela Bassett",
//     "Danai Gurira",
//     "Letitia Wright",
//     "Lupita Nyong'o",
//   ];
//   return Promise.all(
//     names.map(async (label) => {
//       const Faces = [];
//       for (let i = 1; i <= 3; i++) {
//         const pics = faceapi.fetchImage(
//           `https://cors-anywhere.herokuapp.com/https://github.com/Khutso95/WSOA3028A_884200/tree/master/test_individial_images/${label}/${i}.jpg`
//         );
//         const detectedFaces = await faceapi
//           .detectSingleFace(pics)
//           .withFaceLandmarks()
//           .withFaceDescriptor();
//         Faces.push(detectedFaces.descriptor);
//       }
//       return new faceapi.LabeledFaceDescriptors(label, Faces);
//     })
//   );
// }
const ImageSection = document.querySelector(".ImageSection");

const myfeed = document.getElementById("myfeed");
// myfeed.append(ImageSection);
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
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
        .withFaceExpressions();
      const resizeBoxes = faceapi.resizeResults(FaceDetections, displaySize);
      drawCanvas
        .getContext("2d")
        .clearRect(0, 0, drawCanvas.width, drawCanvas.height);

      faceapi.draw.drawDetections(drawCanvas, resizeBoxes);
      faceapi.draw.drawFaceExpressions(drawCanvas, resizeBoxes);
    });
  },
  100
);
