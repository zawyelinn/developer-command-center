
// =========================
// 1. TASK ELEMENTS
// =========================

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");


// =========================
// 2. TASK DATA
// =========================

let tasks = loadData("tasks");


// =========================
// 3. RENDER TASKS
// =========================

function renderTasks() {

    // Save current tasks
    saveData("tasks", tasks);

    taskList.replaceChildren();

    taskCount.textContent = `${tasks.length} Tasks`;

    if (tasks.length === 0) {

    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks created yet.";

    taskList.appendChild(emptyMessage);

} else {

    tasks.forEach(task => {

        // Keep your existing task card code here.

    });

}

    tasks.forEach(task => {

        const taskCard = document.createElement("div");
        taskCard.className = "task-item";

        const title = document.createElement("h4");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description;

        const priority = document.createElement("span");
        priority.textContent = `Priority: ${task.priority}`;

        const dueDate = document.createElement("p");
        dueDate.textContent = task.dueDate
            ? `Due: ${task.dueDate}`
            : "No due date";

        const status = document.createElement("p");
        status.textContent = task.completed
            ? "Completed"
            : "Pending";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeButton.dataset.action = "toggle";
        completeButton.dataset.id = task.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = task.id;

        if (task.completed) {
            taskCard.classList.add("completed");
        }

        taskCard.append(
            title,
            description,
            priority,
            dueDate,
            status,
            completeButton,
            deleteButton
        );

        taskList.appendChild(taskCard);

    });
updateDashboard();
}


// =========================
// 4. CREATE NEW TASK
// =========================

taskForm.addEventListener("submit", event => {

    event.preventDefault();

    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-description").value.trim();
    const priority = document.getElementById("task-priority").value;
    const dueDate = document.getElementById("task-due-date").value;

    if (!title) return;

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(newTask);

    renderTasks();

    taskForm.reset();

});


// =========================
// 5. COMPLETE & DELETE TASKS
// =========================

taskList.addEventListener("click", event => {

    const action = event.target.dataset.action;
    const taskId = Number(event.target.dataset.id);

    if (!action || !taskId) return;

    if (action === "toggle") {

        tasks = tasks.map(task => {

            if (task.id === taskId) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }

            return task;

        });

    }

    if (action === "delete") {

        tasks = tasks.filter(task => task.id !== taskId);

    }

    renderTasks();

});


// =========================
// 6. INITIAL RENDER
// =========================

renderTasks();

if (typeof updateAnalytics === "function") {
    updateAnalytics();
}

