"use strict";
const startBtn = document.getElementById("startServer");
const stopBtn = document.getElementById("stopServer");
const updateBtn = document.getElementById("updateServer");
const logBtn = document.getElementById("viewLogs");
const outLog = document.getElementById("outLogId");
const msgStr = "Command sent successfully";

outLog.classList.add("hidden");
const createPost = (postData, url = "/api/post") => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      outLog.innerHTML = "";
      outLog.innerHTML = data.Output;
    });
  alert(msgStr);
};

const updatePost = (word) => {
  const btnObj = {};
  btnObj["Value"] = word;
  createPost(btnObj);
  console.log(btnObj);
};

//Buttons
const startServer = () => {
  updatePost("start");
};
const stopServer = () => {
  updatePost("stop");
};
const updateServer = () => {
  updatePost("update");
};
const viewLogs = () => {
  updatePost("logs");
};

startBtn.addEventListener("click", function () {
  startServer();
});

stopBtn.addEventListener("click", function () {
  stopServer();
});

updateBtn.addEventListener("click", function () {
  updateServer();
});

logBtn.addEventListener("click", function () {
  viewLogs();
  outLog.classList.remove("hidden");
});
