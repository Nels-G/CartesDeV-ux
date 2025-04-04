
// Variables
const welcomePage = document.getElementById('welcomePage');
const celebrationPage = document.getElementById('celebrationPage');
const messagePage = document.getElementById('messagePage');
const nameInput = document.getElementById('nameInput');
const errorMessage = document.getElementById('errorMessage');
const receiveBtn = document.getElementById('receiveBtn');
const mailbox = document.getElementById('mailbox');
const userName = document.getElementById('userName');
const recipientName = document.getElementById('recipientName');
const easterEggs = document.getElementById('easterEggs');
const transitionOverlay = document.getElementById('transitionOverlay');
const transitionContent = document.getElementById('transitionContent');

// Tableaux de styles pour les alternances
const backgroundStyles = [
    'linear-gradient(135deg, #f6e6fa, #e0f7ff)',
    'linear-gradient(135deg, #ffecd2, #fcb69f)',
    'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
    'linear-gradient(135deg, #d4fc79, #96e6a1)',
    'linear-gradient(135deg, #fbc2eb, #a6c1ee)'
];

const cardStyles = [
    { bg: 'rgba(255, 255, 255, 0.85)', shadow: '0 10px 30px rgba(0, 0, 0, 0.1)' },
    { bg: 'rgba(254, 250, 224, 0.9)', shadow: '0 10px 30px rgba(189, 147, 49, 0.15)' },
    { bg: 'rgba(232, 245, 255, 0.9)', shadow: '0 10px 30px rgba(0, 119, 182, 0.15)' },
    { bg: 'rgba(242, 255, 230, 0.9)', shadow: '0 10px 30px rgba(73, 160, 15, 0.15)' },
    { bg: 'rgba(255, 230, 250, 0.9)', shadow: '0 10px 30px rgba(180, 62, 155, 0.15)' }
];

const titleColors = [
    '#6a3093', '#e67e22', '#3498db', '#27ae60', '#9b59b6'
];

const textColors = [
    '#444', '#5a3921', '#2c3e50', '#1d3c25', '#4a235a'
];

  
  // Fonction pour valider le formulaire
  function validateForm() {
    const name = nameInput.value.trim();
    if (!name) {
        nameInput.classList.add('invalid');
        errorMessage.classList.add('visible');
        return false;
    } else {
        nameInput.classList.remove('invalid');
        errorMessage.classList.remove('visible');
        return true;
    }
}

// Fonction pour changer le style de la page
let styleIndex = 0;
function changePageStyle() {
    styleIndex = (styleIndex + 1) % backgroundStyles.length;
    
    document.body.style.background = backgroundStyles[styleIndex];
    welcomePage.style.backgroundColor = cardStyles[styleIndex].bg;
    welcomePage.style.boxShadow = cardStyles[styleIndex].shadow;
    
    const titles = document.querySelectorAll('h1');
    titles.forEach(title => {
        title.style.color = titleColors[styleIndex];
    });
    
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.color = textColors[styleIndex];
    });
}

// Démarrer le changement de style toutes les 3 secondes
setInterval(changePageStyle, 3000);

// Create Easter eggs
function createEasterEggs() {
    const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
    
    for (let i = 0; i < 10; i++) {
        const egg = document.createElement('div');
        egg.classList.add('egg');
        egg.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        egg.style.left = Math.random() * 100 + '%';
        egg.style.top = Math.random() * 100 + '%';
        egg.style.animationDelay = (Math.random() * 5) + 's';
        easterEggs.appendChild(egg);
    }
}

// Créer les œufs volants pour la transition
function createFlyingEggs() {
    const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const egg = document.createElement('div');
            egg.classList.add('flying-egg');
            egg.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            egg.style.top = Math.random() * 80 + 10 + '%';
            egg.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
            transitionOverlay.appendChild(egg);
            
            // Supprimer l'œuf après l'animation
            setTimeout(() => {
                egg.remove();
            }, 2000);
        }, i * 200);
    }
}

// Create confetti
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '1000';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#277da1'];
    
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            confettiContainer.appendChild(confetti);
            
            // Animate confetti falling
            const animationDuration = Math.random() * 3 + 2;
            confetti.style.animation = `
                fadeIn 0.5s ease-out,
                fall ${animationDuration}s linear forwards
            `;
            
            // Add keyframes for falling animation
            const style = document.createElement('style');
            const horizontalMovement = (Math.random() - 0.5) * 20;
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) translateX(${horizontalMovement}vw) rotate(${Math.random() * 360 + 180}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
                style.remove();
            }, animationDuration * 1000);
        }, i * 50);
    }
}

// Fonctions pour l'animation de transition
function startTransition(name) {
    // Activer l'overlay de transition
    transitionOverlay.classList.add('active');
    
    // Créer une série d'écrans colorés qui apparaissent un après l'autre
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#277da1'];
    
    // Vider le contenu de transition précédent
    transitionContent.innerHTML = '';
    
    // Créer des écrans de transition
    for (let i = 0; i < colors.length; i++) {
        const screen = document.createElement('div');
        screen.classList.add('transition-screen');
        screen.style.backgroundColor = colors[i];
        screen.style.zIndex = i;
        transitionOverlay.appendChild(screen);
        
        // Animer l'entrée des écrans avec un délai séquentiel
        setTimeout(() => {
            screen.style.transform = 'translateY(0)';
            
            // Animer la sortie après un délai
            setTimeout(() => {
                screen.style.transform = 'translateY(-100%)';
            }, 300 + (i * 100));
        }, i * 300);
    }
    
    // Ajouter des œufs volants
    createFlyingEggs();
    
    // Animer le texte "Joyeuses Pâques" à la fin de la transition
    setTimeout(() => {
        // Créer le texte "Joyeuses Pâques"
        transitionContent.innerHTML = `<div class="easter-text">Joyeuses Pâques</div>`;
        
        // Terminer la transition et le texte ensemble après un délai
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
            // Supprimer tous les écrans de transition
            const screens = document.querySelectorAll('.transition-screen');
            screens.forEach(screen => screen.remove());
            
            // Afficher la page de célébration
            welcomePage.classList.add('hidden');
            celebrationPage.classList.remove('hidden');
            createConfetti();
        }, 3000);
    }, 1200);
}

// Event listeners
receiveBtn.addEventListener('click', () => {
    if (validateForm()) {
        const name = nameInput.value.trim();
        userName.textContent = name;
        recipientName.textContent = name;
        
        // Démarrer la transition au lieu d'aller directement à la page suivante
        startTransition(name);
    }
});

// Valider également à l'appui sur Entrée dans le champ
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (validateForm()) {
            receiveBtn.click();
        }
    }
});

// Enlever l'erreur quand l'utilisateur commence à taper
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
        nameInput.classList.remove('invalid');
        errorMessage.classList.remove('visible');
    }
});

mailbox.addEventListener('click', () => {
    celebrationPage.classList.add('hidden');
    messagePage.classList.remove('hidden');
    createConfetti();
});

// Initialize
createEasterEggs();