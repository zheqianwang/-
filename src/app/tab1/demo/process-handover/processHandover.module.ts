import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ProcessHandoverPage} from './processHandover.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {PublicModule} from '../../../common/public.module';

const routes: Routes = [
    {
        path: '',
        component: ProcessHandoverPage
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
    declarations: [ProcessHandoverPage]
})
export class ProcessHandoverPageModule {
}
