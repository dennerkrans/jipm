//setting up the canvas
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height / 2;
var xOffset = x/2;
var yOffset = y/2;
var maxWidth = 300;
var lineHeight = 15;

context.font = '22px Source Code Pro';
context.textAlign = 'center';
context.fillStyle = '#f7f7f7';

//breaks text into lines and and puts center line as center
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    var lines = [];

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        }
        else {
            line = testLine;
        }
    }
    lines.push(line); //grabs the last line, could be better

    var center = Math.floor(lines.length / 2);

    for(var i = 0; i < lines.length; i++) {
        context.fillText(lines[i], x, (y - (lineHeight*center)));
        center = center - 1;
    }
}

function print_canvas() {
    var dataUrl = document.getElementById('myCanvas').toDataURL('image/bmp'); //attempt to save base64 string to server using this var
    $.ajax({
        type: 'POST',
        url: './save_promise.php',
        data: {data: dataUrl},
        success: function(res) {
            console.log(res);
        }
    });
}

var text = 'To see the world in a grain of sand, and a heaven in a wild flower. Hold infinity in the palm of your hand, and eternity in an hour.'

// var background = document.getElementById('background');

// $(function () {
//     //things to print
//     context.drawImage(background, 0, 0);
//     wrapText(context, text, x-xOffset, y-yOffset, maxWidth, lineHeight); //top left
//     wrapText(context, text, x+xOffset, y-yOffset, maxWidth, lineHeight); //top right
//     wrapText(context, text, x+xOffset, y+yOffset, maxWidth, lineHeight); //bottom right
//     wrapText(context, text, x-xOffset, y+yOffset, maxWidth, lineHeight); //bottom left
// });
