const $ = require('jquery');
const app = require('./jade/app.jade')();
// const someJavascript = require('./scripts/someJavascript.coffee');

$(function(){
    $('body').html(app);
    // require(someJavascript)();
    require('./scripts/master.js');
});
