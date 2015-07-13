/**
 * Copyright © 2009-2014 Rhizome Networks LTD All rights reserved.
 *
 * Created by  Tomer Schilman on 15/06/2015.
 * <p/>
 */

/**
 * This view show the user the result of the search from the server.
 */
(function ($) {
    $.widget("cg.ItemDialogView", $.cg.BasicView, {
        options: {
            //default styling properties
            style: {
                background: "white",
                height: "100%",
                width: "100%"
            },

            content: {
                data: null
            },

            draggable: false,

            resizable: false,

            /**
             * owner widget reference
             */
            ownerWidget: null,

            title: "Items",

            enableToolbar: false
        },

        /**
         * Render the view on the screen.
         */
        renderViewContent: function(){
            if (this.options.content.data === null){
                throw "No items int view data";
            }
            var items = this.options.content.data;
            if (items.length > 0) {
                var context = {
                    id: this.getId(),
                    items: this.options.content.data,
                    item_name: items[0].item_name
                };
                var template = new cg.HTMLTemplate(cg.PRICELI_HOST + "/bookmarklet/js/views/web/item_dialog_view/htmls/ItemsDialogView.html",
                    this.contentElement[0],
                    context, cg.PRICELI_HOST + "/bookmarklet/js/views/web/item_dialog_view/ItemsDialogView.css", false);
                template.render();
            } else {
                this.showNoItemsFromServerMessage();
            }
        },

        /**
         * Show no items received message.
         */
        showNoItemsFromServerMessage: function(){
            var template = new cg.HTMLTemplate(cg.PRICELI_HOST + "/bookmarklet/js/views/web/item_dialog_view/htmls/NoItemsReceived.html",
                this.contentElement[0],
                {}, cg.PRICELI_HOST + "/bookmarklet/js/views/web/item_dialog_view/ItemsDialogView.css", false);
            template.render();
        },

        /**
         * Create a toolbar for this view
         */
        setToolbar: function(){
            var toolbarDiv = $(document.createElement('div'));
            toolbarDiv.addClass("toolbar");
            var that = this;
            var closeBtn = $(document.createElement('div'));
            closeBtn.addClass("item_dialog_close_btn");
            closeBtn.button({
                icons: {
                    primary: "ui-icon-closethick"
                }
            });
            closeBtn.click(function(){
                var result = confirm("Are you sure You want to close the view?");
                if (result){
                    var jqEm = that.widget();
                    jqEm.remove();
                }
            });
            toolbarDiv.append(closeBtn);
            this.element.prepend(toolbarDiv);
        }
    })
})(cg.jQuery);
