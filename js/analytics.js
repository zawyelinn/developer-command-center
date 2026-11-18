
// =========================
// 1. ANALYTICS ELEMENTS
// =========================

const analyticsCompletedTasks = document.getElementById(
    "analytics-completed-tasks"
);

const analyticsCompletedProjects = document.getElementById(
    "analytics-completed-projects"
);

const analyticsCodingHours = document.getElementById(
    "analytics-coding-hours"
);

const analyticsCompletedGoals = document.getElementById(
    "analytics-completed-goals"
);

const weeklyAnalytics = document.getElementById("weekly-analytics");

const productivitySummary = document.getElementById(
    "productivity-summary"
);


// =========================
// 2. UPDATE ANALYTICS
// =========================

function updateAnalytics() {

    // Completed Tasks
    const completedTasks = tasks.filter(task => {
        return task.completed;
    }).length;


    // Completed Projects
    const completedProjects = projects.filter(project => {
        return project.status === "completed";
    }).length;


    // Coding Hours
    const totalSeconds = codingSessions.reduce((total, session) => {
        return total + session.duration;
    }, 0);

    const totalHours = (totalSeconds / 3600).toFixed(2);


    // Completed Goals
    const completedGoals = goals.filter(goal => {
        return goal.completed;
    }).length;


    // Update Statistics
    analyticsCompletedTasks.textContent = completedTasks;

    analyticsCompletedProjects.textContent = completedProjects;

    analyticsCodingHours.textContent = totalHours;

    analyticsCompletedGoals.textContent = completedGoals;


    // Productivity Summary
    productivitySummary.textContent =
        `You have completed ${completedTasks} tasks, ` +
        `${completedProjects} projects and ${completedGoals} goals. ` +
        `Your total coding time is ${totalHours} hours.`;


    // Weekly Analytics Placeholder
    weeklyAnalytics.textContent =
        "Your weekly productivity data will appear here.";

}


// =========================
// 3. INITIAL RENDER
// =========================

updateAnalytics();
