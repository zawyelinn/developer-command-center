
/* =========================
   1. TIMER ELEMENTS
========================= */

const timerDisplay = document.getElementById("timer-display");

const startButton = document.getElementById("start-timer");
const pauseButton = document.getElementById("pause-timer");
const resetButton = document.getElementById("reset-timer");

const todayHoursElement = document.getElementById("today-coding-hours");
const totalHoursElement = document.getElementById("total-coding-hours");
const totalSessionsElement = document.getElementById("total-sessions");


/* =========================
   2. TIMER DATA
========================= */

let elapsedSeconds = 0;
let timerInterval = null;

let codingSessions = loadData("codingSessions");


/* =========================
   3. FORMAT TIME
========================= */

function formatTime(seconds) {

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const remainingSeconds = seconds % 60;

    return [
        hours,
        minutes,
        remainingSeconds
    ]
        .map(value => String(value).padStart(2, "0"))
        .join(":");

}


/* =========================
   4. UPDATE TIMER DISPLAY
========================= */

function updateTimerDisplay() {

    timerDisplay.textContent = formatTime(elapsedSeconds);

}


/* =========================
   5. START TIMER
========================= */

startButton.addEventListener("click", () => {

    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {

        elapsedSeconds++;

        updateTimerDisplay();

    }, 1000);

});


/* =========================
   6. PAUSE TIMER
========================= */

pauseButton.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerInterval = null;

});


/* =========================
   7. RESET TIMER
========================= */

resetButton.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerInterval = null;

    elapsedSeconds = 0;

    updateTimerDisplay();

});


/* =========================
   8. INITIAL DISPLAY
========================= */

updateTimerDisplay();


// =========================
// 9. CODING HISTORY ELEMENT
// =========================

const codingHistory = document.getElementById("coding-history");


// =========================
// 10. UPDATE CODING STATISTICS
// =========================

function updateCodingStats() {

    const totalSeconds = codingSessions.reduce((total, session) => {
        return total + session.duration;
    }, 0);

    const today = new Date().toISOString().split("T")[0];

    const todaySeconds = codingSessions
        .filter(session => session.date === today)
        .reduce((total, session) => total + session.duration, 0);

    totalHoursElement.textContent = (totalSeconds / 3600).toFixed(2);

    todayHoursElement.textContent = (todaySeconds / 3600).toFixed(2);

    totalSessionsElement.textContent = codingSessions.length;

}


// =========================
// 11. RENDER CODING HISTORY
// =========================

function renderCodingHistory() {

     // Save coding sessions
    saveData("codingSessions", codingSessions);

    codingHistory.replaceChildren();

    if (codingSessions.length === 0) {

        const message = document.createElement("p");
        message.textContent = "No coding sessions recorded yet.";

        codingHistory.appendChild(message);

        return;
    }

    codingSessions.forEach(session => {

        const item = document.createElement("div");

        const date = document.createElement("p");
        date.textContent = `Date: ${session.date}`;

        const duration = document.createElement("p");
        duration.textContent = `Duration: ${formatTime(session.duration)}`;

        item.append(date, duration);

        codingHistory.appendChild(item);

    });

}


// =========================
// 12. SAVE CODING SESSION
// =========================

// Replace the existing RESET BUTTON event
// with this updated version.

resetButton.addEventListener("click", () => {

    clearInterval(timerInterval);
    timerInterval = null;

    // Save session if at least 1 minute was recorded
    if (elapsedSeconds >= 60) {

        const newSession = {

            id: Date.now(),

            date: new Date().toISOString().split("T")[0],

            duration: elapsedSeconds

        };

        codingSessions.push(newSession);

        renderCodingHistory();

        updateCodingStats();
        

    }

    elapsedSeconds = 0;

    updateTimerDisplay();

    renderCodingHistory();

    updateCodingStats();

    updateDashboard();

   if (typeof updateAnalytics === "function") {
    updateAnalytics();
}

});
