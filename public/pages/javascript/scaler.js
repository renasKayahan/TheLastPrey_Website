function scaleNavbar() {
    if (window.innerWidth >= 1920) return;
    const wrapper = document.getElementById('navbarContainer');

    if (window.innerWidth <= 600) {
    // Reset scale & spacing on small screens
    wrapper.style.transform = 'scale(1)';
    wrapper.style.transformOrigin = 'top left';
    document.body.style.height = 'auto';
    return;
    }

    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    const scale = Math.min(1, currentWidth / baseWidth);

    // Apply scale with transform origin left top
    wrapper.style.transformOrigin = 'top left';
    wrapper.style.transform = `scale(${scale})`;

    // wrapper.style.margin = '0 auto';

    const scaledHeight = wrapper.offsetHeight * scale;
    document.body.style.height = `${scaledHeight}px`;
}

window.addEventListener('load', scaleNavbar);
window.addEventListener('resize', scaleNavbar);