System.register(['@angular/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, Observable_1;
    var MockXHRBackend;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            MockXHRBackend = (function () {
                function MockXHRBackend() {
                    this._mediaItems = [
                        {
                            id: 1,
                            name: "House of Cards",
                            medium: "Series",
                            category: "Drama",
                            year: 2013,
                            watchedOn: 1489349983000,
                            rating: '5',
                            isFavorite: true
                        },
                        {
                            id: 2,
                            name: "Anchorman: The Legend of Ron Burgundy",
                            medium: "Movies",
                            category: "Comedy",
                            year: 2004,
                            watchedOn: 1470082783000,
                            rating: '4',
                            isFavorite: false
                        }, {
                            id: 3,
                            name: "Batman v Superman: Dawn of Justice",
                            medium: "Movies",
                            category: "Action",
                            year: 2016,
                            watchedOn: 1491077983000,
                            rating: '2',
                            isFavorite: false
                        }, {
                            id: 4,
                            name: "Vice",
                            medium: "Series",
                            category: "Documentary",
                            year: null,
                            watchedOn: 1508185183000,
                            rating: '5',
                            isFavorite: true
                        }, {
                            id: 5,
                            name: "Silence",
                            medium: "Movies",
                            category: "Drama",
                            year: 2016,
                            watchedOn: 1646169583000,
                            rating: '1',
                            isFavorite: false
                        }, {
                            id: 6,
                            name: "The Godfather",
                            medium: "Movies",
                            category: "Drama",
                            year: 1972,
                            watchedOn: 1646169583000,
                            rating: '5',
                            isFavorite: false
                        }, {
                            id: 7,
                            name: "Breaking Bad",
                            medium: "Series",
                            category: "Drama",
                            year: 2008,
                            watchedOn: 1646169583000,
                            rating: '5',
                            isFavorite: true
                        }, {
                            id: 8,
                            name: "Sons of Anarchy",
                            medium: "Series",
                            category: "Drama",
                            year: 2008,
                            watchedOn: 1646169583000,
                            rating: '4',
                            isFavorite: false
                        }, {
                            id: 7,
                            name: "Fight Club",
                            medium: "Movies",
                            category: "Action",
                            year: 1999,
                            watchedOn: 1646169583000,
                            rating: '5',
                            isFavorite: true
                        },
                        {
                            id: 8,
                            name: "The Other Guys",
                            medium: "Movies",
                            category: "Comedy",
                            year: 2010,
                            watchedOn: 1470082783000,
                            rating: '5',
                            isFavorite: true
                        }
                    ];
                }
                MockXHRBackend.prototype.createConnection = function (request) {
                    var _this = this;
                    var response = new Observable_1.Observable(function (responseObserver) {
                        var responseData;
                        var responseOptions;
                        switch (request.method) {
                            case http_1.RequestMethod.Get:
                                if (request.url.indexOf('mediaitems?medium=') >= 0 || request.url === 'mediaitems') {
                                    var medium;
                                    if (request.url.indexOf('?') >= 0) {
                                        medium = request.url.split('=')[1];
                                        if (medium === 'undefined')
                                            medium = '';
                                    }
                                    var mediaItems;
                                    if (medium) {
                                        mediaItems = _this._mediaItems.filter(function (mediaItem) { return mediaItem.medium === medium; });
                                    }
                                    else {
                                        mediaItems = _this._mediaItems;
                                    }
                                    responseOptions = new http_1.ResponseOptions({
                                        body: { mediaItems: JSON.parse(JSON.stringify(mediaItems)) },
                                        status: 200
                                    });
                                }
                                else {
                                    var id = parseInt(request.url.split('/')[1]);
                                    mediaItems = _this._mediaItems.filter(function (mediaItem) { return mediaItem.id === id; });
                                    responseOptions = new http_1.ResponseOptions({
                                        body: JSON.parse(JSON.stringify(mediaItems[0])),
                                        status: 200
                                    });
                                }
                                break;
                            case http_1.RequestMethod.Post:
                                var mediaItem = JSON.parse(request.text().toString());
                                mediaItem.id = _this._getNewId();
                                _this._mediaItems.push(mediaItem);
                                responseOptions = new http_1.ResponseOptions({ status: 201 });
                                break;
                            case http_1.RequestMethod.Delete:
                                var id = parseInt(request.url.split('/')[1]);
                                _this._deleteMediaItem(id);
                                responseOptions = new http_1.ResponseOptions({ status: 200 });
                        }
                        var responseObject = new http_1.Response(responseOptions);
                        responseObserver.next(responseObject);
                        responseObserver.complete();
                        return function () { };
                    });
                    return { response: response };
                };
                MockXHRBackend.prototype._deleteMediaItem = function (id) {
                    var mediaItem = this._mediaItems.find(function (mediaItem) { return mediaItem.id === id; });
                    var index = this._mediaItems.indexOf(mediaItem);
                    if (index >= 0) {
                        this._mediaItems.splice(index, 1);
                    }
                };
                MockXHRBackend.prototype._getNewId = function () {
                    if (this._mediaItems.length > 0) {
                        return Math.max.apply(Math, this._mediaItems.map(function (mediaItem) { return mediaItem.id; })) + 1;
                    }
                };
                return MockXHRBackend;
            }());
            exports_1("MockXHRBackend", MockXHRBackend);
        }
    }
});
//# sourceMappingURL=mock-xhr-backend.js.map