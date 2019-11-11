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

    loginMethod = 0; // 登录方式，0用户名密码，1手机短信验证码
    onOrOffLine = 'onLine';   // 在线或者离线登录的标记
    username = null;
    password = null;
    memory = true;  // 默认记住用户名和密码
    serverIp = null;
    serverPort = null;
    fileServerIp = null;
    fileServerPort = null;
    switchRoutes = false;   // 切换路线
    memoryServerConfig = false;  // 默认记住服务器配置信息

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private platform: Platform,
        private native: AppMinimize,
        private _toast: ToastService,
        private url: UrlService,
        public nav: NavController,
        private storage: Storage,
        private  loginService: LoginService,
    ) {

    }

    ngOnInit() {
        // 用户名密码回显
        const memoryState = localStorage['memoryState'];
        if (memoryState) {
            this.username = localStorage['memoryUser'];
            this.password = localStorage['memoryPassword'];
        }
        //    服务器配置回显
        const memoryServerConfigState = localStorage['memoryServerConfigState'];
        if (memoryServerConfigState) {
            this.serverIp = localStorage['memoryServerIp'];
            this.serverPort = localStorage['memoryServerPort'];
            this.fileServerIp = localStorage['memoryServerFileIp'];
            this.fileServerPort = localStorage['memoryServerFilePort'];
        }
    }

    // login() {
    //     console.log('用户名：', this.username, '密码:', this.password);
    //     this.changeMemoryState(this.memory);
    //     // 判断 用户名密码 格式
    //     if (this.judgeLoginData()) {
    //         ToastService.loading('正在登录...', 0);
    //         this.loginService.loginPubAPI('GSP7', this.username, this.password, false, '10.24.20.42', 'MES').subscribe(res => {
    //             ToastService.success('登录成功');
    //             const result = JSON.parse(JSON.parse(JSON.stringify(res)).result);
    //             window.localStorage['loginResResult'] = result;
    //             window.localStorage['loginResState0'] = result.GSPState0;
    //             // 这是后端真实的返回
    //             // window.localStorage['loginResToken'] = result.GSPToken;
    //             // 这是假的测试用的token，仅能通过后端请求
    //             window.localStorage['loginResToken'] = 'eyJpZCI6IjFmNjE5NGJlLWNkM2EtNGU4ZS04NzY2LTgxNDkwNDZiN2QwZiIsImNvZGUiOiJ6aGFuZ2ppYW5nIiwibmFtZSI6IuW8oOWwhiIsInBhc3N3b3JkIjoiIiwic3RhdGUiOiIxICIsInR5cGUiOm51bGwsInNlY2xldmVsIjoiUFVCTElDIiwiZGVzY3JpcHRpb24iOm51bGx9';
    //             window.localStorage['GSPToken'] = result.GSPToken;
    //
    //             console.log('loginResResult = ', result);
    //             console.log('loginResState0 = ', result.GSPState0);
    //             console.log('loginResToken = ', result.GSPToken);
    //             // this.router.navigate(['tabs']);
    //             //    返回调用登录页面的那一页
    //             setTimeout(() => {
    //                 this.router.navigate(['/tabs/tab1']);
    //                 // location.replace('/tabs');
    //             }, 500);
    //
    //         }, err => {
    //             console.log('登录出错', err);
    //             if (!err['ok']) {
    //                 ToastService.offline(err['error'].message);
    //             }
    //         });
    //     }
    // }

    login2(state?) {
        this.changeMemoryState(this.memory);
        // 判断 用户名密码 格式
        if (this.judgeLoginData()) {
            if (state === 'onLine') {
                ToastService.loading('正在登录...', 0);
                this.loginService.login(this.username, this.password).subscribe(res => {
                    ToastService.hide();
                    if (res) {
                        console.log(res);
                        // let name=JSON.parse(localStorage.getItem('userinfo')).code;
                        // this.message.success(`欢迎,用户${name}登录成功`);
                        // this.router.navigate(['/index']);
                        /****************************************************************/
                        let name = JSON.parse(localStorage['userinfo']).code;
                        ToastService.success(`欢迎,用户${name}登录成功`);
                        // this.router.navigate(['/tabs/tab1']);
                        this.router.dispose();
                        this.router.navigate(['/tabs'], {relativeTo: this.route, replaceUrl: true});
                    } else {
                        ToastService.hide();
                        // this.message.warning('登录失败');
                        ToastService.fail('登录失败');
                    }
                    // this.loading = false;
                }, err => {
                    ToastService.hide();
                    console.log(err);
                    // this.message.warning('用户名或密码错误');
                    // this.loading = false;
                    ToastService.offline('用户名或密码错误');
                });
            }
            if (state === 'offLine') {
                console.log('已经切换到离线登录');
            }
        }

    }

    /**
     * 判断 用户名密码 格式
     * judgeLoginData()
     */
    judgeLoginData(): boolean {
        if (this.username === null) {
            ToastService.offline('用户名不能为空！');
            return false;
        }
        if (this.password === null) {
            ToastService.offline('密码不能为空！');
            return false;
        }
        return true;
    }

    /**
     * 改变 记住用户名和密码 的状态，并且在本地存储这个状态
     * changeMemoryState()
     */
    changeMemoryState(state) {
        // console.log('多选框 event = ', event);
        console.log('多选框 memory = ', this.memory);
        if (state) {     // 选中
            window.localStorage['memoryState'] = state;
            window.localStorage['memoryUser'] = this.username;
            window.localStorage['memoryPassword'] = this.password;
        } else {
            window.localStorage.removeItem('memoryState');
            window.localStorage.removeItem('memoryUser');
            window.localStorage.removeItem('memoryPassword');
        }
    }

    /**
     * 服务器配置
     * serverConfig()
     */
    serverConfig() {
        //127.0.0.1:8081
        window.localStorage['memoryServerIp'] = this.serverIp;
        window.localStorage['memoryServerPort'] = this.serverPort;
        window.localStorage['memoryServerFileIp'] = this.fileServerIp;
        window.localStorage['memoryServerFilePort'] = this.fileServerPort;
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
            window.localStorage['memoryServerFileIp'] = this.fileServerIp;
            window.localStorage['memoryServerFilePort'] = this.fileServerPort;
        } else {
            window.localStorage.removeItem('memoryServerConfigState');
            window.localStorage.removeItem('memoryServerIp');
            window.localStorage.removeItem('memoryServerPort');
            window.localStorage.removeItem('memoryServerFileIp');
            window.localStorage.removeItem('memoryServerFilePort');
        }
    }

    close() {
        this.switchRoutes = false;
    }
}
