/**
 * Copyright © 2009-2015 Rhizome Networks LTD
 *
 * User: user
 * Date: 5/29/13
 * Time: 10:37 AM
 *
 * Default library for Priceli bookmarklet widgets
 * @extends  CGWidgetLibrary
 */

(function ($) {

    cg.PriceliBookmarkletWidgetLibrary = function PriceliBookmarkletWidgetLibrary(libDef) {
        cg.CGWidgetLibrary.call(this, libDef);
    };

    cg.PriceliBookmarkletWidgetLibrary.prototype = Object.create(cg.CGWidgetLibrary.prototype);
    cg.PriceliBookmarkletWidgetLibrary.prototype.constructor = cg.PriceliBookmarkletWidgetLibrary;

    /**
     * Create new widget from this library
     * @param {String} type the widget type name
     * @param {Array} options Optional array of options, to set when creating the widget
     * @return {cg.CGWidget}
     */
    cg.PriceliBookmarkletWidgetLibrary.prototype.createLibWidget = function (type, options) {
        var defaultOptions = this.getDefaultOptions();
        if (options != null) {
            defaultOptions = $.extend(defaultOptions, options);
        }
        defaultOptions.preferredLayer = cg.CGFinals.LAYER_ID_DOMAIN;


        switch (type) {
            default:
                throw new cg.CGException("Widget type not found '" + type + "' in PriceliWidgetLibrary.js");
        }
        return widget;
    };

    cg.PriceliBookmarkletWidgetLibrary.prototype.widgets = [
//        "cg-TextBox"
    ];

    cg.PriceliBookmarkletWidgetLibrary.prototype.getGallery = function () {
        var status = this.getConventionalStatus();
        return {
            categories: {
                "default": {
                    image: cg.MiscUtils.toFullThemeUrl(cg.CGFinals.BASIC_WIDGETS_LIBRARY_IMAGES_PATH),
                    title: "Default",
                    items: [
//                        {name: "Textbox", type: "cg-TextBox", clip: {"x": "0", "y": "60"}, status: status}
                    ]
                }
            }
        }
    };
})(cg.jQuery);
