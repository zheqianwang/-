import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
// import { LoginPage } from './login/login.page';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
// import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageModule} from './login/login.module';
// import {LoginService} from '@inspur/scmpub';
import {Device} from '@ionic-native/device/ngx';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import {Downloader} from '@ionic-native/downloader/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {PreviewAnyFile} from '@ionic-native/preview-any-file/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, FormsModule, IonicModule.forRoot({mode: 'ios'}), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(),
        NgZorroAntdMobileModule, BrowserAnimationsModule, LoginPageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppMinimize,
        HttpClientModule,
        HttpClient,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        // QRScanner,
        BarcodeScanner,
        Device,
        // LoginService,
        DocumentViewer,
        Downloader,
        FileOpener,
        File,
        FilePath,
        PreviewAnyFile,
        SQLite
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
