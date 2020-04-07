import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './super-hero/list/list.component';
import { CreateEditComponent } from './super-hero/create-edit/create-edit.component';
import { CardComponent } from './super-hero/component/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './super-hero/component/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateEditComponent,
    CardComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
