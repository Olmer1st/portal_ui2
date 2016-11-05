import {Component, OnDestroy, EventEmitter, Input} from '@angular/core';
import {EmitterService} from '../../shared/emitter.service';
import {Node, BookInfo} from '../library.models';

@Component({
    moduleId: module.id,
    selector: "books-section",
    templateUrl: "books.component.html",
    styleUrls: ["books.component.css"]
})
export class BooksComponent {
    @Input() books: BookInfo[] = [];
    constructor() {

    }
}
