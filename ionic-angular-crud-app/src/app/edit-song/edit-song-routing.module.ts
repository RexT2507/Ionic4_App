import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { EditSongPage } from './edit-song.page';

const routes: Routes = [
  {
    path: '',
    component: EditSongPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class EditSongPageRoutingModule {}
