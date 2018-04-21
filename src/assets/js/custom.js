$(document).ready(function () {

    $("#shiptoarrow").click(function (e) {
        $(this).prev('.dropdown').children().eq(0).dropdown('toggle');
        $(this).prev('.dropdown').children().eq(0).addClass("sdf");
        console.log("class-->", $(this).prev().attr('class'));
        console.log("called arr");
    });

    // $('.panel-group').on('shown.bs.collapse', function () {
    //     $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
    // }).on('hidden.bs.collapse', function () {
    //     $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
    // });

    // $('.dropdown-menu li').click(function () {
    //     $('#menu1').text($(this).text());
    // });

    // $("#menubar").mCustomScrollbar({
    //     theme: "minimal"
    // });

    // $('#sidebarCollapse').on('click', function () {
    //     $('#menubar').addClass('active');
    //     $('.overlay').fadeIn();
    //     $('.collapse.in').toggleClass('in');
    //     $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    // });

    // $('.panel-group').on('shown.bs.collapse', function () {
    //     $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
    // }).on('hidden.bs.collapse', function () {
    //     $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
    // });    
});
