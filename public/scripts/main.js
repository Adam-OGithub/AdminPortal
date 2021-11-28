"use strict";
const startBtn = document.getElementById("startServer");
const stopBtn = document.getElementById("stopServer");
const updateBtn = document.getElementById("updateServer");
const logBtn = document.getElementById("viewLogs");
const checkBtn = document.getElementById("serverStatus");
const statusUi = document.getElementById("statusui");
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
      if (data.serverStatus) {
        isServerOnline(data.serverStatus);
      } else {
        outLog.innerHTML = "";
        outLog.innerHTML = data.Output;
      }
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
const checkStatus = () => {
  updatePost("status");
};
const isServerOnline = (message) => {
  setTimeout(() => {
    if (message === "online") {
      statusUi.classList.remove("offline");
      statusUi.classList.add("online");
    } else {
      statusUi.classList.remove("online");
      statusUi.classList.add("offline");
    }
  }, 2000);
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

checkBtn.addEventListener("click", function () {
  checkStatus();
});
