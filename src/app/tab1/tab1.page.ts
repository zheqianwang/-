import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverPage} from './popover/popover.page';
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
                    {url: 'processHandover', title: '工序交接', img: 'u16'},
                    {url: 'kittingAnalyze', title: '齐套分析', img: 'u44'},
                    // { url: 'processInspection', title: '工序检验', img: 'u28' },
                ],
                // [
                // { url: 'secondaryInspection', title: '二次报检', img: 'u18' },
                // { url: 'productionProgress', title: '生产进度', img: 'u30' },
                // {url: '', title: '货币资金', img: 'u14'},
                // ]
            ]
        },
        {
            group: '质量检验', children: [
                [{url: 'processInspection', title: '工序检验', img: 'u28'},
                    {url: 'secondaryInspection', title: '二次报检', img: 'u18'},],
            ]
        },
        {
            group: '过程跟踪', children: [
                [{url: 'productionProgress', title: '生产进度', img: 'u30'},],
            ]
        },
        {
            group: '工程文档', children: [
                [{url: 'fileReference', title: '文档查阅', img: 'u12'},],
            ]
        },
        // {
        //     group: '供应链', children: [
        //         [{ url: '', title: '主要物资采集量', img: 'u44' },
        //         { url: '', title: '物资采集率', img: 'u46' },
        //         { url: '', title: '上网采购率', img: 'u48' },
        //         { url: '', title: '电子化招标率', img: 'u50' },],
        //         [{ url: '', title: '采购到货', img: 'u60' },
        //         { url: '', title: '物资库存', img: 'u32' },
        //         { url: '', title: '采购应付', img: 'u14' },
        //         { url: '', title: '供应商评价', img: 'u74' },]
        //     ]
        // },
        // {
        //     group: '资产设备', children: [
        //         [{ url: '', title: '设备金额', img: 'u14' },
        //         { url: '', title: '设备采购计划完成率', img: 'u44' },
        //         { url: '', title: '设备完成率', img: 'u46' },
        //         { url: '', title: '设备利用率', img: 'u86' },],
        //         [{ url: '', title: '故障停机率', img: 'u28' },
        //         { url: '', title: '设备保养完成率', img: 'u90' },
        //         ]
        //     ]
        // },
        // {
        //     group: '生产交付', children: [
        //         [{ url: '', title: '合同签订', img: 'u120' },
        //         { url: '', title: '合同详情', img: 'u122' },
        //         { url: '', title: '合同交付', img: 'u124' },
        //         { url: '', title: '产品生产进展', img: 'u126' },],
        //         [{ url: '', title: '项目生产进展', img: 'u128' },
        //         { url: '', title: '项目生产动态', img: 'u46' },
        //         ]
        //     ]
        // }, 
        // {
        //     group: '质量分析', children: [
        //         [{ url: '', title: '采购物资合格率', img: 'u120' },
        //         { url: '', title: '一次校验合格率', img: 'u122' },
        //         { url: '', title: '不合格品', img: 'u124' },
        //         { url: '', title: '产品报废', img: 'u126' },],
        //     ]
        // },
        // {
        //     group: '成本分析', children: [
        //         [{ url: '', title: '目标成本', img: 'u120' },
        //         { url: '', title: '实际成本', img: 'u162' },
        //         ],
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

    localToken = ''; // 本地的token-----仅在本页中使用

    ionViewWillEnter() {
        ToastService.hide();
        //    一、获取本地缓存的token
        // this.storage.get('loginResToken').then(res => {
        const res = localStorage['token'];
        if (res != null) {  // 一 -> 结果1：本地有token
            console.log('本地有token', res);
            this.localToken = res;
            //    二、接下来要验证本地的token是否过期了
            // this.verifyLocalTokenIfOverdue();
        } else {    // 一 -> 结果2：本地没有token
            console.log('本地没有token');
            //    接下来要跳转到‘登录页面’，通过进行登录操作来获取最新的token，并且存到本地
            this.showAlert();
        }
        // });
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
     * 验证本地的token是否过期
     * verifyLocalTokenIfOverdue()
     * @param ev
     */
    verifyLocalTokenIfOverdue() {
        const baseurl = `http://${this.url.jgserverhost}/cwbase/sg/drp/lspub/v1/api`;
        const paramDataNews = [this.localToken];
        const body = {
            'AssemblyName': 'Genersoft.Drp.LSPub',
            'ClassName': 'Genersoft.Drp.LS.Com.WebLoginMgr',
            'MethodName': 'ValidSession',
            'ParamDatas': JSON.stringify(paramDataNews),
        };

        this.http.post(baseurl, body).subscribe(res => {
            if (JSON.parse(JSON.stringify(res)).result) {
                console.log('本地的token有效,返回的res=', res);
            }
        }, err => {
            console.log('验证本地的token过期,返回的err=', err);
            if (!err['ok']) {
                ToastService.offline(err['error']['message']);
                // 清空本地存储的 数据
                window.localStorage.removeItem('loginResResult');
                window.localStorage.removeItem('loginResState0');
                window.localStorage.removeItem('loginResToken');
                // 前往登录页重新登录
                this.goToLoginPage();
            }
        });
    }


    /**
     * 提示用户是否先去登录
     * showAlert()
     * @param ev
     */
    showAlert() {
        ModalService.alert('提示', '是否登录后使用 ?', [
            {text: '暂不登录', onPress: () => console.log('cancel')},
            {text: '马上登录', onPress: () => this.goToLoginPage()}
        ]);
    }

    // 暂时不用
    // async presentPopover(ev: any) {
    //     const popover = await this.popoverController.create({
    //         component: PopoverPage,
    //         event: ev,
    //         translucent: true
    //     });
    //     return await popover.present();
    // }


}
