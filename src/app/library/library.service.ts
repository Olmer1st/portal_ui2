import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Author, Node, TreeInfo , GenreGroup}  from './library.models';
import { APP_CONFIG, AppConfig } from '../portal/portal.providers';
import {Observable} from 'rxjs/Rx';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LibraryService {
    // Resolve HTTP using the constructor
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
        //console.log(config.title);
    }

    getAuthors(search: string): Observable<Author[]> {
        const url = this.config.apiRootUrl + "library/authors/search/" + search;
        // ...using get request
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }
    getNodesByAuthorId(aid: number, lang: string): Observable<TreeInfo> {
        const url = this.config.apiRootUrl + "library/books/author/" + aid + "/" + lang;
        // ...using get request
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }
    getLanguages(): Observable<string[]> {
        const url = this.config.apiRootUrl + "library/languages";
        // ...using get request
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    getGenres(): Observable<GenreGroup[]> {
        const url = this.config.apiRootUrl + "library/genres";
        // ...using get request
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
