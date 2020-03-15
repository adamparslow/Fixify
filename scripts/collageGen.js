const height = 13;
const width = 6;

function createCollage(images) {
    const canvas = document.getElementById('imageCanvas');
    console.log(canvas);
    const context = canvas.getContext('2d');

    // context.fillStyle = "#000000";
    context.fillRect(50, 50, 100, 100);

    showImagesDiv();
    images = removeDuplicates(images);
    console.log(JSON.stringify(images));
    const ratio = getRatio(images.length);
    const canWidth = height > width ? ratio[0] : ratio[1];
    const canHeight = height > width ? ratio[1] : ratio[0];
    const imageSize = images[0].height;

    canvas.height = canHeight * imageSize;
    canvas.width = canWidth * imageSize;

    populateCanvas(images, width, height, context);

    // const container = document.getElementById('imageContainer');
    // images.forEach((image) => {
    //     const imageEl = createImage(image);
    //     container.appendChild(imageEl);
    // })
}

function createImage(image) {
    const imageEl = document.createElement('img');
    imageEl.src = image.url;
    imageEl.width = image.width;
    return imageEl
}

function removeDuplicates(images) {
    return images.map(image => image.url)
        // Check if the urls first index matches the current index, if not, give undefined, otherwise return index
        .map((url, index, final) => final.indexOf(url) === index && index)
        // Removed undefined
        .filter(index => images[index])
        // Take new list of indexes and produce new array
        .map(index => images[index])
} 

function getRatio(length) {
    if (length%2 === 1) length += 3;
    const ratio = height > width ? height/width : width/height;

    // get all factors of length
    const factors = (number => Array
    .from(Array(number + 1), (_, i) => i)
    .filter(i => number % i === 0))(length);

    let i = 1;
    let j = factors.length - 2;

    let distance = length;
    let smallFactor = 1;
    let largeFactor = length;

    // find out which pair gets closest to the desired ratio
    while (i <= j) {
        const newDistance = Math.abs(factors[j]/factors[i] - ratio);
        console.log(newDistance);
        
        if (newDistance < distance) {
            distance = newDistance;
            smallFactor = factors[i];
            largeFactor = factors[j];
        }

        i++;
        j--;
    }

    return [smallFactor, largeFactor];
}

function populateCanvas(images, width, height, context) {
    // const imageData = images[0];
    // const newImage = new Image();
    // newImage.src = imageData.src;
    // console.log(context);
    // context.drawImage(newImage, 0, 0);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (images.length > x * width + y) {
                const imageData = images[x * width + y];
                console.log(x);
                console.log(y);
                console.log(imageData);
                const image = new Image();
                image.src = imageData.url;
                context.drawImage(image, 
                    x * imageData.width, y * imageData.width);
            }
        }
    }
}