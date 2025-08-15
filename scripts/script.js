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

    // Efeito de digitação automática para o nome
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = ['Lucas Maciel', 'Desenvolvedor', 'Programador', 'Lucas Maciel'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; // velocidade base de digitação

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Apagando o texto
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // mais rápido ao apagar
            } else {
                // Escrevendo o texto
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // mais lento ao digitar
            }

            // Lógica para mudar de estado (escrever/apagar) e de texto
            if (!isDeleting && charIndex === currentText.length) {
                // Terminou de escrever, aguarda antes de começar a apagar
                typingSpeed = 1500; // pausa após completar a escrita
                isDeleting = true;
                setTimeout(type, typingSpeed);
                return;
            } else if (isDeleting && charIndex === 0) {
                // Terminou de apagar, muda para o próximo texto
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // pausa antes de começar a escrever o próximo
                setTimeout(type, typingSpeed);
                return;
            }

            // Chama a função recursivamente
            setTimeout(type, typingSpeed);
        }

        // Inicia o efeito de digitação
        type();
    }

    // Efeito de cursor piscando para títulos com typing-effect
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        element.style.borderRight = '2px solid cyan';
        element.style.animation = 'blink 1s infinite';
    });
});
