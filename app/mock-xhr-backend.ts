import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf('mediaitems?medium=') >= 0 || request.url === 'mediaitems') {
            var medium;
            if (request.url.indexOf('?') >= 0) {
              medium = request.url.split('=')[1];
              if (medium === 'undefined') medium = '';
            }
            var mediaItems;
            if (medium) {
              mediaItems = this._mediaItems.filter(mediaItem => mediaItem.medium === medium);
            } else {
              mediaItems = this._mediaItems;
            }
            responseOptions = new ResponseOptions({
              body: { mediaItems: JSON.parse(JSON.stringify(mediaItems)) },
              status: 200
            });
          } else {
            var id = parseInt(request.url.split('/')[1]);
            mediaItems = this._mediaItems.filter(mediaItem => mediaItem.id === id);
            responseOptions = new ResponseOptions({
              body: JSON.parse(JSON.stringify(mediaItems[0])),
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          var mediaItem = JSON.parse(request.text().toString());
          mediaItem.id = this._getNewId();
          this._mediaItems.push(mediaItem);
          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteMediaItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  _deleteMediaItem(id) {
    var mediaItem = this._mediaItems.find(mediaItem => mediaItem.id === id);
    var index = this._mediaItems.indexOf(mediaItem);
    if (index >= 0) {
      this._mediaItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._mediaItems.length > 0) {
      return Math.max.apply(Math, this._mediaItems.map(mediaItem => mediaItem.id)) + 1;
    }
  }

  _mediaItems = [
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