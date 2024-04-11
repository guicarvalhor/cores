const colorPicker = document.getElementById('color-picker');
const colorVariations = document.getElementById('color-variations');
const colorShapes = document.getElementById('color-shapes');
const colorValue = document.getElementById('color-value');

function generateColorVariations(color) {
    colorVariations.innerHTML = '';
    for (let i = 0; i <= 100; i += 10) {
        const variation = lightenDarkenColor(color, i - 50);
        const square = document.createElement('div');
        square.style.backgroundColor = variation;
        square.className = 'color-square';
        const scale = document.createElement('div');
        scale.className = 'color-scale';
        scale.textContent = i.toString();
        scale.style.color = getTextColor(variation);
        square.appendChild(scale);
        const code = document.createElement('span');
        code.className = 'color-code';
        code.textContent = variation;
        square.appendChild(code);
        setTextColor(square, variation);
        colorVariations.appendChild(square);
    }
}


function setTextColor(element, backgroundColor) {
    const color = getTextColor(backgroundColor);
    element.querySelector('.color-code').style.color = color;
}

function getTextColor(backgroundColor) {
    const r = parseInt(backgroundColor.substr(1, 2), 16);
    const g = parseInt(backgroundColor.substr(3, 2), 16);
    const b = parseInt(backgroundColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000' : '#fff';
}

function applyColorToShapes(color) {
    colorShapes.innerHTML = '';
    const shapes = ['square', 'circle', 'triangle'];
    shapes.forEach(shape => {
        const div = document.createElement('div');
        div.className = `shape ${shape}`;
        div.style.backgroundColor = color;
        colorShapes.appendChild(div);
    });
}

function applyColorToButtons(color) {
    const buttonExamples = document.getElementById('button-examples');
    buttonExamples.innerHTML = `
        <button style="background-color: ${color}; color: white;">Flat Button</button>
        <button style="color: ${color}; border: 2px solid ${color};">Outlined Button</button>
        <button style="background-color: ${color}; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 0 2px ${color};">Raised Button</button>
    `;
}

function lightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

colorPicker.addEventListener('input', function() {
    const color = this.value;
    colorValue.textContent = color;
    generateColorVariations(color);
    applyColorToShapes(color);
    applyColorToButtons(color);
    applyColorToCards(color);
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        const randomColor = getRandomColor();
        colorPicker.value = randomColor;
        colorValue.textContent = randomColor;
        generateColorVariations(randomColor);
        applyColorToShapes(randomColor);
        applyColorToButtons(randomColor);
        applyColorToCards(randomColor);
    }
});

function applyColorToCards(color) {
    const weatherCard = document.getElementById('weather-card');
    const imageCard = document.getElementById('image-card');
    const timeCard = document.getElementById('time-card');

    weatherCard.style.backgroundColor = color;
    imageCard.style.backgroundColor = color;
    timeCard.style.backgroundColor = color;
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-time').textContent = currentTime;
}

// Atualiza o tempo a cada segundo
setInterval(updateTime, 1000);

// Chama a função updateTime pela primeira vez para exibir o tempo atual
updateTime();


// Initial generation
const initialColor = colorPicker.value;
generateColorVariations(initialColor);
applyColorToShapes(initialColor);
applyColorToButtons(initialColor);
applyColorToCards(initialColor);
