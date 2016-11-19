import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {SideBarState, ToolBarButton } from '../library.models';
const sideBarIconSources = {
    Closed: "/assets/media/list-view-24.png",
    Opened: "/assets/media/side-right-view-24.png"
};
@Component({
    moduleId: module.id,
    selector: "toolbar-section",
    templateUrl: "toolbar.component.html"
})
export class ToolbarComponent implements OnInit {
    sideBarState: SideBarState = SideBarState.Opened;
    toolBarButtons: ToolBarButton[] = [
        { key: "authors", isActive: true, customInfo: {} },
        { key: "genres", isActive: false, customInfo: {} },
        { key: "series", isActive: false, customInfo: {} },
        { key: "search", isActive: false, customInfo: {} }
    ];
    @Output() onActivityChanged = new EventEmitter<ToolBarButton>();
    @Output() onSideBarStateChanged = new EventEmitter<SideBarState>();
    constructor() {
    }
    get sideBarIconSource(): string {
        return (this.sideBarState === SideBarState.Opened) ? sideBarIconSources.Closed : sideBarIconSources.Opened;
    }
    changeSideBarState(): void {
        this.sideBarState = (this.sideBarState === SideBarState.Opened) ? SideBarState.Closed : SideBarState.Opened;
        this.onSideBarStateChanged.emit(this.sideBarState);
    }
    changeActivity(button: ToolBarButton): void {
        button.isActive = true;
        this.onActivityChanged.emit(button);
        this.toolBarButtons.forEach((b) => {
            if (b.key !== button.key) {
                b.isActive = false;
            }
        });
    }
    ngOnInit(): void {
        this.onActivityChanged.emit(this.toolBarButtons[0]);
        this.onSideBarStateChanged.emit(this.sideBarState);
    }
}
