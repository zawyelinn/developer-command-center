
// =========================
// 1. DASHBOARD ELEMENTS
// =========================

const totalTasksElement = document.getElementById("total-tasks");
const completedTasksElement = document.getElementById("completed-tasks");



// =========================
// UPDATE DASHBOARD
// =========================

function updateDashboard() {

    // 1. Total Tasks
    const totalTasks = tasks.length;

    // 2. Completed Tasks
    const completedTasks = tasks.filter(task => {
        return task.completed;
    }).length;

    // 3. Active Projects
    const activeProjects = typeof projects !== "undefined"
        ? projects.filter(project => {
            return project.status === "in-progress";
        }).length
        : 0;

    // 4. Total Coding Hours
    const totalSeconds = typeof codingSessions !== "undefined"
        ? codingSessions.reduce((total, session) => {
            return total + session.duration;
        }, 0)
        : 0;

    const codingHours = (totalSeconds / 3600).toFixed(2);

    // Update HTML
    totalTasksElement.textContent = totalTasks;

    completedTasksElement.textContent = completedTasks;

    document.getElementById("active-projects").textContent =
        activeProjects;

    document.getElementById("coding-hours").textContent =
        codingHours;

}

