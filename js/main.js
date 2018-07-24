var agreeEmail = '';
var agreeName = '';
var agreeINN = '';
var agreeOGRN = '';
var agreeAdres = '';
//--form
    var $popUpForm = $('.form_callBack');
    var $popUpBtn = $('.callback__button');
    var $form = $('.form');
    var $personalPopUp = $('.persPopUp');
    var $closeForm;

    agre = new AgreAddCompInfo(agreeName, agreeEmail);
    agre.addInnOgrn(agreeINN+agreeOGRN?','+agreeOGRN:'');
    agre.addAdres(agreeAdres);
    var checkbox;

    $('.form_check').on('click', function () {
        if ($('div').is('#agre')) {
            $('#agre').remove()
        }
        var id = $(this).data('id');
        agre.render(id);
        checkbox = id;
    });

    $form.on('click', '.btn_agre', function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
        var check;
        if (id === 'agre_ok') {
            check = true;
        } else if (id === 'agre_no') {
            check = false;
        }
        $(checkbox + ' ' + '.form_check').prop('checked', check);
        $('#agre').remove()
    });

    $personalPopUp.on('click', function () {
        var openForm = $(this).data('action');
        $closeForm = $(openForm);
        $(openForm).show('fade', 400).addClass('panel-open');
        $('.page').addClass('panel-open');
    });
    $popUpBtn.on('click', function () {
        $closeForm = $popUpForm;
        $popUpForm.show('fade', 400).addClass('panel-open');
        $('.page').addClass('panel-open');
    });
    $('.close').on('click', function () {
        $closeForm.css('display', 'none');
        $('.page').removeClass('panel-open')
    });

    $(document).on('click', function (event) {
        if ($(event.target).closest(".noneClose").length
            || $(event.target).closest("#mess_block").length
            || !$(event.target).hasClass('panel-open')) {
            return;
        }
        $closeForm.find('.close').trigger('click');
        $('#ok').trigger('click');
        event.stopPropagation();
    });
//--ajax
    $.fn.runAjax = function () {
        var form_data = $(this).serialize();
        var $clear = $(this).find('.clear');
        $('.loadMask').css('display', 'flex');

        $.ajax({
            type: "POST",
            url: "send.php",
            data: form_data,
            dataType: 'json',
            error: function () {
                $('.loadMask').hide();
                popup = false;
                $('#mess').html('Что то пошло не так, попробуйте повторить позже');
                $('#mess_block').css('display', 'flex');
                $('.page').addClass('panel-open');
            },
            success: function (data) {
                $('.loadMask').hide();
                if (data.res) {
                    $clear.val('');
                    popup = false;
                } else if (close) {
                    $popUpBtn.trigger('click');
                }
                $('#mess').html(data.mess);
                $('#mess_block').css('display', 'flex');
                $('.page').addClass('panel-open')
            }
        })
    };

    var id;
    var close;
    var popup = false;

    function closeForm() {
        $('.close').trigger('click');
        load = false;
        popup = true;
    }

    $form.on('submit', function (event) {
        event.preventDefault();
        id = $(this).find('.btn_form').data('id');
        close = !!($(this).find('.btn_form').data('close'));
        checkbox = id;

        if ($(checkbox + ' ' + '.form_check').prop('checked')) {
            if (close) {
                closeForm();
            } else {
                popup = false;
            }
            $(this).runAjax();
        }
        else {
            agre.render(id);
            $('#agre_ok').addClass('preSubmit');
            $('.preSubmit').on('click', function () {
                $(this).removeClass('preSubmit');
                $(checkbox + ' ' + '.form_check').prop('checked', true);
                if (close) closeForm();
                $(id + '_form').runAjax();
            })
        }
    });

    $('.formStandart').on('submit', function (event) {
        event.preventDefault();
        close = !!($(this).find('.btn_form').data('close'));
        load = true;
        popup = false;
        form_data = $(this).serialize();
        $(this).runAjax();
    });

    $('#ok').click(function () {
        $('#mess_block').css('display', 'none');
        if (!popup) $('.page').removeClass('panel-open')
    });

$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('#buttonUp').fadeIn().addClass('active');
    } else {
        $('#buttonUp').fadeOut().removeClass('active');
    }
});

$('#buttonUp').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});

//Галерея документов
// var popUpLink = jQuery('.image-popup-no-margins');

// popUpLink.each(function () {
//     var paths = (jQuery(this).attr('href'));
//     jQuery('<img />').attr("src", paths);
// });


// popUpLink.magnificPopup({
//     type: 'image',
//     closeOnContentClick: true,
//     closeBtnInside: false,
//     fixedContentPos: true,
//     mainClass: 'mfp-no-margins mfp-with-zoom',
//     image: {
//         verticalFit: true
//     },
//     zoom: {
//         enabled: true,
//         duration: 300
//     }
// });

// slide();

$('.comment__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,

    prevArrow: '<button class="navBtn prev slick-arrow" type="button"><svg \n' +
    ' xmlns="http://www.w3.org/2000/svg"\n' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    ' width="12px" height="20px">\n' +
    '<path fill-rule="evenodd"  fill="rgb(255, 255, 255)"\n' +
    ' d="M0.298,9.286 L9.300,0.297 C9.695,-0.097 10.335,-0.097 10.731,0.297 C11.126,0.690 11.126,1.330 10.731,1.723 L2.443,9.999 L10.730,18.276 C11.125,18.669 11.125,19.308 10.730,19.703 C10.335,20.097 9.694,20.097 9.299,19.703 L0.297,10.714 C-0.092,10.324 -0.092,9.675 0.298,9.286 Z"/>\n' +
    '</svg></button>',

    nextArrow: '<button class="navBtn next slick-arrow" type="button"><svg \n' +
    ' xmlns="http://www.w3.org/2000/svg"\n' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    ' width="11px" height="20px">\n' +
    '<path fill-rule="evenodd"  fill="rgb(255, 255, 255)"\n' +
    ' d="M10.702,9.286 L1.700,0.297 C1.305,-0.097 0.665,-0.097 0.269,0.297 C-0.126,0.690 -0.126,1.330 0.269,1.723 L8.557,9.999 L0.270,18.276 C-0.125,18.669 -0.125,19.308 0.270,19.703 C0.665,20.097 1.306,20.097 1.701,19.703 L10.703,10.714 C11.092,10.324 11.092,9.675 10.702,9.286 Z"/>\n' +
    '</svg></button>',
    // appendArrows: $('.newsNavWrap'),
});
$('#course_select').on('change', function () {
    $('.courseTiming').removeClass('active');
    $($('#course_select').val()).addClass('active')
});
