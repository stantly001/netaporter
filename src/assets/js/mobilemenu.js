(function() {
    'use strict';
    document['addEventListener']('touchstart', function() {}, false);
    $(function() {
        $('#wsnavtoggle')['on']('click', function() {
            $('.wsmenucontainer')['toggleClass']('wsoffcanvasopener');
            return false
        });
        $('#overlapblackbg')['on']('click', function() {
            $('.wsmenucontainer')['removeClass']('wsoffcanvasopener');
            return false
        });
        $('.wsmenu-list> li')['has']('.wsmenu-submenu')['prepend']('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wsmenu-list > li')['has']('.wsshoptabing')['prepend']('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wsmenu-list > li')['has']('.megamenu')['prepend']('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wsmenu-click')['on']('click', function() {
            $(this)['toggleClass']('ws-activearrow')['parent']()['siblings']()['children']()['removeClass']('ws-activearrow');
            $('.wsmenu-submenu, .wsshoptabing, .megamenu')['not']($(this)['siblings']('.wsmenu-submenu, .wsshoptabing, .megamenu'))['slideUp']('slow');
            $(this)['siblings']('.wsmenu-submenu')['slideToggle']('slow');
            $(this)['siblings']('.wsshoptabing')['slideToggle']('slow');
            $(this)['siblings']('.megamenu')['slideToggle']('slow');
            return false
        });
        $('.wstabitem > li')['has']('.wstitemright')['prepend']('<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wstabitem02 > li')['has']('.wstbrandbottom')['prepend']('<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
        $('.wsmenu-click02')['on']('click', function() {
            $(this)['siblings']('.wstitemright')['slideToggle']('slow');
            $(this)['siblings']('.wstbrandbottom')['slideToggle']('slow');
            return false
        })
    });
    $(window)['ready'](function() {
        $('.wsshoptabing.wtsdepartmentmenu > .wsshopwp > .wstabitem > li')['on']('mouseenter', function() {
            $(this)['addClass']('wsshoplink-active')['siblings'](this)['removeClass']('wsshoplink-active');
            return false
        });
        $('.wsshoptabing.wtsbrandmenu > .wsshoptabingwp > .wstabitem02 > li')['on']('mouseenter', function() {
            $(this)['addClass']('wsshoplink-active')['siblings'](this)['removeClass']('wsshoplink-active');
            return false
        })
    });
    _0x50b6x2();
    $(window)['on']('load resize', function() {
        var _0x50b6x1 = $(window)['width']();
        if (_0x50b6x1 <= 991) {
            $('.wsshopwp')['css']('height', '100%');
            $('.wstitemright')['css']('height', '100%')
        } else {
            _0x50b6x2()
        }
    });

    function _0x50b6x2() {
        var _0x50b6x3 = 1;
        $('.wstabitem > li')['each'](function() {
            var _0x50b6x4 = $(this)['find']('.wstitemright')['innerHeight']();
            _0x50b6x3 = _0x50b6x4 > _0x50b6x3 ? _0x50b6x4 : _0x50b6x3;
            $(this)['find']('.wstitemright')['css']('height', 'auto')
        });
        $('.wsshopwp')['css']('height', _0x50b6x3 + 0)
    }
    $(document)['ready'](function(_0x50b6x5) {
        function _0x50b6x6() {
            if (_0x50b6x5(window)['width']() >= 991) {
                _0x50b6x5('.wsshoptabing, .wstitemright, .wstbrandbottom')['css']({
                    "\x64\x69\x73\x70\x6C\x61\x79": ''
                })
            }
        }
        _0x50b6x6();
        _0x50b6x5(window)['resize'](_0x50b6x6)
    })
}())