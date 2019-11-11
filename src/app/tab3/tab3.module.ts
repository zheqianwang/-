import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab3Page} from './tab3.page';
import {PopoverPage} from './popover/popover.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab3Page}]),
        NgZorroAntdMobileModule,
    ],
    declarations: [Tab3Page, PopoverPage],
    entryComponents: [PopoverPage]
})
export class Tab3PageModule {
}
