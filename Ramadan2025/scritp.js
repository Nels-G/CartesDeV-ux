// Initialize Three.js background
const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true
});

const starVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0002;
    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    const timeline = gsap.timeline();
    
    // Crescent moon animation
    timeline.to('.crescent', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
    });
    
    // Title and subtitle animations
    timeline.to('.title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5');
    
    timeline.to('.subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.7');
    
    // Button animation
    timeline.to('.btn-container', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.5');
    
    // Create and animate floating Arabic calligraphy
    const calligraphyTexts = ['رمضان', 'مبارك', 'سلام', 'بركة', 'نور'];
    const container = document.querySelector('.container');
    
    calligraphyTexts.forEach((text, index) => {
        const calligraphy = document.createElement('div');
        calligraphy.classList.add('calligraphy');
        calligraphy.textContent = text;
        calligraphy.style.top = `${Math.random() * 80 + 10}%`;
        calligraphy.style.left = `${Math.random() * 80 + 10}%`;
        container.appendChild(calligraphy);
        
        gsap.to(calligraphy, {
            opacity: 0.7,
            duration: 2,
            delay: index * 0.3 + 1,
            ease: 'power2.out'
        });
        
        gsap.to(calligraphy, {
            y: -30,
            duration: 10 + Math.random() * 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
    
    // Add twinkling stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        document.body.appendChild(star);
    }
});

// Button interaction and message reveal
const giftBtn = document.getElementById('gift-btn');
const messageModal = document.getElementById('message-modal');
const closeBtn = document.querySelector('.close-btn');
const messageContent = document.querySelector('.message-content');

// Create particle explosion function
function createParticles(x, y) {
    const container = document.querySelector('.container');
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        container.appendChild(particle);
        
        gsap.to(particle, {
            x: vx * 10,
            y: vy * 10,
            opacity: 0,
            duration: 1 + Math.random(),
            ease: 'power2.out',
            onComplete: () => {
                particle.remove();
            }
        });
    }
}

// Button click event 
giftBtn.addEventListener('click', (event) => {
    // Create explosion at button position
    const rect = giftBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createParticles(x, y);
    
    // Play sound effect
    const sound = new Audio();
    sound.volume = 0.3;
    
    // Show message with animation
    messageModal.style.opacity = '1';
    messageModal.style.pointerEvents = 'all';
    
    gsap.to(messageContent, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });
    
    // Create falling stars animation
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const fallingStar = document.createElement('div');
            fallingStar.classList.add('star');
            fallingStar.style.width = `${Math.random() * 5 + 2}px`;
            fallingStar.style.height = fallingStar.style.width;
            fallingStar.style.top = '0';
            fallingStar.style.left = `${Math.random() * 100}%`;
            document.body.appendChild(fallingStar);
            
            gsap.to(fallingStar, {
                top: '100%',
                left: `+=${Math.random() * 200 - 100}`,
                opacity: 0,
                duration: Math.random() * 2 + 1,
                ease: 'power1.in',
                onComplete: () => {
                    fallingStar.remove();
                }
            });
        }, i * 100);
    }
});

// Close button
closeBtn.addEventListener('click', () => {
    gsap.to(messageContent, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
            messageModal.style.opacity = '0';
            messageModal.style.pointerEvents = 'none';
        }
    });
});

// Hover effects for button
giftBtn.addEventListener('mouseenter', () => {
    gsap.to(giftBtn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
    });
});

giftBtn.addEventListener('mouseleave', () => {
    gsap.to(giftBtn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
});