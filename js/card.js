function openModal() {
    document.getElementById('inquiry-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('inquiry-modal').classList.remove('open');
    document.body.style.overflow = '';
}

function copyToClipboard(text, element) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    const feedback = element.querySelector('.copy-feedback');
    feedback.classList.add('show');
    setTimeout(() => feedback.classList.remove('show'), 2000);
}
function toggleCard(card, event) {
    if (event.target.closest('.slider-wrapper') || event.target.closest('a')) return;

    card.classList.toggle('active');

    if (card.classList.contains('active')) {
        setTimeout(() => {
            card.querySelectorAll('.slider-container').forEach(s => updateSliderState(s));
        }, 100);
    }
}

function updateSliderState(container) {
    const wrapper = container.closest('.slider-wrapper');
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (scrollLeft > 10) {
        wrapper.classList.add('can-scroll-left');
    } else {
        wrapper.classList.remove('can-scroll-left');
    }

    if (scrollLeft < maxScroll - 10) {
        wrapper.classList.add('can-scroll-right');
    } else {
        wrapper.classList.remove('can-scroll-right');
    }
}

function moveSlider(btn, direction, event) {
    event.stopPropagation();
    const wrapper = btn.closest('.slider-wrapper');
    const container = wrapper.querySelector('.slider-container');
    const amount = container.clientWidth;

    container.scrollBy({
        left: direction * amount,
        behavior: 'smooth'
    });
}
