import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {UrlService} from '../../../../../url.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-add-file',
    templateUrl: './add-file.page.html',
    styleUrls: ['./add-file.page.scss'],
})
export class AddFilePage implements OnInit {
// 输入文件名
    @Input() filename = '';

    // 总页数
    @Input() total = 0;

    index = 0;

    @Input() previewData: any = [];

    selecthtml = '';

    // 请求IP信息
    httpheader = this.url.jungongService + '/data/htmlfile/';


    constructor(
        public nav: NavController,
        public activeRouter: ActivatedRoute, // 必须
        private url: UrlService,
        private sanitizer: DomSanitizer,
    ) {
        this.activeRouter.queryParams.subscribe(params => {
            console.log('url 参数 params = ', params);
            this.urlParams = params;
        });
    }

    urlParams;      // 从路由中获取到的参数
    picUrl;   // 图片存在的地址
    txtUrl;    // .txt文件存在的地址
    pdfUrl;     // .pdf 文件存在的地址
    fileUrl;    // 文件存在的位置

    ngOnInit() {
        this.filename = localStorage['previewwindow_filename'];
        if (localStorage['previewwindow_total'] && parseInt(localStorage['previewwindow_total'], 10)) {
            this.total = parseInt(localStorage['previewwindow_total'], 10);
        }

        if (localStorage['previewwindow_previewData']) {
            this.previewData = localStorage['previewwindow_previewData'].split(',');
        }

        this.httpheader = '';
        if (localStorage['previewwindow_flag'] &&
            (localStorage['previewwindow_flag'] === 'false')) {
            // this.httpheader = 'http://' + window.location.host + '/data/htmlfile/';
            // this.httpheader = 'http://' + '10.24.19.30:10002' + '/data/htmlfile/';
            this.httpheader = 'http://' + this.url.jgserverhost30 + ':' + this.url.jgserverport30Pro + '/data/htmlfile/';
        }

        if (this.total && this.total > 0) {
            this.index = 1;
            const selectIndex = this.index;
            const fileidName = this.previewData[selectIndex - 1];
            this.selecthtml = this.httpheader + fileidName;
            // this.selecthtml = 'http://10.24.20.42:10002/' + '/data/htmlfile/' + fileidName;
            console.log(this.selecthtml);
        }

    }


    // 前一页事件
    backward() {
        if (this.index === 1) {
            // this.msg.info('当前预览页已经是首页！');
            ToastService.offline('当前预览页已经是首页！');
        } else {
            this.index--;
            const selectIndex = this.index;
            const fileidName = this.previewData[selectIndex - 1];
            this.selecthtml = this.httpheader + '/data/htmlfile/' + fileidName;
        }
    }

    // 后一页事件
    forward() {
        if (this.index === this.total) {
            // this.msg.info('当前预览页已经是末页！');
            ToastService.offline('当前预览页已经是末页！');
        } else {
            this.index++;
            const selectIndex = this.index;
            const fileidName = this.previewData[selectIndex - 1];
            this.selecthtml = this.httpheader + fileidName;
        }
    }

    ionViewDidEnter() {
        // 文件预览第一版-------通过下载到本地然后调用本地的应用对其打开
        // this.fileUrl = this.url.FastDFSIP + this.url.FastDFSPORT + '/' + this.urlParams.fileurl;
        // if (this.urlParams.fileextension === 'jpg' || this.urlParams.fileextension === 'png') {
        //     this.picUrl = this.fileUrl;
        // }
        // if (this.urlParams.fileextension === 'txt' || this.urlParams.fileextension === 'js') {
        //     this.txtUrl = this.trustUrl(this.fileUrl);
        // }
        // // this.fileUrl = this.trustUrl(this.url.FastDFSIP + this.url.FastDFSPORT + '/' + this.urlParams.fileurl);
        // if (this.urlParams.fileextension === 'docx' || this.urlParams.fileextension === 'xls') {
        //     const chajian = 'http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=';
        //     this.pdfUrl = this.trustUrl(chajian + this.fileUrl);
        // }
        // if (this.urlParams.fileextension === 'pdf') {
        //     window.open(this.fileUrl);
        // }
    }

    // 将url转换为angular 中 iframe可以识别的安全url链接
    trustUrl(url: string) {
        console.log('接收到的参数为：', url);
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }


}
