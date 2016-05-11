Google Image Search Web-client
===

A bare-bones [Backbone](http://backbonejs.org/) web application showcasing the [Google Image Search API](https://developers.google.com/image-search/).

This is a web app equivalent of an [Android prototype I built](https://github.com/Trindaz/android-google-image-search) using the same Google Image Search API.

Demo
---

* Live demo online: http://trindaz.github.io/google-image-search/.
* Source code on Github: https://github.com/Trindaz/google-image-search

Screenshots
---

![Google Image Search Web-client (Screenshot 1)](https://raw.githubusercontent.com/Trindaz/google-image-search/2efb29f1ed255b6e0b4f6e7b4d2877a032d05b38/docs/Screen%20Shot%202014-04-29%20at%204.44.49%20pm.png "Google Image Search Web-client (Screenshot 1)")

Installation
---

```bash
git clone https://github.com/Trindaz/google-image-search.git
```

Usage
---

```bash
open index.html
```

Implementation Notes
---

* Single page web application, everything done in browser
* async's queue to implement parallel requests to API
* Supports Insta-search (results as you type)
* Graceful ordering (results arrive one by one in order, flowing across/down the page) achieved by using "OrderingBuffer"
* The name OrderingBuffer comes from a customized data structure with the property of having objects given to the callback in order, *not* of storing an internally sorted buffer of results.

### OrderingBuffer

OrderingBuffer is a simple solution to the common concern of maintaining the order of items in a list across multiple XHR requests. Who knows how many messy implementations there are out there with various hacks for ensuring this?

OrderingBuffer is great because by adding a custom `isNext` function to a standard array you get a no-fuss data structure for easy re-use when restoring a list from multiple XHR requests.

In the case of Google Image Search API usage, `isNext` is defined as:

```javascript
function isNext(a, b){
    if(a==null && b.label==1 || a && b.label== a.label+1){
        return true;
    }
}
```

Where `a` was the previous item popped from the OrderingBuffer and `b` is any item remaining in the buffer that has yet to be popped.

For Google Image Search Web-client an item is 'next' if it's the first result (as ordered by search result relevance ranking) or if it has a ranking exactly 1 greater than the last popped result.

OrderingBuffer is implemented at https://github.com/Trindaz/google-image-search/blob/master/scripts/utils.js
