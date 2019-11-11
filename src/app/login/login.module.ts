import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {LoginPage} from './login.page';
// import {LoginService, ServicesModule} from '@inspur/scmpub';
import {HttpClient, HttpClientModule} from '@angular/common/http';

const routes: Routes = [
    {
        path: '',
        component: LoginPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        // ServicesModule,
        RouterModule.forChild(routes),

    ],
    declarations: [LoginPage],
    exports: [
        LoginPage
    ],

    providers: [
        {
            provide: HttpClient,
            useClass: HttpClient
        },
        // {
        //     provide: LoginService,
        //     useClass: LoginService
        // }
        // LoginService
    ]
})
export class LoginPageModule {
}
