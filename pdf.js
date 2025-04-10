document.addEventListener('DOMContentLoaded', () => {
    const generatePdfBtn = document.getElementById('generate-pdf');

    generatePdfBtn.addEventListener('click', async () => {
        const imagePreview = document.getElementById('image-preview');
        if (!imagePreview.src) return;

        generatePdfBtn.disabled = true;
        generatePdfBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Generating...';

        try {
            const { PDFDocument, rgb } = PDFLib;
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([550, 750]);
            
            // Add image
            const imageBytes = await fetch(imagePreview.src).then(res => res.arrayBuffer());
            const image = await pdfDoc.embedJpg(imageBytes);
            page.drawImage(image, {
                x: 50,
                y: 450,
                width: 200,
                height: 150,
            });
            
            // Add OCR text if available
            const ocrText = document.getElementById('ocr-result').innerText;
            if (ocrText.trim()) {
                page.drawText('Extracted Text:', { x: 50, y: 400, size: 14, color: rgb(0, 0, 0) });
                page.drawText(ocrText.substring(0, 500), { x: 50, y: 370, size: 10, maxWidth: 450 });
            }

            // Save PDF
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'document.pdf';
            link.click();
            
        } catch (err) {
            alert(`PDF generation failed: ${err.message}`);
        } finally {
            generatePdfBtn.disabled = false;
            generatePdfBtn.innerHTML = '<i class="bi bi-file-earmark-pdf"></i> Generate PDF';
        }
    });
});