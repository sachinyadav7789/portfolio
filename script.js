// 1. BACKGROUND AURA TRACKER
var aura = document.querySelector('.mouse-aura');
var mouseX = 0, mouseY = 0;
var isAnimating = false;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(function() {
            if (aura) {
                aura.style.left = mouseX + 'px';
                aura.style.top = mouseY + 'px';
            }
            isAnimating = false;
        });
    }
});

// 2. FLOATING PARTICLES
function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;
    
    for (var i = 0; i < 30; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (15 + Math.random() * 20) + 's';
        particle.style.animationDelay = (Math.random() * 20) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.1 + Math.random() * 0.2;
        container.appendChild(particle);
    }
}
createParticles();

// 3. GSAP ANIMATIONS
window.addEventListener('load', function() {
    if (typeof gsap !== 'undefined') {
        gsap.from(".gs-reveal", {
            y: 60,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out"
        });
    }
});

// 4. 3D TILT EFFECT
var tiltCards = document.querySelectorAll('.tilt-effect');

tiltCards.forEach(function(card) {
    var isHovering = false;
    
    card.addEventListener('mousemove', function(e) {
        if (!isHovering) return;
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        
        var rotateX = ((y - centerY) / centerY) * -4;
        var rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        card.style.transition = 'none';
    });

    card.addEventListener('mouseenter', function() {
        isHovering = true;
        card.style.transition = 'none';
    });

    card.addEventListener('mouseleave', function() {
        isHovering = false;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// 5. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 6. SKILL BARS OBSERVER
var skillBars = document.querySelectorAll('.skill-progress');
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var bar = entry.target;
            bar.style.width = bar.style.width;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(function(bar) {
    observer.observe(bar);
});