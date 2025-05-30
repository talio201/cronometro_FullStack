const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('lapsList');
const realTimeClock = document.getElementById('realTimeClock');

const API_BASE_URL = 'http://localhost:3000';

let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 0;

function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    display.textContent = 
        formatTime(hours) + ':' +
        formatTime(minutes) + ':' +
        formatTime(seconds) + ':' +
        (milliseconds < 100 ? (milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds) : milliseconds);
}

function startStopwatch() {
    clearInterval(timer);
    timer = setInterval(updateTime, 10);
    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
    resetButton.disabled = true;
}

function stopStopwatch() {
    clearInterval(timer);
    if (milliseconds > 0 || seconds > 0 || minutes > 0 || hours > 0) {
        recordLap();
    }
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
    resetButton.disabled = false;
}

function resetStopwatch() {
    clearInterval(timer);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 0;
    display.textContent = '00:00:00:000';
    lapsList.innerHTML = '';
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
    resetButton.disabled = true;
}

async function saveLapToBackend(time) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/laps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time: time })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Volta salva com sucesso:', data);
    } catch (error) {
        console.error('Erro ao salvar a volta:', error);
    }
}

function recordLap() {
    lapCounter++;
    const currentTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `<span>Volta ${lapCounter}:</span> ${currentTime}`;
    lapsList.prepend(lapItem);
    saveLapToBackend(currentTime);
}

async function loadLapsFromBackend() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/laps`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const laps = await response.json(); 
        
        lapsList.innerHTML = ''; 
        laps.forEach((lap, index) => {
            const lapItem = document.createElement('li');
            lapItem.innerHTML = `<span>Volta ${laps.length - index}:</span> ${lap.time}`;
            lapsList.appendChild(lapItem);
        });
        lapCounter = laps.length; 
        console.log('Voltas carregadas do backend:', laps);

    } catch (error) {
        console.error('Erro ao carregar voltas do backend:', error);
    }
}

function updateRealTimeClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    realTimeClock.textContent = 
        `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

document.addEventListener('DOMContentLoaded', () => {
    loadLapsFromBackend();
    updateRealTimeClock();
    setInterval(updateRealTimeClock, 1000); 
});

stopButton.disabled = true;
lapButton.disabled = true;
resetButton.disabled = true;