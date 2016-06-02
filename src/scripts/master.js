const $ = require('jquery');

var change_bg = {
    current: 0,
    bg: [
        'url(../assets/backgrounds/0.jpg)'
    ],
    shift: function(){
        $('body').css('background-image', this.bg[this.current]);
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
$('#print-button').on('click touch', shift_views);
