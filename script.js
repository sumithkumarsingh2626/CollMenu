document.addEventListener("DOMContentLoaded", () => {

    const menuItems = document.querySelectorAll(".menu-item");

    /* =========================
       SCROLL REVEAL
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
       3D MOUSE TILT EFFECT
    ========================== */
    menuItems.forEach(card => {

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / 15;
            const rotateY = (x - centerX) / 15;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        });

    });

});


/* =========================
   OPEN ITEM WITH SMOOTH TRANSITION
========================== */
function openItem(name, price, img) {

    // Add fade-out effect before navigating
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href =
            `item.html?name=${encodeURIComponent(name)}&price=${price}&img=${encodeURIComponent(img)}`;
    }, 300);
}
