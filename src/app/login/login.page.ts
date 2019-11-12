import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController, Platform} from '@ionic/angular';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {ToastService} from 'ng-zorro-antd-mobile';
import {UrlService} from '../url.service';
// import {LoginService} from '@inspur/scmpub';
import {Storage} from '@ionic/storage';
import {LoginService} from '../services/login.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    // 服务器配置页面信息
    serverIp = null;
    serverPort = null;
    switchRoutes = false;   // 切换路线
    memoryServerConfig = false;  // 默认记住服务器配置信息

    wCenter; // 选中的工作中心
    uOfWork; // 选中的工作单元
    wKer;   // 选中的登录人员
    // 工作中心-后期在SqlLite中获取
    workCenter = [
        {id: 'nes', name: 'NES'},
        {id: 'n64', name: 'Nintendo64'},
        {id: 'ps', name: 'PlayStation'},
        {id: 'genesis', name: 'Sega Genesis'},
        {id: 'saturn', name: 'Sega Saturn'},
        {id: 'snes', name: 'SNES'},
    ];
    // 工作单元-后期在SqlLite中获取
    unitOfWork = [
        {id: 'nes', name: 'NES'},
        {id: 'n64', name: 'Nintendo64'},
        {id: 'ps', name: 'PlayStation'},
        {id: 'genesis', name: 'Sega Genesis'},
        {id: 'saturn', name: 'Sega Saturn'},
        {id: 'snes', name: 'SNES'},
    ];
    // 登录人员-后期在SqlLite中获取
    worker = [
        {id: 'nes', name: 'NES'},
        {id: 'n64', name: 'Nintendo64'},
        {id: 'ps', name: 'PlayStation'},
        {id: 'genesis', name: 'Sega Genesis'},
        {id: 'saturn', name: 'Sega Saturn'},
        {id: 'snes', name: 'SNES'},
    ];


    constructor(
        private router: Router,
        private _toast: ToastService,
        private url: UrlService,
        public nav: NavController,
    ) {

    }

    ngOnInit() {
        //    服务器配置回显
        const memoryServerConfigState = localStorage['memoryServerConfigState'];
        if (memoryServerConfigState) {
            this.serverIp = localStorage['memoryServerIp'];
            this.serverPort = localStorage['memoryServerPort'];
        }
    }

    /**
     * 离线登录
     * offLineLogin()
     */
    offLineLogin() {
        console.log('登录信息：', this.wCenter, this.uOfWork, this.wKer);
        ToastService.success('登录成功!');
        window.localStorage['userInfo'] = `{"workCenter":"${this.wCenter}","unitOfWork":"${this.uOfWork}","worker":"${this.wKer}"}`;
        this.router.navigate(['tabs']);
    }

    /**
     * 刷新离线登录的用户数据
     * refresh()
     */
    refresh() {
        ToastService.loading('正在刷新数据...', 2000);
    }


    /**
     * 服务器配置
     * serverConfig()
     */
    serverConfig() {
        //127.0.0.1:8081
        window.localStorage['memoryServerIp'] = this.serverIp;
        window.localStorage['memoryServerPort'] = this.serverPort;
        this.switchRoutes = false;
    }

    /**
     * 改变 记住服务器配置 的状态，并且在本地存储这个状态
     * memoryServerConfigChange()
     */
    memoryServerConfigChange(state) {
        if (state) {     // 选中
            window.localStorage['memoryServerConfigState'] = true;
            window.localStorage['memoryServerIp'] = this.serverIp;
            window.localStorage['memoryServerPort'] = this.serverPort;
        } else {
            window.localStorage.removeItem('memoryServerConfigState');
            window.localStorage.removeItem('memoryServerIp');
            window.localStorage.removeItem('memoryServerPort');
        }
    }

    /**
     * 关闭服务器配置页面
     * close()
     */
    close() {
        this.switchRoutes = false;
    }


    /**
     * Ping测试
     * ping()
     */
    //ping 函数, 检测与内网连接是否能在100ms 内响应. 实测实验室电脑连接内网 ping 为 9-11ms 左右
    ping(ip) {
        var img = new Image();
        var start = new Date().getTime();
        var flag = false;
        var isCloseWifi = true;
        var hasFinish = false;
        img.onload = () => {
            if (!hasFinish) {
                flag = true;
                hasFinish = true;
                img.src = 'X:\\';
                console.log('Ping ' + ip + ' success. ');
            }
        };

        img.onerror = () => {
            if (!hasFinish) {
                if (!isCloseWifi) {
                    flag = true;
                    img.src = 'X:\\';
                    console.log('Ping ' + ip + ' success. ');
                    ToastService.success('Ping ' + ip + ' success. ');
                } else {
                    console.log('network is not working!');
                    ToastService.fail('network is not working!');
                }
                hasFinish = true;
            }
        };

        setTimeout(() => {
            isCloseWifi = false;
            console.log('network is working, start ping...');
            ToastService.loading('network is working, start ping...');
        }, 2);

        img.src = 'http://' + ip + '/' + start;
        var timer = setTimeout(() => {
            if (!flag) {
                hasFinish = true;
                img.src = 'X://';
                flag = false;
                console.log('Ping ' + ip + ' fail. ');
                ToastService.fail('Ping ' + ip + ' fail. ');
            }
        }, 1500);
    }
}
