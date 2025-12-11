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

// Shared audio context helper to avoid repeated creation and suspended state
window.getJournalAudioContext = async function() {
    if (!window._journalAudioCtx) {
        window._journalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (window._journalAudioCtx.state === 'suspended') {
        await window._journalAudioCtx.resume();
    }
    return window._journalAudioCtx;
}

// Persistent audio context for SOS to avoid Safari throttling/closure issues
window.getPersistentAudioContext = async function() {
    if (!window._journalPersistentCtx) {
        window._journalPersistentCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (window._journalPersistentCtx.state === 'suspended') {
        await window._journalPersistentCtx.resume();
    }
    return window._journalPersistentCtx;
}

// Morse code S.O.S sound effect - distress signal (scheduled block on persistent context)
// S = 3 dots, O = 3 dashes, S = 3 dots
window.playSOSSound = async function() {
    try {
        const audioContext = await window.getPersistentAudioContext();
        
        // Safari-safe: slower, louder, more sustain
        const dot = 0.40;      // seconds
        const dash = 1.20;     // 3x dot
        const gap = 0.40;      // between tones
        const charGap = 0.70;  // between characters
        const freq = 760;      // slightly lower for clarity on laptop speakers
        
        let t = audioContext.currentTime + 0.20; // schedule shortly in future
        
// sourcery skip: avoid-function-declarations-in-blocks
        function scheduleTone(duration) {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.setValueAtTime(freq, t);
            osc.type = 'sine';
            
            // Strong envelope for audibility
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.9, t + 0.03);
            gain.gain.linearRampToValueAtTime(0.18, t + duration - 0.10);
            gain.gain.linearRampToValueAtTime(0, t + duration);
            
            osc.start(t);
            osc.stop(t + duration + 0.08);
            
            t += duration + gap;
        }
        
        // S
        scheduleTone(dot);
        scheduleTone(dot);
        scheduleTone(dot);
        t += charGap - gap; // adjust after character
        // O
        scheduleTone(dash);
        scheduleTone(dash);
        scheduleTone(dash);
        t += charGap - gap;
        // S
        scheduleTone(dot);
        scheduleTone(dot);
        scheduleTone(dot);
    } catch (e) {
        console.log('Audio context not available');
    }
}
