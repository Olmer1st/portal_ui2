import {Component, Output, Input, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { GenreInfo, ToolBarButton, GenreGroup } from '../library.models';
import { ActivityComponent} from '../activity.component';
import {LibraryService} from '../library.service';
import { Observable } from 'rxjs/Observable';
import {GenreList} from './genre.group';
@Component({
    moduleId: module.id,
    selector: "genres-section",
    templateUrl: "genres.component.html",
    styleUrls: ["genres.component.css"]
})
export class GenresComponent extends ActivityComponent implements OnChanges {
    @Input() activity: ToolBarButton;
    @Input() genresData: GenreGroup[];
    @Input() filterGenre: string = "";
    @Input() multiSelect: boolean = false;
    genres: GenreList[] = [];
    selectedGenre: GenreInfo = null;
    @Output() onGenreClicked = new EventEmitter<GenreInfo>();
    constructor(private _libraryService: LibraryService) {
        super();
    }

    genreClick(genre: GenreInfo): void {
        this.selectedGenre = genre;
        this.onGenreClicked.emit(genre);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        let propgenresData = changes["genresData"];
        if (propgenresData && propgenresData.currentValue && propgenresData.currentValue.length) {
            this.genres = this.genresData.map(group => new GenreList(group.details, group.genres));
        }

    }

}
