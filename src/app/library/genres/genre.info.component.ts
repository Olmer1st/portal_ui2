import {Component, Input} from '@angular/core';
import { GenreInfo } from '../library.models';
@Component({
    moduleId: module.id,
    selector: "genre-info",
    template: `
        <h3>{{description}}</h3>
        <h5>Available books: {{booksCount}}</h5>
    `
})
export class GenreInfoComponent {
    @Input() genre: GenreInfo = null;
    @Input() booksCount: number = 0;
    constructor() {
    }
    get description(): string {
        return (this.genre) ? this.genre.gdesc : "";
    }
}
