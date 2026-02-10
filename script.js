document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");

    if (menuItems.length === 0) return;

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.01 }
    );

    menuItems.forEach(item => observer.observe(item));
});

function openItem(name, price, img) {
    window.location.href =
        `item.html?name=${encodeURIComponent(name)}&price=${price}&img=${encodeURIComponent(img)}`;
}
