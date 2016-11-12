import {NgModule}      from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SearchboxComponent } from '../shared/searchbox/searchbox.component';
import { SpinnerComponent }  from '../shared/spinner/spinner.component';

import {PortalComponent} from './portal.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {AdminComponent} from '../admin/admin.component';
import {LibraryComponent} from '../library/library.component';
import {HomeComponent} from '../home/home.component';
import {ToolbarComponent} from '../library/toolbar/toolbar.component';
import {LanguageComponent} from '../library/language/language.component';
import {AuthorsComponent} from '../library/authors/authors.component';
import {AuthorInfoComponent} from '../library/authors/author.info.component';
import {GenresComponent} from '../library/genres/genres.component';
import {GenreInfoComponent} from '../library/genres/genre.info.component';
import {BooksComponent} from '../library/books/books.component';


import {PortalRoutes} from './portal.routes';
import {APP_CONFIG, PORTAL_CONFIG} from './portal.providers';
import {LibraryService} from '../library/library.service';
import {EmitterService} from '../shared/emitter.service';
import { FileSizePipe } from '../shared/filesize.pipe';
import { GenreFilterPipe } from '../library/genres/genre.filter.pipe';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        PortalRoutes,
        Ng2BootstrapModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        PortalComponent,
        HeaderComponent,
        FooterComponent,
        AdminComponent,
        LibraryComponent,
        HomeComponent,
        ToolbarComponent,
        SearchboxComponent,
        SpinnerComponent,
        LanguageComponent,
        AuthorsComponent,
        AuthorInfoComponent,
        BooksComponent,
        FileSizePipe,
        GenreFilterPipe,
        GenresComponent,
        GenreInfoComponent,
    ],
    providers: [
        { provide: APP_CONFIG, useValue: PORTAL_CONFIG },
        LibraryService,
        EmitterService
    ],
    bootstrap: [PortalComponent]
})
export class PortalModule {
}
