import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {LibraryService} from './library.service';
import {ToolBarButton, SideBarState, Author, TreeInfo, GenreGroup, GenreInfo, Serie} from './library.models';
import {EmitterService} from '../shared/emitter.service';

@Component({
    moduleId: module.id,
    selector: "library-section",
    templateUrl: "library.component.html",
    styleUrls: ['library.component.css']
})
export class LibraryComponent implements OnDestroy, OnInit {
    private _sideBarState: SideBarState = SideBarState.Disabled;
    mainWidgetSize: string = "70%";
    currentActivity: ToolBarButton = null;
    genreGroups: GenreGroup[] = [];
    author: Author = null;
    genre: GenreInfo = null;
    serie: Serie = null;
    treeInfo: TreeInfo = {
        totalIds: 0,
        totalBooks: 0,
        treeData: [],
        maxLevel: -1
    };
    language: string = "ru";
    loadingData: boolean = false;
    private _onLanguageChangedSubscribtion: any = null;
    constructor(private _libraryService: LibraryService) {
    }
    get isSideBarStateOpen(): boolean {
        return this._sideBarState === SideBarState.Opened;
    }
    get currentActivityKey(): string {
        return (this.currentActivity) ? this.currentActivity.key : "";
    }
    onActivityChanged(button: ToolBarButton): void {
        this.currentActivity = button;
    }
    onLanguageChanged(lang: string): void {
        this.language = lang;
        this.loadBooks();
    }
    onSideBarStateChanged(state: SideBarState): void {
        this.mainWidgetSize = (state === SideBarState.Opened) ? "70%" : "100%";
        this._sideBarState = state;
    }
    onGenreClicked(genre: GenreInfo): void {
        this.genre = genre;
        this.loadBooks();
    }
    onAuthorClicked(author: Author): void {
        this.author = author;
        this.loadBooks();
    }
    onSerieClicked(serie: Serie): void {
        this.serie = serie;
        this.loadBooks();
    }
    private loadGenres(): void {
        this._libraryService.getGenres()
            .subscribe(groups => this.genreGroups = groups, err => console.error(err));
    }
    private loadBooks(): void {
        switch (this.currentActivityKey) {
            case "authors":
                if (!this.author) {
                    return;
                }
                this.loadingData = true;
                this._libraryService.getNodesByAuthorId(this.author.aid, this.language)
                    .subscribe(treeInfo => {
                        //console.log(booksInfo);
                        this.treeInfo = treeInfo;
                        this.loadingData = false;
                    }, //Bind to view
                    err => {
                        // Log errors if any
                        console.log(err);
                        this.loadingData = false;
                    });
                break;
            case "series":
                if (!this.serie) {
                    return;
                }
                this.loadingData = true;
                this._libraryService.getNodesBySerieId(this.serie.sid, this.language)
                    .subscribe(treeInfo => {
                        //console.log(booksInfo);
                        this.treeInfo = treeInfo;
                        this.loadingData = false;
                    }, //Bind to view
                    err => {
                        // Log errors if any
                        console.log(err);
                        this.loadingData = false;
                    });
                break;
            case "genres":
                if (!this.genre) {
                    return;
                }
                this.loadingData = true;
                this._libraryService.getNodesByGenreCode(this.genre.code, this.language)
                    .subscribe(treeInfo => {
                        //console.log(booksInfo);
                        this.treeInfo = treeInfo;
                        this.loadingData = false;
                    }, //Bind to view
                    err => {
                        // Log errors if any
                        console.log(err);
                        this.loadingData = false;
                    });
                break;
            default:
                this.loadingData = false;
        }


    }
    ngOnInit(): void {
        this._onLanguageChangedSubscribtion = EmitterService
            .get<string>("onLanguageChanged")
            .subscribe(event => this.onLanguageChanged(event));
        this.loadGenres();
    }

    ngOnDestroy(): void {
        this._onLanguageChangedSubscribtion && this._onLanguageChangedSubscribtion.unsubscribe();
    }
}
