import {Component, OnDestroy, OnChanges, SimpleChanges, EventEmitter, Input} from '@angular/core';
import {EmitterService} from '../../shared/emitter.service';
import {TreeInfo, Node, BookInfo, GenreGroup, GenreInfo} from '../library.models';
import { TooltipModule } from 'ng2-bootstrap/components/tooltip';
import {TreeNode} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "books-section",
    templateUrl: "books.component.html",
    styleUrls: ["books.component.css"]
})
export class BooksComponent implements OnChanges {
    selectedFiles: TreeNode[];
    files: TreeNode[] =
    [
        {
            "data": {
                "name": "Documents",
                "size": "75kb",
                "type": "Folder"
            },
            "children": [
                {
                    "data": {
                        "name": "Work",
                        "size": "55kb",
                        "type": "Folder"
                    },
                    "children": [
                        {
                            "data": {
                                "name": "Expenses.doc",
                                "size": "30kb",
                                "type": "Document"
                            }
                        },
                        {
                            "data": {
                                "name": "Resume.doc",
                                "size": "25kb",
                                "type": "Resume"
                            }
                        }
                    ]
                },
                {
                    "data": {
                        "name": "Home",
                        "size": "20kb",
                        "type": "Folder"
                    },
                    "children": [
                        {
                            "data": {
                                "name": "Invoices",
                                "size": "20kb",
                                "type": "Text"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "data": {
                "name": "Pictures",
                "size": "150kb",
                "type": "Folder"
            },
            "children": [
                {
                    "data": {
                        "name": "barcelona.jpg",
                        "size": "90kb",
                        "type": "Picture"
                    }
                },
                {
                    "data": {
                        "name": "primeui.png",
                        "size": "30kb",
                        "type": "Picture"
                    }
                },
                {
                    "data": {
                        "name": "optimus.jpg",
                        "size": "30kb",
                        "type": "Picture"
                    }
                }
            ]
        }
    ];
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
    nodeSelect(event) {
        console.log(event);
    }

    nodeUnselect(event) {
        console.log(event);
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
