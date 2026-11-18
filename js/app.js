// =========================
// 1. NAVIGATION ELEMENTS
// =========================

const navLinks = document.querySelectorAll(".nav-link");
const pageViews = document.querySelectorAll(".page-view");


// =========================
// 2. NAVIGATION FUNCTION
// =========================

function showPage(pageName) {

    // Remove active from all navigation links
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    // Hide all page views
    pageViews.forEach(view => {
        view.classList.remove("active");
    });

    // Find selected navigation link
    const selectedLink = document.querySelector(
        `[data-view="${pageName}"]`
    );

    // Find selected page
    const selectedPage = document.getElementById(
        `${pageName}-view`
    );

    // Activate selected elements
    if (selectedLink && selectedPage) {
        selectedLink.classList.add("active");
        selectedPage.classList.add("active");
    }

}


// =========================
// 3. NAVIGATION EVENTS
// =========================

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const pageName = link.dataset.view;

        showPage(pageName);

    });

});
// =========================
// INITIALIZE ANALYTICS
// =========================



updateDashboard();
updateAnalytics();