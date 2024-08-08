const recorderBtn = document.querySelector("#recorderBtn");
const previewVideo = document.querySelector("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild("a");
  a.click();
};

const handleRecorderStop = () => {
  recorderBtn.innerText - "다운로드";
  recorderBtn.removeEventListener("click", handleRecorderStop);
  recorderBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleRecorderStart = () => {
  recorderBtn.innerText = "녹화중지";
  recorderBtn.removeEventListener("click", handleRecorderStart);
  recorderBtn.addEventListener("click", handleRecorderStop);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  previewVideo.srcObject = stream;
  previewVideo.play();
};

init();

recorderBtn.addEventListener("click", handleRecorderStart);
