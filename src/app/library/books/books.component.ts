import {Component, OnDestroy, EventEmitter, Input} from '@angular/core';
import {EmitterService} from '../../shared/emitter.service';
import {TreeInfo, Node, BookInfo} from '../library.models';
import { TooltipModule } from 'ng2-bootstrap/components/tooltip';

@Component({
    moduleId: module.id,
    selector: "books-section",
    templateUrl: "books.component.html",
    styleUrls: ["books.component.css"]
})
export class BooksComponent {
    @Input() treeData: Node[] = [];
    constructor() {

    }
}
