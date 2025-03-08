const canvas = document.querySelector('canvas');
const form = document.querySelector('');
const clearButton = document.querySelector('');
const ctx = canvas.getContext('2d');
let writingMode = false;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const imageURL = canvas.toDataURL();
    const image = document.createElement('img');
    image.src = imageURL;
    image.height = canvas.height;
    image.width = canvas.width;
    image.style.display = 'block';
    form.appendChild(image);
    clearPad();
})

const clearPad = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearPad();
})


const getTargetPosition = (event) => {
    positionX = event.clientX - event.target.getBoundingClient
}


const handlePointerMove = (event) => {
    if (!writingMode) return

    const [positionX, positiony] = getTargetPosition(event);
    ctx.lineTo(positionX, positiony);
    ctx.stroke();
}


const handlePointerUp = () => {
    writingMode = false;
}

const handlePointerDown = (event) => {
    writingMode = true;
    ctx.beginPath();

    const [positionX, positiony] = getTargetPosition(event);
    ctx.moveTo(positionX, positiony);
}

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';

canvas.addEventListener('pointerdown',)