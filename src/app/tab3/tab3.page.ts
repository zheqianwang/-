import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer/ngx';
import {Downloader, DownloadRequest, NotificationVisibility} from '@ionic-native/downloader/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {ToastService} from 'ng-zorro-antd-mobile';
import {File, FileEntry, RemoveResult} from '@ionic-native/file/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {PreviewAnyFile} from '@ionic-native/preview-any-file/ngx';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    options: DocumentViewerOptions = {
        title: 'My PDF'
    };

    pdfSrc = 'http://10.24.20.71:8880/group1/M00/00/04/ChgUR12umF2AJXwpABUxoP64UQ0520.pdf';
    docSrc = 'http://10.24.20.71:8880/group1/M00/00/04/ChgUR12xYOqAAA-eAAGVFPVh17k19.docx';
    xlsSrc = 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls';

    requestPDF: DownloadRequest = {
        uri: this.pdfSrc,
        title: `${this.pdfSrc}`,
        description: '',
        mimeType: 'application/pdf',
        visibleInDownloadsUi: true,
        notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
        destinationInExternalFilesDir: {
            dirType: 'Downloads',
            subPath: 'ChgUR12umF2AJXwpABUxoP64UQ0520.pdf'
        }
    };

    requestDOCX: DownloadRequest = {
        uri: this.docSrc,
        title: `${this.docSrc}`,
        description: '',
        mimeType: 'application/msword',
        visibleInDownloadsUi: true,
        notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
        destinationInExternalFilesDir: {
            dirType: 'Downloads',
            subPath: 'ChgUR12xYOqAAA-eAAGVFPVh17k19.docx'
        }
    };
    requestXLS: DownloadRequest = {
        uri: this.xlsSrc,
        title: `${this.xlsSrc}`,
        description: '',
        mimeType: 'application/vnd.ms-excel',
        visibleInDownloadsUi: true,
        notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
        destinationInExternalFilesDir: {
            dirType: 'Downloads',
            subPath: '1.xls'
        }
    };

    // 本地文件存放地址(不含文件名）
    locationFilePath;
    writeData = null;
    readData = null;

    // 写入的文件内容


    constructor(
        private popoverController: PopoverController,
        private document: DocumentViewer,
        private downloader: Downloader,
        private fileOpener: FileOpener,
        private file: File,
        private filePath: FilePath,
        private previewAnyFile: PreviewAnyFile,
        // private fileEntry: FileEntry
    ) {
    }

    ngOnInit() {
    }

    /*************************************************/
    // 暂时不用
    // async presentPopover(ev: any) {
    //     const popover = await this.popoverController.create({
    //         component: PopoverPage,
    //         event: ev,
    //         translucent: true
    //     });
    //     return await popover.present();
    // }

    /*****************************************************************/

    docx() {
        // window.open('http://10.24.20.71:8880/group1/M00/00/04/ChgUR12xYOqAAA-eAAGVFPVh17k19.docx');
        // this.document.viewDocument('http://10.24.20.71:8880/group1/M00/00/04/ChgUR12xYOqAAA-eAAGVFPVh17k19.docx', 'application/docx', options);
    }

    /**
     * 删除手机目录中的.pdf文件
     * pdfRemove()
     * @param filePath 本地文件的路径
     * @param fileName 文件名称（含后缀）
     */
    pdfRemove(filePath, fileName) {
        alert('即将删除本地文件：' + fileName);
        this.file.removeFile(filePath, fileName)
            .then((res) => {
                console.log('Directory is remove! ' + res);
                alert('Directory is remove!' + res);
            }, err => {
                console.log('Directory remove fail!' + err);
                alert('Directory remove fail!' + err);
            })
            .catch(err2 => {
                console.log('Directory remove fail!' + err2);
                alert('Directory remove fail!' + err2);
            });
    }

    /**
     * 通过filePath截取文件路径、文件名、扩展名（用knife字符串截）
     * cutOut()
     * @param filePath 文件路径（包含文件名以及扩展名）
     * @param knife 用于切割的字符串
     */
    cutOut(filePath, knife, fromStart?: boolean): string {
        // filePath = 'group1/M00/00/04/ChgUR12yRBGAItgSABUxoP64UQ0632.pdf';
        const index = filePath.lastIndexOf(knife);
        if (fromStart) { // 从前往后截取
            const path = filePath.substring(0, index + 1);
            // alert('获取到的文件路径是 filePath = ' + path);
            // console.log('filePath = ', path);
            return path;
        } else {  // 从后往前截取
            const fileName = filePath.substring(index + 1, filePath.length);
            // alert('获取到的文件名是 fileName = ' + fileName);
            // console.log('fileName = ', fileName);
            return fileName;
        }


    }

    /**
     * 服务器文件下载到本地
     * download()
     * @param request 文件在服务器中的地址
     */
    download(request) {
        ToastService.loading('正在请求资源...', 0);
        // 开始下载文件
        this.downloader.download(request)
            .then((location: string) => {
                ToastService.hide();
                // alert('文件保存地址为:' + location);
                // alert('即将打开');
                // 判断是什么类型的文件
                if (this.fileType(location) === 'pdf') {
                    // alert('pdf文件');
                    this.pdfOpen(location);
                } else if (this.fileType(location) === 'docx' || this.fileType(location) === 'xls') {
                    // alert('docx文件');
                    // 预览文件
                    this.PreviewAnyFileFromLocation(location);
                }
            })
            .catch((error: any) => {
                ToastService.hide();
                // console.error(error);
                alert(error);
            });
    }

    // download2() {
    //     ToastService.loading('正在请求资源...', 0);
    //     this.downloader.download(this.request2)
    //         .then((location: string) => {
    //             ToastService.hide();
    //             alert('文件保存地址为:' + location);
    //             alert('即将打开');
    //             // 判断是什么类型的文件
    //             if (this.fileType(location) === 'pdf') {
    //                 alert('pdf文件');
    //                 this.pdfOpen(location);
    //             } else if (this.fileType(location) === 'docx') {
    //                 alert('docx文件');
    //                 this.PreviewAnyFileFromLocation(location);
    //             }
    //
    //         })
    //         .catch((error: any) => {
    //             ToastService.hide();
    //             alert(error);
    //         });
    // }

    /**
     * 判断是什么类型的文件
     * fileType()
     * @param filePath 文件的路径(含文件名)
     */
    fileType(filePath): string {
        switch (this.cutOut(filePath, '.')) {
            case 'pdf':
                return 'pdf';
                break;
            case 'docx':
                return 'docx';
                break;
            case 'xls':
                return 'xls';
                break;
            default:
                return null;
                break;
        }
    }

    /**
     * 用手机应用打开.pdf文件
     * pdfOpen()
     * @param filepath 文件在设备中的路径
     */
    pdfOpen(filepath) {
        this.fileOpener.open(filepath, 'application/pdf')
            .then(() => {
                // alert('File is opened');
                // alert('即将进行删除操作');
                // 删除该文件
                // this.pdfRemove(filepath, this.cutOut(filepath, '/'));
            })
            .catch(e => {
                alert('Error opening file' + e);
            });
    }

    /**
     * 预览本地文件（支持.docx .xls文件）
     * @param filePath 文件在设备中的路径
     */
    PreviewAnyFileFromLocation(filePath) {
        // alert('本地文件路径为：' + filePath);
        this.previewAnyFile.preview(filePath)
            .then((res: any) => {
                // alert('预览本地文件res=' + res)
            })
            .catch((error: any) => {
                // alert('预览本地文件error' + error)
            });
    }

    /**
     * 创建文件
     * createFile()
     * @constructor
     */
    createFile() {
        this.locationFilePath = 'file:///storage/emulated/0/Android/data/io.ionic.starter/files/Log/';
        // 创建'log.txt'日志文件
        this.file.createFile(this.locationFilePath, 'log.txt', true);
    }

    /**
     * 删除目录
     * removeDir()
     */
    removeDir(path, name) {
        // this.locationFilePath = 'file:///storage/emulated/0/Android/data/io.ionic.starter/files/Downloads/';
        this.file.removeDir(path, name);
    }

    /**
     * 写入文件
     * writeFile()
     */
    writeFile() {
        this.locationFilePath = 'file:///storage/emulated/0/Android/data/io.ionic.starter/files/Downloads/';
        alert('写入的内容是：' + this.writeData);
        const textContent = `${new Date().toLocaleString()} \t 写入： \t` + this.writeData + '\r\n';
        this.file.writeFile(this.locationFilePath, 'log.txt', textContent, {append: true});
        this.writeData = null;
    }

    /**
     * 读文件内容
     */
    readFile() {
        this.locationFilePath = 'file:///storage/emulated/0/Android/data/io.ionic.starter/files/Downloads/';
        this.file.readAsText(this.locationFilePath, 'log.txt');
    }

    /**
     * 页面离开后触发
     * ionViewDidLeave()
     */
    ionViewDidLeave() {
        // alert('ionViewDidLeave页面离开后触发');
        //    在这里清除保存的文件
    }
}
