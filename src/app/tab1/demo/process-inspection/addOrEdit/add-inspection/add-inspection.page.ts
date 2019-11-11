import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ProcessReportService} from 'src/app/services/process_report/process-report.service';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-add-inspection',
    templateUrl: './add-inspection.page.html',
    styleUrls: ['./add-inspection.page.scss'],
})
export class AddInspectionPage implements OnInit {

    constructor(
        public nav: NavController,
        private activeRouter: ActivatedRoute, // 必须
        private _toast: ToastService,
        private processReportService: ProcessReportService
    ) {
        // 获取url中的参数
        this.activeRouter.queryParams.subscribe(params => {
            console.log('url 参数 params = ', params);
            this.urlParams = params;
            this.param.filter.id = params.id;
        });
    }

    // 本页面使用到的数据
    currentPageData;  // 当前页面上的数据
    testValueFlag = true;   // 检测值 那行是否显示
    inputTestValueState = 0; // 控制‘点此录入检测值’按钮的颜色
    urlParams;  // url传来的参数
    param = {
        filter: {
            id: null
        },
        rows: 10,
        page: 1
    };
    help; // ‘加工工人’‘自检人’‘互检人’的帮助接口返回值
    queryparams = {
        id: null,           // 模板id
        type: null,         // 操作类型
        inspectrecid: null, // 检验记录id
        seqnum: null,       // 工序id
        inspectitemid: null,    // 零部件id
        state: null         // 检验记录-默认0

    };    // 向 spreadjs 插件传递的参数
    /******************** 以下是请求后端时拼接的参数 ********************/
        // 点击‘保存’时向后端传的数据格式
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
        woid: {
            id: null
        },         // 工单ID
        doid: {
            id: null
        },         // 派工单ID
        opnum: null,        // 工序号
        opname: null,       // 工序名称
        materialid: {
            id: null
        },   // 物料
        projectid: {
            id: null
        },    // 项目
        wbsid: null,        // 任务号
        batch: null,        // 批次
        qty: null,          // 数量
        unqualifiedqty: null,   // 不合格数量
        qualifiedqty: null,     // 合格数量
        qualificationrate: null, // 合格率
        teamid: null,   // 加工班组
        workerid: null, // 加工工人
        inspecttype: {
            id: null
        },  // 检验类型
        inspecttime: this.currentDateFormat(new Date(), 'yyyy-mm-dd'),  // 检验时间
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
        // factoryid: null,    //    工厂
        repairtype: {
            id: null        //    单据类型-待定
        },
        repaircode: null,   //    返修单号-billcode
        // placeid: null,      //    场所
        // moid: null,         //    订单ID
        // workunitid: null,   //    返修工位
        // woid: null,         //    工单ID
        // workcenterid: null, //    工作中心
        qminspectrecords: {
            id: null        //    检验记录ID-待定
        },
        dispatchorder: {
            id: null        //  派工单id-dispatchorder.id
        },
        materialid: null,   //    返修-待定
        flexfieldid: null,  //    附属属性id-dispatchorder.flexfieldid
        flexfieldcode: null,    //    附属属性编号
        flexfieldname: null,    //    附属属性名称
        configno: null,         //    配置号
        // projectid: null,        //    项目id
        // wbsid: null,        //    任务号
        batch: null,        //    批次
        sn: null,           //    序列号
        qty: null,          //    数量
        state: null,        //    状态-待定
        repairstarttime: null,  //  返修开始时间-待定
        repairendtime: null,    //  返修结束时间-待定
        repairworker: {
            id: null            //  返修工人
        },
        repairmethod: {
            id: null            //  返修办法-待定
        },
        repairmethoddesc: null, //  办法描述-待定
        repairoperationrec: null,   //  返修操作记录-待定
        // sourcetype: null,       //  来源类型
        // sourceid: null, //  来源单据id
        // sourceno: null, //  来源单据号
        // sourceitemid: null, //  来源单据分录id
        // sourceitemno: null, //  来源单据分录名称
        // barcode: null,      //  条码内容
        // barqrpic: null,     //  二维码
        // seclevel: null,     //  密码级
        // signmessage: null,  //  签名后证书信息
        // cerbase64string: null,  //  base64编码格式
        // note: null,         //  备注
    };
    //  点击‘不合格品处理’时向后端传的数据格式
    putDataReject = {};


    ngOnInit() {
    }

    ionViewWillEnter() {
        // // 获取某个 id 的工序检验信息
        // this.getProcessInspectionOne(this.param);
        // //    获取‘互检人‘帮助信息
        // this.getProcessWorkers();
    }

    ionViewDidEnter() {
        // 获取某个 id 的工序检验信息
        this.getProcessInspectionOne(this.param);
        //    获取‘互检人‘帮助信息
        this.getProcessWorkers();
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }

    /**
     *@描述:获取指定 id 的 工序检验 数据
     *@函数名:getProcessInspectionOne
     */
    getProcessInspectionOne(param) {
        this.processReportService.oneProcessInspection(param).then(res => {
            console.log('res=', res);
            this.currentPageData = res;
            /************************* 将结果赋值给putData,用来完成保存功能。******************************/
            this.putDataRepair.repaircode = this.putData.billcode = res.billcode;                 // 检验单号
            this.putData.factoryid.id = res.factoryid.id;    // 工厂
            this.putData.placeid = res.placeid;      // 场所
            this.putData.workcenterid.id = res.workcenterid.id; // 工作中心
            this.putData.workunitid = res.workunitid;   // 工作单元
            this.putData.moid = res.moid; // 订单ID
            this.putData.woid.id = res.woid ? res.woid.id : null; // 工单ID
            this.putDataRepair.dispatchorder.id = this.putData.doid.id = res.doid.id; // 派工单ID
            this.putData.opnum = res.opnum;    // 工序号
            this.putData.opname = res.opname;   // 工序名称
            this.putData.materialid.id = res.materialid.id;   // 物料
            this.putData.projectid.id = res.projectid ? res.projectid.id : '';    // 项目
            this.putData.wbsid = res.wbsid;    // 任务号
            this.putData.batch = res.batch;    // 批次
            this.putData.qty = res.qty;  // 数量
            this.putData.unqualifiedqty = res.unqualifiedqty; // 不合格数量
            this.putData.qualifiedqty = res.qualifiedqty;   // 合格数量
            this.putData.qualificationrate = res.qualificationrate; // 合格率
            this.putData.teamid = res.teamid;   // 加工班组
            this.putData.workerid = res.workerid; // 加工工人
            this.putData.inspecttype.id = res.inspecttype.id;  // 检验类型
            // this.putData.inspecttime = res.inspecttime;  // 检验时间
            this.putData.inspectresultdesc = res.inspectresultdesc;    // 检验结果描述
            this.putData.state = res.state;    // 状态
            this.putData.sourceid = res.sourceid; // 来源单据ID
            this.putData.sourceno = res.sourceno; // 来源单据号


            /************************************ 将结果赋值给 putDataRepair,用来完成返工返修功能。 ***************************************/
            // this.putDataRepair.flexfieldid = res.dispatchorder.flexfieldid; // 附属属性id
            // this.putDataRepair.flexfieldcode = res.dispatchorder.flexfieldcode; //  附属属性编号
            // this.putDataRepair.flexfieldname = res.dispatchorder.flexfieldname; //  附属属性名称
            // this.putDataRepair.configno = res.dispatchorder.configno;   //  配置号
            // this.putDataRepair.batch = res.dispatchorder.batch; //  批次
            // this.putDataRepair.sn = res.dispatchorder.sn;   //  序列号
            // this.putDataRepair.qty = res.dispatchorder.qty; //  数量


            //    拿到 派工单id，向后端请求接口获取工艺路线工序信息，然后再请求接口获取工序零部件
            if (res.doid) {
                this.getQueryRoutingOperation(res.id, {doid: res.doid.id}, res.opnum);
            }

        }, err => {
            console.log('函数 getProcessInspectionOne() 请求失败！');
        });
    }

    /**
     * 获取-检验人-的帮助信息
     * getProcessingWorkers()
     */
    getProcessWorkers() {
        this.processReportService.processReportHelp().then(res => {
            console.log(' 帮助接口返回值 res = ', res);
            this.help = res;
        }, error => {
        });
    }

    /**
     * 保存
     * processForm()
     */
    processForm(event) {
        // if (!event.workcenterid.id) {
        //     event.workcenterid.id = 'c6eba5f6-a3d0-4cf8-a37d-ff5f1c2ee16f';
        // }
        if (event.inspectresult.id === null) {
            event.inspectresult.id = '0020';        //'0010'合格，'0020'不合格
        }
        if (!event.placeid) {
            event.placeid = ' ';
        }
        console.log('提交 evevt = ', event);
        // if (this.examineForm(event)) {
        this.processReportService.saveProcessInspection(event).then(res => {
        }, err => {
            console.log('函数 processForm() 出错!');
        });
        // }
    }

    /**
     * 返工返修
     *  repair()
     */
    repair(event) {
        if (!event.repairmethod.id) {
            event.repairmethod.id = ' ';
        }
        if (!event.repairtype.id) {
            event.repairtype.id = '44f5fdf5-b5a3-43aa-9879-3a70e9afee91';
        }
        if (!event.repairmethod.id) {
            event.repairmethod.id = ' ';
        }
        if (!event.qminspectrecords.id) {
            event.qminspectrecords.id = ' ';
        }
        // 将检验人赋值给repairworker
        event.repairworker.id = this.putData.inspector.id;
        console.log('返工返修 evevt = ', event);
        this.processReportService.repairProcessInspection(event).then(res => {

        }, err => {

        });
    }

    /**
     * 检查Form表单的数据格式（是否为空？正则判断？）
     * examineForm()
     */
    examineForm(event): boolean {
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
     * 不合格品处理
     * disqualification()
     */
    disqualification(event) {
        console.log('不合格品处理 evevt = ', event);
    }

    // 检验结论
    results(e) {
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
     * 将字符串格式的日期转换成Date格式
     * strToDate()
     */
    strToDate(str): any {
        const strDate = new Date(str);
        // console.log('strDate = ', strDate)
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

    // 根据派工单id获取工艺路线工序信息
    async getQueryRoutingOperation(inspectrecId, doid, opnum) {
        await this.processReportService.queryRoutingOperation(doid, opnum, this.urlParams.id).then((res) => {
            console.log('最外层 res =', res);
            if (res.length > 0) {
                //    拼接向 spreadjs 插件传递的参数
                this.queryparams = {
                    id: res[0].inspectiontemplate.id,           // 模板id
                    type: 'testing',         // 操作类型
                    inspectrecid: this.urlParams.id, // 检验记录id
                    seqnum: res[0].routingopid,       // 工序id
                    inspectitemid: res[0].id,    // 零部件id
                    state: res[0].qianduanaddstate         // 检验记录-默认0
                };
                //    控制‘点此录入检测值按钮的颜色’
                this.inputTestValueState = res[0].qianduanaddstate;
            } else if (res === false) {
                // 将 检测值 那行隐藏
                this.testValueFlag = false;
            }
        }, err => {
            alert('根据派工单id获取工艺路线工序信息出现错误！详情参考方法getQueryRoutingOperation(doid, opnum)');
        });
    }
}
