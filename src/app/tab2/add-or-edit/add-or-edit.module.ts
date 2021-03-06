import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddOrEditPage } from './add-or-edit.page';
import {PublicModule} from '../../common/public.module';

const routes: Routes = [
  {
    path: '',
    component: AddOrEditPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PublicModule
    ],
  declarations: [AddOrEditPage]
})
export class AddOrEditPageModule {}
