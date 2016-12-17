import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { GenreGroup, GenreInfo, ToolBarButton} from '../library.models';
import { ActivityComponent} from '../activity.component';
import {LibraryService} from '../library.service';
import { Observable } from 'rxjs/Observable';
@Component({
    moduleId: module.id,
    selector: "advancedsearch-section",
    templateUrl: "advancedsearch.component.html",
    styleUrls: ["advancedsearch.component.css"] //,
})
export class AdvancedSearchComponent extends ActivityComponent implements OnInit {
    @Input() activity: ToolBarButton;
    @Input() genresData: GenreGroup[];
    selectedGenres: Array<number> = null;
    get genres(): Array<any> {
        let self = this;
        if (!self.genresData || !self.genresData.length) {
            return [];
        }

        let tmp = self.genresData.map(g => {
            let item = {
                text: g.details.gdesc,
                children: g.genres.reduce((arr, s) => {
                    if (!self.selectedGenres || !self.selectedGenres.length || self.selectedGenres.indexOf(s.gid) === -1) {
                        arr.push({ id: s.gid, text: s.gdesc });
                    }
                    return arr;
                }, [])
            };
            return item;
        });
        return tmp;
    }
    refreshValue(value: any): void {
        this.selectedGenres = value.map(s => s.id);
        console.log(this.selectedGenres);
    }

    removed(value: any): void {
        console.log('Removed value is: ', value);
        if (this.selectedGenres && this.selectedGenres.length) {
            this.selectedGenres.splice(value.id, 1);
        }
    }
    constructor(private _libraryService: LibraryService) {
        super();
    }

    ngOnInit(): void {
    }


}
