import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './super-hero/pages/list/list.component';
import { CreateEditComponent } from './super-hero/pages/create-edit/create-edit.component';
import { CardComponent } from './super-hero/components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './super-hero/components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './super-hero/components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalSaveComponent } from './super-hero/components/modal/modal-save/modal-save.component';
import { ModalErrorComponent } from './super-hero/components/modal/modal-error/modal-error.component';
import { ModalConfirmComponent } from './super-hero/components/modal/modal-confirm/modal-confirm.component';
import { DndDirective } from './super-hero/directives/dnd-directive';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateEditComponent,
    CardComponent,
    LoaderComponent,
    HeaderComponent,
    ModalSaveComponent,
    ModalErrorComponent,
    ModalConfirmComponent,
    DndDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalSaveComponent,
    ModalErrorComponent,
    ModalConfirmComponent
  ],
  exports: [
    ModalSaveComponent,
    ModalErrorComponent,
    ModalConfirmComponent
  ]
})
export class AppModule { }
