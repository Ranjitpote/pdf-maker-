document.addEventListener('DOMContentLoaded', () => {
    const runOcrBtn = document.getElementById('run-ocr');
    const ocrResult = document.getElementById('ocr-result');
    const ocrProgress = document.getElementById('ocr-progress');
    const progressBar = ocrProgress.querySelector('.progress-bar');
    const progressText = document.getElementById('progress-text');

    runOcrBtn.addEventListener('click', async () => {
        const imagePreview = document.getElementById('image-preview');
        if (!imagePreview.src) return;

        ocrResult.innerHTML = '';
        ocrProgress.classList.remove('d-none');
        runOcrBtn.disabled = true;

        try {
            const { data: { text } } = await Tesseract.recognize(
                imagePreview.src,
                'eng',
                { 
                    logger: progress => {
                        if (progress.status === 'recognizing text') {
                            const percent = Math.round(progress.progress * 100);
                            progressBar.style.width = `${percent}%`;
                            progressText.textContent = `Processing: ${percent}%`;
                        }
                    }
                }
            );
            
            ocrResult.innerHTML = text.split('\n').map(line => 
                `<p class="mb-2">${line || ' '}</p>`
            ).join('');
            
        } catch (err) {
            ocrResult.innerHTML = `<div class="alert alert-danger">OCR failed: ${err.message}</div>`;
        } finally {
            ocrProgress.classList.add('d-none');
            runOcrBtn.disabled = false;
        }
    });
});