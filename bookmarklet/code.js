javascript:(function(){
    var jsEm = document.createElement('script');
    document.body.appendChild(jsEm);
    jsEm.onload = function() {
        if(pricelimklt == null) {
            var pricelimklt = new PriceliBookmarklet();
        }
    };
    jsEm.onreadystatechange = function() {
        if(pricelimklt == null) {
            var pricelimklt = new PriceliBookmarklet();
        }
    };
    jsEm.setAttribute('src', 'http://www.priceli.co.il/bookmarklet/Bookmarklet.php?token=' + Math.random());
}());
