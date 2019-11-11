import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ProcessReportService} from 'src/app/services/process_report/process-report.service';
import {ToastService} from 'ng-zorro-antd-mobile';


@Component({
    selector: 'app-add-report',
    templateUrl: './add-report.page.html',
    styleUrls: ['./add-report.page.scss'],
})
export class AddReportPage implements OnInit {

    constructor(
        public nav: NavController,
        public activeRouter: ActivatedRoute, // 必须
        public alertController: AlertController,
        private processReportService: ProcessReportService,
        private _toast: ToastService,
    ) {
        // ToastService.loading('加载中...');
        this.activeRouter.queryParams.subscribe(params => {
            console.log('url 参数 params = ', JSON.stringify(params));
            this.dispatchorderId = JSON.parse(JSON.stringify(params)).id;  // 报工单号
            console.log('报工单号 = ', this.dispatchorderId);
            this.urlParams = `?dispatchorderid=${params.id}`;
        });
    }

    // 本页面使用到的数据
    currentPageData;  // 当前页面上的数据
    help; // ‘加工工人’‘自检人’‘互检人’的帮助接口返回值
    equipmentHelp; // '加工设备'的帮助接口返回值
    urlParams;  // url传来的参数
    dispatchorderId; // 报工单号
    saveBtnState = true;    // 保存按钮的状态，默认可以点击
    putData = {
        dispatchorder: {
            id: null,                // 报工单号
            dataversion: null
        },
        qty: null,                  // 完成数量
        operationtype: '3',        // 操作类型
        // noqualifiedqty: null,       // 不合格数量
        // workwasteqty: null,         // 工废数量
        // materialwasteqty: null,     // 废料数量
        // personinfo: {
        //     id: null,               //    加工工人id
        // },
        worker: null,                 //    加工工人名字
        workerid: null,               // 加工工人id
        equip: null,                //    加工设备名称
        equipid: null,                //    加工设备id
        selfchecker: {
            id: null
        },          //    自检人
        mutualchecker: {
            id: null
        },        //    互检人
        selfchecktime: this.currentDateFormat(new Date(), 'yyyy-mm-dd'),  //    自检日期
        mutualchecktime: this.currentDateFormat(new Date(), 'yyyy-mm-dd'), //    互检日期
        mdworkcenter: {
            id: null                // 工厂id
        },
        mofmplace: null,            //
        mdfactory: null             //  工厂名
    };

    ngOnInit() {
        // // 从后端获取对应id的‘工序报工’单条数据
        // this.getProcessReportOne(this.urlParams);
        // // ‘加工工人’‘自检人’‘互检人’向后端请求接口是同一个
        // this.getProcessWorkers();   // 获取-加工工人
        // //    加工设备 帮助接口
        // this.getEquipment();    // 获取-加工设备
    }

    ionViewWillEnter() {
        // // 从后端获取对应id的‘工序报工’单条数据
        // this.getProcessReportOne(this.urlParams);
        // // ‘加工工人’‘自检人’‘互检人’向后端请求接口是同一个
        // this.getProcessWorkers();   // 获取-加工工人
        // //    加工设备 帮助接口
        // this.getEquipment();    // 获取-加工设备
    }

    ionViewDidEnter() {
        // 从后端获取对应id的‘工序报工’单条数据
        this.getProcessReportOne(this.urlParams);
        // ‘加工工人’‘自检人’‘互检人’向后端请求接口是同一个
        this.getProcessWorkers();   // 获取-加工工人
        //    加工设备 帮助接口
        this.getEquipment();    // 获取-加工设备
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }

    /**
     * 获取指定id的 工序报工 数据
     * getProcessReportOne()
     */
    getProcessReportOne(id) {
        this.processReportService.oneProcessReport(id).then(res => {
            console.log('res=', res);
            this.currentPageData = res;
            // this.putData.qualifiedqty = this.currentPageData.qualifiedqty;      //  合格数量
            // this.putData.noqualifiedqty = this.currentPageData.noqualifiedqty;  //  不合格数量
            // this.putData.workwasteqty = this.currentPageData.workwasteqty;      //  工废数量
            // this.putData.materialwasteqty = this.currentPageData.materialwasteqty;  //  废料数量
        }, err => {
        });

    }

    /**
     * 加工工人-多选
     * workerChange()
     */
    workerChange(e) {
        this.putData.worker = '';
        this.putData.workerid = '';
        if (Array.isArray(e.detail.value)) {
            const eWork = e.detail.value;
            // console.log('eWork = ', eWork);
            eWork.map((key, index) => {
                // console.log('key = ', key);
                // console.log('index = ', index);
                this.help.map((item) => {
                    if (item.id === key) {
                        this.putData.worker += (item.name + ',');
                        this.putData.workerid += (item.id + ',');
                    }
                });
            });
        }
        // 去掉报工工人 最后一位‘，’字符
        this.putData.worker = this.putData.worker.substring(0, this.putData.worker.length - 1);
        this.putData.workerid = this.putData.workerid.substring(0, this.putData.workerid.length - 1);
        console.log('this.putData = ', this.putData);
    }

    /**
     * 加工设备-多选
     * equChange()
     * @param e
     */
    equChange(e) {
        this.putData.equip = '';
        this.putData.equipid = '';
        // console.log('e = ', e.detail.value);
        if (Array.isArray(e.detail.value)) {
            const eHelp = e.detail.value;
            eHelp.map((key, index) => {
                this.equipmentHelp.map((val, i) => {
                    if (val.id === key) {
                        this.putData.equip += (val.name + ',');
                        this.putData.equipid += (val.id + ',');
                    }
                });
            });
            // 去掉加工设备 最后一位‘，’字符
            this.putData.equipid = this.putData.equipid.substring(0, this.putData.equipid.length - 1);
            this.putData.equip = this.putData.equip.substring(0, this.putData.equip.length - 1);
            console.log('putData = ', this.putData);
        }
    }

    /**
     * 获取-加工工人,自检人，互检人-的帮助信息
     * getProcessingWorkers()
     */
    getProcessWorkers() {
        this.processReportService.processReportHelp().then(res => {
            console.log(' 加工工人帮助接口返回值 res = ', res);
            this.help = res;
        }, error => {
        });
    }

    /**
     * 获取-加工设备的帮助信息
     * getEquipment()
     */
    getEquipment() {
        this.processReportService.equipmentHelp().then(res => {
            console.log(' 加工设备帮助接口返回值 res = ', res);
            this.equipmentHelp = res;
        }, error => {
        });
    }

    /**
     * 保存
     * processForm()
     */
    processForm(event) {
        event.dispatchorder.id = this.dispatchorderId;   // 派工单id
        event.dispatchorder.dataversion = this.currentPageData.dataversion;
        event.mdworkcenter.id = this.currentPageData.mdworkcenter.id;   // 工厂id
        event.mdfactory = this.currentPageData.mdfactory;   // 工厂名
        event.mofmplace = this.currentPageData.mofmplace;   //
        console.log('工序报工 提交 evevt = ', JSON.parse(JSON.stringify(event)));
        // if (this.examineForm(event)) {
        this.processReportService.saveProcessReport(event).then(res => {
            console.log('工序报工保存返回res == ', res);
            if (res.state === 200) {
                ToastService.success(res.msg);
                // 保存按钮不能再次点击
                this.saveBtnState = false;
            } else {
                ToastService.fail(res.msg);
            }
        }, err => {
            console.log('函数 processForm() 出错!');
            // ToastService.fail('保存失败!');
        });
        // }

    }

    /**
     * 保存并移交
     * saveAndTransfer()
     */
    saveAndTransfer(event) {
        console.log('保存并移交 evevt = ', event);

        try {
            // 保存
            this.processForm(event);
            // 移交
            this.transfer();
        } catch {
            // this.toast.errorToast('操作错误!')
            ToastService.fail('操作错误 !', 1000);
        }

    }

    /**
     * transfer()
     * 移交
     */
    transfer() {

    }

    /**
     * examineForm()
     * 检查Form表单的数据格式（是否为空？正则判断？）
     */
    examineForm(event): boolean {
        // 完成数量
        if (!event.qty) {
            ToastService.offline('完成数量不能为空 !!!', 1000);
            return false;
        }
        // 加工工人
        if (!event.worker) {
            // this.toast.errorToast('加工工人不能为空!')
            ToastService.offline('加工工人不能为空 !!!', 1000);
            return false;
        }
        // 加工设备
        if (!event.equipid) {
            // this.toast.errorToast('加工设备不能为空!')
            ToastService.offline('加工设备不能为空 !!!', 1000);
            return false;
        }
        // 自检人
        if (!event.selfchecker) {
            // this.toast.errorToast('自检人不能为空!')
            ToastService.offline('自检人不能为空 !!!', 1000);
            return false;
        }
        // 自检日期
        if (!event.selfchecktime) {
            // this.toast.errorToast('自检日期不能为空!')
            ToastService.offline('自检日期不能为空 !!!', 1000);
            return false;
        }
        // 互检人
        if (!event.mutualchecker) {
            ToastService.offline('互检人不能为空 !!!', 1000);
            return false;
        }
        // 互检日期
        if (!event.mutualchecktime) {
            // this.toast.errorToast('互检日期不能为空!')
            ToastService.offline('互检日期不能为空 !!!', 1000);
            return false;
        }
        return true;
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
        console.log('onOK = ', result);
        if (str === '自检日期') {
            this.putData.selfchecktime = this.currentDateFormat(result, 'yyyy-mm-dd');
        }
        if (str === '互检日期') {
            this.putData.mutualchecktime = this.currentDateFormat(result, 'yyyy-mm-dd');
        }

    }


}
