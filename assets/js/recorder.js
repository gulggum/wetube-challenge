/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ (() => {

eval("const recorderBtn = document.querySelector(\"#recorderBtn\");\nconst previewVideo = document.querySelector(\"preview\");\nlet stream;\nlet recorder;\nlet videoFile;\nconst handleDownload = () => {\n  const a = document.createElement(\"a\");\n  a.href = videoFile;\n  a.download = \"MyRecording.webm\";\n  document.body.appendChild(\"a\");\n  a.click();\n};\nconst handleRecorderStop = () => {\n  recorderBtn.innerText - \"다운로드\";\n  recorderBtn.removeEventListener(\"click\", handleRecorderStop);\n  recorderBtn.addEventListener(\"click\", handleDownload);\n  recorder.stop();\n};\nconst handleRecorderStart = () => {\n  recorderBtn.innerText = \"녹화중지\";\n  recorderBtn.removeEventListener(\"click\", handleRecorderStart);\n  recorderBtn.addEventListener(\"click\", handleRecorderStop);\n  recorder = new MediaRecorder(stream, {\n    mimeType: \"video/webm\"\n  });\n  recorder.ondataavailable = event => {\n    videoFile = URL.createObjectURL(event.data);\n    video.srcObject = null;\n    video.src = videoFile;\n    video.loop = true;\n    video.play();\n  };\n};\nconst init = async () => {\n  stream = await navigator.mediaDevices.getUserMedia({\n    audio: true,\n    video: true\n  });\n  previewVideo.srcObject = stream;\n  previewVideo.play();\n};\ninit();\nrecorderBtn.addEventListener(\"click\", handleRecorderStart);\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"]();
/******/ 	
/******/ })()
;