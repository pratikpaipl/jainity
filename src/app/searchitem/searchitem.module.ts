import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



import { SearchitemPage } from './searchitem.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: SearchitemPage
  }
];
@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchitemPage]
})
export class SearchitemPageModule {}
