import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ProcessReportService} from 'src/app/services/process_report/process-report.service';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-add-handover',
    templateUrl: './add-handover.page.html',
    styleUrls: ['./add-handover.page.scss'],
})
export class AddHandoverPage implements OnInit {

    constructor(
        public nav: NavController,
        public activeRouter: ActivatedRoute, // 必须
        private _toast: ToastService,
        private processReportService: ProcessReportService
    ) {
        // 获取url中的参数
        this.activeRouter.queryParams.subscribe(params => {
            console.log('url 参数 params = ', params);
            console.log('移入派工单id = ', params.id);
            this.putData.outdoid = params.id;   // 移入派工单id -> 移出派工单id（来源于派工单中的json串）
            // this.urlParams = `?dispatchorderid=${params.id}`;
            this.urlParams = params.id;
        });
    }

    // 本页面使用到的数据
    currentPageData;  // 当前页面上的数据
    urlParams;  // url传来的参数
    help; // ‘接收人’的帮助接口返回值
    saveBtnState = true;  // 保存按钮是否可以点击。当该条记录是‘完工’状态时，该按钮不能交互
    // 向后端接口保存的数据格式
    putData = {
        outdoid: null, // 移入派工单id -> 移出派工单id（来源于派工单中的json串）
        outwoid: null,      // 移入工单id -> 移出工单id（来源于派工单中的json串）
        outopid: null,      // -> 移出工序ID（来源于派工单中的json串）
        outopnum: null,     // -> 移出工序号（来源于派工单中的json串）
        outopname: null,    // -> 移出工序名称（来源于派工单中的json串）
        factoryid: null,    // 工厂（来源于派工单中的json串）
        billtype: null,     // 单据类型（来源于派工单中的json串）
        moid: null,         // 订单id（来源于派工单中的json串）
        materialid: null,   // 物料（来源于派工单中的json串）
        projectid: null,    // 项目（来源于派工单中的json串）
        wbsid: null,        // 任务号 （来源于派工单中的json串）
        batch: null,        // 批次（来源于派工单中的json串）
        outmobdpersoninfo: {
            id: null        // 移交人
        },
        qty: null,  //  移交数量
        inopnum: null,  //  移入工序号
        inopname: null, //  移入工序名称
        //  移入工作中心
        //  移入班组
        inmobdpersoninfo: {
            id: null      //  接收人
        },
        note: null //  备注
    };

    ngOnInit() {
    }

    ionViewWillEnter() {
        // this.getProcessHandoverOne(this.urlParams);   // 获取指定id的工序交接数据
        // this.getRecipient();                          // 获取 ‘接收人’的帮助
    }

    ionViewDidEnter() {

        this.getProcessHandoverOne(`?dispatchorderid=${this.urlParams}`);   // 获取指定id的工序交接数据
        this.getRecipient();                          // 获取 ‘接收人’的帮助
        this.getNextOperation(`?dispatchorderid=${this.urlParams}`);    // 交接获取下道工序/派工单
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }

    /**
     * 获取移入工序等的信息-交接获取下道工序
     * getNextOperation()
     */
    getNextOperation(id) {
        this.processReportService.getNextOperation(id).then(res => {
            console.log('获取下道工序返回值res=', res);
            // 如果返回list的长度为1并且isexist为false那就是完工工序或者工艺路线里找不到下一道工序
            if ((res.length === 0) || (res && res.length === 1 && res[0] ? res[0].isexist === 'fasle' : false)) {
                this.saveBtnState = false;
            } else {
                this.saveBtnState = true;
                this.putData.inopnum = res[0].opnum;    // 移入工序号
                this.putData.inopname = res[0].opname;    // 移入工序名称
            }
        }, err => {
        });
    }

    /**
     * getProcessHandoverOne()
     * 获取指定id的 工序交接 数据
     */
    getProcessHandoverOne(id) {
        this.processReportService.oneProcessHandover(id).then(res => {
            console.log('res=', res);
            // 将 派工单中的部分数据 保存到 putData 字中，因为在保存时，要用到这部分数据。
            this.putData.outdoid = res.id;   // 移入派工单id -> 移出派工单id（来源于派工单中的json串）
            this.putData.outwoid = res.mdworkorder ? res.mdworkorder.id : null;      // 移入工单id -> 移出工单id（来源于派工单中的json串）
            this.putData.outopid = res.opid;      // -> 移出工序ID（来源于派工单中的json串）
            this.putData.outopnum = res.opnum;     // -> 移出工序号（来源于派工单中的json串）
            this.putData.outopname = res.opname;    // -> 移出工序名称（来源于派工单中的json串）
            this.putData.factoryid = res.mdfactory ? res.mdfactory.id : null;    // 工厂（来源于派工单中的json串）
            this.putData.billtype = res.billtype;     // 单据类型（来源于派工单中的json串）
            this.putData.moid = res.moid;         // 订单id（来源于派工单中的json串）
            this.putData.materialid = res.mdmaterials ? res.mdmaterials.id : null;   // 物料（来源于派工单中的json串）
            this.putData.projectid = res.mdproject ? res.mdproject.id : null;    // 项目（来源于派工单中的json串）
            this.putData.wbsid = res.mdprojectwbs ? res.mdprojectwbs.id : null;        // 任务号 （来源于派工单中的json串）
            this.putData.batch = res.batch;        // 批次（来源于派工单中的json串）
            this.currentPageData = res;
        }, err => {
        });

    }

    /**
     * 获取-接收人-的帮助信息
     * getRecipient()
     */
    getRecipient() {
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
        console.log('交接保存 evevt = ', event);
        // if (this.examineForm(event)) {
        this.processReportService.saveProcessHandover(event).then(res => {
            // console.log('交接 res = ', res);
            // ToastService.success('保存成功!');
        }, err => {
            console.log('函数 processForm() 出错!');
            ToastService.fail('保存失败!');
        });
        // }

    }

    /**
     * examineForm()
     * 检查Form表单的数据格式（是否为空？正则判断？）
     */
    examineForm(event): boolean {
        if (!event.handover_number) {  // 移交数量
            ToastService.offline('移交数量不能为空 !!!', 1000);
            return false;
        }
        if (!event.move_in_process_id) {  // 移入工序号
            ToastService.offline('移入工序号不能为空 !!!', 1000);
            return false;
        }
        if (!event.move_in_process_name) {  // 移入工序名称
            // this.toast.errorToast('移入工序名称不能为空!')
            ToastService.offline('移入工序名称不能为空 !!!', 1000);
            return false;
        }
        // if (!event.move_in_work_center) {  // 移入工作中心
        //     ToastService.offline('移入工作中心不能为空 !!!', 1000);
        //     return false;
        // }
        // if (!event.move_in_group) {  // 移入班组
        //     ToastService.offline('移入班组不能为空 !!!', 1000);
        //     return false;
        // }
        if (!event.receiver) {  // 接收人
            ToastService.offline('接收人不能为空 !!!', 1000);
            return false;
        }
        if (!event.remarks) {  // 备注
            ToastService.offline('备注不能为空 !!!', 1000);
            return false;
        }
        return true;
    }


    /**
     * transfer()
     * 移交
     */
    transfer() {

    }


}
