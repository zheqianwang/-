import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UrlService} from '../url.service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';
import {ToastService} from 'ng-zorro-antd-mobile';
import {ProcessReportService} from '../services/process_report/process-report.service';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    constructor(
        public nav: NavController,
        private url: UrlService,
        private processReportService: ProcessReportService,
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
            // this.search();
        }
    }

    // 返回上一页
    back() {
        ToastService.hide();
        this.nav.pop();
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
     * 向第二页跳转
     * skip()
     * @param item
     */
    skip(item: any) {
        this.router.navigate(['add-or-edit'], {queryParams: {id: item.id, planstartdate: item.planstartdate, qty: item.qty}});
        // [queryParams] = '{id: item.id, planstartdate: item.planstartdate, qty: item.qty}';
    }
}
