/**
 * Copyright © 2009-2014 Rhizome Networks LTD All rights reserved.
 *
 * Created by  Tomer Schilman on 16/06/2015.
 * <p/>
 */

/**
 * A specific store implementation for Mega store.
 */
(function ($) {
    cg.MegaStore = function MegaStore() {
        cg.BasicPriceliStore.call(this);
    };

    cg.MegaStore.prototype.url = "http://www.mega.co.il/";

    cg.MegaStore.prototype.name = "mega";

    cg.MegaStore.prototype.findSKU = function(){
        var SKU = null;
        var labels = $(".SPDetails_Column2 .SPLabel");
        for (var i = 0; i < labels.length; i++) {
            var label = $(labels[i]);
            if (label.text() === 'מק"ט:') {
                SKU = label.parent().find(".SPValue").html();
                break;
            }
        }
        return SKU;
    };

    //initialize the stores map if now already initialized
    if (typeof cg.stores === "undefined" || cg.stores === null){
        cg.stores = {};
    }
    cg.stores["mega"] = new cg.MegaStore();
})(cg.jQuery);
