// Wait for the page to load
/*document.addEventListener('DOMContentLoaded', () => {
    
    // Get all the accordion triggers
    const triggers = document.querySelectorAll('.case-study-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Get the content panel that is *right after* the button
            const content = trigger.nextElementSibling;
            
            // Check if it's already open
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // Toggle the ARIA attribute
            trigger.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the content's visibility
            content.hidden = isExpanded; // (Optional, but good for accessibility)
        });
    });
});
*/

// Updated accordion_script.js
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.case-study-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // 1. Get the target ID from the button's aria-controls
            const targetId = trigger.getAttribute('aria-controls');
            const content = document.getElementById(targetId);
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // 2. Close ALL other sections (Exclusive Accordion)
            triggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherTarget = otherTrigger.getAttribute('aria-controls');
                    const otherContent = document.getElementById(otherTarget);
                    if (otherContent) otherContent.classList.remove('active');
                }
            });

            // 3. Toggle the clicked section
            trigger.setAttribute('aria-expanded', !isExpanded);
            if (content) {
                // This class triggers the CSS transition!
                content.classList.toggle('active');
            }
        });
    });
});