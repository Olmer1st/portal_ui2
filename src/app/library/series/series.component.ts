import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { Serie, ToolBarButton, SeriesDataInfo} from '../library.models';
import { ActivityComponent} from '../activity.component';
import {LibraryService} from '../library.service';
import { Observable } from 'rxjs/Observable';
import { PaginationModule } from 'ng2-bootstrap/components/pagination';
@Component({
    moduleId: module.id,
    selector: "series-section",
    templateUrl: "series.component.html",
    styleUrls: ["series.component.css"]
})
export class SeriesComponent extends ActivityComponent implements OnInit {
    @Input() activity: ToolBarButton;
    @Input() language: string;
    series: Serie[];
    selectedSerie: Serie = null;
    maxSize: number = 7;
    totalItems: number = 0;
    currentPage: number = 1;
    loadingData: boolean = false;
    isSearch: boolean = false;
    get searchParam(): string {
        return this.getInfoFromActivity<string>("searchParam", "");
    }
    @Output() onSerieClicked = new EventEmitter<Serie>();
    constructor(private _libraryService: LibraryService) {
        super();
    }
    onSearchClicked(searchParam: string): void {
        //this.setInfoForActivity("searchParam", searchParam);
        this.loadingData = true;
        this.isSearch = true;
        this._libraryService.getSearchSeries(this.language, searchParam)
            .subscribe(series => {
                this.series = series;
                this.loadingData = false;
                //this.setInfoForActivity<Serie[]>("series", series);
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
                this.loadingData = false;
            });
    }
    onClearClicked(): void {
        this.series = [];
        this.isSearch = false;
        this.loadSeries();
        //this.setInfoForActivity<string>("searchParam", "");
        // this.setInfoForActivity<Serie[]>("series", []);
    }
    private loadSeries(page: number = 1) {
        this.loadingData = true;
        this._libraryService.getAllSeries(this.language, page)
            .subscribe(seriesData => {
                this.series = seriesData.series;
                this.totalItems = seriesData.totalItems;
                //this.setInfoForActivity<number>("currentPage", this.currentPage);
                this.loadingData = false;
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
                this.loadingData = false;
            });
    }
    serieClick(serie: Serie): void {
        this.selectedSerie = serie;
        this.onSerieClicked.emit(serie);
    }
    ngOnInit(): void {
        // this.currentPage = this.getInfoFromActivity<number>("currentPage", 1);
        this.loadSeries(this.currentPage);
    }

    pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
        this.loadSeries(event.page);
    };


}
