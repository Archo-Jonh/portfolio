document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved user preference, else use system preference, else default to dark
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = 'dark'; // Defaulting to dark as requested for modern look

    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (systemPrefersDark !== undefined) {
        currentTheme = systemPrefersDark ? 'dark' : 'light';
    }

    // Apply the initial theme
    htmlElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        currentTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateIcon(currentTheme);
    });

    function updateIcon(theme) {
        const iconSvg = document.getElementById('theme-icon');
        if (theme === 'dark') {
            // Sun icon (to switch to light)
            iconSvg.innerHTML = `
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
            `;
        } else {
            // Moon icon (to switch to dark)
            iconSvg.innerHTML = `
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            `;
        }
    }
});
