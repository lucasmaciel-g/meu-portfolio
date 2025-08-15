// Efeito de partículas flutuantes no background
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.className = 'fixed text-cyan-500 opacity-20 text-xs font-mono pointer-events-none z-10';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    const codes = ['{ }', '[ ]', '< />', 'fn()', '0x1A', 'null', 'true', 'const', 'let', 'var'];
    particle.textContent = codes[Math.floor(Math.random() * codes.length)];
    
    document.body.appendChild(particle);
    
    // Anima a partícula para cima
    particle.animate([
        { transform: 'translateY(0px)', opacity: 0.2 },
        { transform: 'translateY(-' + (window.innerHeight + 100) + 'px)', opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    }).onfinish = () => {
        particle.remove();
    };
}

// Cria partículas periodicamente
setInterval(createFloatingParticle, 2000);