import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {AddReportPage} from './add-report.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {PublicModule} from '../../../../../common/public.module';

const routes: Routes = [
    {
        path: '',
        component: AddReportPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgZorroAntdMobileModule,
        PublicModule
    ],
    declarations: [AddReportPage]
})
export class AddReportPageModule {
}
