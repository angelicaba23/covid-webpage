function toggleMenu() {
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation')
    let main = document.querySelector('.main')
    let details = document.querySelector('.details')
    let topbar = document.querySelector('.topbar')

    toggle.classList.toggle('active')
    navigation.classList.toggle('active')
    main.classList.toggle('active')
    topbar.classList.toggle('active')    
    details.classList.toggle('active')
}

function registerMenu() {
    let toggle = document.querySelector('.form');
    toggle.classList.toggle('active')
}