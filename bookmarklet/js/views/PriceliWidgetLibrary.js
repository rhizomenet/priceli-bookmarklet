/**
 * Copyright © 2009-2015 Rhizome Networks LTD
 *
 * Author: Tomer Schilman
 * Date: 6/15/15
 * Time: 09:32 AM
 *
 * A prototype for creating widgets library. Library MUST inherit {@link PriceliWidgetLibrary} and implements
 * the 'createWidget' function.
 *
 * Example:
 * <pre>
 *  function MyWidgetLibrary(namespace) {
 *      PriceliWidgetLibrary.call(this, namespace);
 *  }
 *  MyWidgetLibrary.prototype = Object.create(PriceliWidgetLibrary.prototype);
 *  MyWidgetLibrary.prototype.constructor = MyWidgetLibrary;
 *
 *  WebWidgetLibrary.prototype.createWidget = function (type, options) {j
 *      //create the widgets here...
 *  }
 *
 * </pre>
 * where:
 * 1.  'type' is the widget type
 * 2.  'options' is an optional array of options, to set when creating the widget
 *
 * @param {String} libraryId the namespace that will be used to store this library on the content glass object
 * @param {String} name name of this library
 * @param {String} baseUrl the base url where resources (e.g images) reside.
 * @param {int} libIndex and index in the Priceli library array. A number smaller then 0 will be assigned with
 * max value so that library will move to end of the list when rendering on widgets selector
 * @param {string} account_id string to identify the source of the widget
 * @constructor
 */
(function ($) {

    /**
     * Construct widgets library. The following fields are expected in library def:
     * <pre>
     *     id : required
     *     name : required
     *     account_id : required
     *     index : optional default -1
     *     visible : optional default true
     * </pre>
     *
     * @param {Object} libDef library def
     * @constructor
     * @throws exception if some required parameter is missing in def
     */
    priceli.PriceliWidgetLibrary = function PriceliWidgetLibrary(libDef) {
        this.libraryId = this.required("id", libDef.id);
        this.name = this.required("name", libDef.name);
        this.account_id = this.required("account_id", libDef.account_id);
        var inx = this.defaultNotFound(libDef.index, -1);
        this.index = inx < 0 ? 2147483647 : inx;
        this.visible = this.defaultNotFound(libDef["visible"], true);
    };


    priceli.PriceliWidgetLibrary.prototype = {

        libraryId: null,
        name: null,
        account_id: null,
        index: null,
        priceliCore: null,
        visible:true,

        defaultOptions: {
            style: {
                top: "100px",
                left: "100px"
            }
        },

        //check required value and throw exception if not found
        required: function (name, val) {
            if (val == null) throw "Missing required parameter: '" + name + "'";
            return val;
        },

        //get default value if provided value is null
        defaultNotFound: function (val, def) {
            if (val == null) return def;
            return val;
        },

        /**
         * return the defaultOptions object with the change the the
         * top and left are the center of the visible screen
         * @returns {*}
         */
        getDefaultOptions: function () {
            var defaultOptions = Object.create(this.defaultOptions); //MUST clone in order to to transfer options between different widgets.
            var width = $(window).width();
            var height = $(window).height();
            defaultOptions.style.top = height / 2;
            defaultOptions.style.left = width / 2;

            return defaultOptions;
        },

        /**
         * Create new widget from this library. This function handle core tasks and then call {@link #createLibWidget}
         * for creating the specific widget creation.
         *
         * @param {String} widgetType the widget type
         * @param {Array} options Optional array of options, to set when creating the widget
         * @return {priceli.BasicPriceliView}
         * @exception priceliException if type of widget was not found
         */
        createWidget: function (widgetType, options) {
            var widget = this.createLibWidget(widgetType, options);
            widget.libraryId = this.getLibraryId();
//            widget.setDeveloperKey(this.getDeveloperKey());
            widget.widgetType = widgetType;
            return widget;
        },
        /**
         * Create new widget from this library. This function MUST be implemented by extending functions.
         * @param {String} widgetType the widget type
         * @param {Array} options Optional array of options, to set when creating the widget
         * @return {priceli.BasicPriceliView}
         */
        createLibWidget: function (widgetType, options) {
            throw "createWidget' function must be implemented by library implementation";
        },

        /**
         * Used for the purpose of creating views that are not presented within the main settings view panel.
         * @param fullName
         * @param options
         * @return {priceli.BasicPriceliView}
         */
        createWidgetAndRender: function (fullName, options) {
            var widget = this.createWidget(fullName, options);
            if (widget != null) {
                widget.onCreate();
                widget.renderViewContent();
                return widget;
            } else {
                throw "View was not found by name: '" + fullName + "'";
            }
        },

        /**
         *
         * @return {String} namespace of this library
         */
        getLibraryId: function () {
            return this.libraryId;
        },

        setLibraryId: function (libraryId) {
            this.libraryId = libraryId
        },

        /**
         * set current developer key
         * @param developerKey
         */
        setDeveloperKey: function (developerKey) {
            this.developerKey = developerKey;
        },

        /**
         * return the library developer key
         * @returns {priceli.BasicPriceliView.developerKey|*|developerKey}
         */
        getDeveloperKey: function () {
            return this.developerKey;
        },


        /**
         * return the library developer key
         * @returns {priceli.BasicPriceliView.developerKey|*|developerKey}
         */
        setAccountId: function (account_id) {
            this.account_id = account_id;
        },

        /**
         * return the library developer key
         * @returns {priceli.BasicPriceliView.developerKey|*|developerKey}
         */
        getAccountId: function () {
            return this.account_id;
        },

        /**
         * set current version
         * using the <a href="http://en.wikipedia.org/wiki/Software_versioning">convention</a>
         */
        setVersion: function (version) {
            this.version = version;
        },

        /**
         * Get the version of this library
         * @param version
         * @returns {*}
         */
        getVersion: function (version) {
            return this.version;
        },

        /**
         * set the library index
         * @param index
         */
        setIndex: function (index) {
            this.index = index;
        },

        /**
         * Get library index
         * @returns {int}
         */
        getIndex: function () {
            return this.index;
        },

        /**
         * Get the name of this library.
         * @return {String}
         */
        getName: function () {
            return this.name;
        },

        /**
         * Get the description of this library
         * @return {String}
         */
        getDescription: function () {
            return this.description;
        },

        /**
         * Get the provider Key that is usually used by system to get more information about library provider
         * @returns {*}
         */
        getProviderKey: function () {
            return this.providerKey;
        },

        /**
         * Get list of categories
         * @return {Array}
         */
        getCategories: function () {
            return this.getGallery().categories;
        },

        /**
         * <p>
         *      This function loop over inner widgets and construct an object that can be used
         *      to present a gallery of this library. This include one sprite image with icons
         *      of library widgets and the rectangle clip for each of the widgets.
         * </p>
         * Library implementation needs to override this function
         *
         * @return {Object}
         */
        getGallery: function () {
            throw "PriceliWidgetLibrary.getGallery - Not implemented for library " + this.libraryId + "!";
        },

        /**
         * returns an array of all the library widget types
         * @returns {Object|priceli.StorageModel.widgets|*|priceli.BasicPriceliView.widgets}
         */
        getWidgetsTypes: function () {
            if (this.widgets != null) {
                return this.widgets;
            } else {
                throw "Library widget array is NULL";
            }
        },

        /**
         * Set the content glass reference. This is used internally. You don't need to call this function.
         * @param core
         */
        setCore: function (core) {
            this.priceliCore = core;
        }
    };
})(priceli.jQuery);
