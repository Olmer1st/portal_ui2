import {Component, Input} from '@angular/core';
import { Author } from '../library.models';
@Component({
    moduleId: module.id,
    selector: "author-info",
    template: `
        <h3>{{fullName}}</h3>
    `
})
export class AuthorInfoComponent {
    @Input() author: Author = null;

    constructor() {
    }
    get fullName(): string {
        return (this.author) ? this.author.fullname : "";
    }
}
