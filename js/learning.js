
// =========================
// 1. LEARNING ELEMENTS
// =========================

const learningForm = document.getElementById("learning-form");
const learningList = document.getElementById("learning-list");

const totalSkillsElement = document.getElementById("total-skills");


// =========================
// 2. LEARNING DATA
// =========================

let skills = loadData("skills");


// =========================
// 3. RENDER SKILLS
// =========================

function renderSkills() {


    // Save current skills
    saveData("skills", skills);

    learningList.replaceChildren();

    totalSkillsElement.textContent = skills.length;
    
    learningList.replaceChildren();

    totalSkillsElement.textContent = skills.length;

    if (skills.length === 0) {

        const message = document.createElement("p");
        message.textContent = "No skills added yet.";

        learningList.appendChild(message);

        return;
    }

    skills.forEach(skill => {

        const card = document.createElement("div");
        card.className = "skill-item";

        const title = document.createElement("h4");
        title.textContent = skill.title;

        const category = document.createElement("p");
        category.textContent = `Category: ${skill.category}`;

        const status = document.createElement("p");
        status.textContent = skill.completed
            ? "Completed"
            : "In Progress";

        const completeButton = document.createElement("button");
        completeButton.textContent = skill.completed
            ? "Undo"
            : "Complete";

        completeButton.dataset.action = "toggle-skill";
        completeButton.dataset.id = skill.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.dataset.action = "delete-skill";
        deleteButton.dataset.id = skill.id;

        card.append(
            title,
            category,
            status,
            completeButton,
            deleteButton
        );

        learningList.appendChild(card);

    });

}


// =========================
// 4. ADD NEW SKILL
// =========================

learningForm.addEventListener("submit", event => {

    event.preventDefault();

    const title = document.getElementById("learning-title").value.trim();

    const category = document.getElementById("learning-category").value;

    if (!title) return;

    const newSkill = {

        id: Date.now(),

        title: title,

        category: category,

        completed: false

    };

    skills.push(newSkill);

    renderSkills();

    learningForm.reset();

});


// =========================
// 5. SKILL ACTIONS
// =========================

learningList.addEventListener("click", event => {

    const action = event.target.dataset.action;

    const skillId = Number(event.target.dataset.id);

    if (!action || !skillId) return;

    if (action === "toggle-skill") {

        skills = skills.map(skill => {

            if (skill.id === skillId) {

                return {
                    ...skill,
                    completed: !skill.completed
                };

            }

            return skill;

        });

    }

    if (action === "delete-skill") {

        skills = skills.filter(skill => {
            return skill.id !== skillId;
        });

    }

    renderSkills();

});


// =========================
// 6. INITIAL RENDER
// =========================

renderSkills();
