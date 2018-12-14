var runFlg = true;
function itemRun(speed, flg) {
    if (speed < 10) {
        var mingdan = JSON.parse(localStorage.getItem('mingdan'));
        var random = Math.floor(Math.random() * mingdan.length);
        $('.result .pic').attr({ src: `./assets/body/${mingdan[random].index}.png` });
        $('.result .name').html(mingdan[random].name);
        mingdan.splice(random, 1);
        localStorage.setItem('mingdan', JSON.stringify(mingdan));

        $('.right .rod').removeClass('active');
        $('.right .deng').removeClass('active');
        $('.left').removeClass('active');
        $('.result').addClass('active');
        $('.result .model').addClass('active');
        setTimeout(() => {
            $('.result .card').addClass('active');
            setTimeout(() => {
                runFlg = true;
            }, 500);
        }, 1000);
        return;
    }
    var random = Math.floor(Math.random() * 9)
    $('.left .item').each((k, item) => {
        $(item).removeClass('active');
    });
    $('.left .item').eq(random).addClass('active');
    setTimeout(() => {
        if (flg && !(flg % 10)) {
            itemRun(speed - 10, ++flg);
        }
        else {
            itemRun(speed, ++flg);
        }
    }, speed);
}
function reset() {
    if (!runFlg) {
        return;
    }
    $('.left .item').each((k, item) => {
        $(item).removeClass('active');
    });
    $('.result .pic').attr({ src: '' });
    $('.result .name').html('');

    $('.result').removeClass('active');
    $('.result .model').removeClass('active');
    $('.result .card').removeClass('active');
}
function start() {
    if (!runFlg) {
        return;
    }
    $('.right .btn').addClass('active');
    $('.right .rod').addClass('active');
}
function end() {
    $('.right .btn').removeClass('active');
    $('.right .rod').removeClass('active');
    $('.right .deng').addClass('active');
    $('.left').addClass('active');
    var mingdan = JSON.parse(localStorage.getItem('mingdan'));
    if (!mingdan.length) {
        $('.main .left').hide();
        $('.main .kong').show();
    }
    if (runFlg) {
        runFlg = false;
        itemRun(100, 0);
    }
}
$(() => {
    $(window).keydown(function (e) {
        if (event.keyCode === 13) {
            reset();
            start();
        }
    })
    $(window).keyup(function (e) {
        if (event.keyCode === 13) {
            end();
        }
    })
    $('.result').click(reset)
    $('.starbtn').mousedown(start)
    $('.starbtn').mouseup(end)
})