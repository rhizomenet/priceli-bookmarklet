/**
 * Copyright © 2009-2014 Rhizome Networks LTD All rights reserved.
 *
 * Created by  Tomer Schilman on 18/06/2015.
 * <p/>
 */

/**
 * A specific store implementation for Shufersal store.
 */
(function ($) {
    cg.ShufersalStore = function ShufersalStore() {
        cg.BasicPriceliStore.call(this);
    };

    cg.ShufersalStore.prototype.url = "http://www.shufersal.co.il/";

    cg.ShufersalStore.prototype.name = "shufersal";

    cg.ShufersalStore.prototype.findSKU = function(){
        var SKU = null;
        var SKUSpan = $("#popupBoxWrapper #ctl00_PlaceHolderMain_ucPopupMasterLoader_ctlProductPage_lblID");
        if (SKUSpan.length){
            SKU = SKUSpan.html();
        }
        return SKU;
    };

    //initialize the stores map if now already initialized
    if (typeof cg.stores === "undefined" || cg.stores === null){
        cg.stores = {};
    }
    cg.stores["shufersal"] = new cg.ShufersalStore();
})(cg.jQuery);
