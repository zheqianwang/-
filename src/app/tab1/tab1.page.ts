import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService, ToastService} from 'ng-zorro-antd-mobile';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    grid = [

        {
            group: '生产执行', children: [
                [
                    {url: 'processStarts', title: '工序开工', img: 'u14'},
                    {url: 'processReport', title: '工序报工', img: 'u32'},
                    /**
                     * 下面路由在四院中用不到
                     */
                    // {url: 'processHandover', title: '工序交接', img: 'u16'},
                    // {url: 'kittingAnalyze', title: '齐套分析', img: 'u44'},
                ],
            ]
        },
        /**
         * 下面路由在四院中用不到
         */
        // {
        //     group: '质量检验', children: [
        //         [{url: 'processInspection', title: '工序检验', img: 'u28'},
        //             {url: 'secondaryInspection', title: '二次报检', img: 'u18'},],
        //     ]
        // },
        // {
        //     group: '过程跟踪', children: [
        //         [{url: 'productionProgress', title: '生产进度', img: 'u30'},],
        //     ]
        // },
        // {
        //     group: '工程文档', children: [
        //         [{url: 'fileReference', title: '文档查阅', img: 'u12'},],
        //     ]
        // },
    ];

    constructor(
        private popoverController: PopoverController,
        private storage: Storage,
        private router: Router,
        private route: ActivatedRoute,
        private _toast: ToastService,
        private http: HttpClient,
        private url: UrlService,
        private _modal: ModalService,
    ) {
    }


    ionViewWillEnter() {
        ToastService.hide();
    }


    ngOnInit() {

    }

    /**
     * 跳转到登录页面
     * goToLoginPage()
     * @param ev
     */
    goToLoginPage() {
        this.router.navigate(['/login']);
        // 下面这种路由跳转了，也将当前的路由被新路由替换掉了
        // this.router.navigate([''], {relativeTo: this.route, replaceUrl: true});
    }

    /**
     * 验证本地的token是否过期--调用胡老师封装的登录方法用到这里
     * verifyLocalTokenIfOverdue()
     * @param ev
     */
    // verifyLocalTokenIfOverdue() {
    //     const baseurl = `http://${this.url.jgserverhost}/cwbase/sg/drp/lspub/v1/api`;
    //     const paramDataNews = [this.localToken];
    //     const body = {
    //         'AssemblyName': 'Genersoft.Drp.LSPub',
    //         'ClassName': 'Genersoft.Drp.LS.Com.WebLoginMgr',
    //         'MethodName': 'ValidSession',
    //         'ParamDatas': JSON.stringify(paramDataNews),
    //     };
    //
    //     this.http.post(baseurl, body).subscribe(res => {
    //         if (JSON.parse(JSON.stringify(res)).result) {
    //             console.log('本地的token有效,返回的res=', res);
    //         }
    //     }, err => {
    //         console.log('验证本地的token过期,返回的err=', err);
    //         if (!err['ok']) {
    //             ToastService.offline(err['error']['message']);
    //             // 清空本地存储的 数据
    //             window.localStorage.removeItem('loginResResult');
    //             window.localStorage.removeItem('loginResState0');
    //             window.localStorage.removeItem('loginResToken');
    //             // 前往登录页重新登录
    //             this.goToLoginPage();
    //         }
    //     });
    // }
}
