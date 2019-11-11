import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ProcessReportService} from 'src/app/services/process_report/process-report.service';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from 'ng-zorro-antd-mobile';


@Component({
    selector: 'app-add-production-progress',
    templateUrl: './add-production-progress.page.html',
    styleUrls: ['./add-production-progress.page.scss'],
})
export class AddProductionProgressPage implements OnInit {

    constructor(
        public nav: NavController,
        private processReportService: ProcessReportService,
        private activeRouter: ActivatedRoute, // 必须
        private  _toast: ToastService,
    ) {
        // 获取url中的参数
        this.activeRouter.queryParams.subscribe(params => {
            console.log('url 参数 params = ', params);
            this.urlParams = params;
            // this.currentPageData = JSON.parse(JSON.stringify(params))
            // console.log('currentPageData = ', this.currentPageData)
        });

    }

    // 本页面使用到的数据
    currentPageData;  // 当前页面上的数据
    detectedValueBtn = true; // 检测值按钮是否显示
    urlParams;  // url传来的参数

    currentStep; // 当前步骤
    allStep; // 总步骤
    steps = [];

    ngOnInit() {

    }

    ionViewWillEnter() {
        // this.getProcessProgressOne({code: this.urlParams.code});
    }

    // 进入页面后执行
    ionViewDidEnter(): void {
        this.getProcessProgressOne({code: this.urlParams.code});
        this.selectStepCenter();
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }

    /**
     * getProcessProgressOne()
     * 获取指定Code的 生产进度 数据
     */
    getProcessProgressOne(code) {
        this.processReportService.oneProcessProgress(code).then(res => {
            console.log('res=', res);
            this.currentPageData = res;
            this.stepsFun();
        }, err => {
        });

    }

    /**
     * stepsFun()
     * 步骤条数据
     */
    stepsFun() {
        this.currentStep = JSON.parse(this.currentPageData.current_progress);
        this.allStep = JSON.parse(this.currentPageData.production_progress);
        console.log('步骤 = ', this.currentStep);
        for (let i = 0; i < this.allStep; i++) {
            if (i === this.currentStep) {
                this.steps.push(
                    {
                        title: '进行中',
                        description: '步骤的描述'
                    },
                );
            } else if (i < this.currentStep) {
                this.steps.push(
                    {
                        title: '已完成',
                        description: '步骤的描述'
                    },
                );
            } else if (i > this.currentStep) {
                this.steps.push(
                    {
                        title: '待进行',
                        description: '步骤的描述'
                    }
                );
            }
        }
        console.log('steps = ', this.steps);
    }


    /**
     *  滚动条默认的‘进行中’选项居中显示
     *  selectStepCenter()
     */
    selectStepCenter() {
        // 当前页面宽度 currentPageWidth
        const currentPageWidth = document.getElementById('stepsStyle_customize').offsetWidth;
        console.log('当前页面宽度 = ', currentPageWidth);
        console.log('选中元素的本来位置 = ', this.currentStep * 100);
        if ((this.currentStep * 100) > (currentPageWidth / 2)) {
            const leftX = ((this.currentStep * 100) - (currentPageWidth / 2)) + 50;
            console.log('leftX = ', leftX);
            document.getElementById('stepsStyle_customize').scrollLeft = leftX;
        }
    }


    // name = '选择';
    // value = new Date();
    /**
     * strToDate()
     * 将字符串格式的日期转换成Date格式
     */
    strToDate(str): any {
        const strDate = new Date(str);
        // console.log('strDate = ',strDate)
        return this.currentDateFormat(strDate, 'yyyy-mm-dd');
    }

    currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
        const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
        return format
            .replace('yyyy', date.getFullYear())
            .replace('mm', pad(date.getMonth() + 1))
            .replace('dd', pad(date.getDate()))
            .replace('HH', pad(date.getHours()))
            .replace('MM', pad(date.getMinutes()))
            .replace('ss', pad(date.getSeconds()));
    }

    // currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    //   const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    //   return format
    //     .replace('yyyy', date.getFullYear())
    //     .replace('mm', pad(date.getMonth() + 1))
    //     .replace('dd', pad(date.getDate()))
    //     .replace('HH', pad(date.getHours()))
    //     .replace('MM', pad(date.getMinutes()))
    //     .replace('ss', pad(date.getSeconds()));
    // }
    // onOk(result: Date) {
    //   this.name = this.currentDateFormat(result, 'yyyy-mm-dd');
    //   this.value = result;
    // }

    onOk(result: Date, str) {
        // console.log('onOK = ',result)
        if (str === '自检日期') {
            this.currentPageData.self_test_date = this.currentDateFormat(result, 'yyyy-mm-dd');
        }
        if (str === '互检日期') {
            this.currentPageData.mutual_inspection_date = this.currentDateFormat(result, 'yyyy-mm-dd');
        }
        if (str === '专检日期') {
            this.currentPageData.inspection_date = this.currentDateFormat(result, 'yyyy-mm-dd');
        }
    }

}
