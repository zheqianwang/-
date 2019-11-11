import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginPage} from './login/login.page';


const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {path: 'login', component: LoginPage},
    // {path: 'add-file', loadChildren: './tab1/demo/file-reference/addOrEdit/add-file/add-file.module#AddFilePageModule'},
    // {path: 'process-starts', loadChildren: './tab1/demo/process-starts/process-starts.module#ProcessStartsPageModule'},
    // {path: 'add-or-edit', loadChildren: './tab1/demo/process-starts/add-or-edit/add-or-edit.module#AddOrEditPageModule'},
    // {path: 'add-report', loadChildren: './tab1/demo/process-report/addOrEdit/add-report/add-report.module#AddReportPageModule'},
    // {path: 'process-handover', loadChildren: './tab1/demo/process-handover/process-handover.module#ProcessHandoverPageModule'},
    // {path: 'add-handover', loadChildren: './tab1/demo/process-handover/addOrEdit/add-handover/add-handover.module#AddHandoverPageModule'},
    // {path: 'kitting-analyze', loadChildren: './tab1/demo/kitting-analyze/kitting-analyze.module#KittingAnalyzePageModule'},
    // {path: 'add-kitting', loadChildren: './tab1/demo/kitting-analyze/addOrEdit/add-kitting/add-kitting.module#AddKittingPageModule'},
    // {path: 'process-inspection', loadChildren: './tab1/demo/process-inspection/process-inspection.module#ProcessInspectionPageModule'},
    // {
    //     path: 'add-inspection',
    //     loadChildren: './tab1/demo/process-inspection/addOrEdit/add-inspection/add-inspection.module#AddInspectionPageModule'
    // },
    // {
    //     path: 'secondary-inspection',
    //     loadChildren: './tab1/demo/secondary-inspection/secondary-inspection.module#SecondaryInspectionPageModule'
    // },
    // {
    //     path: 'add-secondary-inspection',
    //     loadChildren: './tab1/demo/secondary-inspection/addOrEdit/add-secondary-inspection/add-secondary-inspection.module#AddSecondaryInspectionPageModule'
    // },
    // {path: 'production-progress', loadChildren: './tab1/demo/production-progress/production-progress.module#ProductionProgressPageModule'},
    // {
    //     path: 'add-production-progress',
    //     loadChildren: './tab1/demo/production-progress/addOrEdit/add-production-progress/add-production-progress.module#AddProductionProgressPageModule'
    // },
    {path: 'spreadjs', loadChildren: './tab1/demo/process-inspection/addOrEdit/spreadJS/spreadjs.module#SpreadjsPageModule'},
  { path: 'add-or-edit', loadChildren: './tab2/add-or-edit/add-or-edit.module#AddOrEditPageModule' },

    // {path: 'login', loadChildren: './login/login.module#LoginPageModule'},

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        // 加载所有的module
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
