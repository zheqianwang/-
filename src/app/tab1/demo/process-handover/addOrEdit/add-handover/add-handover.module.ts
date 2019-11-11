import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {AddHandoverPage} from './add-handover.page';
import {PublicModule} from '../../../../../common/public.module';

const routes: Routes = [
    {
        path: '',
        component: AddHandoverPage
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
    declarations: [AddHandoverPage]
})
export class AddHandoverPageModule {
}
