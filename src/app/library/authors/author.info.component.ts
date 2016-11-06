import {Component, Input} from '@angular/core';
import { Author } from '../library.models';
@Component({
    moduleId: module.id,
    selector: "author-info",
    template: `
        <h3>{{fullName}}</h3>
        <h5>Available books: {{booksCount}}</h5>
    `
})
export class AuthorInfoComponent {
    @Input() author: Author = null;
    @Input() booksCount: number = 0;
    constructor() {
    }
    get fullName(): string {
        return (this.author) ? this.author.fullname : "";
    }
}
