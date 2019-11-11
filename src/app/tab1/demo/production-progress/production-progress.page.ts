import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, NavController} from '@ionic/angular';
import {ProcessReportService} from 'src/app/services/process_report/process-report.service';
import {ToastService} from 'ng-zorro-antd-mobile';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
    selector: 'app-production-progress',
    templateUrl: './production-progress.page.html',
    styleUrls: ['./production-progress.page.scss'],
})
export class ProductionProgressPage implements OnInit {
    // @ts-ignore
    @ViewChild(IonContent) content: IonContent;
    constructor(
        public nav: NavController,
        private processReportService: ProcessReportService,
        private barcodeScanner: BarcodeScanner,
        private _toast: ToastService,
    ) {
    }

    // 本页面使用到的数据
    loading = true;
    productionProgressList;  // 查询出的所有 生产进度 数据
    viewList;                // 显示的 productionProgressList ，和页码页条数有关
    noData = false; // 默认页面是有数据的-骨架屏中使用
    searchValue = '';    // 搜索框中的关键字
    // total = 1;               // 总页数
    text;           // 扫描的条码信息
    records = 0;    // 总条数
    // current = 1;             // 当前页码
    loadingSpinner = 'bubbles';             // 上拉加载数据时的图标
    loadingMoreText = '上拉加载更多数据...';
    drawOpen = false;   // 筛选条件的抽屉状态
    checkboxData = [
        // {value: 0, name: '单据号', checked: false, param: 'ordernum'},
        // {value: 1, name: '产品名称', checked: true, param: 'materialname'},
        // {value: 2, name: '项目名称', checked: false, param: 'projectName'},
        {value: 5, name: '检验单号', checked: false, param: 'billcode'},
        {value: 3, name: '工序号', checked: true, param: 'opnum'},
        {value: 4, name: '工序名称', checked: false, param: 'opname'}
    ];
    /*******************************************************/
    params = {
        filter: {
            inspecttype: '0010'
        },
        rows: 10,
        page: 1
    };

    ngOnInit() {
        if (!this.searchValue) {
            this.getproductionProgressList();
        } else {
            this.search();
        }
    }

    // 当进入一个页面时触发(如果它从堆栈返回)
    ionViewWillEnter() {
        console.log('ionViewWillEnter');
        // if (!this.searchValue) {
        //     this.getproductionProgressList();
        // } else {
        //     this.search();
        // }
    }

    // 返回上一页
    back() {
        // this.drawOpen = false;
        ToastService.hide();
        // setTimeout(() => {
        this.nav.pop();
        // }, 1);
    }

    /**
     * getproductionProgressList()
     * 获取 生产进度 列表数据
     */
    getproductionProgressList() {
        this.processReportService.allProductionProgressList(this.params).then(res => {
            if (res['rows']) {
                this.productionProgressList = res['rows'];
                this.records = res['records'];
                this.spliceViewList(this.productionProgressList);
            } else if (res === false) {
                console.log('获取生产进度列表数据数据量为0');
                this.noData = true;
            }
        }, err => {
        });
    }

    /***
     * search()
     * 根据搜索框内容进行搜索
     */
    search() {
        console.log('searchValue = ', this.searchValue);
        this.noData = false;
        this.params.page = 1;
        this.params.rows = 10;
        this.productionProgressList = null;
        this.viewList = null;
        this.records = 0;
        ToastService.loading('加载中...', 0);
        if ((this.searchValue !== null) && (this.searchValue !== '') && this.judgeRadio(this.checkboxData)) {
            // 执行筛选查询
            this.conditionFilter(this.checkboxData);
        } else if ((this.searchValue !== null) && (this.searchValue !== '') && !this.judgeRadio(this.checkboxData)) {
            ToastService.offline('请选择筛选条件过滤', 0);
        } else {
            //    执行全部查询
            this.params = {
                filter: {
                    inspecttype: '0010'
                },
                rows: 10,
                page: 1
            };
        }

        this.processReportService.allProductionProgressList(this.params).then(res => {
            this.productionProgressList = res['rows'];
            this.records = res['records'];
            this.spliceViewList(this.productionProgressList);
            // console.log('search-reportList = ', this.productionProgressList);
            ToastService.hide();
        }, err => {
        });
    }

    /**
     * 判断有无选中筛选条件
     * judgeRadio()
     * @param obj
     */
    judgeRadio(obj): boolean {
        let flag = false;
        obj.map(item => {
            if (item.checked === true) {
                flag = true;
            }
        });
        return flag;
    }

    /**
     * 点击搜索框的‘取消’按钮的回调
     * cancel()
     */
    cancel() {
        this.params.page = 1;
        this.searchValue = '';
        this.search();
    }

    /**
     * spliceViewList()
     * 分页后的数据
     */
    spliceViewList(list) {
        // 不用分页，直接将数据全都显示在页面上
        this.viewList = JSON.parse(JSON.stringify(list));
        if (this.viewList.length === 0) {
            this.viewList = '';
            this.noData = true;
        }
    }


    /**
     * 扫描
     * scan()
     */
    scan() {
        // alert('Barcode');
        this.barcodeScanner.scan().then(barcodeData => {
            // console.log('Barcode data', barcodeData);
            alert('Barcode data' + JSON.stringify(barcodeData));
            if (barcodeData.text !== '') {   // 识别到条码数据
                this.text = barcodeData.text;
                if (barcodeData.format === 'EAN_13') { // 识别到条形码
                    alert('识别结果为 条形码，数据为 ' + this.text);
                } else if (barcodeData.format === 'QR_CODE') {  // 识别到二维码
                    alert('识别结果为 二维码，数据为 ' + this.text);
                }
            }
            if (barcodeData.cancelled) {  // 用户点了取消识别
                // 页面不要进行跳转
                // this.nav.pop();
            }
        }).catch(err => {
            console.log('Error', err);
            alert('Error' + err);
        });
    }


    // 上拉加载下一页
    async doInfinite(infiniteScroll) {
        if (this.records > this.viewList.length) {
            this.loadingMoreText = '上拉加载更多数据...';
            // console.log('开始异步操作');
            this.params.page = this.params.page + 1;   // 请求的页数 第几页
            // this.params = `?rows=${this.rows}&&page=${this.page}&&sort=${this.filter}`;
            console.log('params = ', this.params);
            await this.processReportService.allProcessInspection(this.params).then(res => {
                this.productionProgressList = this.productionProgressList.concat(res['rows']);
                this.records = res['records'];
                // 显示分页数据
                this.spliceViewList(this.productionProgressList);
                console.log('异步操作已经结束');
                infiniteScroll.target.complete();
            }, err => {
            });
        } else {
            this.loadingSpinner = 'null';
            this.loadingMoreText = '没有更多数据了...';
            setTimeout(() => {
                infiniteScroll.target.complete();
            }, 1000);
        }


    }

    // 打开或者关闭筛选抽屉-暂时不用
    onOpenChange(event) {
        console.log(event);

        // if (this.drawOpen && this.searchValue) {
        //     this.search();
        // }
        if (event === true) {
            this.search();
        }
        this.drawOpen = !this.drawOpen;

    }

    /**
     * 对筛选条件进行过滤
     * conditionFilter()
     * @params checkBoDdata 中的数据
     */
    conditionFilter(checkBoDdata) {
        checkBoDdata.map(item => {
            if (item.checked) { // 如果被选中了
                if (item.value === 3) {      // 工序号
                    this.params.filter['opnum'] = this.searchValue;
                }
                if (item.value === 4) {      // 工序名称
                    this.params.filter['opname'] = this.searchValue;
                }
                if (item.value === 5) {      // 检验单号
                    this.params.filter['billcode'] = this.searchValue;
                }
            }
        });
        // console.log(' 筛选后 params = ', this.params);
    }

    /**
     * 打开侧边筛选菜单
     * openMenu()
     */
    openMenu() {
        document.querySelector('ion-menu')
            .open();
    }

    /**
     * 筛选框关闭后执行
     * filter()
     */
    filter() {
        console.log('this.checkboxData = ', this.checkboxData);
        //    如果搜索框中有内容就进行搜索，否则就不进行搜索
        if (this.searchValue != null && this.searchValue !== '') {
            this.search();
        }
    }


    /**
     * 返回顶部
     * backToTop()
     */
    backToTop() {
        this.content.scrollToTop(0);
    }

}
