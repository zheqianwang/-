import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {IonContent, NavController, PopoverController} from '@ionic/angular';
import {PopoverPage} from './popover/popover.page';
import {ProcessReportService} from 'src/app/services/process_report/process-report.service';
import {Router} from '@angular/router';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {ToastService} from 'ng-zorro-antd-mobile';


@Component({
    selector: 'app-process-report',
    templateUrl: './processReport.page.html',
    styleUrls: ['./processReport.page.scss'],
})
export class ProcessReportPage implements OnInit, AfterViewInit {
    // @ts-ignore
    @ViewChild(IonContent) content: IonContent;

    constructor(
        public nav: NavController,
        private popoverController: PopoverController,
        private processReportService: ProcessReportService,
        private router: Router,
        private barcodeScanner: BarcodeScanner,
        private _toast: ToastService,
    ) {
    }

    checkboxData = [
        {value: 0, name: '单据号', checked: false, param: 'ordernum'},
        {value: 1, name: '产品名称', checked: true, param: 'materialname'},
        {value: 2, name: '项目名称', checked: false, param: 'projectName'},
        {value: 3, name: '工序号', checked: false, param: 'opnum'},
        {value: 4, name: '工序名称', checked: false, param: 'opname'}
    ];
    drawOpen = false;   // 筛选条件的抽屉状态

    // 本页面使用到的数据
    loading = true;
    reportList;   // 查询出的所有 工序报工 数据
    viewList;       // 显示的 reportList ，和页码页条数有关
    noData = false; // 默认页面是有数据的-骨架屏中使用
    searchValue = '';    // 搜索框中的关键字
    total = 0;      // 总页数
    records = 0;    // 总条数
    current = 1;    // 当前页码
    text;           // 扫描的条码信息
    loadingSpinner = 'bubbles';             // 上拉加载数据时的图标
    loadingMoreText = '上拉加载更多数据...';
    /******************** 以下是请求后端时拼接的参数 ********************/
        // rows = 10;  // 请求的 行数
        // page = 1;   // 请求的页数 第几页
        // sort = 'opnum'; // 排序方式
        // params = `?rows=${this.rows}&&page=${this.page}&&sort=${this.sort}`;
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

    /**
     * Ionic4中内置的生命周期函数：
     * ionViewWillEnter —当进入一个页面时触发(如果它从堆栈返回)
     * ionViewDidEnter —进入后触发
     * ionViewWillLeave —如果页面将离开触发
     * ionViewDidLeave — 在页面离开后触发
     * ionViewWillUnload — 在Angular中没有触发，因为这里你必须使用ngOnDestroy
     */

    ngOnInit() {
        if (!this.searchValue) {
            this.getProcessReportList();
        } else {
            // this.search();
        }
    }


    // 当进入一个页面时触发(如果它从堆栈返回)
    ionViewWillEnter() {
        // console.log('ionViewWillEnter');
        // if (!this.searchValue) {
        //     this.getProcessReportList();
        // } else {
        //     this.search();
        // }
    }

    ngAfterViewInit(): void {
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
    }


    /**
     * getProcessReportList()
     * 获取 工序报工 数据
     */
    getProcessReportList() {
        console.log('params = ', this.params);
        this.processReportService.allProcessReport(this.params).then(res => {
            if (res['rows']) {
                this.reportList = res['rows'];
                this.records = res['records'];
                // 显示分页数据
                this.spliceViewList(this.reportList);
            } else if (res === false) {
                console.log('返回数据量为0');
                this.noData = true;
            } else if (res === 'NoToken') {
                console.log('未在本地获取到token');
                this.noData = true;
            }
        }, err => {
            this.noData = true;
        });
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
        console.log(' viewList = ', this.viewList);
    }

    /**
     * 对筛选条件进行过滤
     * conditionFilter()
     * @params checkBoDdata 中的数据
     */
    conditionFilter(checkBoDdata) {
        this.params.page = 1;
        this.params.rows = 10;
        this.params.ordernum = '';
        this.params.materialname = '';
        this.params.projectName = '';
        this.params.opnum = '';
        this.params.opname = '';
        checkBoDdata.map(item => {
            if (item.checked) { // 如果被选中了
                if (item.value === 0) {      // 单据号
                    this.params.ordernum = this.searchValue;
                }
                if (item.value === 1) {      // 产品名称
                    this.params.materialname = this.searchValue;
                }
                if (item.value === 2) {      // 项目名称
                    this.params.projectName = this.searchValue;
                }
                if (item.value === 3) {      // 工序号
                    this.params.opnum = this.searchValue;
                }
                if (item.value === 4) {      // 工序名称
                    this.params.opname = this.searchValue;
                }
            }
        });
        console.log(' 筛选后 params = ', this.params);
    }

    /***
     * search()
     * 根据搜索框内容进行搜索
     */
    search() {
        console.log('searchValue = ', this.searchValue);
        this.noData = false;
        this.params.page = 1;
        this.reportList = null;
        this.viewList = null;
        this.records = 0;

        // 对筛选条件进行过滤
        this.conditionFilter(this.checkboxData);
        ToastService.loading('加载中...', 0, null, false);
        this.processReportService.allProcessReport(this.params).then(res => {
            this.reportList = res['rows'];
            this.records = res['records'];
            this.spliceViewList(this.reportList);
            console.log('search-reportList = ', this.reportList);
            ToastService.hide();
        }, err => {
        });
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
                // 识别到二维码信息后，根据单据号进行过滤,因为在search()方法中有过滤，所以可以将 checkboxData 数据进行修改
                this.params.ordernum = this.text;
                this.searchValue = this.text;
                this.checkboxData.map(item => {
                    if (item.value === 0) {  // 单据号
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                });
                alert('筛选框数据更改为选中单据号，并且进行search()方法调用');
                this.search();
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


    // 暂时不用
    // async presentPopover(ev: any) {
    //     const popover = await this.popoverController.create({
    //         component: PopoverPage,
    //         event: ev,
    //         translucent: true
    //     });
    //     return await popover.present();
    // }

    // 上拉加载下一页
    async doInfinite(infiniteScroll) {
        console.log('分页 records=', this.records);
        console.log('分页 viewList=', this.viewList);
        if (this.records > this.viewList.length) {
            this.loadingMoreText = '上拉加载更多数据...';
            // console.log('开始异步操作');
            // this.page = this.page + 1;          // 请求的页数 第几页
            // this.params = `?rows=${this.rows}&&page=${this.page}&&sort=${this.sort}`;
            this.params.page = this.params.page + 1;
            console.log('分页 参数 = ', this.params);
            await this.processReportService.allProcessReport(this.params).then(res => {
                this.reportList = this.reportList.concat(res['rows']);
                this.records = res['records'];
                // 显示分页数据
                this.spliceViewList(this.reportList);
                // console.log('异步操作已经结束');
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

    /**
     * 判断是否有开工、报工数量，如果数量为0就不进下一个页面了。
     * nextPage()
     * @param id
     */
    nextPage(id: any) {
        console.log('判断是否进入下一页面 id= ', id);
        const param = `?doid=${id}&operationtype=0`;
        this.processReportService.judgeNextPage(param).then(res => {
            console.log('判断是否进入下一页面 res= ', res);
            if (res.data <= 0 || res.data === '0') {
                //    不可以进入编制界面
                ToastService.offline('/mops/execumax接口返回值不支持进入下一页面');
            } else {
                //    可以进入编制界面进行保存
                const idnew = id;
                this.router.navigate(['/tabs/tab1/processReport/add'], {
                    queryParams: {
                        id: idnew
                    }
                });
            }
        }, err => {
            console.log('判断是否进入下一页面 err= ', err);
        });
        //    [routerLink]="['add']" [queryParams]="{id: item.id}"
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
