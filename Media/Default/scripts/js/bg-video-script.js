var HeaderVideo = (function ($, document) {

    var settings = {
        container: $('.header-video'),
        video: '#video',
        header: $('.header-video-media'),
        //videoCloseTrigger: $('#video-close-trigger'),
        teaserVideo: $('#teaser-video'),
        autoPlayVideo: false
    };

    var init = function(options){
        settings = $.extend(settings, options);
        getVideoDetails();
        setFluidContainer();
        
        if(videoDetails.teaser) {
            appendTeaserVideo();
        }

    };


    var getVideoDetails = function() {
        //Get all the data attributes from the HTML container and return them as an object for easy data retrieval
        videoDetails = {
            id: settings.header.attr('data-video-src'),
            teaser: settings.header.attr('data-teaser-source'),
            videoHeight: settings.header.attr('data-video-height'),
            videoWidth: settings.header.attr('data-video-width')
        };
        return videoDetails;
    };

    var setFluidContainer = function () {
        settings.container.data('aspectRatio', videoDetails.videoHeight / videoDetails.videoWidth);

        $(window).resize(function() {
            var calcWidth = $(window).width();
          
            var winWidth = calcWidth < 1250 ? 1250 : $(window).width(),
                winHeight = $(window).height();
            var calcHeight = winWidth * settings.container.data('aspectRatio');
            var setHeight = calcHeight < 540 ? 540 : calcHeight;
            settings.container
                .width(Math.ceil(winWidth)) //Round up to the nearest pixel value to prevent breaking of layout
                .height(Math.ceil(setHeight)); //Set the videos aspect ratio, see https://css-tricks.com/fluid-width-youtube-videos/

            if(winHeight < settings.container.height()) {
                settings.container
                    .width(Math.ceil(winWidth))
                    .height(Math.ceil(winHeight));
            }

        }).trigger('resize'); //Trigger resize to force it to run on page load as well

    };

    var appendTeaserVideo = function() {
        if(Modernizr.video && !isMobile()) {
            var source = videoDetails.teaser,
                html = '<video autoplay="true" loop="loop" muted id="teaser-video" class="teaser-video"><source src="'+source+'.mp4" type="video/mp4"><source src="'+source+'.ogv" type="video/ogg"></video>';
            var css = '<style type="text/css">.video{overflow: hidden; height: inherit; margin: 0; padding: 0;}.header-video{position: relative; overflow: hidden; width: 100%; max-height: 540px;}video{position: absolute; top: 0; left: 0; z-index: 10;}.video-content{z-index: 20;}.teaser-video{height: auto; width: 100%;}</style>';
            settings.container.append(html);
        }
    };

    var isMobile = function () {
        //A super basic way of detecting mobile devices. Should be extended to a more
        //fool proof way in a production enviroment.
        return Modernizr.touch;
    }

    return {
        init: init
    };
    
})(jQuery, document);
