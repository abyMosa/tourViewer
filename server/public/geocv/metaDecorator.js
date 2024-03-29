(function () {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var label = urlParams.get('label');
    label = label && label.toUpperCase();
    var tour = urlParams.get('tour');
    var contentPath = urlParams.get('content-path');
    var imagePath = `${contentPath}${tour}/preview.jpg`;


    document.title = !label ? 'RowiLAB Viewer' : label + ' | RowiLAB Viewer';
    addMetaTag([{ key: 'property', value: 'og:type' }, { key: 'content', value: 'website' }]);
    addMetaTag([{ key: 'property', value: 'og:description' },]);
    addMetaTag([{ key: 'property', value: 'og:site_name' }, { key: 'content', value: 'RowiLAB Viewer' }]);

    addMetaTag([{ key: 'property', value: 'og:title' }, { key: 'content', value: label + ' | RowiLAB Viewer' }]);
    addMetaTag([{ key: 'property', value: 'og:image' }, { key: 'content', value: imagePath }]);
    addMetaTag([{ key: 'property', value: 'og:url' }, { key: 'content', value: window.location.href }]);


    addMetaTag([{ key: 'name', value: 'twitter:title' }, { key: 'content', value: label + ' | RowiLAB Viewer' }]);
    addMetaTag([{ key: 'name', value: 'twitter:image' }, { key: 'content', value: imagePath }]);
    addMetaTag([{ key: 'name', value: 'image' }, { key: 'content', value: imagePath }]);

    addMetaTag([{ key: 'name', value: 'twitter:card' }, { key: 'content', value: 'summary_large_image' }]);
    addMetaTag([{ key: 'name', value: 'twitter:description' },]);

    function addMetaTag(attrs) {
        var meta = document.createElement('meta');
        attrs.forEach(element => {
            meta.setAttribute(element.key, element.value);
        });
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
})()