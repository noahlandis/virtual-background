export function getThumbnailBlob(source, originalWidth, originalHeight) {
    var sourceSize = Math.min(originalWidth, originalHeight);
    var horizontalShift = (originalWidth - sourceSize) / 2;
    var verticalShift = (originalHeight - sourceSize) / 2;
    var canvas = document.createElement('canvas');
    canvas.width = 63;
    canvas.height = 63;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(source, horizontalShift, verticalShift, sourceSize, sourceSize, 0, 0, canvas.width, canvas.height);
    return new Promise(function (resolve) {
        return canvas.toBlob(function (blob) { return resolve(blob); });
    });
}
