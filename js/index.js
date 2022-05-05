/**********************************************/
/*  Loader
/**********************************************/
let section = document.getElementsByTagName("section")
let loader_ctn = document.getElementById("loader_ctn")
window.addEventListener("load", () => {
    for (let i = 0; i < section.length; i++) {
        section[i].classList.remove("hidden");
    }
    loader_ctn.classList.add("hidden");
})

//Language Selection Function

let spanish = document.getElementsByClassName('es')
let english = document.getElementsByClassName('en')

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('hidden-skills').style.display = "none";
    for (var i = 0; i < spanish.length; i++) {
        spanish[i].style.display = "none";
        english[i].style.display = "block";
    }
});

function selectLan(el) {
    lang = el.selectedIndex

    if (lang == 0) {
        for (var i = 0; i < spanish.length; i++) {
            spanish[i].style.display = "none";
            english[i].style.display = "block";
        }
    } else {
        for (var i = 0; i < spanish.length; i++) {
            spanish[i].style.display = "block";
            english[i].style.display = "none";
        }
    }
}

function showSkills() {
    const skills = document.getElementById('hidden-skills');
    if (skills.style.display === "none") {
        skills.style.display = "block";
    } else {
        skills.style.display = "none";
    }
}