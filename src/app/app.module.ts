import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './super-hero/list/list.component';
import { CreateEditComponent } from './super-hero/create-edit/create-edit.component';
import { CardComponent } from './super-hero/component/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './super-hero/component/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './super-hero/component/header/header.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSaveComponent } from './super-hero/component/modal/modal-save/modal-save.component';
import { ModalErrorComponent } from './super-hero/component/modal/modal-error/modal-error.component';
import { ModalConfirmComponent } from './super-hero/component/modal/modal-confirm/modal-confirm.component';

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
    ModalConfirmComponent
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
