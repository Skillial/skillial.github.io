let workTab, infoTab, mobileExperienceTab, mobileAboutTab;
let workContent, infoContent;
let navIndicator, mobileNavIndicator;

function updateIndicator(targetButton) {
    if (!navIndicator || !targetButton) return;
    navIndicator.style.left = `${targetButton.offsetLeft}px`;
    navIndicator.style.width = `${targetButton.offsetWidth}px`;
}

function updateMobileIndicator(targetButton) {
    if (!mobileNavIndicator || !targetButton) return;
    mobileNavIndicator.style.left = `${targetButton.offsetLeft}px`;
    mobileNavIndicator.style.width = `${targetButton.offsetWidth}px`;
}

function switchTab(activeSectionId) {
    return new Promise((resolve) => {
        let targetDesktopButton, targetMobileButton;

        // Hide both content sections
        workContent.style.display = 'none';
        infoContent.style.display = 'none';

        // Reset desktop tabs
        workTab.classList.remove('nav-toggle-active');
        workTab.classList.add('nav-toggle-inactive');
        workTab.setAttribute('aria-selected', 'false');

        infoTab.classList.remove('nav-toggle-active');
        infoTab.classList.add('nav-toggle-inactive');
        infoTab.setAttribute('aria-selected', 'false');

        // Reset mobile icon active state
        mobileExperienceTab.classList.remove('mobile-nav-active');
        mobileAboutTab.classList.remove('mobile-nav-active');

        if (activeSectionId === 'Experience') {
            workContent.style.display = 'block';
            // Set active state for desktop tab
            workTab.classList.add('nav-toggle-active');
            workTab.classList.remove('nav-toggle-inactive');
            workTab.setAttribute('aria-selected', 'true');
            // Set active state for mobile icon
            mobileExperienceTab.classList.add('mobile-nav-active');
            targetDesktopButton = workTab;
            targetMobileButton = mobileExperienceTab;
            // Restart typewriter
            clearTimeout(typewriterTimeoutId);
            typewriterTextElement.textContent = phrases[0].substring(0, 1);
            phraseIndex = 0;
            charIndex = 1;
            isDeleting = false;
            typewriterTimeoutId = setTimeout(typeWriter, typingSpeed);
        } else if (activeSectionId === 'About') {
            infoContent.style.display = 'block';
            // Set active state for desktop tab
            infoTab.classList.add('nav-toggle-active');
            infoTab.classList.remove('nav-toggle-inactive');
            infoTab.setAttribute('aria-selected', 'true');
            // Set active state for mobile icon
            mobileAboutTab.classList.add('mobile-nav-active');
            targetDesktopButton = infoTab;
            targetMobileButton = mobileAboutTab;
            // Stop typewriter
            clearTimeout(typewriterTimeoutId);
            typewriterTextElement.textContent = "";
            charIndex = 0;
            isDeleting = false;
        }
        updateIndicator(targetDesktopButton);
        updateMobileIndicator(targetMobileButton);
        resolve();
    });
}
// --- END OF MODIFICATIONS ---

const connectButton = document.getElementById('connect-button');
const connectButtonPhone = document.getElementById('connect-button-phone');
const connectModal = document.getElementById('connect-modal');
const modalCloseButton = document.getElementById('modal-close-button');
function showModal() {
    connectModal.classList.add('show');
    document.documentElement.style.overflow = 'hidden';
}
function hideModal() {
    connectModal.classList.remove('show');
    document.documentElement.style.overflow = '';
}
connectButton.addEventListener('click', showModal);
connectButtonPhone.addEventListener('click', showModal);
modalCloseButton.addEventListener('click', hideModal);
connectModal.addEventListener('click', (event) => {
    if (event.target === connectModal) {
        hideModal();
    }
});
const copyEmailIconButton = document.getElementById('copy-email-button-icon');
const userEmail = "jeancabrera2003@gmail.com";
if (copyEmailIconButton) {
    copyEmailIconButton.addEventListener('click', function () {
        const tempInput = document.createElement('textarea');
        tempInput.value = userEmail;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            copyEmailIconButton.classList.add('success');
            setTimeout(() => {
                copyEmailIconButton.classList.remove('success');
            }, 800);
        } catch (err) {
            console.error('Failed to copy email: ', err);
        } finally {
            document.body.removeChild(tempInput);
        }
    });
}
