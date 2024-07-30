document.getElementById('upload').addEventListener('change', handleUpload);
document.getElementById('resize-btn').addEventListener('click', resizeImage);

let uploadedImage;

function handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            uploadedImage = img;
            displayImage(img);
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function displayImage(img) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    canvas.style.display = 'block';
}

function resizeImage() {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const resizedCanvas = document.createElement('canvas');
    const resizedCtx = resizedCanvas.getContext('2d');

    resizedCanvas.width = width;
    resizedCanvas.height = height;

    resizedCtx.drawImage(uploadedImage, 0, 0, width, height);

    const resizedDataURL = resizedCanvas.toDataURL('image/png');

    document.getElementById('download').href = resizedDataURL;
    displayImage(resizedCanvas);
}
