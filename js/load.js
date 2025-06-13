async function runSequence() {
    const portfolio = document.getElementById('portfolio');
    const grid = document.getElementById('grid-bg');
    portfolio.classList.remove('show');
    name.classList.remove('show');

    await animateTilesToColorRandomGroups('#f5f5f7', 0.96);
    name.classList.add('show');
    await delay(2000);

    await animateTilesToRandomWhite();
    name.classList.remove('show');

    // --- JAVASCRIPT MODIFICATIONS ---
    // Get all navigation elements
    workTab = document.getElementById('ExperienceTab');
    infoTab = document.getElementById('AboutTab');
    mobileExperienceTab = document.getElementById('mobileExperienceTab');
    mobileAboutTab = document.getElementById('mobileAboutTab');

    workContent = document.getElementById('Experience');
    infoContent = document.getElementById('About');
    navIndicator = document.getElementById('nav-indicator');
    mobileNavIndicator = document.getElementById('mobile-nav-indicator');


    workContent.classList.add('tab-content-section');
    infoContent.classList.add('tab-content-section');

    // Add event listeners for desktop tabs
    workTab.addEventListener('click', () => {
        switchTab('Experience').then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    infoTab.addEventListener('click', () => {
        switchTab('About').then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Add event listeners for mobile icons
    mobileExperienceTab.addEventListener('click', () => {
        switchTab('Experience').then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    mobileAboutTab.addEventListener('click', () => {
        switchTab('About').then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- END OF MODIFICATIONS ---

    document.body.style.overflowY = 'auto';
    window.scrollTo({ top: 0, behavior: 'instant' });
    switchTab('About') // Initialize and hide
    switchTab('Experience'); // Show default
    portfolio.classList.add('show');
    document.body.classList.add('portfolio-active');

    await animateTilesToColorRandomGroups('#f5f5f7', 0.96);
    grid.style.position = 'fixed';
    grid.style.zIndex = '-1';
    typewriterTextElement.textContent = phrases[0].substring(0, 1);
    typewriterTimeoutId = setTimeout(typeWriter, typingSpeed);

    // Initial position update for indicators after everything is visible
    updateIndicator(document.querySelector('.nav-toggle-button.nav-toggle-active'));
    updateMobileIndicator(document.querySelector('#phone-link .mobile-nav-active'));
}

window.onload = () => {
    createTiles();
    runSequence();
};

window.addEventListener('resize', () => {
    if (screen.width <= 425) {
        name = document.getElementById('phone-name');
        let abensonTasks = document.getElementById('abenson-tasks');
        let listItems = abensonTasks.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.display = 'none';
        });
    } else {
        name = document.getElementById('pc-name');
        let abensonTasks = document.getElementById('abenson-tasks');
        let listItems = abensonTasks.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.display = 'list-item';
        });
    }
    if (screen.width <= 768) {
        let languageList = document.getElementById('languages-list');
        languageList.classList.remove('border-t-2', 'border-gray-300', 'pt-2',);
    } else {
        let languageList = document.getElementById('languages-list');
        languageList.classList.add('border-t-2', 'border-gray-300', 'pt-2');
    }
    if (screen.width <= 1024) {
        document.getElementById('phone-about-me').style.display = 'block';
        document.getElementById('pc-about-me').style.display = 'none';
    } else {
        document.getElementById('phone-about-me').style.display = 'none';
        document.getElementById('pc-about-me').style.display = 'block';
    }

    const activeTab = document.querySelector('.nav-toggle-button.nav-toggle-active');
    if (activeTab) {
        updateIndicator(activeTab);
    }
    const activeMobileTab = document.querySelector('#phone-link .mobile-nav-active');
    if (activeMobileTab) {
        updateMobileIndicator(activeMobileTab);
    }
});