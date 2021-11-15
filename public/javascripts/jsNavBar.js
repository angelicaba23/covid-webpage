const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", ()=> {
    navMenu.classList.toggle("nav-menu_visible")

    if(navMenu.classList.contains("nav-menu:visible")){
        navToggle.setAttribute("aria-label", "Cerrar menú")
    }else {
        navToggle.setAttribute("arial-label", "Abrir menú")
    }
})