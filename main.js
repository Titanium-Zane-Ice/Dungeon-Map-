const overlay = document.getElementById("overlay");
const radiusInput = document.getElementById("radius");
const toggle = document.getElementById("toggle");
const customCursor = document.getElementById("custom-cursor");

let radius = Number(radiusInput.value);
overlay.style.setProperty("--r", radius + "px");

radiusInput.addEventListener("input", (e) => {
	radius = Number(e.target.value);
	overlay.style.setProperty("--r", radius + "px");
});

function setPos(clientX, clientY) {
	const rect = overlay.getBoundingClientRect();

	const maskX = clientX - rect.left;
	const maskY = clientY - rect.top;
	overlay.style.setProperty("--x", maskX + "px");
	overlay.style.setProperty("--y", maskY + "px");

	customCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
}

overlay.addEventListener("mousemove", (e) => setPos(e.clientX, e.clientY));
overlay.addEventListener(
	"touchmove",
	(e) => {
		if (e.touches && e.touches[0]) {
			setPos(e.touches[0].clientX, e.touches[0].clientY);
		}
		e.preventDefault();
	},
	{ passive: false }
);

setPos(window.innerWidth / 2, window.innerHeight / 2);

let passthrough = false;
let flickerTime = 0;

function animateFlicker() {
	flickerTime += 0.05;
	const flickerOffset = Math.sin(flickerTime * 3) * 3;
	overlay.style.setProperty("--r", radius + flickerOffset + "px");
	requestAnimationFrame(animateFlicker);
}

animateFlicker();
