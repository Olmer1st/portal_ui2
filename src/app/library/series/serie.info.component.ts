import {Component, Input} from '@angular/core';
import { Serie } from '../library.models';
@Component({
    moduleId: module.id,
    selector: "serie-info",
    template: `
        <h3>{{fullName}}</h3>
        <h5>Available books: {{booksCount}}</h5>
    `
})
export class SerieInfoComponent {
    @Input() serie: Serie = null;
    @Input() booksCount: number = 0;
    constructor() {
    }
    get fullName(): string {
        return (this.serie) ? this.serie.serie_name : "";
    }
}
