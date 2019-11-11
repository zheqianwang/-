import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab2Page } from './tab2.page';
import { PopoverPage } from './popover/popover.page';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {PublicModule} from '../common/public.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab2Page}]),
        NgZorroAntdMobileModule,
        PdfViewerModule,
        PublicModule
    ],
    declarations: [
        Tab2Page,
        PopoverPage
    ],
    entryComponents: [
        PopoverPage
    ]
})
export class Tab2PageModule {
}
