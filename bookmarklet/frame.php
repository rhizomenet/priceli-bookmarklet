<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="UTF-8">
</head>
<body>
    <div id="loading-div"></div>
</body>
<script>
    function loadCG() {
        window.CHECK_CG_CONFLICT = false; //prevent the check of cg button in the parent site (cause CORSS errors)
        window.cg = {
            DEV_MODE: "<?php echo $_REQUEST["DEV"]?>",
            STAGE: true,
            draggableButton: true,
            SSE_NONE: false,
            SSE_DELAY: 5000,
            HTML_TEMPLATE_DOM_CACHE: true,
            PRICELI_HOST: "http://www.priceli.co.il/",
            bookmarkletSKU: <?php echo $_REQUEST["SKU"]?>,
            bookmarkletLoaderId: "loading-div",
            XDEBUG_SESSION_START: 13506,
            priceliClientId: "<?php echo isset($_REQUEST["clientId"]) ? $_REQUEST["clientId"] : 'default' ?>",
            priceliClientName: "<?php echo isset($_REQUEST["clientName"]) ? $_REQUEST["clientName"] : 'default' ?>"
        };

        var cgServer = "//api.contentglass.com";
        if (window.cg.DEV_MODE === 'true') {
            window.cg.PRICELI_HOST = "http://local.priceli.co.il/";
            cgServer = "//local.contentglass.com";
        }
        var div = document.getElementById(window.cg.bookmarkletLoaderId);
        div.style.backgroundImage = "url('" + window.cg.PRICELI_HOST + "/bookmarklet/images/loader.gif')";
        div.style.margin = "auto";
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.position = "absolute";
        div.style.margin = "-50px 0 0 -50px";
        div.style.top = "50%";
        div.style.left = "50%";

        window.cgAsyncReady = function () {
            CGAPI.loadApp({
                type: "basic-app",
                app_manifest: "/app_manifest.js",
                manifest_path: "window.cg.PriceliBookmarkletApplicationManifest",
                document_root: window.cg.PRICELI_HOST + "/bookmarklet/",
                container: "#content-glass-priceli-wrapper"
            }, function onAppLoad(application) {
                application.init();
            });
        };

        var sessId = sessionStorage.getItem("cg_sess_id");
        if (typeof sessId === "undefined" || sessId === null || sessId === "undefined") {
            sessId = "";
        } else {
            sessId = "&RHZ_SESSION_ID=" + sessId;
        }

        var port = null;
        var fjs = document.getElementsByTagName('script')[0];

        var wrapper = document.createElement('div');
        wrapper.setAttribute("id", 'content-glass-priceli-wrapper');
        document.body.appendChild(wrapper);

        var js = document.createElement("script");
        js.id = "cg-api";
        js.type = 'text/javascript';
        js.async = true;
        js.src = cgServer + (port != null ? ":" + port : "")
            + "/server_api/s1/application/load/cg_api?app_id=55a2300cab598&DEV=<?php echo $_REQUEST["DEV"]?>" + sessId;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(js, s);
    }
    loadCG();
</script>
</html>
