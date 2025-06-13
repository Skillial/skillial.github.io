const typewriterTextElement = document.getElementById('typewriter-text');
const phrases = [
    "Intuitive user experiences.",
    "Actionable data insights.",
    "Secure system architecture.",
    "Smart financial solutions."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 70;
let deletingSpeed = 40;
let pauseBeforeDelete = 1500;
let pauseBeforeType = 500;
let typewriterTimeoutId;
function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    clearTimeout(typewriterTimeoutId);
    if (isDeleting) {
        typewriterTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typewriterTimeoutId = setTimeout(typeWriter, pauseBeforeType);
            return;
        }
        typewriterTimeoutId = setTimeout(typeWriter, deletingSpeed);
    } else {
        typewriterTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            typewriterTimeoutId = setTimeout(typeWriter, pauseBeforeDelete);
            return;
        }
        typewriterTimeoutId = setTimeout(typeWriter, typingSpeed);
    }
}
