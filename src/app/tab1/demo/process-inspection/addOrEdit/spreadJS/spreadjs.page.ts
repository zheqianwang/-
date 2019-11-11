import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {UrlService} from '../../../../../url.service';

@Component({
    selector: 'app-spreadjs',
    templateUrl: './spreadjs.page.html',
    styleUrls: ['./spreadjs.page.scss'],
})
export class SpreadjsPage implements OnInit {

    constructor(
        public nav: NavController,
        private sanitizer: DomSanitizer,
        private activeRouter: ActivatedRoute, // 必须
        private url: UrlService,
    ) {
        // 获取url中的参数
        this.activeRouter.queryParams.subscribe(params => {
            console.log('spreadjs 文件从路由中接收到的 参数 params = ', params);
            this.urlParams = params;
            this.id = params.id;        // 模板id
            this.type = params.type;    // 操作类型
            this.inspectrecid = params.inspectrecid;     // 检验记录id
            this.seqnum = params.seqnum;    // 工序id
            this.inspectitemid = params.inspectitemid;  // 零部件id
            this.state = params.state;  // 检验记录
        });
    }

    urlParams;  // 从路由中获取到的参数
    id;     // 模板id
    type;   // 操作类型
    inspectrecid; // 检验记录id
    seqnum; // 工序id
    inspectitemid; // 零部件id
    state;  // 检验记录

    // id = 'fd41f49a-24b2-4bb2-9954-fbca2d2cde8c';
    // type = 'testing';
    // inspectrecid = '4028df816d5d6354016d5d6647250001';
    // seqnum = '9964c151-5836-4314-ba72-d32fbb9fb625';
    // inspectitemid = 'c0df70dc-5b8b-39ed-ef8b-c9e18d016f88';
    // state = 0;

    srcUrl; // spreadjs插件的位置
    srcUrlParams;   // 给 spreadjs 传递的参数
    hostnameAndPort = this.url.jungongService;

    ionViewWillEnter() {
        this.srcUrl = '../../../../../../assets/spreadJs/index.html';
        // srcUrlParams = '../../../../../../assets/spreadJs/index.html?id=fd41f49a-24b2-4bb2-9954-fbca2d2cde8c&type=testing&inspectrecid=4028df816d5d6354016d5d6647250001&seqnum=9964c151-5836-4314-ba72-d32fbb9fb625&inspectitemid=c0df70dc-5b8b-39ed-ef8b-c9e18d016f88&state=0';
        this.srcUrlParams = `${this.srcUrl}?id=${this.id}&type=${this.type}&inspectrecid=${this.inspectrecid}&seqnum=${this.seqnum}&inspectitemid=${this.inspectitemid}&state=${this.state}&hostname=${this.hostnameAndPort}`;
    }

    // 将url转换为angular 中 iframe可以识别的安全url链接
    trustUrl(url: string) {
        console.log('spreadjs 插件 接收到的 参数为：', url);
        // if (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // }
    }

    ngOnInit() {
    }

}
