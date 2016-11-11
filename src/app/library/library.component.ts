import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {LibraryService} from './library.service';
import {ToolBarButton, SideBarState, Author, TreeInfo, GenreGroup} from './library.models';
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
    treeInfo: TreeInfo = {
        totalIds: 0,
        totalBooks: 0,
        treeData: [],
        maxLevel: -1
    };
    language: string = "ru";
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
    onAuthorClicked(author: Author): void {
        this.author = author;
        this.loadBooks();
    }
    private loadGenres(): void {
        this._libraryService.getGenres()
            .subscribe(groups => this.genreGroups = groups, err => console.error(err));
    }
    private loadBooks(): void {
        if (!this.author) {
            return;
        }
        this._libraryService.getNodesByAuthorId(this.author.aid, this.language)
            .subscribe(treeInfo => {
                //console.log(booksInfo);
                this.treeInfo = treeInfo;
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
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
