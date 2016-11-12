import { GenreInfo, GenreGroup } from '../library.models';
import {GenreItem} from './genre.item';
export class GenreList implements GenreGroup {

    expanded = true;
    checked = false;
    genres: GenreItem[] = [];
    constructor(public details: GenreInfo, kids: Array<GenreInfo>) {
        this.genres = kids.map(genre => new GenreItem(genre));
    }
    toggle() {
        this.expanded = !this.expanded;
    }
    check() {
        this.checked = !this.checked;
    }
}
