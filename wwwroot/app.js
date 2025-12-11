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
        
        // Higher frequency for warning tone (buzzer-like)
        osc.frequency.value = 520;
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

// Success/confirmation sound effect - two ascending tones
window.playSuccessSound = function() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // First tone
        const osc1 = audioContext.createOscillator();
        const gainNode1 = audioContext.createGain();
        
        osc1.connect(gainNode1);
        gainNode1.connect(audioContext.destination);
        
        osc1.frequency.value = 600;
        osc1.type = 'sine';
        
        gainNode1.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode1.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.02);
        gainNode1.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.12);
        
        osc1.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.12);
        
        // Second tone (higher)
        const osc2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        
        osc2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        osc2.frequency.value = 800;
        osc2.type = 'sine';
        
        gainNode2.gain.setValueAtTime(0, audioContext.currentTime + 0.12);
        gainNode2.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.14);
        gainNode2.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.24);
        
        osc2.start(audioContext.currentTime + 0.12);
        osc2.stop(audioContext.currentTime + 0.24);
    } catch (e) {
        console.log('Audio context not available');
    }
}

// Delete/backspace sound effect - short pop tone
window.playDeleteSound = function() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator for delete sound
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Short descending tone for delete
        osc.frequency.setValueAtTime(450, audioContext.currentTime);
        osc.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.05);
        osc.type = 'sine';
        
        // Quick attack and release for pop effect
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.05);
    } catch (e) {
        console.log('Audio context not available');
    }
}

// Morse code S.O.S sound effect - distress signal
// S = 3 dots, O = 3 dashes, S = 3 dots
window.playSOSSound = async function() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.resume();
        
        // Slightly longer durations and stronger tone for clarity
        const dotDuration = 0.15;     // Short tone (dot)
        const dashDuration = 0.45;    // Long tone (dash) = 3x dot
        const gapDuration = 0.12;     // Gap between tones
        const charGapDuration = 0.25; // Gap between characters
        
        let currentTime = audioContext.currentTime;
        
        // Helper to play one tone
        function playTone(duration, time, frequency = 820) {
            const osc = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            osc.frequency.value = frequency;
            osc.type = 'sine';
            
            // Soft attack/decay envelope for audibility
            gainNode.gain.setValueAtTime(0, time);
            gainNode.gain.linearRampToValueAtTime(0.3, time + 0.02);
            gainNode.gain.linearRampToValueAtTime(0.0001, time + duration - 0.02);
            gainNode.gain.setValueAtTime(0, time + duration);
            
            osc.start(time);
            osc.stop(time + duration);
        }
        
        // S = 3 dots
        playTone(dotDuration, currentTime);
        currentTime += dotDuration + gapDuration;
        playTone(dotDuration, currentTime);
        currentTime += dotDuration + gapDuration;
        playTone(dotDuration, currentTime);
        currentTime += dotDuration + charGapDuration;
        
        // O = 3 dashes
        playTone(dashDuration, currentTime);
        currentTime += dashDuration + gapDuration;
        playTone(dashDuration, currentTime);
        currentTime += dashDuration + gapDuration;
        playTone(dashDuration, currentTime);
        currentTime += dashDuration + charGapDuration;
        
        // S = 3 dots
        playTone(dotDuration, currentTime);
        currentTime += dotDuration + gapDuration;
        playTone(dotDuration, currentTime);
        currentTime += dotDuration + gapDuration;
        playTone(dotDuration, currentTime);
    } catch (e) {
        console.log('Audio context not available');
    }
}
