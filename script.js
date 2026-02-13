document.addEventListener("DOMContentLoaded", () => {

    const menuItems = document.querySelectorAll(".menu-item");

    /* =========================
       SCROLL REVEAL (SAFE)
    ========================== */
    if (menuItems.length > 0) {

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        menuItems.forEach(item => observer.observe(item));
    }


    /* =========================
       SMOOTH 3D CARD TILT
    ========================== */
    menuItems.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / 18;
            const rotateY = (x - centerX) / 18;

            // Keep visible transform working
            card.style.transform =
                `translateY(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg) scale(1)";
        });

    });

});


/* =========================
   OPEN ITEM WITH SMOOTH FADE
========================== */
function openItem(name, price, img) {

    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href =
            `item.html?name=${encodeURIComponent(name)}&price=${price}&img=${encodeURIComponent(img)}`;
    }, 300);
}
