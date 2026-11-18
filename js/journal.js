
// =========================
// 1. JOURNAL ELEMENTS
// =========================

const journalForm = document.getElementById("journal-form");
const journalList = document.getElementById("journal-list");


// =========================
// 2. JOURNAL DATA
// =========================

let journalEntries = loadData("journalEntries");


// =========================
// 3. RENDER JOURNAL
// =========================

function renderJournal() {

    // Save journal entries
    saveData("journalEntries", journalEntries);

    journalList.replaceChildren();

    if (journalEntries.length === 0) {

        const message = document.createElement("p");
        message.textContent = "No journal entries yet.";

        journalList.appendChild(message);

        return;
    }

    journalEntries.forEach(entry => {

        const card = document.createElement("div");
        card.className = "journal-item";

        const title = document.createElement("h4");
        title.textContent = entry.title;

        const date = document.createElement("p");
        date.textContent = `Date: ${entry.date}`;

        const content = document.createElement("p");
        content.textContent = entry.content;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.dataset.action = "delete-journal";
        deleteButton.dataset.id = entry.id;

        card.append(title, date, content, deleteButton);

        journalList.appendChild(card);

    });

}


// =========================
// 4. CREATE JOURNAL ENTRY
// =========================

journalForm.addEventListener("submit", event => {

    event.preventDefault();

    const newEntry = {

        id: Date.now(),

        date: document.getElementById("journal-date").value,

        title: document.getElementById("journal-title").value.trim(),

        content: document.getElementById("journal-content").value.trim()

    };

    if (!newEntry.title || !newEntry.content) return;

    journalEntries.push(newEntry);

    renderJournal();

    journalForm.reset();

});


// =========================
// 5. DELETE JOURNAL ENTRY
// =========================

journalList.addEventListener("click", event => {

    const action = event.target.dataset.action;

    const entryId = Number(event.target.dataset.id);

    if (action !== "delete-journal" || !entryId) return;

    journalEntries = journalEntries.filter(entry => {
        return entry.id !== entryId;
    });

    renderJournal();

});


// =========================
// 6. INITIAL RENDER
// =========================

renderJournal();
