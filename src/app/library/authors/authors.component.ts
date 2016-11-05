import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { Author, ToolBarButton } from '../library.models';
import { ActivityComponent} from '../activity.component';
import {LibraryService} from '../library.service';
import { Observable } from 'rxjs/Observable';
@Component({
    moduleId: module.id,
    selector: "authors-section",
    templateUrl: "authors.component.html",
    styleUrls: ["authors.component.css"]
})
export class AuthorsComponent extends ActivityComponent implements OnInit {
    @Input() activity: ToolBarButton;
    authors: Author[];
    selectedAuthor: Author = null;
    get searchParam(): string {
        return this.getInfoFromActivity<string>("searchParam", "");
    }
    @Output() onAuthorClicked = new EventEmitter<Author>();
    constructor(private _libraryService: LibraryService) {
        super();
    }
    onSearchClicked(searchParam: string): void {
        this.setInfoForActivity("searchParam", searchParam);
        this._libraryService.getAuthors(searchParam)
            .subscribe(authors => {
                this.authors = authors;
                this.setInfoForActivity<Author[]>("authors", authors);
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }
    onClearClicked(): void {
        this.authors = [];
        this.setInfoForActivity<string>("searchParam", "");
        this.setInfoForActivity<Author[]>("authors", []);
    }

    authorClick(author: Author): void {
        this.selectedAuthor = author;
        this.onAuthorClicked.emit(author);
    }
    ngOnInit(): void {
        this.authors = this.getInfoFromActivity<Author[]>("authors", []);
    }

}
