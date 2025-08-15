// Smooth scrolling para os links da navbar
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links da navbar
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de cursor piscando para títulos com typing-effect
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        element.style.borderRight = '2px solid cyan';
        element.style.animation = 'blink 1s infinite';
    });
});
