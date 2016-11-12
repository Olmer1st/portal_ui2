import { GenreInfo, GenreGroup } from '../library.models';
export class GenreItem implements GenreInfo {
    checked = false;
    public gid: number;
    public code: string;
    public gdesc: string;
    public edesc: string;
    constructor(public genre: GenreInfo) {
        this.gid = genre.gid;
        this.code = genre.code;
        this.gdesc = genre.gdesc;
        this.edesc = genre.edesc;
    }
    check() {
        this.checked = !this.checked;
    }
}
