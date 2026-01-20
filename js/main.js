document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Main.js loaded successfully.");

// --- 1. ACCORDION LOGIC ---
    const triggers = document.querySelectorAll('.case-study-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Get the current state (Open or Closed?)
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Toggle ONLY the button that was clicked.
            // We removed the code that searched for other buttons to close them.
            trigger.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // --- 2. GAME ENGINE LOADER & FULLSCREEN ---
    const startBtn = document.getElementById('start-engine-btn');
    const gameContainer = document.getElementById('game-stage-container');
    const fsBtn = document.getElementById('btn-fullscreen-enter');

    // Fullscreen Logic
    if (fsBtn && gameContainer) {
        fsBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                gameContainer.requestFullscreen().catch(err => {
                    console.error(`Error enabling full-screen mode: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    // Game Loader Logic
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log("Initializing Game Engine...");
            startBtn.innerText = "LOADING...";
            startBtn.style.opacity = "0.7";

            const iframe = document.createElement('iframe');
            iframe.src = 'html/greybox.html';
            iframe.style.width = '100%';
            iframe.style.height = '480px'; // 3x scale of 160px
            iframe.style.border = 'none';
            iframe.style.display = 'block';
            iframe.allow = "fullscreen"; // Allow iframe to inherit fullscreen

            setTimeout(() => {
                // SURGICAL REMOVAL: Only remove the placeholder items, NOT the container or button
                const overlay = document.getElementById('game-overlay');
                const placeholderCanvas = gameContainer.querySelector('canvas');
                const oldMobileControls = document.getElementById('mobile-controls'); // Remove index.html's controls
                
                if (overlay) overlay.remove();
                if (placeholderCanvas) placeholderCanvas.remove();
                if (oldMobileControls) oldMobileControls.remove();

                // Insert iframe BEFORE the fullscreen button so the button stays at the bottom
                if (fsBtn) {
                    gameContainer.insertBefore(iframe, fsBtn);
                } else {
                    gameContainer.appendChild(iframe);
                }
                
                gameContainer.style.background = '#020617'; 
            }, 500);
        });
    }
});