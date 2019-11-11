import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from 'src/app/url.service';
import {ToastService} from 'ng-zorro-antd-mobile';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ProcessReportService {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient,
        private url: UrlService,
        private _toast: ToastService,
        private storage: Storage,
        public toastController: ToastController
    ) {

    }

    // 显示 loading
    async presentToast() {
        const toast = await this.toastController.create({
            message: '加载中',
            duration: 100000,
            color: 'primary',
            position: 'middle',
        });
        toast.present();
    }


    /**
     * 获取本地token,然后向后端发送数据请求
     * getLocalTokenAndRequest()
     * @params(mode-请求方式，url-请求路由，params-请求参数)
     */
    getLocalTokenAndRequest(mode: string, url: string, params?: {}): any {
        // ToastService.loading('加载中...', 0);
        let data;
        return new Promise((resolve, reject) => {
            const token = localStorage['token'];
            console.log('Angular token = ', token);
            if (token != null) {
                if (mode === 'GET' || mode === 'get') {
                    this.http.get(url, {headers: {Authorization: token}}).toPromise().then(res => {
                        console.log('前端GET收到的res =', res);
                        if (res && res['timeout'] === 'true') {
                            ToastService.fail('登录超时，即将前往登录页面');
                            this.router.navigate(['login'], {relativeTo: this.route, replaceUrl: true});
                        } else {
                            if (res != null) {
                                data = JSON.parse(JSON.stringify(res));
                            }
                            ToastService.hide();
                            resolve(data);
                        }
                    }, err => {
                        // ToastService.hide();
                        console.log('error = ', err);
                        if (err.name === 'HttpErrorResponse') {
                            ToastService.offline('请求服务器失败!!!');
                        } else {
                            ToastService.fail(err['message']);
                        }
                        reject(err);
                    });
                }
                if (mode === 'POST' || mode === 'post') {
                    this.http.post(url, params, {headers: {Authorization: token}}).toPromise().then(res => {
                        console.log('前端 POST请求 返回 res =', res);
                        if (res && res['timeout'] === 'true') {
                            ToastService.fail('登录超时，即将前往登录页面');
                            this.router.navigate(['login'], {relativeTo: this.route, replaceUrl: true});
                        } else {
                            if (res != null) {
                                data = JSON.parse(JSON.stringify(res));
                            }
                            ToastService.hide();
                            resolve(data);
                        }
                    }, error => {
                        // ToastService.hide();
                        console.log('前端 POST请求 返回 error = ', error);
                        if (error.name === 'HttpErrorResponse') {
                            ToastService.offline('请求服务器失败!!!');
                        } else {
                            ToastService.fail(error['message']);
                        }
                        reject(error);
                    });
                }
            } else {
                // resolve(false);
                ToastService.offline('本地没有token');
            }
        });
    }


    /**
     * 所有的 工序报工 列表数据
     * allProcessReport()
     */
    allProcessReport(params): any {
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.allProcessReport, params).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 某个编号的 工序报工 单条数据
     * oneProcessReport()
     */
    oneProcessReport(id): any {
        // ToastService.loading('加载中...', 0);
        let data = [];
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('GET', this.url.oneProcessReport + id).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 判断是否有开工、报工数量，如果数量为0就不进下一个页面了。
     * judgeNextPage()
     */
    judgeNextPage(param): any {
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('GET', this.url.judgeQTY + param).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 工序报工第二页‘加工工人’‘自检人’‘互检人’的帮助接口
     * processReportHelp()
     */
    processReportHelp(): any {

        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('GET', this.url.processReportHelp).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });

        });
    }

    /**
     * 工序报工第二页‘加工设备’的帮助信息
     * equipmentHelp()
     */
    equipmentHelp() {
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('GET', this.url.equipmentHelp).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 获取移入工序等的信息-交接获取下道工序
     * getNextOperation()
     */
    getNextOperation(id): any {
        // ToastService.loading('加载中...', 0);
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('GET', this.url.getNextOperation + id).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 某个id的 工序交接 单条数据
     * oneProcessHandover()
     */
    oneProcessHandover(id): any {
        // ToastService.loading('加载中...', 0);
        let data = [];
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('GET', this.url.oneProcessHandover + id).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 某个id的 工序检验 单条数据
     * oneProcessInspection()
     */
    oneProcessInspection(params): any {
        // ToastService.loading('加载中...', 0);
        let data;
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.oneProcessInspection, params).then(res => {
                console.log('前端 工序检验某 id res =', res);
                if (res['rows'] != null && res['rows'].length > 0) {
                    data = JSON.parse(JSON.stringify(res['rows'][0]));
                    ToastService.hide();
                } else {
                    ToastService.fail(res['msg']);
                }
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }

    /***
     * 保存-工序报工
     * saveProcessReport()
     */
    saveProcessReport(event): any {
        // console.log('e=', event);
        // ToastService.loading('正在保存...', 0);
        const data = [];
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.saveProcessReport, event).then(res => {
                // console.log('保存 返回值 res = ', res);
                // if (res.state === 200) {
                //     ToastService.success(res.msg);
                // }
                // if (res.state === 500) {
                //     ToastService.fail(res.msg);
                // }
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 所有的 工序交接 列表数据
     * allProcessHandover()
     */
    allProcessHandover(params): any {
        // ToastService.loading('加载中...', 0);
        // let data;
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.allProcessHandover, params).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 某个编号的 工序交接 单条数据
     * oneProcessProgress()
     */
    oneProcessProgress(code): any {
        // ToastService.loading('加载中...', 0);
        let data = [];
        return new Promise((resolve, reject) => {
            this.http.post(this.url.oneProcessProgress, code).toPromise().then(res => {
                // console.log('前端 1 res =', res)
                if (res['status'] && res['data']) {
                    data = JSON.parse(JSON.stringify(res['data']));
                    // console.log('前端 data =', data)
                }
                ToastService.hide();
                resolve(data);
            }, error => {
                ToastService.hide();
                if (error.name === 'HttpErrorResponse') {
                    ToastService.offline('请求服务器失败!!!');
                } else {
                    ToastService.fail(error['message']);
                }
                reject(data);
            });
        });
    }

    /**
     * 保存 工序交接 数据
     * saveProcessHandover()
     */
    saveProcessHandover(event): any {
        // ToastService.loading('正在保存...', 0);
        const data = [];
        return new Promise((resolve, reject) => {
            /****************************************/
            this.getLocalTokenAndRequest('POST', this.url.saveProcessHandover, event).then(res => {
                console.log(' 工序交接 保存返回 res = ', res);
                if (res['state'] === 500) {
                    ToastService.fail(res['msg']);
                } else {
                    ToastService.success(res['msg']);
                }
                resolve(res['state']);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 所有的 齐套分析列表数据（工单数据）
     * allKittingList(listParams)
     */
    allKittingList(listParams): any {
        // ToastService.loading('加载中...', 10);
        // let data;
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('GET', this.url.allKittingList + listParams).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 获取 齐套分析的结果数据
     * getAnalyzeResult(params)
     */
    getAnalyzeResult(params): any {
        // ToastService.loading('加载中...', 10);
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.getAnalyzeResult, params).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 搜索-筛选 齐套分析 列表数据
     * searchKittingList()
     */
    searchKittingList(params): any {
        // ToastService.loading('加载中...', 10);
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.searchKittingList, params).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 所有的 工序检验 数据列表
     * allProcessInspection()
     */
    allProcessInspection(params): any {
        // ToastService.loading('加载中...', 0);
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.allProcessInspection, params).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 保存 工序检验 数据
     * saveProcessInspection()
     */
    saveProcessInspection(event): any {
        // ToastService.loading('正在保存...', 0);
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.saveProcessInspection, event).then(res => {
                ToastService.success('保存成功！');
                resolve(res);
            }, err => {
                ToastService.fail('保存失败！');
                reject(err);
            });
        });
    }

    /**
     * 根据派工单id获取工艺路线工艺,再根据工艺路线工序中的id获取 工序零部件数据，返回零部件的数据，构成请求spreadjs的json串
     * queryRoutingOperation(doid)
     */
    queryRoutingOperation(doid, opnum, jyjlid): any {
        let itemId = null; // 从 工序路线工艺数据中心筛选出工序号（opnum）相等的这条数据
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.getQueryRoutingOperation, doid).then(res => {
                if (res) {
                    console.log('工艺路线工序返回 res = ', res);
                    // console.log('工艺路线工序返回 res 类型 = ', typeof res);
                    // console.log(Object.values(res));

                    for (const item of res) {
                        //    从 工序路线工艺数据中心筛选出工序号（opnum）相等的这条数据
                        if (item.seqnum === opnum) {
                            console.log('item = ', item);
                            // 根据选出的这条记录里面的 id 字段，再向后端请求'查询工序零部件'的接口
                            itemId = item.id;
                            if (item.id) {
                                const a = {id: item.id};

                            }
                        }

                    }

                    if (itemId) {
                        this.getLocalTokenAndRequest('POST', this.url.getQueryRoutingQuality, {id: itemId}).then(res2 => {
                            console.log('零部件 返回 res2 = ', res2);
                            if (Object.values(res2).length > 0) {
                                // 根据检验记录id(jyjlid)、工序id(opnum)、零部件id（res2.id）再向后端请求'按状态值查询所有记录'接口
                                const b = {inspectrecid: jyjlid, seqnum: itemId, inspectitemid: res2[0].id};
                                console.log('b= ', b);
                                this.getLocalTokenAndRequest('POST', this.url.getQueryQminspectDetailedState, b).then(res3 => {
                                    console.log('res3 ', res3);
                                    if (res3[0]) {
                                        if (res3[0].spare1 === '0') {
                                            // v.state = 1;
                                            res2[0].qianduanaddstate = 1;
                                        } else if (res3[0].spare1 === '1') {
                                            // v.state = 2;
                                            res2[0].qianduanaddstate = 2;
                                        }
                                    } else {
                                        // v.state = 0;
                                        res2[0].qianduanaddstate = 0;
                                    }
                                    console.log('res2更新后 ', res2);
                                    resolve(res2);
                                }, err3 => {
                                    reject(false);
                                });

                                // this.http.post(this.url.getQueryQminspectDetailedState, b, {headers: this.url.header}).toPromise().then(res3 => {
                                //     console.log('res3 ', res3);
                                //     if (res3[0]) {
                                //         if (res3[0].spare1 === '0') {
                                //             // v.state = 1;
                                //             res2[0].qianduanaddstate = 1;
                                //         } else if (res3[0].spare1 === '1') {
                                //             // v.state = 2;
                                //             res2[0].qianduanaddstate = 2;
                                //         }
                                //     } else {
                                //         // v.state = 0;
                                //         res2[0].qianduanaddstate = 0;
                                //     }
                                //     console.log('res2更新后 ', res2);
                                //     resolve(res2);
                                // }, err3 => {
                                //     reject(false);
                                // });

                            } else {
                                // ToastService.offline('零部件返回res2为空[]');
                                resolve(false);
                            }
                        }, err2 => {
                            ToastService.offline('根据工艺路线工序中的id获取工序零部件数据出错，err2 = ', err2);
                            reject(false);
                        });
                    } else {
                        resolve(false);
                    }


                    // if (itemId) {
                    //     this.http.post(this.url.getQueryRoutingQuality, {id: itemId}, {headers: this.url.header}).toPromise().then(res2 => {
                    //         console.log('零部件 返回 res2 = ', res2);
                    //         if (Object.values(res2).length > 0) {
                    //             // 根据检验记录id(jyjlid)、工序id(opnum)、零部件id（res2.id）再向后端请求'按状态值查询所有记录'接口
                    //             const b = {inspectrecid: jyjlid, seqnum: itemId, inspectitemid: res2[0].id};
                    //             console.log('b= ', b);
                    //             this.http.post(this.url.getQueryQminspectDetailedState, b, {headers: this.url.header}).toPromise().then(res3 => {
                    //                 console.log('res3 ', res3);
                    //                 if (res3[0]) {
                    //                     if (res3[0].spare1 === '0') {
                    //                         // v.state = 1;
                    //                         res2[0].qianduanaddstate = 1;
                    //                     } else if (res3[0].spare1 === '1') {
                    //                         // v.state = 2;
                    //                         res2[0].qianduanaddstate = 2;
                    //                     }
                    //                 } else {
                    //                     // v.state = 0;
                    //                     res2[0].qianduanaddstate = 0;
                    //                 }
                    //                 console.log('res2更新后 ', res2);
                    //                 resolve(res2);
                    //             }, err3 => {
                    //                 reject(false);
                    //             });
                    //
                    //         } else {
                    //             //
                    //             resolve(false);
                    //         }
                    //
                    //     }, err2 => {
                    //         ToastService.offline('根据工艺路线工序中的id获取工序零部件数据出错，err2 = ', err2);
                    //         reject(false);
                    //     });
                    // } else {
                    //     resolve(false);
                    // }

                }
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 工序检验 的 返工返修
     * repairProcessInspection()
     */
    repairProcessInspection(event): any {
        // ToastService.loading('正在保存...', 0);
        let data;
        // return new Promise((resolve, reject) => {
        //     this.http.post(this.url.repairProcessInspection, event, {headers: this.url.header}).toPromise().then(res => {
        //         console.log('工序检验 返工返修 res = ', res);
        //         if (res) {
        //             ToastService.success('保存成功');
        //         } else {
        //             ToastService.fail('保存失败');
        //         }
        //         resolve(res);
        //     }, err => {
        //         ToastService.fail(err['msg']);
        //         reject(false);
        //     });
        // });
    }

    /**
     * 所有的 二次报检 列表数据
     * allSecondaryInspection()
     */
    allSecondaryInspection(param): any {
        // ToastService.loading('加载中...', 0);
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('GET', this.url.allSecondaryInspection + param).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 某个id的 二次报检 单条数据
     * oneSecondaryInspection()
     */
    oneSecondaryInspection(id): any {
        // ToastService.loading('加载中...', 0);
        let data;
        return new Promise((resolve, reject) => {
            /*****************************************************/
            this.getLocalTokenAndRequest('GET', this.url.oneSecondaryInspection + '/' + id).then(res => {
                console.log('前端 某个id的 二次报检res =', res);
                if (res['state'] === 200) {
                    data = JSON.parse(JSON.stringify(res['data']));
                }
                ToastService.hide();
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 保存 二次报检 数据
     * saveSecondaryInspection()
     */
    saveSecondaryInspection(event): any {
        // ToastService.loading('正在保存...', 0);
        const data = [];
        return new Promise((resolve, reject) => {
            /************************************************/
            this.getLocalTokenAndRequest('POST', this.url.saveSecondaryInspection, event).then(res => {
                console.log('保存 二次报检 数据 res = ', res);
                if (res) {
                    ToastService.success('保存成功');
                } else {
                    ToastService.fail('保存失败');
                }
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 所有的 生产进度 列表数据
     * allProductionProgressList()
     */
    allProductionProgressList(params): any {
        // ToastService.loading('加载中...', 0);
        return new Promise((resolve, reject) => {
            this.getLocalTokenAndRequest('POST', this.url.allProductionProgress, params).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

}
