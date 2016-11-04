import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {LibraryService} from './library.service';
import {ToolBarButton, SideBarState} from './library.models';
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
        console.log(lang);
    }
    onSideBarStateChanged(state: SideBarState): void {
        this.mainWidgetSize = (state === SideBarState.Opened) ? "70%" : "100%";
        this._sideBarState = state;
    }
    ngOnInit(): void {
        this._onLanguageChangedSubscribtion = EmitterService
            .get<string>("onLanguageChanged")
            .subscribe(event => this.onLanguageChanged(event));
    }

    ngOnDestroy(): void {
        this._onLanguageChangedSubscribtion.unsubscribe();
    }
}
