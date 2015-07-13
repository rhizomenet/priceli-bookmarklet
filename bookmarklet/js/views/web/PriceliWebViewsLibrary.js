/**
 * Copyright © 2009-2014 Rhizome Networks LTD All rights reserved.
 *
 * Created by  Tomer Schilman on 15/06/2015.
 * <p/>
 */

(function ($) {
    cg.PriceliWebViewsLibrary = function PriceliWebViewsLibrary(libDef) {
        cg.CGWidgetLibrary.call(this, libDef);
    };

    cg.PriceliWebViewsLibrary.prototype = Object.create(cg.CGWidgetLibrary.prototype);
    cg.PriceliWebViewsLibrary.prototype.constructor = cg.PriceliWebViewsLibrary;

    /**
     * Create new widget from this library
     * @param {String} widgetType the widget type
     * @param {Object} options Optional array of options, to set when creating the widget
     * @return {cg.CGWidget}
     */
    cg.PriceliWebViewsLibrary.prototype.createLibWidget = function (widgetType, options) {
        if (options == null) {
            options = {};
        }

        switch (widgetType) {
            case "cg-ItemDialogView":
                var widget = new $.cg.ItemDialogView(options);
                break;
        }
        return widget;

    };
})(cg.jQuery);
