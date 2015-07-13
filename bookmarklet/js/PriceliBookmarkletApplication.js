/*
 * Copyright (c) 2009-2015 Rhizome Networks LTD All rights reserved.
 *
 * User: Gilad
 * Date: 08:47 11/03/15
 */

(function ($) {
    /**
     * PriceliBookmarkletApplication app constructor
     * This is the
     * @param manifest
     * @param options
     * @constructor
     */
    cg.PriceliBookmarkletApplication = function (manifest, options) {
        cg.CGButton.call(this, manifest, options);
    };
    cg.PriceliBookmarkletApplication.prototype = Object.create(cg.CGApplication.prototype);
    cg.PriceliBookmarkletApplication.constructor = cg.PriceliBookmarkletApplication;

    cg.PriceliBookmarkletApplication.Lang = {};

    /**
     * AppTemplate prototype
     */
    cg.PriceliBookmarkletApplication.prototype = $.extend(cg.CGApplication.prototype, {

        /**
         * Url for server calls to priceli API
         */
        server_url: "http://www.priceli.co.il/v1",

        /**
         * Storage path in the local storage for all the button data
         */
        storagePath: "cg_priceli_bookmarklet" + cg.APP_ID,

        htmlTemplates: {
            button: {
                html: cg.PRICELI_HOST + "/bookmarklet/js/PriceliBookmarkletApplication.html",
                css: cg.PRICELI_HOST + "/bookmarklet/css/PriceliBookmarkletApplication.css"
            }
        },

        bookmarkletContainerClass: "priceli",

        /**
         * Set cg.app with instance of this application and initialize the main view
         */
        init: function () {
            cg.app = this;
            this.initContentGlass();
            this.startContentGlass();
            cg.BookmarkletLang = new cg.BaseLang("he", "", "cg");
            cg["csrf"] = cg.priceliClientId + "@" + cg.priceliClientName;
            this.render();
            this.searchProductsBySKU();
        },

        /**
         * Remove the loader gif from dom
         */
        stopBookmarkletLoader: function(){
            $("#" + cg.bookmarkletLoaderId).remove();
        },

        /**
         * Render the application on the screen.
         */
        render: function(){
            if (typeof this.container !== "undefined" && this.container !== null){
                var container = $(this.container);
                var div = $(document.createElement('div'));
                div.addClass(this.bookmarkletContainerClass);
                container.append(div);
            } else {
                throw "Container hasn't been given!";
            }

        },

        /**
         * Call portal API for getting results that match the search text
         */
        searchProductsBySKU: function () {
            if (cg.bookmarkletSKU){
                this.getProductBySKUFromServer(cg.bookmarkletSKU);
            } else {
                throw "Product SKU isn't present!";
            }
        },

        /**
         * Make the Actual call the Priceli server with the given SKU (Stock Keeping Unit)
         * @param SKU
         */
        getProductBySKUFromServer: function(SKU){
            var that = this;
            var url = cg.PRICELI_HOST + "/v1/portal/code";
            var params = {
                bookmarklet: true,
                item_code : SKU
            };
            cg.NetUtils.httpGet(url, params,
                function success(response) {
                    that.showView(response["data"]);
                },
                function fail(xhr, status, error, responseText) {
                    that.showError(responseText);
                });
        },

        /**
         * Receive data from the server and create the view that show it to the user.
         * @param data
         * @returns {priceli.BasicPriceliView|cg.CGWidget|*}
         */
        showView: function(data){
            var libraryNs = cg.CGFinals.DEFAULT_VIEWS_LIB;
            var widgetType = "cg-ItemDialogView";
            var options = {
                content: {
                    data: data
                }
            };
            var lib = this.getContentGlass().viewsLibs[libraryNs];
            var viewWidget;
            var viewUID = (libraryNs + widgetType);
            viewWidget = lib.createWidget(widgetType, typeof  options != 'undefined' ? options : null);
            viewWidget.contentGlass = this.getContentGlass();

            this.stopBookmarkletLoader();

            $("." + this.bookmarkletContainerClass).append(viewWidget.element);
            viewWidget.onCreate();
            viewWidget.renderViewContent();

            return viewWidget;

        },

        /**
         * Show error message
         * @param message
         */
        showError: function (message) {
            var errorDialog = cg.$(document.createElement('div'));
            errorDialog.html(message + '<br>לכל בעיה נוספת אפשר ל<a style="text-decoration: underline; color: blue" href="http://developers.priceli.co.il/contact">צור קשר</a>. איתנו ונשמח לעזור');
            errorDialog.css('direction', 'rtl');
            $(document.body).append(errorDialog);
            errorDialog.dialog({
                resizable: false,
                height: 190,
                dialogClass: 'cg',
                modal: true,
                buttons: {
                    Ok: function () {
                        cg.$(this).dialog("close");
                        cg.$(this).remove();
                    }
                }
            });
            errorDialog.parent().find('.ui-dialog-buttonpane').css("margin", "-1px 0 0 0");
//            alert(message);
        }
    });

})(cg.jQuery);
