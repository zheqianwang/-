import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ProcessReportPage} from './processReport.page';
import {PopoverPage} from './popover/popover.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {PublicModule} from '../../../common/public.module';


const routes: Routes = [
    {
        path: '',
        component: ProcessReportPage
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
    declarations: [
        ProcessReportPage,
        PopoverPage
    ],
    entryComponents: [
        PopoverPage
    ]
})
export class ProcessReportPageModule {
}
