import {Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {IonContent, NavController, PopoverController} from '@ionic/angular';
import {UrlService} from '../../../url.service';
import {DocumentReviewService} from 'src/app/services/document_review/document-review.service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {ToastService} from 'ng-zorro-antd-mobile';
import {Router} from '@angular/router';
import {Downloader, DownloadRequest, NotificationVisibility} from '@ionic-native/downloader/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {PreviewAnyFile} from '@ionic-native/preview-any-file/ngx';

// 第一版文件预览使用的
// const sourceDir = 'file:///storage/emulated/0/Android/data/io.ionic.starter/files/Downloads/';

@Component({
    selector: 'app-fileReference',
    templateUrl: './fileReference.page.html',
    styleUrls: ['./fileReference.page.scss'],
})
export class FileReferencePage implements OnInit {
    // @ts-ignore
    @ViewChild(IonContent) content: IonContent;

    constructor(
        public nav: NavController,
        private url: UrlService,
        private popoverController: PopoverController,
        private documentReviewService: DocumentReviewService,
        private _element: ElementRef,
        private barcodeScanner: BarcodeScanner,
        private router: Router,
        private downloader: Downloader,
        private fileOpener: FileOpener,
        private file: File,
        private filePath: FilePath,
        private previewAnyFile: PreviewAnyFile,
    ) {
    }

    // 本页面使用到的数据
    loading = true;
    documentList;   // 查询出的所有文档数据
    viewList;       // 显示的 documentList，和页码页条数有关
    noData = false; // 默认页面是有数据的-骨架屏中使用
    searchValue = '';    // 搜索框中的关键字
    text;           // 扫描的条码信息
    loadingSpinner = 'bubbles';             // 上拉加载数据时的图标
    loadingMoreText = '上拉加载更多数据...';
    records = 0;    // 总条数

    checkboxData = [
        {value: 0, name: '单据号', checked: false, param: 'ordernum'},
        {value: 1, name: '产品名称', checked: true, param: 'materialname'},
        {value: 2, name: '项目名称', checked: false, param: 'projectName'},
        {value: 3, name: '工序号', checked: false, param: 'opnum'},
        {value: 4, name: '工序名称', checked: false, param: 'opname'}
    ];
    drawOpen = false;   // 筛选条件的抽屉状态
    /*************************************************************/
    // 页面初始化时向后端传的参数
    params = {
        materialid: '',
        routingid: '',
        fileid: '',
        pageSize: 10,           // 每页数据量
        pageIndex: 1,            // 当前页数
        sort: 'orderno',
    };
    // fileUrl;

    // 浏览或者下载URL
    previewURL: string = null;

    /**
     * 初始化
     * ngOnInit()
     */
    ngOnInit() {
        if (!this.searchValue) {
            this.getDocumentList();
        } else {
            this.search();
        }


        // 文件预览第一版-------通过下载到本地然后调用本地的应用对其打开
        //    判断设备是否存在存放文件预览需要用到的目录，如果没有就先创建目录
        // this.file.checkDir(sourceDir, 'temp');
        // this.file.createDir(sourceDir, 'temp', true);

        // .then(() => console.log('Directory exists')).catch(err =>
        //     console.log('Directory doesn\'t exist'));

        //     .then(res => {
        //     alert('res = ' + res);
        //     // 如果目录不存在就新建目录，
        //     if (!res) {
        //         this.file.createDir(sourceDir, 'temp', true);
        //     }
        // });
    }

    /**
     * 页面离开后触发
     * ionViewDidLeave()
     */
    ionViewDidLeave() {
        // alert('ionViewDidLeave页面离开后触发');
        // 页面离开后清除临时文件
        // this.file.removeRecursively(sourceDir, 'temp');
    }


    /**
     * 返回上一页
     * back()
     */
    back() {
        ToastService.hide();
        this.nav.pop();
    }


    /**
     * 查询出所有的文档
     * getDocumentList()
     */
    getDocumentList() {
        this.documentReviewService.allDocumentReview(this.params).then(res => {
            // console.log('前端 2 res =', res)
            if (res['rows']) {
                this.documentList = res['rows'];
                this.records = res['records'];
                this.spliceViewList(this.documentList);
            } else if (res === false) {
                console.log('获取文档数据数据量为0');
                this.noData = true;
            }
        }, err => {
            // this.jqxLoader.open();
        });
    }

    /**
     * 分页后的数据
     * spliceViewList()
     */
    spliceViewList(list) {
        // 不用分页，直接将数据全都显示在页面上
        this.viewList = JSON.parse(JSON.stringify(list));
        if (this.viewList.length === 0) {
            this.viewList = '';
            this.noData = true;
        }
    }

    /***
     * 根据搜索框内容进行搜索
     * 该函数暂时不需要
     * search()
     */
    search() {
        this.noData = false;
        this.params.pageIndex = 1;
        this.documentReviewService.allDocumentReview(this.params).then(res => {
            this.documentList = res['rows'];
            this.records = res['records'];
            if (this.searchValue) {
                this.documentList = JSON.parse(JSON.stringify(this.documentList)).filter(d => {
                    return d.name.indexOf(this.searchValue) >= 0 || d.type.indexOf(this.searchValue) >= 0;
                });
            }
            this.spliceViewList(this.documentList);
            // this.jqxLoader.close();
        }, err => {
        });
    }

    /**
     * 点击搜索框的‘取消’按钮的回调
     * cancel()
     */
    cancel() {
        // this.params.page = 1;
        this.searchValue = '';
        this.search();
    }

    /***
     * 上拉加载下一页
     * doInfinite
     */
    async doInfinite(infiniteScroll) {
        if (this.records > this.documentList.length) {
            this.loadingMoreText = '上拉加载更多数据...';
            // console.log('开始异步操作');
            this.params.pageIndex = this.params.pageIndex + 1;          // 请求的页数 第几页
            await this.documentReviewService.allDocumentReview(this.params).then(res => {
                this.documentList = this.documentList.concat(res['rows']);
                this.records = res['records'];
                this.spliceViewList(this.documentList);
                // console.log('异步操作已经结束');
                infiniteScroll.target.complete();
            }, err => {
            });
        } else {
            this.loadingSpinner = 'null';
            this.loadingMoreText = '没有更多数据了~~';
            setTimeout(() => {
                infiniteScroll.target.complete();
            }, 1000);
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

    // 点击了预览----然后页面跳转到第二页
    skip(item: any) {
        console.log(item);
        this.previewURL = this.url.FastDFSIP + this.url.FastDFSPORT + '/' + item.modmfileinfo.fileurl;
        console.log('文件预览URL：' + this.previewURL);
        if (this.matchType(this.previewURL) === 'image'
            || this.matchType(this.previewURL) === 'show') {
            const numTotal = 1;
            const resultData = [];
            resultData[0] = this.previewURL;
            window.localStorage['previewwindow_flag'] = 'true';
            window.localStorage['previewwindow_filename'] = item.modmfileinfo.name;
            window.localStorage['previewwindow_total'] = numTotal + '';
            window.localStorage['previewwindow_previewData'] = resultData.join(',');
            this.router.navigate(['/tabs/tab1/fileReference/add']);

            // localStorage.setItem('previewwindow_flag', 'true');
            // localStorage.setItem('previewwindow_filename', item.modmfileinfo.name);
            // localStorage.setItem('previewwindow_total', numTotal + '');
            // localStorage.setItem('previewwindow_previewData', resultData.join(','));
            // this.router.navigate(['/index/modm/previewwindow']);
        } else if (this.matchType(this.previewURL) === 'word'
            || this.matchType(this.previewURL) === 'gcFile') {
            const fileID = item.modmfileinfo.id;
            this.documentReviewService.previewFileByURL(fileID, item.modmfileinfo.fileurl).then(res => {
                if (res && res.state === 500) {
                    // this.msg.error('预览操作失败!');
                    ToastService.fail('预览操作失败!');
                } else if (res && res.state === 200) {
                    const resultData = res.data;
                    let numTotal = 1;
                    if (resultData && resultData.length) {
                        numTotal = resultData.length;
                    }
                    window.localStorage['previewwindow_flag'] = 'false';
                    window.localStorage['previewwindow_filename'] = item.modmfileinfo.name;
                    window.localStorage['previewwindow_total'] = numTotal + '';
                    window.localStorage['previewwindow_previewData'] = resultData.join(',');
                    this.router.navigate(['/tabs/tab1/fileReference/add']);

                    // localStorage.setItem('previewwindow_flag', 'false');
                    // localStorage.setItem('previewwindow_filename', this.selected.name);
                    // localStorage.setItem('previewwindow_total', numTotal + '');
                    // localStorage.setItem('previewwindow_previewData', resultData.join(','));
                    // this.router.navigate(['/index/modm/previewwindow']);

                    // this.msg.success('预览操作成功!');
                }
            }, err => {
                // this.msg.error('预览操作失败!');
                ToastService.fail('预览操作失败!');
            });
        } else {
            // this.msg.info('当前选中文档不支持在线预览！');
            ToastService.fail('当前选中文档不支持在线预览！');
        }
    }

    /**
     * 判断文件类型
     * @param fileName 文件名
     */
    matchType(fileName) {
        // 后缀获取
        let suffix = '';
        // 获取类型结果
        let result = '';
        try {
            const flieArr = fileName.split('.');
            suffix = flieArr[flieArr.length - 1];
        } catch (err) {
            suffix = '';
        }
        // fileName无后缀返回 false
        if (!suffix) {
            result = '';
            return result;
        }

        // 后缀转化为小写
        suffix = suffix.toLowerCase();

        // 图片格式
        const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
        // 进行图片匹配
        const imgIndex = imglist.indexOf(suffix);
        if (imgIndex >= 0) {
            result = 'image';
            return result;
        }

        // 可展示
        const showlist = ['txt', 'xml', 'html', 'pdf', 'js'];
        // 匹配 'txt', 'js', 'xml', 'html', 'pdf'
        const showIndex = showlist.indexOf(suffix);
        if (showIndex >= 0) {
            result = 'show';
            return result;
        }

        // 匹配 文档类型
        const wordList = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'vsd', 'vdx'];
        const wordIndex = wordList.indexOf(suffix);
        if (wordIndex >= 0) {
            result = 'word';
            return result;
        }

        // 匹配 工程文件
        const gcFileList = ['dwg', 'ost', 'eml'];
        const gcIndex = gcFileList.indexOf(suffix);
        if (gcIndex >= 0) {
            result = 'gcFile';
            return result;
        }


        // 其他 文件类型
        result = 'other';
        return result;
    }

    /**
     * 返回顶部
     * backToTop()
     */
    backToTop() {
        this.content.scrollToTop(0);
    }


// 文件预览第一版-------通过下载到本地然后调用本地的应用对其打开
//     /**
//      * 判断该文件是否支持预览
//      * skip()
//      * @param item
//      */
//     skip(item) {
//         // 第一版
//         // 如果是.pdf或者是.docx文件，则用手机自带的浏览器进行打开或者下载。
//         // if (item.modmfileinfo.fileextension === 'pdf' || item.modmfileinfo.fileextension === 'docx') {
//         //     this.fileUrl = this.url.FastDFSIP + this.url.FastDFSPORT + '/' + item.modmfileinfo.fileurl;
//         //     window.open(this.fileUrl);
//         // } else {
//         //     this.router.navigate(['/tabs/tab1/fileReference/add'], {
//         //         queryParams: {
//         //             fileextension: item.modmfileinfo.fileextension,
//         //             fileurl: item.modmfileinfo.fileurl
//         //         }
//         //     });
//         // }
//
//         //    第二版
//         if (item.modmfileinfo.fileextension === 'pdf' || item.modmfileinfo.fileextension === 'docx' || item.modmfileinfo.fileextension === 'xlsx' || item.modmfileinfo.fileextension === 'xls' || item.modmfileinfo.fileextension === 'pptx') {
//             this.fileUrl = this.url.FastDFSIP + this.url.FastDFSPORT + '/' + item.modmfileinfo.fileurl;
//             const request: DownloadRequest = {
//                 uri: this.fileUrl,
//                 title: `${this.fileUrl}`,
//                 description: '',
//                 mimeType: this.getMimeType(item.modmfileinfo.fileextension),
//                 visibleInDownloadsUi: true,
//                 notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
//                 destinationInExternalFilesDir: {
//                     dirType: 'Downloads/temp',
//                     subPath: this.cutOut(item.modmfileinfo.fileurl, '/')
//                 }
//             };
//             // 开始下载文件
//             ToastService.loading('正在加载资源...', 0);
//             this.downloader.download(request)
//                 .then((location: string) => {
//                     ToastService.hide();
//                     ToastService.loading('正在打开...');
//                     //   2、根据文件类型不同，选用不同的方式预览文件
//                     if (item.modmfileinfo.fileextension === 'pdf') {
//                         ToastService.hide();
//                         this.pdfOpen(location);
//                     } else if (item.modmfileinfo.fileextension === 'docx' || item.modmfileinfo.fileextension === 'xlsx' || item.modmfileinfo.fileextension === 'xls' || item.modmfileinfo.fileextension === 'pptx') {
//                         ToastService.hide();
//                         // 预览文件
//                         this.PreviewAnyFileFromLocation(location);
//                     } else {
//                         ToastService.hide();
//                         // 预览文件-----默认的打开方式
//                         this.PreviewAnyFileFromLocation(location);
//                     }
//                 })
//                 .catch((error: any) => {
//                     alert('下载失败');
//                     ToastService.hide();
//                     // console.error(error);
//                     alert(error);
//
//                 });
//             // 1、下载文件,返回文件路径
//             // const filePath = this.download(request);
//             // if (filePath != null) {
//             //     //   2、根据文件类型不同，选用不同的方式预览文件
//             //     if (item.modmfileinfo.fileextension === 'pdf') {
//             //         this.pdfOpen(filePath);
//             //     } else if (item.modmfileinfo.fileextension === 'docx' || item.modmfileinfo.fileextension === 'xls') {
//             //         // 预览文件
//             //         this.PreviewAnyFileFromLocation(filePath);
//             //     }
//             // }
//         } else if (item.modmfileinfo.fileextension === 'jpg' || item.modmfileinfo.fileextension === 'png' || item.modmfileinfo.fileextension === 'txt' || item.modmfileinfo.fileextension === 'js') {
//             this.router.navigate(['/tabs/tab1/fileReference/add'], {
//                 queryParams: {
//                     fileextension: item.modmfileinfo.fileextension,
//                     fileurl: item.modmfileinfo.fileurl
//                 }
//             });
//         } else {
//             ToastService.offline('当前文件暂不支持预览');
//         }
//     }
//
//     /**
//      * 获取文件的mimeType
//      * getMimeType()
//      */
//     getMimeType(expandedName): string {
//         switch (expandedName) {
//             case 'pdf':
//                 return 'application/pdf';
//                 break;
//             case 'docx' || 'doc' || 'DOCX' || 'DOC':
//                 return 'application/msword';
//                 break;
//             case 'xlsx' || 'xls':
//                 return 'application/vnd.ms-excel';
//                 break;
//             default:
//                 return '';
//                 break;
//         }
//         return '';
//     }
//
//     /**
//      * 服务器文件下载到本地
//      * download()
//      * @param request 文件在服务器中的地址
//      */
//     download(request): any {
//         alert('进入下载程序...');
//         ToastService.loading('正在请求资源...', 0);
//         // 开始下载文件
//         this.downloader.download(request)
//             .then((location: string) => {
//                 ToastService.hide();
//                 return location;
//             })
//             .catch((error: any) => {
//                 ToastService.hide();
//                 // console.error(error);
//                 alert(error);
//                 return null;
//             });
//     }
//
//     /**
//      * 判断是什么类型的文件
//      * fileType()
//      * @param filePath 文件的路径(含文件名)
//      */
//     fileType(filePath): string {
//         switch (this.cutOut(filePath, '.')) {
//             case 'pdf':
//                 return 'pdf';
//                 break;
//             case 'docx':
//                 return 'docx';
//                 break;
//             case 'xls':
//                 return 'xls';
//                 break;
//             case 'xlsx':
//                 return 'xlsx';
//                 break;
//             default:
//                 return null;
//                 break;
//         }
//     }
//
//     /**
//      * 通过filePath截取文件路径、文件名、扩展名（用knife字符串截）
//      * cutOut()
//      * @param filePath 文件路径（包含文件名以及扩展名）
//      * @param knife 用于切割的字符串
//      */
//     cutOut(filePath, knife, fromStart?: boolean): string {
//         // filePath = 'group1/M00/00/04/ChgUR12yRBGAItgSABUxoP64UQ0632.pdf';
//         const index = filePath.lastIndexOf(knife);
//         if (fromStart) { // 从前往后截取
//             const path = filePath.substring(0, index + 1);
//             // alert('获取到的文件路径是 filePath = ' + path);
//             // console.log('filePath = ', path);
//             return path;
//         } else {  // 从后往前截取
//             const fileName = filePath.substring(index + 1, filePath.length);
//             // alert('获取到的文件名是 fileName = ' + fileName);
//             // console.log('fileName = ', fileName);
//             return fileName;
//         }
//
//
//     }
//
//     /**
//      * 用手机应用打开.pdf文件
//      * pdfOpen()
//      * @param filepath 文件在设备中的路径
//      */
//     pdfOpen(filepath) {
//         this.fileOpener.open(filepath, 'application/pdf')
//             .then(() => {
//                 // alert('File is opened');
//                 // alert('即将进行删除操作');
//                 // 删除该文件
//                 // this.pdfRemove(filepath, this.cutOut(filepath, '/'));
//             })
//             .catch(e => {
//                 alert('Error opening file' + e);
//             });
//     }
//
//     /**
//      * 预览本地文件（支持.docx .xls文件）
//      * @param filePath 文件在设备中的路径
//      */
//     PreviewAnyFileFromLocation(filePath) {
//         // alert('本地文件路径为：' + filePath);
//         this.previewAnyFile.preview(filePath)
//             .then((res: any) => {
//                 // alert('预览本地文件res=' + res)
//             })
//             .catch((error: any) => {
//                 // alert('预览本地文件error' + error)
//             });
//     }


}
