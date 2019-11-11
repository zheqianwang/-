import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SkeletonScreenComponent} from './skeleton-screen/skeleton-screen.component';
import {LoadingComponent} from './loading/loading.component';
import {AccordionComponent} from './accordion/accordion.component';


@NgModule({
    declarations: [SkeletonScreenComponent, LoadingComponent, AccordionComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        SkeletonScreenComponent,
        LoadingComponent,
        AccordionComponent
    ]
})
export class PublicModule {
}
