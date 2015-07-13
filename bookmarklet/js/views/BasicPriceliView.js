/**
 * Copyright © 2009-2014 Rhizome Networks LTD All rights reserved.
 *
 * Created by  Tomer Schilman on 15/06/2015.
 * <p/>
 */


(function ($) {
    $.widget("priceli.BasicPriceliView", {

        //Reference to priceli Core object
        priceliCore: null,

        // default options
        options: {
            //view Id
            id: null,

            title: "",

            //indicate if this view has one since instance (true) or that it is used with many instances (false)
            single: true,

            //base Element that will be used for creating the outer box
            baseElement: "div",

            //default styling properties
            style: {
                background: "white"
            },


            content: {
                style: {
                    width: "100%",
                    resize: "none"
                }
            },

            draggable: true,

            resizable: false,

            //enable/disable toolbar (default: false)
            enableToolbar: false,

            //the data managed by this view
            data: null
        },

        /**
         * The constructor must be created at the end of the _create process handled by extending Widget
         * and before the refresh() is invoked. It assumes that 'contentElement' has already been set
         * and call initialization functions related with 'contentElement'
         *
         * @private
         */
        _create: function () {
            if (typeof this.options.priceliCore !== 'undefined') {
                this.priceliCore = this.options.priceliCore;
            } else {
                throw "core must be pass";
            }
            this.getId();
            this.element.attr("id", this.getId());
            this.initOuterBoxElement();
            if (this.enableToolbar) {
                this.setToolbar();
            }
            this.initContent();
            this.initDefaultEvents();
            this.setToolbar();
        },


        /**
         * Invoked after widget has been created and before calling {@link #renderViewContent}.
         * An implementation can override this function to perform some initialization tasks before
         * rendering the content.
         */
        onCreate: function () {
        },

        // called when created, and later when changing options
        _refresh: function () {
        },

        /**
         * An implementation may override or extend this function in order to perform some cleanups.
         * Note: events bound via _on are removed automatically
         */
        _destroy: function () {
        },

        /**
         *  _setOptions is called with a hash of all options that are changing
         *  always refresh when changing options
         * @private
         */
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },

        /**
         * _setOption is called for each individual option that is changing
         * @param key
         * @param value
         * @private
         */
        _setOption: function (key, value) {
            //it is possible to validate the property here
            this._super(key, value);
        },


        /**
         * Initialize the element of BasicWidget that is used as the outer box for the 'content' element provided
         * by extending widgets.
         * 1. Set the Id of this element to be as the Id set for this widget
         * 2. Add the baseClass (default priceli-Widget)
         * 3. Make this element draggable
         */
        initOuterBoxElement: function () {
            this.element = $(document.createElement(this.options.baseElement));
            var id = this.option("id");
            this.element.attr("id", id);
            this.element.addClass("priceli");
            this.element.addClass("basic-priceli-view-outer-box");
            this.element.addClass(this.widgetFullName);

            if (this.options.draggable){
                this.element.draggable();
            }
            if (this.options.resizable){
                this.element.resizable();
            }
            this.applyStyle();
        },

        /**
         * apply the current style to the element
         */
        applyStyle: function () {
            this.element.css(this.options.style);
        },

        /**
         * Create and initialize the content element according to 'this.options.baseContentElement'
         * hat should be provided by extending widget.
         */
        initContent: function () {
            this.contentElement = $(document.createElement("div"));
            this.contentElement.addClass("BasicViewContent");

            var styleProps = this.options.content.style;
            this.contentElement.css(styleProps);
            if (this.enableToolbar) {
                var h = this.element.height() - this.element.find(".priceli-BasicViewToolbar").height();
            } else {
                h = this.element.height();
            }
            this.element.append(this.contentElement);
        },

        initDefaultEvents: function () {
            this._on({"click": "setOnTop"});
            this._on(this.contentElement, {"click": "setOnTop"});
        },

        /**
         * By default when widget is clicked once it is sent to top in terms of z-index.
         */
        setOnTop: function () {
            this.element.css("zIndex", this.priceliCore.getHighestZIndex() + 1);
            this._refresh();
        },


        /**
         * sets the widget developer key
         * @param developerKey
         */
        setDeveloperKey: function (developerKey) {
            this.developerKey = developerKey;
        },

        /**
         * sets the widget account id
         * @param account_id
         */
        setAccountId: function (account_id) {
            this.account_id = account_id;
        },

        /**
         *  Get the content glass object
         * @return {priceliCore}
         */
        getContentGlass: function () {
            return this.priceliCore;
        },


        /**
         * Any implementation may override this function in order to provide the logic for
         * setting the content data of the view. The content data can be read from member: this.options.content.data
         * Default implementation write the content of this.options.content.data as HTML into content element.
         *
         */
        renderViewContent: function () {
            this.contentElement.html(this.options.content.data);
        },

        /**
         * Get the widget Id. This function must be implemented by an actual implementation in oredr to
         * return either static Id or sequential Id (If this.single = false)
         * @return {String}
         */
        getId: function () {
            if (this.options.id === null || this.options.id.length == 0) {
                this.options.id = this.getCore().createUID();
            }
            return this.options.id;
        },


        /**
         * An implementation can override this function to set a dedicated toolbar for the view.
         * Example:
         * <pre>
         *    setToolbar:function () {
         *        this.element.MyToolbar({ownerWidget:this});
         *
         *    },
         *</pre>
         *
         * @see {@link priceli.BasicViewToolbar}
         */
        setToolbar: function () {
        },


        /**
         * Find element by selector on the content part of this widget
         * @param selector
         * @returns {*}
         */
        findContentElement: function (selector) {
            return this.contentElement.find(selector);
        },

        setOwnerDialog: function (dialog) {
            this.ownerDialog = dialog;
        },

        getFullWidth: function () {
            return parseInt(this.options.style.width);
        },

        getFullHeight: function () {
            return parseInt(this.options.style.height);
        },

        /**
         * returns true if the view should be in full width in mobile and false otherwise
         * each specific view should override this function if wants
         * a different implementation
         *
         * default is false
         * @returns {boolean}
         */
        fullWidthInMobile: function () {
            return false;
        },

        /**
         * Use this function to prepare class and Id identifies that uses the Id of this widget
         * in order to create a unique signature. For example passing "priceli-abc-" will return  "priceli-abc-[id]"
         * where [id] will be set with the id of this widget
         * @param baseName
         */
        getSignedName: function (baseName) {
            return baseName + this.getId();
        },

        /**
         * Get element from this view with the signed name as produced by {@link #getSignedName}
         * @param baseName
         * @returns {*}
         */
        getSignedNameElement: function (baseName) {
            return this.element.find(this.getSignedName(baseName));
        },

        /**
         * A shortcut that can be used by implementing widget for performing:
         * <pre>
         *     this.element.find(selector)
         * </pre>
         * @param selector
         * @return {*}
         */
        $find:function(selector) {
            return this.element.find(selector);
        },

        getCore: function(){
            return this.priceliCore;
        }

    });
})(priceli.jQuery);
