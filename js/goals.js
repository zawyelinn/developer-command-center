
// =========================
// 1. GOAL ELEMENTS
// =========================

const goalForm = document.getElementById("goal-form");
const goalList = document.getElementById("goal-list");


// =========================
// 2. GOAL DATA
// =========================

let goals = loadData("goals");


// =========================
// 3. RENDER GOALS
// =========================

function renderGoals() {

    // Save current goals
    saveData("goals", goals);

    goalList.replaceChildren();

    if (goals.length === 0) {

    const message = document.createElement("p");
    message.textContent = "No goals created yet.";

    goalList.appendChild(message);

} else {

    goals.forEach(goal => {

        // Keep your existing goal card code here.

    });

}

    goals.forEach(goal => {

        const card = document.createElement("div");
        card.className = "goal-item";

        const title = document.createElement("h4");
        title.textContent = goal.title;

        const description = document.createElement("p");
        description.textContent = goal.description;

        const type = document.createElement("p");
        type.textContent = `Type: ${goal.type}`;

        const deadline = document.createElement("p");
        deadline.textContent = `Deadline: ${goal.deadline || "Not set"}`;

        const status = document.createElement("p");
        status.textContent = goal.completed
            ? "Completed"
            : "In Progress";

        const completeButton = document.createElement("button");
        completeButton.textContent = goal.completed
            ? "Undo"
            : "Complete";

        completeButton.dataset.action = "toggle-goal";
        completeButton.dataset.id = goal.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.dataset.action = "delete-goal";
        deleteButton.dataset.id = goal.id;

        card.append(
            title,
            description,
            type,
            deadline,
            status,
            completeButton,
            deleteButton
        );

        goalList.appendChild(card);

    });

}


// =========================
// 4. CREATE GOAL
// =========================

goalForm.addEventListener("submit", event => {

    event.preventDefault();

    const newGoal = {

        id: Date.now(),

        title: document.getElementById("goal-title").value.trim(),

        description: document.getElementById("goal-description").value.trim(),

        type: document.getElementById("goal-type").value,

        deadline: document.getElementById("goal-deadline").value,

        completed: false

    };

    if (!newGoal.title) return;

    goals.push(newGoal);

    renderGoals();

    goalForm.reset();

});


// =========================
// 5. GOAL ACTIONS
// =========================

goalList.addEventListener("click", event => {

    const action = event.target.dataset.action;

    const goalId = Number(event.target.dataset.id);

    if (!action || !goalId) return;

    if (action === "toggle-goal") {

        goals = goals.map(goal => {

            if (goal.id === goalId) {

                return {
                    ...goal,
                    completed: !goal.completed
                };

            }

            return goal;

        });

    }

    if (action === "delete-goal") {

        goals = goals.filter(goal => goal.id !== goalId);

    }

    renderGoals();

});


// =========================
// 6. INITIAL RENDER
// =========================

renderGoals();

if (typeof updateAnalytics === "function") {
    updateAnalytics();
}
