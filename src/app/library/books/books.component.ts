import {Component, OnDestroy, OnChanges, SimpleChanges, EventEmitter, Input} from '@angular/core';
import {EmitterService} from '../../shared/emitter.service';
import {TreeInfo, Node, BookInfo, GenreGroup, GenreInfo} from '../library.models';
import { TooltipModule } from 'ng2-bootstrap/components/tooltip';

@Component({
    moduleId: module.id,
    selector: "books-section",
    templateUrl: "books.component.html",
    styleUrls: ["books.component.css"]
})
export class BooksComponent implements OnChanges {
    @Input() treeData: Node[] = [];
    @Input() maxLevel: number = -1;
    @Input() genresData: GenreGroup[] = [];
    private genresObject: any = {};
    constructor() {

    }
    get genres(): any {
        if (Object.keys(this.genresObject).length) {
            return this.genresObject;
        }
        return null;
    }
    private updateKids(hidden: boolean, parent: Node, level: number): void {
        this.treeData.forEach(node => {
            if (node.level === (level + 1) && node.parent === parent.id) {
                node.hidden = hidden;
            }
        });
    }
    collapseKids(parent: Node): void {
        let hidden = !parent.collapsed;
        let kidsCollapsibles = this.treeData.filter(node => {
            return node.type > 1 && node.parent === parent.id;
        });
        if (kidsCollapsibles && kidsCollapsibles.length) {
            kidsCollapsibles.forEach(node => {
                this.updateKids(hidden, node, node.level);
                node.hidden = node.collapsed = hidden;
            });
        } else {
            this.updateKids(hidden, parent, parent.level);
        }
        parent.collapsed = hidden;

        // let level = this.maxLevel - parent.level;
        // if(level){
        //
        // }
    }
    ngOnChanges(changes: SimpleChanges): void {
        let propgenresData = changes["genresData"];
        if (propgenresData && propgenresData.currentValue) {
            this.genresObject = this.genresData.reduce((obj, genreGroup) => {
                genreGroup.genres.forEach(genre => {
                    obj[genre.code] = genre;
                });
                return obj;
            }, {});
        }

    }
}
