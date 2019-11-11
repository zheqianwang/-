import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from 'src/app/url.service';
import {ToastService} from 'ng-zorro-antd-mobile';
import {ProcessReportService} from '../process_report/process-report.service';


@Injectable({
    providedIn: 'root'
})
export class DocumentReviewService {

    constructor(
        private http: HttpClient,
        private url: UrlService,
        private _toast: ToastService,
        private processReportService: ProcessReportService
    ) {
    }

    /**
     * allDocumentReview()
     * 所有的 文档查询 列表数据
     */
    allDocumentReview(param): any {
        // ToastService.loading('加载中...', 0);
        return new Promise((resolve, reject) => {
            this.processReportService.getLocalTokenAndRequest('POST', this.url.allDocumentReview, param).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 根据文档信息ID和URL预览文件信息
     * @param fileID 输入参数文件信息ID
     * @param fileURL FastDFS上的URL
     */
    previewFileByURL(fileID: string, fileURL: string): any {
        let deleteData;
        return new Promise((resolve, reject) => {

            this.processReportService.getLocalTokenAndRequest('POST', this.url.previewFileUrl, {id: fileID, fileurl: fileURL}).then(res => {
                if (res) {
                    deleteData = res;
                }
                resolve(deleteData);
            }, error => {
                // this.message.error('选中文档信息删除失败！');
                ToastService.fail('选中文档信息删除失败！');
                reject(deleteData);
            });
            // this.http.post(this.previewFileUrl, {id: fileID, fileurl: fileURL}).toPromise().then(res => {
            //     if (res) {
            //         deleteData = res;
            //     }
            //     resolve(deleteData);
            // }, error => {
            //     this.message.error('选中文档信息删除失败！');
            //     reject(deleteData);
            // });
        });
    }


}
