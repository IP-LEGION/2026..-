// WHATSAPP REDIRECT
function toChannel() {
    window.open("https://whatsapp.com/channel/0029Vb6GTmmHrDZgiRioij3n", "_blank");
}

// AUDIO INITIALIZER (Fixes the "Not Playing" bug)
const audio = document.getElementById('bgMusic');
const viz = document.getElementById('viz');
let audioStarted = false;

function initAudio() {
    if(!audioStarted) {
        audio.play().catch(e => console.log("User must interact first"));
        viz.classList.add('playing');
        audioStarted = true;
    }
}

// FIREWORKS (High Velocity)
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
function triggerFireworks() {
    const colors = ['#ff0055', '#00f2ff', '#7000ff', '#ffea00'];
    for(let i=0; i<150; i++) {
        particles.push({
            x: canvas.width/2, y: canvas.height/2,
            vx: (Math.random()-0.5)*25, vy: (Math.random()-0.5)*25,
            a: 1, c: colors[Math.floor(Math.random()*colors.length)]
        });
    }
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.a -= 0.01;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2); ctx.fill();
        if(p.a <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(loop);
}
loop();

// COUNTDOWN
function tick() {
    const target = new Date('Jan 1, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;
    
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    
    document.getElementById('countdown').innerText = 
        `${String(d).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(tick, 1000);

// REVEAL ON SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(r => {
    r.style.opacity = 0;
    r.style.transform = "translateY(50px)";
    r.style.transition = "1s ease-out";
    observer.observe(r);
});
