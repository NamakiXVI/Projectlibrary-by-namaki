document.addEventListener("DOMContentLoaded", function() {
const bimbimbambam = document.getElementById("warumistdiebananekrum");
const navbarHeight = bimbimbambam.clientHeight;

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop) {
 
        if (currentScrollTop >= 25) {
            bimbimbambam.style.position = "fixed";
            bimbimbambam.style.marginTop = "15px";
        }
    } else {
 
        if (currentScrollTop < 25) {
            bimbimbambam.style.position = "relative";
            bimbimbambam.style.marginTop = "15px";
        }
    }

    lastScrollTop = currentScrollTop;
});

window.addEventListener("load", () => {
    if (window.scrollY >= 25) {
        bimbimbambam.style.position = "fixed";
        bimbimbambam.style.marginTop = "125px";
    }
    else
    {
        bimbimbambam.style.position = "relative";
        bimbimbambam.style.marginTop = "15px";
    }
});
});