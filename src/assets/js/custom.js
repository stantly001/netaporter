$(document).ready(function () {

    // $('.dropdown-menu li').click(function () {
    //     $('#menu1').text($(this).text());
    // });

    // $("#menubar").mCustomScrollbar({
    //     theme: "minimal"
    // });

    // $('#dismiss, .overlay').on('click', function () {
    //     $('#menubar').removeClass('active');
    //     $('.overlay').fadeOut();
    // });

    $('#sidebarCollapse').on('click', function () {
        $('#menubar').addClass('active');
        $('.overlay').fadeIn();
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    $('.panel-group').on('shown.bs.collapse', function () {
        $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
    }).on('hidden.bs.collapse', function () {
        $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
    });    
});
