import {Component, OnInit} from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ProcessReportService} from '../../../../../services/process_report/process-report.service';

@Component({
    selector: 'app-add-kitting',
    templateUrl: './add-kitting.page.html',
    styleUrls: ['./add-kitting.page.scss'],
})
export class AddKittingPage implements OnInit {

    constructor(
        public nav: NavController,
        public activeRouter: ActivatedRoute, // 必须
        private processReportService: ProcessReportService,
    ) {
        // 获取url中的参数
        this.activeRouter.queryParams.subscribe(params => {
            console.log('url 参数 params = ', params);
            this.urlParams = params;
        });
    }

    urlParams; // 从 url中获取到的参数集
    activeKey = [0, 1, 2];
    currentPageData;
    public noData = false; // 是否有数据-默认存在数据

    ngOnInit() {
        // console.log('lngOnInit函数中的urlParams = ', this.urlParams);
        //    从 url中获取到参数后，向后端发送请求
        // this.getKittingAnalyzeResult([this.urlParams]);
    }

    ionViewDidEnter() {
        // console.log('lngOnInit函数中的urlParams = ', this.urlParams);
        //    从 url中获取到参数后，向后端发送请求
        this.getKittingAnalyzeResult([this.urlParams]);
    }

    /**
     * 根据 传入的参数 向后端获取 齐套分析后的结果
     * getKittingAnalyzeResult(Array[json])
     * @param
     */
    getKittingAnalyzeResult(params) {
        console.log('齐套分析 请求的参数为 ', params);
        this.processReportService.getAnalyzeResult(params).then(res => {
            console.log('获取齐套分析结果数据 res = ', res);
            if (res.length > 0 && res[0].error) {
                ToastService.offline(res[0].error);
                this.noData = true;
            } else {
                this.currentPageData = res;
            }
        }, err => {
            console.log('获取齐套分析结果数据 err = ', err);
            ToastService.offline(`获取齐套分析结果数据 err = ${err}`);
        });
    }

    // 时间格式化
    timeFormatting(ms): any {
        return new Date(ms).toLocaleDateString();
    }

    onChange(event) {
        console.log(event);
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }

}
