$.fn.mobileMenu = function(action) {

    var jqAllAffectedContainers = this;

    var getBodyAndBackgorund = function(menuContainer) {
        var menuBody = menuContainer.find('.menu-body')[0];
        var menuBackground = menuContainer.find('.menu-background')[0];
        if (!menuBody) {
            console.error('mobileMenu: menuBody not found in ', menuContainer);
            return false;
        }
        if (!menuBackground) {
            console.error('mobileMenu: menubackground not found in ', menuContainer);
            return false;
        }
        return {
            'body': $(menuBody),
            'background': $(menuBackground)
        }
    }

    var getMenuContainerByHrefID = function(jqLink) {
        let mobileMenuContainerId = jqLink.attr("href");
        if (!mobileMenuContainerId.length || mobileMenuContainerId.length <= 1) {
            console.log('mobileMenu: mobileMenuContainerId invalid', mobileMenuContainerId);
            return false;
        }
        let mobileMenuContainer = $(mobileMenuContainerId)[0];
        if (!mobileMenuContainer) {
            console.error('mobileMenu: mobileMenuContainer not found by id', mobileMenuContainerId);
            return false;
        }
        return $(mobileMenuContainer);
    }

    var makeMenuOpen = function(menu) {
        menu.body.addClass('animated');
        menu.body.removeClass('closed');
        setTimeout(function() {
            menu.body.removeClass('animated');
        }, 350);
        menu.background.addClass('animated');
        menu.background.removeClass('closed');
        setTimeout(function() {
            menu.background.removeClass('animated');
        }, 250);
        $('body').addClass('non-scrollable');
    }

    var makeMenuClose = function(menu) {
        menu.body.addClass('animated');
        setTimeout(function() {
            menu.body.addClass('closed');
        }, 350);
        menu.background.addClass('animated');
        setTimeout(function() {
            menu.background.addClass('closed');
        }, 350);
        $('body').removeClass('non-scrollable');
    }

    var init = function(jqContainer) {
        let menu = getBodyAndBackgorund(jqContainer);
        if (!menu) return false;
        menu.background.click(function(e) {
            e.preventDefault();
            makeMenuClose(menu);
        })
        jqContainer.addClass('initialized');
        return true;
    }

    var open = function(jqContainer) {
        let jqMobileMenuContainer = getMenuContainerByHrefID(jqContainer);
        if (!jqMobileMenuContainer) return false;
        if (!jqMobileMenuContainer.hasClass('initialized')) {
            console.error('mobileMenu: menu was not initialized, use mobileMenu(\'init\') on menu container');
            return false;
        }
        let menu = getBodyAndBackgorund(jqMobileMenuContainer);
        if (!menu) return false;
        jqContainer.click(function(e) {
            e.preventDefault();
            makeMenuOpen(menu);
        })
        return true;
    }

    var close = function(jqContainer) {
        let jqMobileMenuContainer = getMenuContainerByHrefID(jqContainer);
        if (!jqMobileMenuContainer) return false;
        if (!jqMobileMenuContainer.hasClass('initialized')) {
            console.error('mobileMenu: menu was not initialized, use mobileMenu(\'init\') on menu container');
            return false;
        }
        let menu = getBodyAndBackgorund(jqMobileMenuContainer);
        if (!menu) return false;
        jqContainer.click(function(e) {
            e.preventDefault();
            makeMenuClose(menu);
        })
        return true;
    }

    var actionSwap = function(jqContainer) {
        let openMenuLink = jqContainer.find('.mobile-menu-open');
        let closeMenuLink = jqContainer.find('.mobile-menu-close');
        if (!openMenuLink || openMenuLink.lenght <= 0) {
            errconsole.error('mobileMenu: actionSwap not foun open link in', jqContainer);
            return false
        }
        if (!closeMenuLink || closeMenuLink.lenght <= 0) {
            errconsole.error('mobileMenu: actionSwap not foun close link in', closeMenuLink);
            return false
        }
        openMenuLink.click(function() {
            jqContainer.addClass('open');
        });
        closeMenuLink.click(function() {
            jqContainer.removeClass('open');
        });
    }

    return jqAllAffectedContainers.each(function() {
        let jqContainer = $(this);
        if(action === 'init') {
            return init(jqContainer);
        }
        if(action === 'open') {
            return open(jqContainer);
        }
        if(action === 'close') {
            return close(jqContainer);
        }
        if(action === 'action-swap') {
            return actionSwap(jqContainer);
        }
        return false;
    });

};

document.addEventListener('DOMContentLoaded', function() {
    $('#mobile-menu-main').mobileMenu('init');
    $('#mobile-menu-filter').mobileMenu('init');
    $('.mobile-menu-open').mobileMenu('open');
    $('.mobile-menu-close').mobileMenu('close');
    $('.menu-swap').mobileMenu('action-swap');
});
