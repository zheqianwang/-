import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TabsPageRoutingModule} from './tabs.router.module';
import {TabsPage} from './tabs.page';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {LoginPageModule} from '../login/login.module';
import {Tab1PageModule} from '../tab1/tab1.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        LoginPageModule,
        Tab1PageModule
    ],
    providers: [
        AppMinimize,
    ],
    declarations: [TabsPage],
})
export class TabsPageModule {
}
