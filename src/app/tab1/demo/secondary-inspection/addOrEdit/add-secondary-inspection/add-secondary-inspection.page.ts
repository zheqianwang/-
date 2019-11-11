import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ProcessReportService} from 'src/app/services/process_report/process-report.service';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-add-secondary-inspection',
    templateUrl: './add-secondary-inspection.page.html',
    styleUrls: ['./add-secondary-inspection.page.scss'],
})
export class AddSecondaryInspectionPage implements OnInit {

    constructor(
        public nav: NavController,
        private activeRouter: ActivatedRoute, // 必须
        private _toast: ToastService,
        private processReportService: ProcessReportService
    ) {
        // 获取url中的参数
        this.activeRouter.queryParams.subscribe(params => {
            console.log('url 参数 params = ', params);
            this.urlParams = JSON.parse(JSON.stringify(params));
        });
    }

    // 本页面使用到的数据
    currentPageData;  // 当前页面上的数据
    detectedValueBtn = true; // 检测值按钮是否显示
    urlParams;  // url传来的参数
    d = new Date();
    help; // ‘加工工人’‘自检人’‘互检人’的帮助接口返回值
    /******************** 以下是请求后端时拼接的参数 ********************/
        // 保存时向后端传的数据格式
    putData = {
        billcode: null,     // 检验单号
        factoryid: {
            id: null,   // 工厂
        },
        placeid: null,      // 场所
        workcenterid: {
            id: null    // 工作中心
        },
        workunitid: null,   // 工作单元
        moid: null,         // 订单ID
        woid: null,         // 工单ID
        doid: null,         // 派工单ID
        opnum: null,        // 工序号
        opname: null,       // 工序名称
        materialid: {
            id: null
        },   // 物料
        projectid: null,    // 项目
        wbsid: null,        // 任务号
        batch: null,        // 批次
        qty: null,          // 数量
        // 不合格数量
        // 合格数量
        // 合格率
        teamid: null,   // 加工班组
        workerid: null, // 加工工人
        inspecttype: null,  // 检验类型
        inspecttime: new Date(),  // 检验时间
        inspector: {
            id: null
        },           //    检验员
        inspectresult: {
            id: null
        },        //    检验结果
        inspectresultdesc: null,    // 检验结果描述
        state: null,    // 状态
        sourceid: null, // 来源单据ID
        sourceno: null, // 来源单据号
        //    检测值
    };
    // 点击‘返工返修’时向后端传的数据格式
    putDataRepair = {
        factoryid: null,    //    工厂
        repairtype: {
            id: null        //    单据类型
        },
        repaircode: null,   //    返修单号
        placeid: null,      //    场所
        workcenterid: null, //    工作中心
        state: null,        //    状态
        repairstarttime: null,  //  返修开始时间
        repairendtime: null,    //  返修结束时间
        repairworker: {
            id: null            //  返修工人
        },
        repairmethod: {
            id: null            //  返修办法
        },
        workunitid: null,       //  返修工位
        repairmethoddesc: null, //  办法描述
        repairoperationrec: null,   //  返修操作记录
        qminspectrecords: {
            id: null        //    检验记录ID
        }
    };
    //  点击‘不合格品处理’时向后端传的数据格式
    putDateReject = {};

    ngOnInit() {
    }

    ionViewWillEnter() {
        // // 获取某个id的二次报检数据
        // this.getSecondaryInspectionOne();
        // // 获取检验人帮助信息
        // this.getProcessWorkers();
    }

    ionViewDidEnter() {
        // 获取某个id的二次报检数据
        this.getSecondaryInspectionOne();
        // 获取检验人帮助信息
        this.getProcessWorkers();
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }

    /**
     * 获取指定Code的 二次报检 数据
     * getSecondaryInspectionOne()
     */
    getSecondaryInspectionOne() {
        this.processReportService.oneSecondaryInspection(this.urlParams.id).then(res => {
            console.log('res=', res);
            this.currentPageData = res;
            // 将页面返回值 赋值给 ‘保存’ 接口的putData.--------------这部分的数据对应关系要核实！！！！！
            this.putData.factoryid.id = res.qminspectrecords.factoryid.id;
            this.putData.materialid.id = res.qminspectrecords.materialid.id;
            this.putData.workcenterid.id = res.qminspectrecords.workcenterid.id;
            this.putData.placeid = res.qminspectrecords.placeid;
        }, err => {
        });
    }


    /**
     * 保存
     * processForm()
     */
    processForm(event) {
        if (!event.inspectresult.id) {
            event.inspectresult.id = '0010';
        }
        console.log('提交 evevt = ', event);
        // if (this.examineForm(event)) {
        this.processReportService.saveSecondaryInspection(event).then(res => {

        }, err => {
            console.log('函数 processForm() 出错!');
        });
        // }

    }

    /**
     * 返工返修
     * rework()
     */
    rework(event) {
        console.log('返工返修 evevt = ', event);
    }

    /**
     * 不合格品处理
     * disqualification()
     */
    disqualification(event) {
        console.log('不合格品处理 evevt = ', event);
    }


    /**
     * 获取-检验人-的帮助信息
     * getProcessingWorkers()
     */
    getProcessWorkers() {
        this.processReportService.processReportHelp().then(res => {
            // console.log(' 帮助接口返回值 res = ', res);
            this.help = res;
        }, error => {
        });
    }


    /**
     * examineForm()
     * 检查Form表单的数据格式（是否为空？正则判断？）
     */
    examineForm(event): boolean {
        if (!event.mutual_inspection) {  // 互检人
            ToastService.offline('互检人不能为空 !!!', 1000);
            return false;
        }
        if (!event.mutual_inspection_date) {  // 互检日期
            ToastService.offline('互检日期不能为空 !!!', 1000);
            return false;
        }
        if (!event.inspector.id) {  // 检验人
            ToastService.offline('检验人不能为空 !!!', 1000);
            return false;
        }
        if (!event.inspection_date) {  // 检验日期
            ToastService.offline('检验日期不能为空 !!!', 1000);
            return false;
        }
        if (!event.test_results) {  // 检验结论
            ToastService.offline('检验结论不能为空 !!!', 1000);
            return false;
        }
        if (!event.detected_value) {  // 检测值
            ToastService.offline('检测值不能为空 !!!', 1000);
            return false;
        }
        return true;
    }

    /**
     * toggleChange(event)
     * 切换 检验结论
     * @param event
     */
    toggleChange(e) {
        console.log('e = ', e);
        console.log('e.detail.checked = ', e.detail.checked);
        if (e.detail.checked) {
            this.putData.inspectresult.id = '0020'; // 合格
        } else {
            this.putData.inspectresult.id = '0010';    // 不合格
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
        if (str === '检验日期') {
            this.putData.inspecttime = this.currentDateFormat(result, 'yyyy-mm-dd');
        }
    }


}
