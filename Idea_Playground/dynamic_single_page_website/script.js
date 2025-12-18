function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error("Page not found");
            }
            return response.text();
        })
        .then(html => {
            document.querySelector("main").innerHTML = html;
        })
        .catch(error => {
            document.querySelector("main").innerHTML =
                "<p>Error loading page</p>";
            console.error(error);
        });
}

function showPage1() {
    loadPage("page_1.html");
    document.getElementById("page_1_btn").classList.add("active_btn");
    document.getElementById("page_2_btn").classList.remove("active_btn");
}

function showPage2() {
    loadPage("page_2.html");
    document.getElementById("page_2_btn").classList.add("active_btn");
    document.getElementById("page_1_btn").classList.remove("active_btn");
}