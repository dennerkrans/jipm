const $ = require('jquery');

var change_bg = {
    current: 0,
    bg: [
        '/assets/backgrounds/Bild-1-final.jpg',
        '/assets/backgrounds/Bild-2-final.jpg',
        '/assets/backgrounds/Bild-3-final.jpg',
        '/assets/backgrounds/Bild-4-final.jpg',
        '/assets/backgrounds/Bild-5-final.jpg',
        '/assets/backgrounds/Bild-6-final.jpg',
        '/assets/backgrounds/Bild-7-final.jpg',
        '/assets/backgrounds/Bild-8-final.jpg'
    ],
    shift: function(){
        // $('body').css('background-image', 'url(' + this.bg[this.current] + ')');
        $('#background').attr('src', this.bg[this.current]);
        if (this.current === this.bg.length - 1) {
            this.current = 0;
        } else {
            this.current += 1;
        }
    }
}

var shift_views = function(){
    $('.promise').addClass('view-inactive');
    $('.printing').removeClass('view-inactive');
    $('.promisetext').val('').prop('disabled', false);
    if($('.choosen').length > 0) {
        $('.choosen').removeClass('choosen');
    }
    setTimeout(function() {
        $('.printing').addClass('view-inactive');
        $('.thankyou').removeClass('view-inactive');
        setTimeout(function() {
            $('.thankyou').addClass('view-inactive');
            //Add background changing function here
            change_bg.shift();
            $('.start').removeClass('view-inactive');
        }, 2000); //Time for Thank You
    }, 2000); //Time to print
};

//setting up the canvas
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height / 2;
var xOffset = x/2;
var yOffset = y/2;
var maxWidth = 500;
var lineHeight = 25;

context.font = '26px Source Code Pro';
context.textAlign = 'center';
context.fillStyle = '#f7f7f7';

function promise_counter() {
    if($('.choosen').length >= 2) {
        $('.promisetext').prop('disabled', true);
        return false
    } else if ($('.choosen').length >= 1 && $('#prom1').val().length > 0) {
        $('#prom2').prop('disabled', true);
        return false
    } else if ($('.choosen').length >= 1 && $('#prom2').val().length > 0) {
        $('#prom1').prop('disabled', true);
        return false
    } else if ($('#prom1').val().length > 0 && $('#prom2').val().length > 0) {
        return false
    } else {
        $('.promisetext').prop('disabled', false);
        return true
    }
}

function promise_to_canvas() {
    var promises = [];
    $('.promisetext').each(function(){
        if($(this).val().length > 0)
            promises.push($(this).val());
    });
    if($('.choosen').length > 0){
        console.log('here');
        $('.choosen').each(function(){
            promises.push($(this).first().text());
        });
    }
    return promises;
}

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

function canvas_magic(prom1, prom2) {
    //things to print
    context.drawImage(document.getElementById('background'), 0, 0);
    wrapText(context, prom1, x-xOffset, y-yOffset, maxWidth, lineHeight); //top left
    wrapText(context, prom2, x+xOffset, y-yOffset, maxWidth, lineHeight); //top right
    wrapText(context, prom2, x+xOffset, y+yOffset, maxWidth, lineHeight); //bottom right
    wrapText(context, prom1, x-xOffset, y+yOffset, maxWidth, lineHeight); //bottom left
}

function print_canvas() {
    var dataUrl = document.getElementById('myCanvas').toDataURL('image/bmp'); //attempt to save base64 string to server using this var
    $.ajax({
        type: 'POST',
        url: 'save_promise.php',
        data: {data: dataUrl},
        success: function(res) {
            console.log(res);
        }
    });
}

//view 1 start
$('#start-button').on('click touch', function(){
    $('.start').addClass('view-inactive');
    $('.thesis').removeClass('view-inactive');
});

//view 2 thesis
$('#thesis-button').on('click touch', function(){
    let name = $('#name_input').val();
    if (name.length > 0) {
        $('#header-name').html(name + ',');
        $('#name_input').val('');
        $('.thesis').addClass('view-inactive');
        $('.promise').removeClass('view-inactive');
    }
});

//view 3 promise
$('.promisetext').on('keyup', function(){
    promise_counter();
    if(!promise_counter())
        $('.footer-print').addClass('footer-active');
});

$('.feed-promise').on('click touch', function(){
    if($(this).hasClass('choosen')) {
        $(this).removeClass('choosen');
    } else {
        if(promise_counter()) {
            $(this).addClass('choosen');
        }
    }
    if(!promise_counter())
        $('.footer-print').addClass('footer-active');
});

$('#print-button').on('click touch', function(){
    var promises = promise_to_canvas();
    canvas_magic(promises[0], promises[1]);
    print_canvas();
    shift_views();
});

//initial setup
$(function(){
    change_bg.shift();
});
