/**
 * Copyright © 2009-2014 Rhizome Networks LTD All rights reserved.
 *
 * Created by  Tomer Schilman on 16/06/2015.
 * <p/>
 */


/**
 * Basic implementation of a priceli store.
 */
(function ($) {
    cg.BasicPriceliStore = function BasicPriceliStore() {
    };

    cg.BasicPriceliStore.prototype = {
        /**
         * Url of the store site
         */
        url: null,

        /**
         * Name of the store (In english, received from the url)
         */
        name: null,

        /**
         * The search function to get the SKU from the site.
         * Each specific store need to implement this function according to it's own sire structure.
         */
        findSKU: function(){
            throw "findSKU function must be implemented!";
        }
    };
})(cg.jQuery);
