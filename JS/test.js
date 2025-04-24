const header = document.getElementById("header");
let isSticky = false;
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (scrollY > 80 && !isSticky) {
    header.classList.add("sticky");
    isSticky = true;
  } else if (scrollY <= 80 && isSticky) {
    header.classList.remove("sticky");
    isSticky = false;
  }
});