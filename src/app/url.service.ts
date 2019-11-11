import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastService} from './toast.service';
import {ServerConfigService} from './server-config.service';


@Injectable({
    providedIn: 'root'
})
export class UrlService implements OnInit {
    localhostConfigFileContent; // 本地配置文件内容
    // 后端服务地址
    // public localService = 'http://10.72.44.111:9061/';      // 本地服务(公司无线)
    public localService = 'http://10.24.20.71:9061/';     // 71服务器
    /**********************************************************************************************/
    jglocalhost = '127.0.0.1';      // 本地运行后端ip
    jglocalport = '8081';           // 本地运行后端port
    jgserverhost = '10.24.20.42';   // 42服务器运行后端ip
    jgserverport = '10001';         // 42服务器运行后端port
    jgserverhost30 = '10.24.19.30';   // 42服务器运行后端ip
    jgserverport30 = '10001';         // 30服务器运行后端port
    jgserverport30Pro = '10002';         // 30服务器运行前端port
    // 汤老师，文件服务器的部署地址
    public FastDFSIP = 'http://10.24.20.71';
    public FastDFSPORT = ':8880';
    // public jungongService = `http://${this.jglocalhost}:${this.jglocalport}`;       // 军工后端代码，在本地跑服务
    public jungongService = `http://${this.jgserverhost}:${this.jgserverport}`;       // 军工后端代码，在42服务器跑服务
    // public jungongService = `http://${this.jgserverhost30}:${this.jgserverport30}`;       // 军工后端代码，在42服务器跑服务
    /***********************************************************************************************************************/
    public allDocumentReview = this.jungongService + '/modm/getFilePropertyByCondition';             // 所有的 文档查阅 数据
    public previewFileUrl = this.jungongService + '/modm/previewFileByURL';             // 预览 文档查阅 数据
    public allProcessReport = this.jungongService + '/mops/execufilter';               // 所有的 工序报工 数据
    public oneProcessReport = this.jungongService + '/mops/DispatchOrderQueryByID';               // 某个id的 工序报工 数据
    public processReportHelp = this.jungongService + '/base/personinfo';             // 工序报工 第二页 ‘加工工人’‘自检人’‘互检人’的帮助接口
    public judgeQTY = this.jungongService + '/mops/execumax';             // 判断是否有开工、报工数量，如果数量为0就不进下一个页面了。
    public equipmentHelp = this.jungongService + '/base/equipmentinfo';              // 工序报工 第二页 ‘加工设备’的帮助接口
    public saveProcessReport = this.jungongService + '/mope/doexecution';             // 保存   工序报工 数据
    public allProcessHandover = this.jungongService + '/mops/execufilter';           // 所有的 工序交接 数据
    public oneProcessHandover = this.jungongService + '/mops/DispatchOrderQueryByID';           // 某个id的 工序交接 数据
    public getNextOperation = this.jungongService + '/mops/HandOverNextOp';           // 获取移入工序等的信息-交接获取下道工序
    public saveProcessHandover = this.jungongService + '/mops/HandOverBillSave';         // 保存   工序交接 数据
    public allKittingList = this.jungongService + '/mops/getworkorderlist';         // 所有 齐套分析 列表数据
    public getAnalyzeResult = this.jungongService + '/mops/requireqty';         // 获取 齐套分析结果数据
    public searchKittingList = this.jungongService + '/mops/workordersfilters';         // 搜索-筛选 齐套分析 列表数据
    // public allProcessInspection = this.jungongService + '/mope/doexecution_filter';       // 所有的 工序检验 数据-10月9号之前军工接口
    public allProcessInspection = this.jungongService + '/moqm/conditionQueryList';       // 所有的 工序检验 数据-10月9号之后乔老师接口
    // public oneProcessInspection = this.jungongService + '/mope/doexecution/';       // 某个id的 工序检验 数据-10月9号之前军工接口
    public oneProcessInspection = this.jungongService + '/moqm/conditionQueryList';       // 某个id的 工序检验 数据-10月9号之后乔老师接口（还是查询的所有的记录，只是在前端通过 id过滤了 filter）
    public saveProcessInspection = this.jungongService + '/moqm/QminspectRecordsSave';     // 保存   工序检验 数据
    public getQueryRoutingOperation = this.jungongService + '/moqm/queryRoutingOperation'; // 根据派工单id获取工艺路线工序
    public getQueryRoutingQuality = this.jungongService + '/moqm/queryRoutingQuality';      // 根据 选中的 工艺路线工序数据的id，获取'查询工序零部件'接口的零部件数据
    public getQueryQminspectDetailedState = this.jungongService + '/moqm/QueryQminspectDetailedState'; //  根据检验记录id(jyjlid)、工序id(opnum)、零部件id（res2.id）再向后端请求'按状态值查询所有记录'接口
    public repairProcessInspection = this.jungongService + '/mope/repairTaskAdd';          // 工序检验 的 返工返修 数据
    public allSecondaryInspection = this.jungongService + '/mope/RepairTaskPage';   // 所有的 二次报检 数据
    public oneSecondaryInspection = this.jungongService + '/mope/repairTask';   // 某个编号的 二次报检 数据
    public saveSecondaryInspection = this.jungongService + '/moqm/QminspectRecordsSave'; // 保存   二次报检 数据
    public allProductionProgress = this.jungongService + '/moqm/conditionQueryList';     // 所有的 生产进度 数据
    public oneProcessProgress = this.localService + 'oneProcessProgress';           // 某个编号的 生产进度 数据

    serverIp;
    serverPort;
    fileServerIp;
    fileServerPort;
    loginUrl;

    constructor(
        private http: HttpClient,
        private toast: ToastService,
        private wzqServer: ServerConfigService
    ) {
        this.serverIp = localStorage['memoryServerIp'];
        this.serverPort = localStorage['memoryServerPort'];
        this.fileServerIp = localStorage['memoryServerFileIp'];
        this.fileServerPort = localStorage['memoryServerFilePort'];

        // if (this.serverIp && this.serverPort && this.fileServerIp && this.fileServerPort) {
        //     alert('本地有服务器的配置信息' + this.jgserverhost);
        //     this.loginUrl = `http://${this.serverIp}:${this.serverPort}/login`;
        // } else {
        //     alert('本地没有服务器的配置信息' + this.jgserverhost);
        //     this.loginUrl = this.jungongService + '/login';
        // }

        console.log('ceshi = ' + this.wzqServer.getServer());
    }

    ceshi = this.wzqServer.getServer();

    ngOnInit(): void {
        alert('ceshi = ' + this.ceshi);
    }


    /**
     * 请求配置文件的内容
     * ajaxService()
     * 暂时不用
     */
    ajaxService(): any {
        const configFilePath = 'assets/config/jgservice.json';
        // 发送异步请求
        // 1.创建ajax引擎对象----所有操作都是由ajax引擎完成
        const xmlHttp = new XMLHttpRequest();
        // 2.为引擎对象绑定监听事件
        xmlHttp.onreadystatechange = () => {
            // 当状态变化时处理的事情
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                // 5.接收响应信息
                const data = xmlHttp.responseText;
                alert('获取到的配置文件信息是' + data);
                console.log('获取到的配置文件信息是' + data);
                this.localhostConfigFileContent = JSON.parse(data);
                return this.localhostConfigFileContent.ORIGIN + this.localhostConfigFileContent.PORT;
            }
        };
        // 3.绑定服务器地址
        // 第一个参数：请求方式GET/POST
        // 第二个参数：后台服务器地址
        // 第三个参数：是否是异步 true--异步   false--同步
        xmlHttp.open('GET', configFilePath, false);
        // 4.发送请求
        xmlHttp.send();
    }


}
