YUI Flickr Carousel Gallery
===========================

The YUI Flickr Carousel is designed to allow you to easily include a flickr photo set in a photo carousel on your website. It extends Y.ScrollView but disables the flick and drag gestures by default in favour of click-to-advance and auto-advance navigation.

Notes
-----
*

Dependencies
------------
*   gallery-flicker-carousel
*   jsonp
*   event
*   base-create
*   base

Instantiation
-------------
```javascript
new Y.FlickrCarouselGallery({
    galleryNode: Y.one('.gallery-node'),
    carouselNode: Y.one('.carousel-node'),
    apiKey: 'abc123',
    photosetIds: [
        'abc123',
        'abc123',
        'abc123'
    ],
    carouselConfig: {
        showDescription: true,
        autoAdvance: true,
        startDelay: 3000,
        advanceDelay: 3000,
        width: '500px'
    },
});
```

To Do
-----
*

Feature request, bug reports and pull requests welcome!
