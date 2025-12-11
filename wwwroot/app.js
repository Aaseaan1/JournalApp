// PDF Download functionality
function downloadFile(filename, base64Data) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    
    // Cleanup
    window.URL.revokeObjectURL(link.href);
}

// Theme toggle functionality
window.toggleThemeClass = function(isDark) {
    const { body } = document;
    const page = document.querySelector('.page');
    
    if (isDark) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        if (page) {
            page.classList.add('dark-theme');
            page.classList.remove('light-theme');
        }
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        if (page) {
            page.classList.add('light-theme');
            page.classList.remove('dark-theme');
        }
    }
}

// PIN button click sound effect - iPhone notification sound
window.playPinBeep = function() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator for iPhone-like tone
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // iPhone characteristic tone
        osc.frequency.value = 540;
        osc.type = 'sine';
        
        // Create the iPhone tone pattern
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.02);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.08);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.08);
    } catch (e) {
        console.log('Audio context not available');
    }
}

// Warning/error sound effect - buzzer tone
window.playWarningSound = function() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator for warning/error tone
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Lower frequency for warning tone (buzzer-like)
        osc.frequency.value = 280;
        osc.type = 'sine';
        
        // Create a buzzer effect with quick attack and sustained tone
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.25);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.25);
    } catch (e) {
        console.log('Audio context not available');
    }
}
