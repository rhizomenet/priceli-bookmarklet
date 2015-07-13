/**
 * Copyright © 2009-2014 Rhizome Networks LTD All rights reserved.
 *
 * Created by  Tomer Schilman on 18/06/2015.
 * <p/>
 */

/**
 * A specific store implementation for EdenTeveMarket store.
 */
(function ($) {
    cg.EdenTevaStore = function EdenTevaStore() {
        cg.BasicPriceliStore.call(this);
    };

    cg.EdenTevaStore.prototype.url = "http://www.edenteva.co.il/";

    cg.EdenTevaStore.prototype.name = "edenteva";

    cg.EdenTevaStore.prototype.findSKU = function(){
        var SKU = null;
        var SKUInput = $("#hdnProductId");
        if (SKUInput.length){
            SKU = parseInt(SKUInput.val());
        }
        return SKU;
    };

    //initialize the stores map if now already initialized
    if (typeof cg.stores === "undefined" || cg.stores === null){
        cg.stores = {};
    }
    cg.stores["edenteva"] = new cg.EdenTevaStore();
})(cg.jQuery);
