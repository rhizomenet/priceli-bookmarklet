function PriceliBookmarklet() {
    this.DEV = "<?php echo isset($_REQUEST['DEV']) ? 'true' : 'false' ?>" === 'true';
    this.baseHost = "//www.priceli.co.il";
    if (this.DEV){
        this.baseHost = "//local.priceli.co.il";
    }
    this.baseUrl = this.baseHost + "/bookmarklet";
    this.SKU = null;
    this.url = location.href;
    this.$ = null;
    this.title = "פריסלי - השוואת מחירים";
    this.width = 400;
    this.height = 400;
    if (typeof window.cg === "undefined" || window.cg === null) {
        window.cg = {};
    }
    try{
        this.loadLibraries();
    } catch (ex) {
        alert("תקלה: " + ex);
    }
}

PriceliBookmarklet.prototype = {
    init: function (jQuery) {
        var that = this;
        this.loadMoreFiles(function(){
            var result = that.getSKU();
            if (result.status){
                that.startWidget(cg.$);
            } else {
                that.showError(result.error);
            }
        });
    },

    startWidget: function ($) {
        var that = this;
        var testEm = document.getElementsByClassName("pricelibmklt-dialog");
        if (testEm.length > 0) {
            //If the dialog was already opened we remove it from dom and create it again
            for (var i = 0 ; i < testEm.length ; i++){
                testEm[i].parentNode.removeChild(testEm[i]);
            }
        }

        var container = $(document.createElement("div"));
        container.attr("id", "pricelibmklt-container");

        var SKU = encodeURIComponent(JSON.stringify(this.SKU));
        var target = encodeURIComponent(location.href);
        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', "pricelibmklt-iframe");
        iframe.setAttribute('src', this.baseUrl + "/frame.php?DEV=" + this.DEV + "&SKU=" + SKU + "&target=" + target);
        iframe.setAttribute('frameborder', "0");
        iframe.setAttribute('width', "100%");
        iframe.setAttribute('height', "100%");
        container.append(iframe);
        container.dialog({title: this.title, width: this.width, height: this.height, resizable: false,
            draggable: true, closeOnEscape: true,
            open: function (event, ui) {
                $(".pricelibmklt-dialog").css('zIndex', 999999);
                $(".pricelibmklt-dialog").css('overflow', 'hidden');
                $(".pricelibmklt-dialog #pricelibmklt-container").css('overflow', 'hidden');
                if (false) {
                    var shadow = document.body.appendChild(document.createElement("div"));
                    shadow.setAttribute("id", "pricelibmklt-shadow");
                    shadow.style.backgroundColor = "rgba(128, 128, 128, 0.19)";
                    shadow.style.width = "100%";
                    shadow.style.height = Math.max(document.body.clientHeight, screen.height) + "px";
                    shadow.style.position = "absolute";
                    shadow.style.top = "0px";
                    shadow.style.left = "0px";
                    shadow.style.zIndex = "100";
                    shadow.setAttribute('width', "100%");
                    shadow.setAttribute('height', shadow.style.height);

                    window.setTimeout(function () {
                    }, 3000);
                }

                var footer = $(document.createElement('div'));
                footer.attr("class", "ui-widget-header");
                footer.attr("id", "ui-dialog-footer");
                footer.css('textAlign', 'center');
                footer.append(that.createLinkElm("http://developers.priceli.co.il/api/home", "מפתחים"));
                footer.append(that.createLinkElm("http://developers.priceli.co.il/about", "אודות"));
                footer.append(that.createLinkElm("http://developers.priceli.co.il/contact", "צור קשר"));
                footer.append(that.createLinkElm("http://developers.priceli.co.il/terms", "תנאי שימוש"));

                $(".pricelibmklt-dialog").append(footer);
                $(".pricelibmklt-dialog").find(".ui-dialog-title").css('textAlign', 'center');
            },
            close: function (event, ui) {
                var em = document.getElementById("pricelibmklt-shadow");
                if (em != null) {
                    document.body.removeChild(em);
                }
            },
            dialogClass: "cg pricelibmklt-dialog"
        });
    },

    createLinkElm: function(url, text){
        var aElm = $(document.createElement('a'));
        aElm.click(function(){
            window.open(url);
        });
        aElm.html(text);
        aElm.css({
            "margin-right": "5px",
            "margin-left": "5px",
            "cursor": "pointer"
        });
        return aElm;
    },

    getSKU: function () {
        var storeId = (document.location.host.split("."))[1];
        var result = {status: false, error: "Unknown"};
        if (storeId) {
            if (typeof cg.stores !== "undefined" && cg.stores !== null) {
                var store = cg.stores[storeId];
                if (store) {
                    this.SKU = store.findSKU();
                    if ( this.SKU !== null ){
                        result = {status: true, SKU: this.SKU};
                    } else {
                        result = {status: false, error: '<label>לא נמצא מק"ט בדף</label><br>כדי לחפש על מוצר יש להכנס לדף המוצר'};
                    }
                } else {
                    var message = '<label>החנות אינה נתמכת עדיין!</label><br>החנויות הנתמכות הן:<br>' +
                        '<a style="text-decoration: underline; color: blue" href="http://www.shufersal.co.il/Pages/Catalog.aspx">שופרסל</a> | ' +
                        '<a style="text-decoration: underline; color: blue" href="http://www.mega.co.il/jsfweb/pages/homepage.jsf">מגה</a> | ' +
                        '<a style="text-decoration: underline; color: blue" href="http://www.edenteva.co.il/">עדן טבע מרקט</a>';
                    result = {status: false, error: message};
                }
            } else {
                var message = '<label>לא נמצאו חנויות במאגר!</label>';
                result = {status: false, error: message};
            }
        }
        return result;
    },

    /**
     * Show error message
     * @param message
     */
    showError: function (message) {
        var errorDialog = cg.$(document.createElement('div'));
        errorDialog.html(message + '<br>לכל בעיה נוספת אפשר ל<a style="text-decoration: underline; color: blue" href="http://developers.priceli.co.il/contact">צור קשר</a>. איתנו ונשמח לעזור');
        errorDialog.css('direction', 'rtl');
        cg.$(document.body).append(errorDialog);
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
    },

    /**
     * Check if jQuery need to be installed. We install jQuery if none is installed or that the installed
     * version is lower than 1.9
     *
     * @returns {boolean} true if need to be installed
     */
    shouldInstallQuery: function () {
        if (typeof jQuery == 'undefined' || jQuery == null) return true;

        if (typeof cg !== 'undefined' && typeof cg.jQuery !== 'undefined' && typeof cg.$ !== 'undefined'){
            return false;
        }

        if (jQuery.fn.jquery != null && jQuery.fn.jquery.length > 1) {
            var major = parseInt(jQuery.fn.jquery.split(".")[1]);
            return ( typeof jQuery == 'function' && major < 9);
        } else {
            return true;
        }
    },

    /**
     * Prevent conflict between the last installed jQuery and possibly previous version that was installed.
     * To prevent the conflict we do two things:
     * 1. The latest installed jQuery is set on the "cg" namespace
     * 2. Return the control in $ and jQuery to former installed version (or other API that uses these token)
     * <p/>
     * After running this function and for the rest of our code - if we refer to jQuery, usually passing into
     * closure function we use "cg.jQuery" or "cg.$" and not "jQuery" or "$"
     * <p/>
     * <b>
     * IF JQUERY WAS NOT PREVIOUSLY INSTALLED AND INSTALLED BY CG THE VARIABLES $ AND JQuery ARE UNSET NOW
     * WE PREPARE THEM FON IN CASE OTHER CODE LOADED BY CG REQUIRES JQuery.
     * ALSO NOTE THAT ANY USE OF JQ WITHIN CG SHOULD USE cg.jQuery or cg.$ TO PREVENT PROBLEMS
     * </b>
     * @param {boolean} jqInstalled indicate if jquery was installed by CG. If not installed we do not call
     * jQuery.noConflict since it will reset the newer or equal JQ version running on the site. JQ is not
     * installed if it was found that JQ version running on a website is equal or greater then 1.9.0.

     */
    setJqueryNoConflict: function (jqInstalled) {
        if (jqInstalled) {
            //install loaded jquery on cg namespace
            window.cg.jQuery = jQuery;
            window.cg.$ = window.cg.jQuery;
        }

        //for debug
        //console.log("window.cg.jQuery: " + window.cg.jQuery.fn.jquery); //will show the new version
        //console.log("window.cg.$:" + window.cg.$.fn.jquery);  //will show the new version

        //If required return the control in $ and and jQuery to previously installed version / api
        //After running this command window.$ and window.jQuery will hold the previously installed jQuery version.
        if (jqInstalled) {
            jQuery.noConflict(true);
        }

        //IF JQUERY WAS NOT PREVIOUSLY INSTALLED AND INSTALLED BY CG THE VARIABLES $ AND JQuery ARE UNSET NOW
        //WE PREPARE THEM FON IN CASE OTHER CODE LOADED BY CG REQUIRES JQuery
        if(typeof(window.jQuery) == "undefined") {
            window.jQuery = window.cg.jQuery;
            window.$ = window.cg.jQuery;
        }

        //workaround for older versions of jQuery ( < 1.9 )
        if (typeof jQuery.browser === 'undefined'){
            jQuery.browser = {};
        }
        if (typeof $.browser === 'undefined'){
            $.browser = {};
        }
        //console.log("jQuery.fn.jquery: " + jQuery.fn.jquery); //will show the old version
        //console.log("$.fn.jquery: " + $.fn.jquery);  //will show the old version

        //Important! and from now on if we refer to jQuery, usually passing into closure function we use "cg.jQuery" or "cg.$"

        //if AMD define function was masked, return it to previous state
        if (typeof  window.defineTemp === "function") {
            define = window.defineTemp;
        }
    },

    /**
     * Load the required libraries
     */
    loadLibraries: function () {
        var that = this;
        //if ((typeof jQuery === 'undefined') || jQuery.fn.jquery.indexOf("1.10") === -1) {
        if (that.shouldInstallQuery()) {
            this.loadScript('http://api.contentglass.com/core/libs/jquery/jquery.js', function () {
                if (typeof jQuery.browser === 'undefined'){
                    jQuery.browser = {};
                }
                if (typeof $.browser === 'undefined'){
                    $.browser = {};
                }
                that.loadJqueryUi(true);
            });
        } else {
            that.loadJqueryUi(false);
        }
    },

    loadJqueryUi: function(jqueryInstalled){
        var that = this;
            that.loadScript('http://api.contentglass.com/core/libs/jquery_ui/js/jquery-ui.js', function () {
                that.setJqueryNoConflict(jqueryInstalled);
                that.init();
            });
            that.loadCSS('//api.contentglass.com/core/libs/jquery_ui/css/redmond/jquery-ui-custom.css');
    },

    loadMoreFiles: function (callback) {
        if (this.DEV === "true"){
            this.scripts = this.getDevScripts();
        } else {
            this.scripts = this.getProdScripts();
        }
        var TODO = "need to consider here loading the script asynchronously and not synchronously";
        var startIndex = 0;
        this.loadScripts(startIndex, callback);
    },

    getProdScripts: function(){
        return [
            {src: this.baseUrl + "/js/stores/PriceliStores.min.js"}
        ]
    },

    getDevScripts: function(){
        return [
            {src: this.baseUrl + "/js/stores/BasicPriceliStore.js"},
            {src: this.baseUrl + "/js/stores/Mega.js"},
            {src: this.baseUrl + "/js/stores/Shofersal.js"},
            {src: this.baseUrl + "/js/stores/EdenTeva.js"}
        ];
    },

    loadScripts: function(index, callback){
        var that = this;
        var script = this.scripts[index];
        if (typeof script !== "undefined"){
            this.loadScript(script.src, function(){
                that.loadScripts(index+1, callback);
            });
        } else {
            callback();
        }
    },

    loadCSS: function (url) {
        var css = document.createElement("link");
        css.setAttribute("type", "text/css");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", url);
        document.getElementsByTagName("head")[0].appendChild(css);

    },

    loadScript: function (url, callback) {

        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };

        } else {
            script.onload = function () {
                if (callback != null) {
                    callback();
                }
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
};
