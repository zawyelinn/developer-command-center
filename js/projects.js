
// =========================
// 1. PROJECT ELEMENTS
// =========================

const projectForm = document.getElementById("project-form");
const projectList = document.getElementById("project-list");
const projectCount = document.getElementById("project-count");


// =========================
// 2. PROJECT DATA
// =========================

let projects = loadData("projects");


// =========================
// 3. RENDER PROJECTS
// =========================

function renderProjects() {

    // Save current projects
    saveData("projects", projects);

    projectList.replaceChildren();

    projectCount.textContent = `${projects.length} Projects`;

    projectList.replaceChildren();

    projectCount.textContent = `${projects.length} Projects`;

            if (projects.length === 0) {

            const message = document.createElement("p");
            message.textContent = "No projects created yet.";

            projectList.appendChild(message);

        } else {

            projects.forEach(project => {

                // Keep your existing project card code here.

            });

        }

    projects.forEach(project => {

        const card = document.createElement("div");
        card.className = "project-item";

        const name = document.createElement("h4");
        name.textContent = project.name;

        const description = document.createElement("p");
        description.textContent = project.description;

        const startDate = document.createElement("p");
        startDate.textContent = `Start: ${project.startDate || "Not set"}`;

        const deadline = document.createElement("p");
        deadline.textContent = `Deadline: ${project.deadline || "Not set"}`;

        const status = document.createElement("p");
        status.textContent = `Status: ${project.status}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.dataset.action = "delete-project";
        deleteButton.dataset.id = project.id;

        card.append(
            name,
            description,
            startDate,
            deadline,
            status,
            deleteButton
        );

        projectList.appendChild(card);

    });

}


// =========================
// 4. CREATE PROJECT
// =========================

projectForm.addEventListener("submit", event => {

    event.preventDefault();

    const newProject = {

        id: Date.now(),

        name: document.getElementById("project-name").value.trim(),

        description: document.getElementById("project-description").value.trim(),

        startDate: document.getElementById("project-start-date").value,

        deadline: document.getElementById("project-deadline").value,

        status: document.getElementById("project-status").value

    };

    if (!newProject.name) return;

    projects.push(newProject);

    renderProjects();

    projectForm.reset();

});


// =========================
// 5. DELETE PROJECT
// =========================

projectList.addEventListener("click", event => {

    const action = event.target.dataset.action;
    const projectId = Number(event.target.dataset.id);

    if (action !== "delete-project" || !projectId) return;

    projects = projects.filter(project => {
        return project.id !== projectId;
    });

    renderProjects();

});


// =========================
// 6. INITIAL RENDER
// =========================

renderProjects();

if (typeof updateAnalytics === "function") {
    updateAnalytics();
}
