"use strict";
const express = require("./node_modules/express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { Server } = require("http");
const { clearScreenDown } = require("readline");
const { stdout } = require("process");
const app = express();

//Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/scripts", express.static(__dirname + "/public/scripts"));
app.use("/res", express.static(__dirname + "/public/resources"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
//renders
function renderPage(
  page,
  fileName,
  render = true,
  code,
  msg = "Whoops something went wrong"
) {
  app.get(page, (req, res) => {
    if (render) {
      res.sendFile(fileName, { root: path.join(__dirname, "./views/") });
    } else {
      res.status(code).json({
        message: `${code} ${msg}`,
      });
    }
  });
}
//test.bat
//bash test.sh args
const runProcess = (filename, args) => {
  const { exec } = require("child_process");
  let script = exec(`bash ${filename} ${args}`, (error, stdout, stderr) => {
    //console.log(stdout);
    console.log(stderr);

    if (error !== null) {
      console.log(`exec error: ${error}`);
    } else {
      console.log("success");
    }
  });
};

const startFactory = () => {
  runProcess("factorymanager.sh", "0");
};

const stopFactory = () => {
  runProcess("factorymanager.sh", "1");
};

const updateFactory = () => {
  runProcess("factorymanager.sh", "2");
};

const viewLogsFactory = () => {
  try {
    const data = fs.readFileSync("factorylog", "utf8");
    //return data;
    return data.toString();
  } catch (err) {
    console.error(err);
  }
};

//Post handler
app.post("/api/post", (req, res) => {
  const reqObj = req.body;

  switch (reqObj.Value) {
    case "start":
      //
      startFactory();
      break;
    case "stop":
      //
      stopFactory();
      break;
    case "update":
      //
      updateFactory();
      break;
    case "logs":
      //
      const outLog = viewLogsFactory();
      console.log(outLog);
      const outLogObj = {};
      outLogObj["Output"] = outLog;
      res.json(outLogObj);
      break;
    default:
      console.log("User did not submit correct data");
      break;
  }
});

//Terminate url
app.get("/kill/me", (req, res) => {
  process.kill(process.pid, "SIGTERM");
});

//Routes
renderPage("/", "index.html");

//Start server port
const sever = app.listen(8000, () => console.log("Server ready"));

process.on("SIGTERM", () => {
  Server.close(() => {
    console.log("Process terminated");
  });
});
