import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {LoginPage} from '../login/login.page';
import {Tab1Page} from '../tab1/tab1.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab1/tab1.module').then(m => m.Tab1PageModule)
                    },
                    {
                        path: 'processStarts',
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('../tab1/demo/process-starts/process-starts.module').then(m => m.ProcessStartsPageModule),
                            },
                            {
                                path: 'add',
                                loadChildren: () => import('../tab1/demo/process-starts/add-or-edit/add-or-edit.module').then(m => m.AddOrEditPageModule),
                            }
                        ],
                        data: {title: '工序开工'}
                    },
                    {
                        path: 'processReport',
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('../tab1/demo/process-report/processReport.module').then(m => m.ProcessReportPageModule),
                                data: {title: '工序报工'}
                            },
                            {
                                path: 'add',
                                loadChildren: () => import('../tab1/demo/process-report/addOrEdit/add-report/add-report.module').then(m => m.AddReportPageModule),
                            }
                        ],
                        data: {title: '工序报工'}

                    },

                    /**
                     * 下面这部分路由暂时在四院中用不到
                     */
                    // {
                    //     path: 'fileReference',
                    //     children: [
                    //         {
                    //             path: '',
                    //             loadChildren: () => import('../tab1/demo/file-reference/fileReference.module').then(m => m.FileReferencePageModule),
                    //             data: {title: '文档查询'}
                    //         },
                    //         {
                    //             path: 'add',
                    //             loadChildren: () => import('../tab1/demo/file-reference/addOrEdit/add-file/add-file.module').then(m => m.AddFilePageModule),
                    //             data: {title: '文档查询第二页'}
                    //         }
                    //     ],
                    //     data: {title: '文档查阅'}
                    // },
                    // {
                    //     path: 'processHandover',
                    //     children: [
                    //         {
                    //             path: '',
                    //             loadChildren: () => import('../tab1/demo/process-handover/processHandover.module').then(m => m.ProcessHandoverPageModule),
                    //             data: {title: '工序交接'}
                    //         },
                    //         {
                    //             path: 'add',
                    //             loadChildren: () => import('../tab1/demo/process-handover/addOrEdit/add-handover/add-handover.module').then(m => m.AddHandoverPageModule),
                    //         }
                    //     ],
                    //     data: {title: '工序交接'}
                    //
                    // },
                    // {
                    //     path: 'kittingAnalyze',
                    //     children: [
                    //         {
                    //             path: '',
                    //             loadChildren: () => import('../tab1/demo/kitting-analyze/kitting-analyze.module').then(m => m.KittingAnalyzePageModule),
                    //             data: {title: '齐套分析'}
                    //         },
                    //         {
                    //             path: 'add',
                    //             loadChildren: () => import('../tab1/demo/kitting-analyze/addOrEdit/add-kitting/add-kitting.module').then(m => m.AddKittingPageModule),
                    //             data: {title: '齐套分析第二页'}
                    //         }
                    //     ]
                    // },
                    // {
                    //     path: 'processInspection',
                    //     children: [
                    //         {
                    //             path: '',
                    //             loadChildren: () => import('../tab1/demo/process-inspection/process-inspection.module').then(m => m.ProcessInspectionPageModule),
                    //             data: {title: '工序检验'}
                    //         },
                    //         {
                    //             path: 'add',
                    //             children: [
                    //                 {
                    //                     path: '',
                    //                     loadChildren: () => import('../tab1/demo/process-inspection/addOrEdit/add-inspection/add-inspection.module').then(m => m.AddInspectionPageModule),
                    //                 },
                    //                 {
                    //                     path: 'spreadjs',
                    //                     loadChildren: () => import('../tab1/demo/process-inspection/addOredit/spreadJS/spreadjs.module').then(m => m.SpreadjsPageModule),
                    //                 }
                    //             ]
                    //
                    //         }
                    //     ],
                    //     data: {title: '工序检验'}
                    //
                    // },
                    // {
                    //     path: 'secondaryInspection',
                    //     children: [
                    //         {
                    //             path: '',
                    //             loadChildren: () => import('../tab1/demo/secondary-inspection/secondary-inspection.module').then(m => m.SecondaryInspectionPageModule),
                    //             data: {title: '二次报检'}
                    //         },
                    //         {
                    //             path: 'add',
                    //             children: [
                    //                 {
                    //                     path: '',
                    //                     loadChildren: () => import('../tab1/demo/secondary-inspection/addOrEdit/add-secondary-inspection/add-secondary-inspection.module').then(m => m.AddSecondaryInspectionPageModule),
                    //                 },
                    //                 {
                    //                     path: 'spreadjs',
                    //                     loadChildren: () => import('../tab1/demo/process-inspection/addOredit/spreadJS/spreadjs.module').then(m => m.SpreadjsPageModule),
                    //                 }
                    //             ]
                    //         }
                    //     ],
                    //     data: {title: '二次报检'}
                    //
                    // },
                    // {
                    //     path: 'productionProgress',
                    //     children: [
                    //         {
                    //             path: '',
                    //             loadChildren: () => import('../tab1/demo/production-progress/production-progress.module').then(m => m.ProductionProgressPageModule),
                    //             data: {title: '生产进度'}
                    //         },
                    //         {
                    //             path: 'add',
                    //             loadChildren: () => import('../tab1/demo/production-progress/addOrEdit/add-production-progress/add-production-progress.module').then(m => m.AddProductionProgressPageModule),
                    //         }
                    //     ],
                    //     data: {title: '生产进度'}
                    //
                    // },

                ]
            },
            {
                path: 'tab2',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab2/tab2.module').then(m => m.Tab2PageModule)
                    }
                ]
            },
            {
                path: 'tab3',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab3/tab3.module').then(m => m.Tab3PageModule)
                    }
                ]
            }, {
                path: 'user',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../user/user.module').then(m => m.UserPageModule)
                    },
                    {path: 'setting', loadChildren: () => import('../user/setting/setting.module').then(m => m.SettingPageModule)},
                    {path: 'person', loadChildren: () => import('../user/person/person.module').then(m => m.PersonPageModule),},
                    {path: 'about', loadChildren: () => import('../user/about/about.module').then(m => m.AboutPageModule)},
                    {path: 'card', loadChildren: () => import('../user/card/card.module').then(m => m.CardPageModule)},
                    {path: 'profile', loadChildren: () => import('../user/profile/profile.module').then(m => m.ProfilePageModule)},
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        // redirectTo: '/tabs/tab1',
        // pathMatch: 'full'
        component: LoginPage
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
