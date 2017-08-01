function browser() {

    var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
    var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
    //var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

    function testCSS(prop) {
        return prop in document.documentElement.style;
    }
    return (isSafari || isChrome)?true:false;


}

/* ---------- IE8 list style hack (:nth-child(odd)) ---------- */

jQuery(document).ready(function ($) {

    if ($('.messagesList').width()) {

        if (jQuery.browser.version.substring(0, 2) == "8.") {

            $('ul.messagesList li:nth-child(2n+1)').addClass('odd');

        }

    }

});

$(document).ready(function () {

    /* ---------- Add class .active to current link  ---------- */
    $('ul.main-menu li a').each(function () {

        if ($($(this))[0].href == String(window.location)) {

            $(this).parent().addClass('active');

        }

    });

    $('ul.main-menu li ul li a').each(function () {

        if ($($(this))[0].href == String(window.location)) {

            $(this).parent().addClass('active');
            $(this).parent().parent().show();

        }
    });

    /* ---------- Submenu  ---------- */

    $('.dropmenu').click(function (e) {

        e.preventDefault();

        $(this).parent().find('ul').slideToggle();

    });

    /* ---------- Acivate Functions ---------- */
    template_functions();
    init_masonry();
    sparkline_charts();

    widthFunctions();

    if (jQuery.browser.version.substring(0, 2) != "8.") {
        circle_progess();
    }

});

/* ---------- Check Retina ---------- */

function retina() {

    retinaMode = (window.devicePixelRatio > 1);

    return retinaMode;

}
/* ---------- Masonry Gallery ---------- */

function init_masonry() {
    var $container = $('.masonry-gallery');

    var gutter = 6;
    var min_width = 250;
    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.masonry-thumb',
            gutterWidth: gutter,
            isAnimated: true,
            columnWidth: function (containerWidth) {
                var num_of_boxes = (containerWidth / min_width | 0);

                var box_width = (((containerWidth - (num_of_boxes - 1) * gutter) / num_of_boxes) | 0);

                if (containerWidth < min_width) {
                    box_width = containerWidth;
                }

                $('.masonry-thumb').width(box_width);

                return box_width;
            }
        });
    });
}

/* ---------- Template Functions ---------- */

function template_functions() {
    /* ---------- Skill Bars ---------- */
    $(".meter > span").each(function () {

        var getColor = $(this).parent().css('borderTopColor');

        $(this).css('background', getColor);

        $(this)
            .data("origWidth", $(this).width())
            .width(0)
            .animate({
                width: $(this).data("origWidth")
            }, 3000);
    });

    /* ---------- Disable moving to top ---------- */
    $('a[href="#"][data-top!=true]').click(function (e) {
        e.preventDefault();
    });

    /* ---------- Text editor ---------- */
    $('.cleditor').cleditor();

    /* ---------- Datapicker ---------- */
    $('.datepicker').datepicker();

    /* ---------- Notifications ---------- */
    $('.noty').click(function (e) {
        e.preventDefault();
        var options = $.parseJSON($(this).attr('data-noty-options'));
        noty(options);
    });

    /* ---------- Uniform ---------- */
    $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();

    /* ---------- Choosen ---------- */
    $('[data-rel="chosen"],[rel="chosen"]').chosen();

    /* ---------- Tabs ---------- */
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    /* ---------- Makes elements soratble, elements that sort need to have id attribute to save the result ---------- */
    $('.sortable').sortable({
        revert: true,
        cancel: '.btn,.box-content,.nav-header',
        update: function (event, ui) {
            //line below gives the ids of elements, you can make ajax call here to save it to the database
            //console.log($(this).sortable('toArray'));
        }
    });

    /* ---------- Tooltip ---------- */
    $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement": "bottom", delay: {show: 400, hide: 200}});

    /* ---------- Popover ---------- */
    $('[rel="popover"],[data-rel="popover"]').popover();

    /* ---------- File Manager ---------- */
    var elf = $('.file-manager').elfinder({
        url: 'misc/elfinder-connector/connector.php'  // connector URL (REQUIRED)
    }).elfinder('instance');

    /* ---------- Star Rating ---------- */
    $('.raty').raty({
        score: 4 //default stars
    });

    /* ---------- Uploadify ---------- */
    $('#file_upload').uploadify({
        'swf': 'misc/uploadify.swf',
        'uploader': 'misc/uploadify.php'
        // Put your options here
    });

    /* ---------- Fullscreen ---------- */
    $('#toggle-fullscreen').button().click(function () {
        var button = $(this), root = document.documentElement;
        if (!button.hasClass('active')) {
            $('#thumbnails').addClass('modal-fullscreen');
            if (root.webkitRequestFullScreen) {
                root.webkitRequestFullScreen(
                    window.Element.ALLOW_KEYBOARD_INPUT
                );
            } else if (root.mozRequestFullScreen) {
                root.mozRequestFullScreen();
            }
        } else {
            $('#thumbnails').removeClass('modal-fullscreen');
            (document.webkitCancelFullScreen ||
            document.mozCancelFullScreen ||
            $.noop).apply(document);
        }
    });

    /* ---------- Datable ---------- */
    $('.datatable').dataTable({
        "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span9'i><'span9 center'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        }
    });
    $('.btn-close').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    $('.btn-minimize').click(function (e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('.box-content');
        if ($target.is(':visible')) $('i', $(this)).removeClass('chevron-up').addClass('chevron-down');
        else                       $('i', $(this)).removeClass('chevron-down').addClass('chevron-up');
        $target.slideToggle();
    });
    $('.btn-setting').click(function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });


    /* ---------- Progress  ---------- */

    $(".simpleProgress").progressbar({
        value: 89
    });

    $(".progressAnimate").progressbar({
        value: 1,
        create: function () {
            $(".progressAnimate .ui-progressbar-value").animate({"width": "100%"}, {
                duration: 10000,
                step: function (now) {
                    $(".progressAnimateValue").html(parseInt(now) + "%");
                },
                easing: "linear"
            })
        }
    });

    $(".progressUploadAnimate").progressbar({
        value: 1,
        create: function () {
            $(".progressUploadAnimate .ui-progressbar-value").animate({"width": "100%"}, {
                duration: 20000,
                easing: 'linear',
                step: function (now) {
                    $(".progressUploadAnimateValue").html(parseInt(now * 40.96) + " Gb");
                },
                complete: function () {
                    $(".progressUploadAnimate + .field_notice").html("<span class='must'>Upload Finished</span>");
                }
            })
        }
    });

    if ($(".taskProgress")) {

        $(".taskProgress").each(function () {

            var endValue = parseInt($(this).html());

            $(this).progressbar({
                value: endValue
            });

            $(this).parent().find(".percent").html(endValue + "%");

        });

    }

    if ($(".progressBarValue")) {

        $(".progressBarValue").each(function () {

            var endValueHTML = $(this).find(".progressCustomValueVal").html();

            var endValue = parseInt(endValueHTML);

            $(this).find(".progressCustomValue").progressbar({

                value: 1,
                create: function () {
                    $(this).find(".ui-progressbar-value").animate({"width": endValue + "%"}, {
                        duration: 5000,
                        step: function (now) {

                            $(this).parent().parent().parent().find(".progressCustomValueVal").html(parseInt(now) + "%");
                        },
                        easing: "linear"
                    })
                }
            });

        });

    }

}

/* ---------- Circle Progess Bars ---------- */

function circle_progess() {

    var divElement = $('div'); //log all div elements

    if (retina()) {

        $(".whiteCircle").knob({
            'min': 0,
            'max': 100,
            'readOnly': true,
            'width': 240,
            'height': 240,
            'bgColor': 'rgba(255,255,255,0.5)',
            'fgColor': 'rgba(255,255,255,0.9)',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        });

        $(".circleStat").css('zoom', 0.5);
        $(".whiteCircle").css('zoom', 0.999);


    } else {

        $(".whiteCircle").knob({
            'min': 0,
            'max': 100,
            'readOnly': true,
            'width': 120,
            'height': 120,
            'bgColor': 'rgba(255,255,255,0.5)',
            'fgColor': 'rgba(255,255,255,0.9)',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        });

    }


    $(".circleStatsItemBox").each(function () {

        var value = $(this).find(".value > .number").html();
        var unit = $(this).find(".value > .unit").html();
        var percent = $(this).find("input").val();
        var number = $(this).find(".count > .number").html();

        countSpeed = 1000;

        endValue = value * percent;

        $(this).find(".count > .unit").html(unit);
        $(this).find(".count > .number").countTo({

            from: 0,
            to: number,
            speed: countSpeed,
            refreshInterval: 1

        });
    });

}

/* ---------- Sparkline Charts ---------- */

function sparkline_charts() {

    //generate random number for charts
    randNum = function () {
        //return Math.floor(Math.random()*101);
        return (Math.floor(Math.random() * (1 + 40 - 20)) ) + 20;
    }

    var chartColours = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'];

    //sparklines (making loop with random data for all 7 sparkline)
    i = 1;
    for (i = 1; i < 9; i++) {
        var data = [[1, 3 + randNum()], [2, 5 + randNum()], [3, 8 + randNum()], [4, 11 + randNum()], [5, 14 + randNum()], [6, 17 + randNum()], [7, 20 + randNum()], [8, 15 + randNum()], [9, 18 + randNum()], [10, 22 + randNum()]];
        placeholder = '.sparkLineStats' + i;

        if (retina()) {

            $(placeholder).sparkline(data, {
                width: 160,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                height: 80,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                lineColor: '#ffffff',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                fillColor: 'rgba(255,255,255,0.2)',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                spotColor: '#ffffff',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                maxSpotColor: '#ffffff',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                minSpotColor: '#ffffff',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                spotRadius: 2,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                lineWidth: 1//In pixels (default: 1) - Integer
            });

            $(placeholder).css('zoom', 0.5);

        } else {

            if ($.browser.msie && parseInt($.browser.version, 10) === 8) {

                $(placeholder).sparkline(data, {
                    width: 80,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                    height: 40,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                    lineColor: '#ffffff',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                    fillColor: '#ffffff',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                    spotColor: '#ffffff',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                    maxSpotColor: '#ffffff',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                    minSpotColor: '#ffffff',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                    spotRadius: 2,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                    lineWidth: 1//In pixels (default: 1) - Integer
                });

            } else {

                $(placeholder).sparkline(data, {
                    width: 80,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                    height: 40,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                    lineColor: '#ffffff',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                    fillColor: 'rgba(255,255,255,0.2)',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                    spotColor: '#ffffff',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                    maxSpotColor: '#ffffff',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                    minSpotColor: '#ffffff',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                    spotRadius: 2,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                    lineWidth: 1//In pixels (default: 1) - Integer
                });

            }

        }

    }

    if ($(".boxchart")) {

        if (retina()) {

            $(".boxchart").sparkline('html', {
                    type: 'bar',
                    height: '120', // Double pixel number for retina display
                    barWidth: '8', // Double pixel number for retina display
                    barSpacing: '2', // Double pixel number for retina display
                    barColor: '#ffffff',
                    negBarColor: '#eeeeee'
                }
            );

            $(".boxchart").css('zoom', 0.5);

        } else {

            $(".boxchart").sparkline('html', {
                    type: 'bar',
                    height: '60',
                    barWidth: '4',
                    barSpacing: '1',
                    barColor: '#ffffff',
                    negBarColor: '#eeeeee'
                }
            );

        }

    }

}

/* ---------- Additional functions for data table ---------- */
$.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
}
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function (oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function (e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).addClass('pagination').append(
                '<ul>' +
                '<li class="prev disabled"><a href="#">&larr; ' + oLang.sPrevious + '</a></li>' +
                '<li class="next disabled"><a href="#">' + oLang.sNext + ' &rarr; </a></li>' +
                '</ul>'
            );
            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', {action: "previous"}, fnClickHandler);
            $(els[1]).bind('click.DT', {action: "next"}, fnClickHandler);
        },

        "fnUpdate": function (oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for (i = 0, iLen = an.length; i < iLen; i++) {
                // remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                        .insertBefore($('li:last', an[i])[0])
                        .bind('click', function (e) {
                            e.preventDefault();
                            oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                            fnDraw(oSettings);
                        });
                }

                // add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }
        }
    }
});

/* ---------- Page width functions ---------- */

$(window).bind("resize", widthFunctions);

function widthFunctions(e) {

    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var contentHeight = $("#content").height();

    if (winWidth < 980 && winWidth > 750) {
        $("a").each(function () {

            if ($(this).hasClass("quick-button-small span1")) {
                $(this).removeClass("quick-button-small span1");
                $(this).addClass("quick-button span2 changed");
            }
        });

        $(".circleStatsItem, .circleStatsItemBox").each(function () {

            var getOnTablet = $(this).parent().attr('onTablet');
            var getOnDesktop = $(this).parent().attr('onDesktop');

            if (getOnTablet) {
                $(this).parent().removeClass(getOnDesktop);
                $(this).parent().addClass(getOnTablet);
            }

        });

        $(".box").each(function () {

            var getOnTablet = $(this).attr('onTablet');
            var getOnDesktop = $(this).attr('onDesktop');

            if (getOnTablet) {
                $(this).removeClass(getOnDesktop);
                $(this).addClass(getOnTablet);
            }

        });

        $(".widget").each(function () {

            var getOnTablet = $(this).attr('onTablet');
            var getOnDesktop = $(this).attr('onDesktop');

            if (getOnTablet) {
                $(this).removeClass(getOnDesktop);
                $(this).addClass(getOnTablet);
            }

        });

        $(".statbox").each(function () {

            var getOnTablet = $(this).attr('onTablet');
            var getOnDesktop = $(this).attr('onDesktop');

            if (getOnTablet) {
                $(this).removeClass(getOnDesktop);
                $(this).addClass(getOnTablet);
            }

        });

    } else {

        if ($("#sidebar-left").hasClass("span1")) {

            $("#sidebar-left").removeClass("span1");
            $("#sidebar-left").addClass("span2");

        }

        if ($("#content").hasClass("span11")) {

            $("#content").removeClass("span11");
            $("#content").addClass("span11");

        }

        $("a").each(function () {

            if ($(this).hasClass("quick-button span2 changed")) {

                $(this).removeClass("quick-button span2 changed");
                $(this).addClass("quick-button-small span1");

            }

        });

        $(".circleStatsItem, .circleStatsItemBox").each(function () {

            var getOnTablet = $(this).parent().attr('onTablet');
            var getOnDesktop = $(this).parent().attr('onDesktop');

            if (getOnTablet) {

                $(this).parent().removeClass(getOnTablet);
                $(this).parent().addClass(getOnDesktop);

            }

        });

        $(".box").each(function () {

            var getOnTablet = $(this).attr('onTablet');
            var getOnDesktop = $(this).attr('onDesktop');

            if (getOnTablet) {

                $(this).removeClass(getOnTablet);
                $(this).addClass(getOnDesktop);

            }

        });

        $(".widget").each(function () {

            var getOnTablet = $(this).attr('onTablet');
            var getOnDesktop = $(this).attr('onDesktop');

            if (getOnTablet) {

                $(this).removeClass(getOnTablet);
                $(this).addClass(getOnDesktop);

            }

        });

        $(".statbox").each(function () {

            var getOnTablet = $(this).attr('onTablet');
            var getOnDesktop = $(this).attr('onDesktop');

            if (getOnTablet) {

                $(this).removeClass(getOnTablet);
                $(this).addClass(getOnDesktop);

            }

        });
    }

    if ($('.timeline')) {

        $('.timeslot').each(function () {

            var timeslotHeight = $(this).find('.task').outerHeight();

            $(this).css('height', timeslotHeight);

        });
    }
}

/* ---------- Collapse result in table ---------- */
$(document).on('click', '.panel-heading', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');

    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');

    }
});
$(document).on('click', '.panel-heading-child', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel-child').find('.panel-body-child').slideUp();
        $this.addClass('panel-collapsed');

    } else {
        $this.parents('.panel-child').find('.panel-body-child').slideDown();
        $this.removeClass('panel-collapsed');

    }
});