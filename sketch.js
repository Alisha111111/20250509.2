// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handpose;
let predictions = [];
let circleX, circleY;
const circleSize = 100;

function setup() {
  createCanvas(640, 480);

  // 初始化攝影機
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // 隱藏原始影像，使用 p5 畫布顯示

  // 初始化 Handpose 模型
  handpose = ml5.handpose(video, modelReady);

  // 當模型預測時，更新 predictions
  handpose.on("predict", results => {
    predictions = results;
  });

  // 初始化圓的位置
  circleX = width / 2;
  circleY = height / 2;
}

function modelReady() {
  console.log("Handpose model loaded!");
}

function draw() {
  // 繪製攝影機影像
  background(220); // 確保畫布清晰
  image(video, 0, 0, width, height);

  // 繪製圓
  fill(255, 0, 0, 150);
  noStroke();
  ellipse(circleX, circleY, circleSize);

  // 繪製手部關鍵點
  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    const hand = predictions[i];
    const keypoints = hand.landmarks;

    // 繪製食指指尖的圓
    fill(0, 255, 0);
    noStroke();
    ellipse(keypoints[8][0], keypoints[8][1], 20); // 左或右手食指

    // 檢查食指是否觸碰到圓
    if (dist(keypoints[8][0], keypoints[8][1], circleX, circleY) < circleSize / 2) {
      circleX = keypoints[8][0];
      circleY = keypoints[8][1];
    }
  }
}
