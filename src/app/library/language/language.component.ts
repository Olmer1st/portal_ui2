import {Component, OnInit} from '@angular/core';
import {LibraryService} from '../library.service';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import {EmitterService} from '../../shared/emitter.service';

@Component({
    moduleId: module.id,
    selector: "language-selector",
    templateUrl: "language.component.html",
    styleUrls: ["language.component.css"]
})
export class LanguageComponent implements OnInit {
    selectedLanguage: string = "ru";
    languages: string[] = [];
    constructor(private _libraryService: LibraryService) {
    }
    selectLanguage(choice: string): void {
        this.selectedLanguage = choice;
        EmitterService.get<string>("onLanguageChanged").emit(this.selectedLanguage);
    }
    private loadLanguages(): void {
        this._libraryService.getLanguages()
            .subscribe(langs => this.languages = langs, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }
    ngOnInit(): void {
        this.loadLanguages();
        EmitterService.get<string>("onLanguageChanged").emit(this.selectedLanguage);
    }
}
