/**
 * Copyright © 2009-2015 Rhizome Networks LTD
 *
 * User: Tomer Schilman
 * Date: 6/16/15
 * Time: 10:34 AM
 *
 *
 */
priceli.jQuery(function ($) {

    /**
     *  This widget provide the basic toolbar for widgets. The basic toolbar provide user an some or all of abilities
     *  to delete, edit or minimize the widget.
     * <p/>
     * Basic toolbar can be extended by views that requires a toolbar with more operations.
     * <p/>
     * To add a button use {@link priceli.BasicViewToolbar#createButton}
     */
    $.widget("priceli.BasicViewToolbar", {

        // default options
        options: {
            /**
             * The widget that contains this toolbar and therefore manipulated by this toolbar
             */
            ownerWidget: null
        },


        _create: function () {
            this.element = $(document.createElement("div"));
            this.element.addClass("priceli-BasicViewToolbar");
            this.options.ownerWidget.element.append(this.element);
            this.element.addClass(this.options.baseClass);
            this.element.css({
                float: "right",
                height: "22px"
            });
            $("button.ui-button-icon-only").css({"width": "1em"});
        },

        _refresh: function () {
        },

        _destroy: function () {
            this.element.removeClass(this.options.baseClass);
        },

        /**
         * Close the widget
         */
        closeWidget: function () {
            var viewId = this.options.ownerWidget.getId();
//            this.options.ownerWidget.getCore().closeSettingsView(viewId)
        },


        /**
         * Create toolbar button
         * @param primaryIcon jquery-ui class name for primary button
         * @param clickHandler name of Function that handle the click event for that button
         */
        createButton: function (primaryIcon, clickHandler) {
            var btn = $(document.createElement("button"));
            this.element.append(btn);
            btn.button({
                text: false,
                icons: {
                    primary: primaryIcon
                }
            });
            btn.css("width", "1em");
            btn.css("height", "20px");
            this._on(btn, {"click": clickHandler});
        }

    });
});




