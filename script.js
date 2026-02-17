const reveals = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const sceneBg = document.querySelector(".scene-bg");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

reveals.forEach((item) => revealObserver.observe(item));

tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const rotateY = ((x - midX) / midX) * 8;
        const rotateX = -((y - midY) / midY) * 8;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
});

window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.12;
    if (sceneBg) {
        sceneBg.style.transform = `translateY(${offset}px)`;
    }
});
