/*
    This is the Glass manifest.  This file tells the system what are the properties of the glass needed to be created.
    For example: what social networks to be enabled, what libraries to be enabled and which layers needed to be enabled.
    For more information enter http://developers.contentglass.com.
 */
var name = "CGPriceliBookmarkletGlassManifest_" + new Date().getTime();
window.cg[name] = {
    mName: name,
    contentglass_manifest: true, //A must value if not present or not true the system will reject this manifest.
    author: "Rhizome Networks LTD", //The author name
    provider_url: "http://www.rhizomenet.com", //The author url
    account_id: "1", //The account id of the developer
    scripts: {
        //Which scripts need to be loaded in developer mode and which in production.
        //In most case production will be empty because all the files had been minified and was loaded at the earlier
        //stage in the Application manifest.
        dev: {
            js: [
                {src: "/js/lang/he.js"},
                {src: "/js/lang/en.js"},
                {src: "/js/widgets/PriceliBookmarkletWidgetLibrary.js"},
                {src: "/js/views/web/item_dialog_view/ItemsDialogView.js"},
                {src: "/js/views/web/PriceliWebViewsLibrary.js"}
            ]
        },
        prod: {
            js: []
        }
    },
    //Which widgets libraries need to be loaded.
    "widget_libraries": [
        {id: "rhz-basic", "name": "Basic", description: "Basic Sharing",
            "constructor": "cg.PriceliBookmarkletWidgetLibrary",
            "index": 100, version: "0.1", account_id: "1"}

    ],
    //Which view libraries need to be loaded.
    "view_libraries": [
        {id: cg.CGFinals.DEFAULT_VIEWS_LIB, "name": "web views", description: "Priceli web views",
            "constructor": "cg.PriceliWebViewsLibrary",
            "index": 1, version: "0.1", account_id: "1"}
    ],
    //Which layers should the glass enable. this can be some more known layers (page, domain, tld) or a custom created layer.
    "layers": [
        {layer_id: "domain", glass_id: "@domain", glass_type: "1.2", dimensions: {},
            condition: {not_or: ["isShowMarkersOnly"]}, visibility: {not_or: ["isShowPublicOnly"]}}
    ],

    //Which social account should be enable for the end user to be able to login with and share with.
    social_accounts : [
        {account_name:"default", provider_id:"google", provider_name:"google", "constructor": "cg.ServerSocialAccount"}
        ,{account_name:"default", provider_id:"google_plus", provider_name:"google_plus", "constructor": "cg.ServerSocialAccount"}
        ,{account_name:"default", provider_id:"instagram", provider_name:"instagram", "constructor": "cg.ServerSocialAccount"}
        ,{account_name:"default", provider_id:"twitter", provider_name:"twitter", "constructor": "cg.ServerSocialAccount"}
        ,{account_name:"default", provider_id:"facebook", provider_name:"facebook", "constructor": "cg.ServerSocialAccount"}

    ]
};




