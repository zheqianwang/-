import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {NavController, IonContent} from '@ionic/angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {UrlService} from '../../../url.service';
import {ProcessReportService} from '../../../services/process_report/process-report.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-kitting-analyze',
    templateUrl: './kitting-analyze.page.html',
    styleUrls: ['./kitting-analyze.page.scss'],
})
export class KittingAnalyzePage implements OnInit {
    // @ts-ignore
    @ViewChild(IonContent) content: IonContent;

    constructor(
        public nav: NavController,
        private url: UrlService,
        private processReportService: ProcessReportService,
        private barcodeScanner: BarcodeScanner,
        private _toast: ToastService,
        private router: Router,
    ) {
    }

    // 本页面使用到的数据
    loading = true;
    KittingList;   // 查询出的所有 工单（齐套分析） 数据
    viewList;       // 显示的 reportList ，和页码页条数有关
    noData = false; // 默认页面是有数据的-骨架屏中使用
    searchValue = '';    // 搜索框中的关键字
    records = 0;    // 总条数
    text;           // 扫描的条码信息
    loadingSpinner = 'bubbles';             // 上拉加载数据时的图标
    loadingMoreText = '上拉加载更多数据...';

    drawOpen = false;   // 筛选条件的抽屉状态
    checkboxData = [
        {value: 'ordernum', name: '工单编号', checked: false},
        {value: 'mdworkcentercode', name: '工作中心名字', checked: false},
        {value: 'mdmaterialscode', name: '物料名称', checked: false},
        {value: 'billtypecode', name: '单据类型名称', checked: false},
        {value: 'placecode', name: '场所名称', checked: false},
        {value: 'sncode', name: '序列号名称', checked: false},
        {value: 'productionmode', name: '生产方式', checked: false},
        {value: 'projectwbscode', name: '任务号名称', checked: false},
        {value: 'projectcode', name: '项目名称', checked: false},
        {value: 'batch', name: '批次', checked: false},
        {value: 'issuedstate', name: '发布状态', checked: false},
        {value: 'sourcetypecode', name: '来源类型', checked: false},
        {value: 'sourceno', name: '来源单号', checked: false},
        {value: 'orderkind', name: '工单类型', checked: false}
    ];

    /******************** 以下是请求后端时拼接的参数 ********************/
    rows = 10;  // 请求的 行数
    page = 1;   // 请求的页数 第几页
    sort = 'lastmodifiedtime'; // 排序方式
    listParams = `?rows=${this.rows}&&page=${this.page}&&sort=${this.sort}`;
    params = {
        rows: 10,
        page: 1,
        sort: 'orderno',
        ordernum: '',       //    单据号
        materialname: '',  //    产品名称
        projectName: '',  //    项目名称
        opnum: '',    //    工序号
        opname: ''   //    工序名称
    };
    curfilter = {
        ordernum: null,         // 工单编号
        mdworkcentercode: null, // 工作中心名字
        mdmaterialscode: null,  // 物料名称
        billtypecode: null, // 单据类型名称
        placecode: null,    // 场所名称
        sncode: null,       // 序列号名称
        productionmode: null,   // 生产方式
        projectwbscode: null,   // 任务号名称
        projectcode: null,  // 项目名称
        batch: null,        // 批次
        issuedstate: null,  // 发布状态
        sourcetypecode: null,   // 来源类型
        sourceno: null, // 来源单号
        orderkind: null,    // 工单类型
        rows: 10,    // 每页条数
        page: 1,    // 页数
        sort: 'orderno',    // 排序
        issplit: false      // 默认
    };

    ngOnInit() {
        if (!this.searchValue) {
            this.getKittingList();
        } else {
            this.search();
        }
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }

    // 当进入一个页面时触发(如果它从堆栈返回)
    ionViewWillEnter() {
        console.log('ionViewWillEnter');
        // if (!this.searchValue) {
        //     this.getKittingList();
        // } else {
        //     this.search();
        // }
    }

    ngAfterViewInit(): void {
    }


    /**
     * getKittingList()
     * 获取 齐套分析（工单） 列表数据
     */
    getKittingList() {
        // this.processReportService.allKittingList(this.listParams).then(res => {
        this.processReportService.searchKittingList(this.curfilter).then(res => {
            if (res['rows']) {
                this.KittingList = res['rows'];
                this.records = res['records'];
                this.spliceViewList(this.KittingList);
            } else if (res === false) {
                console.log('获取齐套分析（工单）列表数据数据量为0');
                this.noData = true;
            }
        }, err => {

        });
    }

    /***
     * search()
     * 根据搜索框内容进行搜索
     */
    search(scanFlag?: boolean) {
        console.log('2、searchValue = ', this.searchValue);
        this.noData = false;
        this.curfilter.page = 1;
        this.KittingList = null;
        this.viewList = null;
        this.records = 0;
        console.log('3、search 函数中的 checkboxData = ', this.checkboxData);
        // 对筛选条件进行过滤
        this.conditionFilter(this.checkboxData);
        // ToastService.loading('加载中...', 0);
        console.log(' 5、search 函数中的 curfilter = ', this.curfilter);
        this.processReportService.searchKittingList(this.curfilter).then(res => {
            if (scanFlag && 'res返回了工单信息') {     // 如果扫描工单号，搜索到了工单信息，那么就向第二页跳转展示分析结果

                // 识别到二维码(工单号)信息后，直接跳转到第二页展示分析结果；
                alert('跳转到/tabs/tab1/kittingAnalyze/add');
                this.router.navigate(['/tabs/tab1/kittingAnalyze/add'], {
                    queryParams: {
                        id: res.id,
                        planstartdate: res.planstartdate,
                        qty: res.qty
                    }
                });
            } else {
                this.KittingList = res['rows'];
                this.records = res['records'];
                this.spliceViewList(this.KittingList);
                console.log('search-reportList = ', this.KittingList);
                // ToastService.hide();
            }
        }, err => {
        });
    }

    /**
     * 点击搜索框的‘取消’按钮的回调
     * cancel()
     */
    cancel() {
        this.curfilter.page = 1;
        this.searchValue = '';
        // 清空筛选条件-即查全部
        this.clearCheckboxData(this.checkboxData);
        this.search();
    }

    clearCheckboxData(data) {
        data.map(item => {
            if (item.checked === true) {
                item.checked = false;
            }
        });
        console.log('1、checkboxData = ', this.checkboxData);
    }

    /**
     * spliceViewList()
     * 分页后的数据
     * @param list
     */
    spliceViewList(list) {

        // 不用分页，直接将数据全都显示在页面上
        this.viewList = JSON.parse(JSON.stringify(list));
        if (this.viewList.length === 0) {
            this.viewList = '';
            this.noData = true;
        }
    }


    // 上拉加载下一页
    async doInfinite(infiniteScroll) {
        if (this.records > this.KittingList.length) {
            this.loadingMoreText = '上拉加载更多数据...';
            // console.log('开始异步操作');
            // 这里要判断搜搜框是否为空，当搜索框为空时，表示是搜索齐套分析列表（工单）的数据，否则表示有筛选条件，需要调用可另一个接口进行搜索
            // if (this.searchValue === '') {    // 请求 GET /mops/getworkorderlist 参数：'?rows=' + this.pageSize + '&page=' + this.currentIndex + '&sort=lastmodifiedtime' 接口
            //     this.page = this.page + 1;          // 请求的页数 第几页
            //     this.listParams = `?rows=${this.rows}&&page=${this.page}&&sort=${this.sort}`;
            //     await this.processReportService.allKittingList(this.listParams).then(res => {
            //         this.KittingList = this.KittingList.concat(res['rows']);
            //         this.records = res['records'];
            //         // 显示分页数据
            //         this.spliceViewList(this.KittingList);
            //         // console.log('异步操作已经结束');
            //         infiniteScroll.target.complete();
            //     }, err => {
            //     });
            // } else {    // 请求 工单查询接口：POST /mops/workordersfilters 请求参数参考 curfilter = { rows: this.pageSize, page: this.currentIndex, sort: 'orderno' }
            // this.params.page += 1;
            this.curfilter.page += 1;
            this.processReportService.searchKittingList(this.curfilter).then(res => {
                this.KittingList = this.KittingList.concat(res['rows']);
                this.records = res['records'];
                // 显示分页数据
                this.spliceViewList(this.KittingList);
                // console.log('异步操作已经结束');
                infiniteScroll.target.complete();
            }, err => {

            });
            // }

        } else {
            this.loadingSpinner = 'null';
            this.loadingMoreText = '没有更多数据了...';
            setTimeout(() => {
                infiniteScroll.target.complete();
            }, 1000);
        }


    }


    /**
     * scan()
     * 扫描
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

                // this.params.ordernum = this.text;
                this.searchValue = this.text;
                this.checkboxData.map(item => {
                    // if (item.value === 0) {  // 单据号
                    //     item.checked = true;
                    // } else {
                    //     item.checked = false;
                    // }
                });
                alert('筛选框数据更改为选中单据号，并且进行search()方法调用');
                this.search(true);
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


    // 打开或者关闭筛选抽屉-暂时用不到
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
    conditionFilter(checkBoxData) {
        checkBoxData.map(item => {
            if (item.checked) { // 如果被选中了
                if (item.value === 'ordernum') { // 工单编号
                    this.curfilter.ordernum = this.searchValue;
                }
                if (item.value === 'mdworkcentercode') { // 工作中心名字
                    this.curfilter.mdworkcentercode = this.searchValue;
                }
                if (item.value === 'mdmaterialscode') { // 物料名称
                    this.curfilter.mdmaterialscode = this.searchValue;
                }
                if (item.value === 'billtypecode') { // 单据类型名称
                    this.curfilter.billtypecode = this.searchValue;
                }
                if (item.value === 'placecode') { // 场所名称
                    this.curfilter.placecode = this.searchValue;
                }
                if (item.value === 'sncode') { // 序列号名称
                    this.curfilter.sncode = this.searchValue;
                }
                if (item.value === 'productionmode') { // 生产方式
                    this.curfilter.productionmode = this.searchValue;
                }
                if (item.value === 'projectwbscode') { // 任务号名称
                    this.curfilter.projectwbscode = this.searchValue;
                }
                if (item.value === 'projectcode') { // 项目名称
                    this.curfilter.projectcode = this.searchValue;
                }
                if (item.value === 'batch') { // 批次
                    this.curfilter.batch = this.searchValue;
                }
                if (item.value === 'issuedstate') { // 发布状态
                    this.curfilter.issuedstate = this.searchValue;
                }
                if (item.value === 'sourcetypecode') { // 来源类型
                    this.curfilter.sourcetypecode = this.searchValue;
                }
                if (item.value === 'sourceno') { // 来源单号
                    this.curfilter.sourceno = this.searchValue;
                }
                if (item.value === 'orderkind') { // 工单类型
                    this.curfilter.orderkind = this.searchValue;
                }
            } else {
                this.curfilter[item.value] = null;
            }

        });
        console.log(' 4、筛选后 curfilter = ', this.curfilter);
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
