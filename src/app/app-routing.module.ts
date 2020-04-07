import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditComponent } from './super-hero/create-edit/create-edit.component';
import { ListComponent } from './super-hero/list/list.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateEditComponent },
  { path: 'edit/:id', component: CreateEditComponent },
  { path: '**', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
