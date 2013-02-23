var sub = Y.Lang.sub;

/**
  The YUI Flicker Carousel Gallery allows you to easily include a gallery
  of Flicker photo sets on the page which open uppon click

  @class FlickrCarouselGallery
  @module gallery-flickr-carousel-gallery
  @constructor
*/
Y.FlickrCarouselGallery = new Y.Base.create('gallery-flickr-carousel-gallery', Y.Base, [], {

    /**
      Base Flickr api url for rest requests of photoset info

      @property _flickrPhotoSetInfoUrl
      @protected
      @type string
    */
    _flickrPhotoSetInfoUrl: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={apiKey}&photoset_id={photosetId}&extras=url_q&format=json',

    /**
      Wrapper for the photo grid

      @property photoGridTemplate
      @public
      @type string
     */
    photoGridTemplate: '<div/>',

    /**
      Photo and title template

      @property photoGridItemTemplate
      @public
      @type string
     */
    photoGridItemTemplate: '<div class="galleryPhoto"><img src="{imgSrc}" width="{width}" height="{width}"/><h3>{title}</h3></div>',

    /**
      Fetches the carousel data and builds the display

      @method initializer
      @private
    */
    initializer: function() {
        Y.log('initializer', 'info', this.name);

        this.fetchPhotoSetInfo(this.get('apiKey'), this.get('photosetIds'));
    },

    /**
      Grabs the photo set basic info data from Flickr

      @method fetchPhotoSetInfo
      @param apiKey {string} flickr API Key
      @param photosetIds {array} flickr photoset Ids
      @public
     */
    fetchPhotoSetInfo: function(apiKey, photosetIds) {
        Y.log('fetchGalleryImages', 'info', this.name);

        Y.Array.each(photosetIds, function(photosetId){
            this.makeFlickrAPICall(
                this._flickrPhotoSetInfoUrl,
                {
                    apiKey: apiKey,
                    photosetId: photosetId
                },
                this._handlePhotoSetInfoResponse
            );
        }, this);
    },

    /**
      Makes a call to the flickr api based on the passed in params

      @method makeFlickrAPICall
      @param url {string} url template to make the API request
      @param config {object} object containg params to substitute in the URL
      @param callback {function} function to call on response
      @public
    */
    makeFlickrAPICall: function(url, config, callback) {
        Y.log('makeFlickrAPICall', 'info', this.name);
            url = sub(url, config);
            url += "&jsoncallback={callback}";
            Y.jsonp(url, Y.bind(callback, this));
    },

    /**
      Adds the supplied photo set primary image to the gallery

      @method addThumbnailToDOM
      @param index {integer} photoset data location in sets attribute array
      @public
    */
    addThumbnailToDOM: function(index) {
        Y.log('addThumbnailToDOM', 'info', this.name);
    },


    /**
      Handles the response from the flickr API request

      @method _handlePhotoSetInfoResponse
      @param response {object} JSON representation of the response
      @private
    */
    _handlePhotoSetInfoResponse: function(response) {
        Y.log('_handlePhotoSetInfoResponse', 'info', this.name);

        this.addThumbnailToDOM(this.get('sets').push(response));
    },

    /**
      Binds the navigate event listeners

      @method bindUI
      @private
    */
    bindUI: function() {
        Y.log('bindUI', 'info', this.name);

        var events = this.get('_events'),
            boundingBox = this.get('boundingBox');
        events.push(boundingBox.delegate('click', this.showGalleryPhoto, '.galleryPhoto', this));
    },

    /**
      Detaches events attached during instantiation

      @method destructor
      @private
    */
    destructor: function() {
        Y.log('destructor', 'info', this.name);
        this.get('_events').each(function(event) {
            event.detach();
        });
    }

}, {
    ATTRS: {

        /**
          The node to render the gallery into

          @attribute galleryNode
          @public
          @type Y.Node
        */
        galleryNode: {},

        /**
          The node to render the carousels into

          @attribute carouselNode
          @public
          @type Y.Node
        */
        carouselNode: {},

        /**
          Flickr api key

          @attribute apiKey
          @public
          @type string
        */
        apiKey: {},

        /**
          A Collection of Flickr photoset ids

          @attribute photosetIds
          @public
          @type array
        */
        photosetIds: [],

        /**
          Configuration values to pass to the carousels

          @attribute carouselConfig
          @public
          @type object
        */
        carouselConfig: {
            value: {}
        },

        /**
          sets data array

          @attribute sets
          @public
          @type array
          @default []
        */
        sets: {
            value: []
        },

        /**
          Collection of event handlers to detach on destroy

          @attribute _events
          @private
          @default []
          @type array
        */
        _events: {
            value: []
        }

    }
});
