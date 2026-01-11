/*
    McGovern.Design - Main Logic
    Handles the Case Study Accordions and the Game Engine Loader
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ACCORDION LOGIC ---
    const triggers = document.querySelectorAll('.case-study-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const content = trigger.nextElementSibling;
            
            // Close all other accordions (Optional - "Exclusive Accordion")
            triggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    // Reset the caret rotation via CSS class or attribute
                }
            });

            // Toggle current
            trigger.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // --- 2. GAME ENGINE LOADER ---
    const startBtn = document.getElementById('start-engine-btn');
    const gameContainer = document.getElementById('game-stage-container');
    const gameOverlay = document.getElementById('game-overlay');

    if (startBtn && gameContainer) {
        startBtn.addEventListener('click', () => {
            
            // Visual Feedback
            startBtn.innerText = "LOADING...";
            startBtn.style.opacity = "0.7";

            // 1. Create the Iframe
            const iframe = document.createElement('iframe');
            iframe.src = 'html/greybox.html';
            iframe.style.width = '100%';
            iframe.style.height = '600px'; // Tall enough for game + dev tools
            iframe.style.border = 'none';
            iframe.style.display = 'block';
            
            // 2. Clear the container (removes the placeholder image if any)
            // But we want to keep the overlay until it loads, so we append.
            
            // Actually, let's swap the inner HTML to just the iframe
            // This effectively removes the overlay and button
            
            // Wait a tiny bit for the "Loading" text to register, then swap
            setTimeout(() => {
                gameContainer.innerHTML = ''; // Clear Overlay & Button
                gameContainer.appendChild(iframe);
                gameContainer.style.background = '#020617'; // Match game background
            }, 500);
        });
    }
});