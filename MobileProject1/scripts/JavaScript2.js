/*
 * Script from NETTUTS.com [by James Padolsey]
 * @requires jQuery($), jQuery UI & sortable/draggable UI modules
 */
    var iNettuts = {

        jQuery: $,

        settings: {
            columns: '.column',
            widgetSelector: '.widget',
            handleSelector: '.widget-head',
            contentSelector: '.widget-content',
            widgetDefault: {
                movable: true,
                removable: true,
                collapsible: true,
                editable: true,
                colorClasses: ['color-yellow', 'color-red', 'color-blue', 'color-white', 'color-orange', 'color-green']
            },
            widgetIndividual: {
                intro: {
                    movable: false,
                    removable: false,
                    collapsible: false,
                    editable: false
                },
                gallery: {
                    colorClasses: ['color-yellow', 'color-red', 'color-white']
                }
            }
        },

        init: function () {
            this.attachStylesheet('styles/inettuts.js.css');
            this.addWidgetControls();
            this.makeSortable();
        },

        getWidgetSettings: function (id) {
            var $ = this.jQuery,
                settings = this.settings;
            return (id && settings.widgetIndividual[id]) ? $.extend({}, settings.widgetDefault, settings.widgetIndividual[id]) : settings.widgetDefault;
        },

        addWidgetControls: function () {
            var iNettuts = this,
                $ = this.jQuery,
                settings = this.settings;

            $(settings.widgetSelector, $(settings.columns)).each(function (i) {
                var thisWidgetSettings = iNettuts.getWidgetSettings(this.id);

                if (thisWidgetSettings.removable) {
                    $('<a href="#" class="remove">CLOSE</a>').mousedown(function (e) {
                        e.stopPropagation();
                    }).click(function () {
                        if (confirm('This widget will be removed, ok?')) {
                            $(this).parents(settings.widgetSelector).animate({
                                opacity: 0
                            }, function () {
                                $(this).wrap('<div/>').parent().slideUp(function () {
                                    $(this).remove();
                                });
                            });
                        }
                        return false;
                    }).appendTo($(settings.handleSelector, this));
                }


                if (thisWidgetSettings.editable) {
                    var categories = '<ul data-role="listview" data-inset="true" style="min-width:210px;">';
                    $.each(data, function (i, category) {
                        categories += '<li><a href="#" data-rel="back" onclick="moveCard(\'' + category.Id + '\');">' + category.Label + '</a></li>';
                    });
                    categories += '</ul>';
                    $('<a href="#popupMove" onclick="setItemIdToGlobal($(this).parents(\'li.widget\').attr(\'itemid\'));" data-rel="popup" data-transition="pop" class="move">MOVE</a><div data-role="popup" data-theme="b" id="popupMove">' + categories + '</div>').mousedown(function (e) {
                        e.stopPropagation();
                    }).appendTo($(settings.handleSelector, this));
                    

                    $('<a href="#" class="edit">EDIT</a>').mousedown(function (e) {
                        e.stopPropagation();
                    }).toggle(function () {
                        $(this).css({ background: 'url(styles/images/floppy.png) no-repeat' })
                            .parents(settings.widgetSelector)
                                .find('.edit-box').show().find('input').focus();
                        return false;
                    }, function () {
                        $(this).css({ background: 'url(styles/images/edit.png) no-repeat' })
                            .parents(settings.widgetSelector)
                                .find('.edit-box').hide();
                        return false;
                    }).appendTo($(settings.handleSelector, this));
                    $('<div class="edit-box" style="display:none;"/>')
                        .append('<ul><li class="item"><input class="item-label-edit" placeholder="Edit Label" value="' + $('.item-label', this).text() + '"/></li>')
                        .append('<li class="item"><input class="item-desc-edit" placeholder="Edit Description" value="' + $('.widget-content ul li', this).text() + '"></li>')
                        .append((function () {
                            var colorList = '<li class="item"><ul class="colors">';
                            $(thisWidgetSettings.colorClasses).each(function () {
                                colorList += '<li class="' + this + '"/>';
                            });
                            return colorList + '</ul>';
                        })())
                        .append('</ul>')
                        .insertAfter($(settings.handleSelector, this));
                }

                if (thisWidgetSettings.collapsible) {
                    var userListAsLI = '<fieldset data-role="controlgroup">';
                    $.each(users, function (j, user) {
                        userListAsLI += '<label class="user-checkbox-label"><span><input type="checkbox" onclick="selectOrUnselectUser(this, \'' + users[j].Name + '\')" name="' + users[j].Name + '" value="' + users[j].Id + '"><img width="30" height="30" border="1" src="pictures/' + users[j].Name + '.jpg"/><div>' + users[j].Name + '</div></span></label>';
                    });
                    userListAsLI += '</fieldset>';

                    $('<a href="#popupBasic' + items[i].Id + '" class="add-user" data-rel="popup" data-transition="pop">ADD USER</a><div id="popupBasic' + items[i].Id + '" data-theme="b" data-role="popup"><div class="users-div" itemId="' + items[i].Id + '">'+userListAsLI+'</div></div>').mousedown(function (e) {
                        e.stopPropagation();
                    }).prependTo($(settings.handleSelector, this));



                    $('<a href="#" class="collapse">COLLAPSE</a>').mousedown(function (e) {
                        e.stopPropagation();
                    }).toggle(function () {
                        $(this).css({ background: 'url(styles/images/up.png) no-repeat' })
                            .parents(settings.widgetSelector)
                                .find(settings.contentSelector).show();
                        return false;
                    },function () {
                        $(this).css({ background: 'url(styles/images/down.png) no-repeat' })
                            .parents(settings.widgetSelector)
                                .find(settings.contentSelector).hide();
                        return false;
                    }).prependTo($(settings.handleSelector, this));
                }
            });
            
            $('.edit').click(function () {
                $(this).parents('li.widget').find('.edit-box').each(function () {
                    if ($(this).css('display') == 'none') {
                        updateItemLabel($(this).parents('li.widget').attr('itemid'), $(this).find('input.item-label-edit').val());
                        updateItemDesc($(this).parents('li.widget').attr('itemid'), $(this).parents('li.widget').find('input.item-desc-edit').val());
                    }
                });
            });


            $('.edit-box').each(function () {

                $('input.item-label-edit', this).keyup(function () {
                    $(this).parents(settings.widgetSelector).find('.item-label').text($(this).val().length > 20 ? $(this).val().substr(0, 20) + '...' : $(this).val());
                });
                $('input.item-desc-edit', this).keyup(function () {
                    updateItemDesc($(this).parents('li.widget').attr('itemid'), $(this).val());

                    $(this).parents(settings.widgetSelector).find('.widget-content ul li').text($(this).val().length > 20 ? $(this).val().substr(0, 20) + '...' : $(this).val());
                });
                $('ul.colors li', this).click(function () {

                    var colorStylePattern = /\bcolor-[\w]{1,}\b/,
                        thisWidgetColorClass = $(this).parents(settings.widgetSelector).attr('class').match(colorStylePattern)
                    if (thisWidgetColorClass) {
                        $(this).parents(settings.widgetSelector)
                            .removeClass(thisWidgetColorClass[0])
                            .addClass($(this).attr('class').match(colorStylePattern)[0]);
                        
                        updateItemColor($(this).parents('li.widget').attr('itemid'), $(this).attr('class').match(colorStylePattern)[0]);
                    }
                    return false;

                });
            });

        },

        attachStylesheet: function (href) {
            var $ = this.jQuery;
            return $('<link href="' + href + '" rel="stylesheet" type="text/css" />').appendTo('head');
        },

        makeSortable: function () {
            var iNettuts = this,
                $ = this.jQuery,
                settings = this.settings,
                $sortableItems = (function () {
                    var notSortable = '';
                    $(settings.widgetSelector, $(settings.columns)).each(function (i) {
                        if (!iNettuts.getWidgetSettings(this.id).movable) {
                            if (!this.id) {
                                this.id = 'widget-no-id-' + i;
                            }
                            notSortable += '#' + this.id + ',';
                        }
                    });
                    return $('> li:not(' + notSortable + ')', settings.columns);
                })();

            $sortableItems.find(settings.handleSelector).css({
                cursor: 'move'
            }).mousedown(function (e) {
                $sortableItems.css({ width: '' });
                $(this).parent().css({
                    width: $(this).parent().width() + 'px'
                });
            }).mouseup(function () {
                if (!$(this).parent().hasClass('dragging')) {
                    $(this).parent().css({ width: '' });
                } else {
                    $(settings.columns).sortable('disable');
                }
            });

            $(settings.columns).sortable({
                items: $sortableItems,
                connectWith: $(settings.columns),
                handle: settings.handleSelector,
                placeholder: 'widget-placeholder',
                forcePlaceholderSize: true,
                revert: 300,
                delay: 100,
                opacity: 0.8,
                containment: 'document',
                start: function (e, ui) {
                    $(ui.helper).addClass('dragging');
                },
                stop: function (e, ui) {
                    $(ui.item).css({ width: '' }).removeClass('dragging');
                    $(settings.columns).sortable('enable');
                },
                update: updateCallback
            });
        }

    };