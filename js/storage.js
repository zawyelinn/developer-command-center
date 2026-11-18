
/* =========================
   1. SAVE DATA
========================= */

function saveData(key, data) {

    localStorage.setItem(key, JSON.stringify(data));

}


/* =========================
   2. LOAD DATA
========================= */

function loadData(key, fallback = []) {

    const savedData = localStorage.getItem(key);

    if (savedData === null) {
        return fallback;
    }

    try {

        return JSON.parse(savedData);

    } catch (error) {

        console.error(`Failed to load ${key}:`, error);

        return fallback;

    }

}


/* =========================
   3. REMOVE DATA
========================= */

function removeData(key) {

    localStorage.removeItem(key);

}
