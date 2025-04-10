document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const startBtn = document.getElementById('start-camera');
    const captureBtn = document.getElementById('capture-btn');
    const imagePreview = document.getElementById('image-preview');
    const editor = document.getElementById('editor');
    const generatePdfBtn = document.getElementById('generate-pdf');
    const runOcrBtn = document.getElementById('run-ocr');
    let stream;

    // Start camera
    startBtn.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'environment' 
                } 
            });
            video.srcObject = stream;
            video.classList.remove('d-none');
            startBtn.disabled = true;
            captureBtn.disabled = false;
        } catch (err) {
            alert(`Camera error: ${err.message}`);
        }
    });

    // Capture image
    captureBtn.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        // Stop camera
        stream.getTracks().forEach(track => track.stop());
        video.classList.add('d-none');
        
        // Show editor
        imagePreview.src = canvas.toDataURL('image/jpeg');
        editor.classList.remove('d-none');
        generatePdfBtn.disabled = false;
        runOcrBtn.disabled = false;
    });

    // Handle file upload
    document.getElementById('image-upload').addEventListener('change', (e) => {
        if (e.target.files.length) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
                editor.classList.remove('d-none');
                generatePdfBtn.disabled = false;
                runOcrBtn.disabled = false;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
});