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
    const body = document.body;
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
