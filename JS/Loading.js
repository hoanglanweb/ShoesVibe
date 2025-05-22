window.addEventListener("load", () =>{
    const preloader = document.getElementById("preloader")
    const content = document.getElementById("max-content")

    setTimeout(() =>{
        preloader.style.display = "none"
        content.style.display = "block"
    },2000)
})