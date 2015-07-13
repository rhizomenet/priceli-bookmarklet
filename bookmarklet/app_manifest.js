/*
 * Copyright (c) 2009-2015 Rhizome Networks LTD All rights reserved.
 */

/**
 * This is a content glass application manifest.
 * Developers can create Content Glass application similar to this one.
 * This manifest tells the information the system need to create the application itself.
 * @type {{contentglass_app: boolean, s: *}}
 */
window.cg.PriceliBookmarkletApplicationManifest = {
    contentglass_app: true, // Boolean value that indiacte that this manifest is indeed a Content Glass application
    author: "Rhizome Networks LTD", //The author name
    provider_url: "http://www.rhizomenet.com",
    account_id: "1",  // The account Id of the developers
    singleton: true,
    app: {
        impl: "cg.PriceliBookmarkletApplication",
        options: {
            label: "Priceli"
        }
    },
    glass: {
        impl: "cg.WebsiteGlass",
        options: {},
        glass_parent_em_id: null,
        glass_em_id: null,
        allow_external_manifests:true //do this application allow the loading of more manifests that can extend the application usability
    },
    scripts: {
        //This are the files that are loaded when the application is in developers mode
        dev: {
            js: [
                {src: "/js/glass_manifest.js"},
                {src: cg.CG_HOST +  "/apps/web/website_tools/button/js/CGButton.js"},
                {src: "/js/PriceliBookmarkletApplication.js"}

            ],
            css: [
                {src: "/css/PriceliBookmarkletApplication.css"}
            ]
        },
        //This area the files that are loaded when the application is in production mode
        prod: {
            js: [
                {src: "/js/PriceliBookmarklet.min.js"}
            ],
            css: [
                {src: "/css/PriceliBookmarkletApplication.css"}
            ]
        }
    }
};
