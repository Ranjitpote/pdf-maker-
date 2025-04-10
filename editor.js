let currentRotation = 0;
let currentFilter = '';

function rotateImage() {
    const img = document.getElementById('image-preview');
    currentRotation = (currentRotation + 90) % 360;
    img.style.transform = `rotate(${currentRotation}deg) ${currentFilter}`;
}

function applyFilter(filter) {
    const img = document.getElementById('image-preview');
    if (filter === 'grayscale') {
        currentFilter = currentFilter.includes('grayscale') ? '' : 'grayscale(100%)';
    }
    img.style.filter = currentFilter;
}

function resetImage() {
    const img = document.getElementById('image-preview');
    img.style.transform = '';
    img.style.filter = '';
    currentRotation = 0;
    currentFilter = '';
}