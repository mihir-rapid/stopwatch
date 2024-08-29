let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let resumeButton = document.querySelector("#resume");
let resetButton = document.querySelector("#reset");

let timePlaceHolder = document.querySelector("#time");
let datePlaceHolder = document.querySelector("#date");

// settting date & time
function setDateTime() {
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timePlaceHolder.textContent = `Time ${hours}:${minutes}:${seconds}`;


    let currentDate = date.getDate();
    let month = date.getMonth();
    let year =  date.getFullYear();

    datePlaceHolder.textContent = `Date ${date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    })}`;
}

setInterval(setDateTime, 1000);


// stopwatch
let display = document.querySelector("#display");
let timer = null;
let startTime = 0;
let endTime = 0;
let isRunning = false;
let isStopped = false;

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resumeButton.addEventListener("click", resume);
resetButton.addEventListener("click", reset)

function start() {
    if (!isRunning) {
        startTime = Date.now() - endTime;
        timer = setInterval(update, 10);
        isRunning = true;
        isStopped = false;

        startButton.disable = true;
        stopButton.disable = false;
        resumeButton.disable = true;
        resetButton.disable = false;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        endTime = Date.now() - startTime;
        isRunning = false;
        isStopped = true;

        startButton.disable = true;
        stopButton.disable = true;
        resumeButton.disable = false;
        resetButton.disable = false;
    }
}

function resume() {
    if (isStopped) {
        startTime = Date.now() - endTime;
        timer = setInterval(update, 10);
        isRunning = true;
        isStopped = true;


        startButton.disable = true;
        stopButton.disable = false;
        resumeButton.disable = false;
        resetButton.disable = false;
    }
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    endTime = 0;
    isRunning = false;
    isStopped = false;

    startButton.disable = false;
    stopButton.disable = true;
    resumeButton.disable = true;
    resetButton.disable = true;

    display.textContent = "00:00:00:00"
}

function update() {
    let currentTime = Date.now();
    endTime = currentTime - startTime;

    let hours = Math.floor(endTime / (1000 * 60 * 60));
    let minutes = Math.floor(endTime / (1000 * 60) % 60);
    let seconds = Math.floor(endTime / 1000 % 60);
    let miliseconds = Math.floor(endTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}
