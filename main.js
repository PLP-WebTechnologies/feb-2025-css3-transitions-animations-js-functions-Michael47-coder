document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animationToggle = document.getElementById('animation-toggle');
    const themeColorPicker = document.getElementById('theme-color');
    const bgColorPicker = document.getElementById('bg-color');
    const resetBtn = document.getElementById('reset-btn');
    const animatedCards = document.querySelectorAll('.animated-card');
    
    // Load saved preferences
    loadPreferences();
    
    // Event Listeners
    animationToggle.addEventListener('change', toggleAnimations);
    themeColorPicker.addEventListener('input', updateThemeColor);
    bgColorPicker.addEventListener('input', updateBackgroundColor);
    resetBtn.addEventListener('click', resetPreferences);
    
    animatedCards.forEach(card => {
        card.addEventListener('click', function() {
            if (!animationToggle.checked) return;
            
            // Remove all animation classes first
            this.classList.remove('bounce', 'shake', 'pulse');
            
            // Force reflow to restart animation
            void this.offsetWidth;
            
            // Add specific animation based on card
            if (this.id === 'card1') {
                this.classList.add('bounce');
            } else if (this.id === 'card2') {
                this.classList.add('shake');
            } else if (this.id === 'card3') {
                this.classList.add('pulse');
            }
        });
    });
    
    // Functions
    function loadPreferences() {
        // Animation preference
        const animationsEnabled = localStorage.getItem('animationsEnabled');
        if (animationsEnabled !== null) {
            animationToggle.checked = animationsEnabled === 'true';
        }
        
        // Theme color
        const savedThemeColor = localStorage.getItem('themeColor');
        if (savedThemeColor) {
            themeColorPicker.value = savedThemeColor;
            updateThemeColor({target: {value: savedThemeColor}});
        }
        
        // Background color
        const savedBgColor = localStorage.getItem('bgColor');
        if (savedBgColor) {
            bgColorPicker.value = savedBgColor;
            document.body.style.backgroundColor = savedBgColor;
        }
    }
    
    function toggleAnimations() {
        localStorage.setItem('animationsEnabled', animationToggle.checked);
        
        if (!animationToggle.checked) {
            animatedCards.forEach(card => {
                card.classList.remove('bounce', 'shake', 'pulse');
            });
        }
    }
    
    function updateThemeColor(e) {
        const color = e.target.value;
        document.documentElement.style.setProperty('--primary-color', color);
        document.documentElement.style.setProperty('--secondary-color', shadeColor(color, -20));
        localStorage.setItem('themeColor', color);
    }
    
    function updateBackgroundColor(e) {
        const color = e.target.value;
        document.body.style.backgroundColor = color;
        localStorage.setItem('bgColor', color);
    }
    
    function resetPreferences() {
        // Clear storage
        localStorage.removeItem('animationsEnabled');
        localStorage.removeItem('themeColor');
        localStorage.removeItem('bgColor');
        
        // Reset to defaults
        animationToggle.checked = true;
        themeColorPicker.value = '#4a6fa5';
        bgColorPicker.value = '#f8f9fa';
        
        // Update UI
        updateThemeColor({target: {value: '#4a6fa5'}});
        document.body.style.backgroundColor = '#f8f9fa';
        
        // Remove all animations
        animatedCards.forEach(card => {
            card.classList.remove('bounce', 'shake', 'pulse');
        });
    }
    
    // Helper function to darken/lighten colors
    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1,3), 16);
        let G = parseInt(color.substring(3,5), 16);
        let B = parseInt(color.substring(5,7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  

        const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16);
        const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16);
        const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16);

        return "#"+RR+GG+BB;
    }
});