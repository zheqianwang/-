import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {UrlService} from '../url.service';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

    userLogin = true; // 用户是否登录的标志
    loginResUserInformation; // 登录用户的信息

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public alertController: AlertController,
        private storage: Storage,
        private url: UrlService
    ) {
    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: '',
            message: '确定退出当前账号？',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                    }
                }, {
                    text: '确定',
                    handler: () => {
                        this.logout();
                    }
                }
            ]
        });
        await alert.present();
    }


    ngOnInit() {
        console.log('ngOnInit');
    }


    // 胡平老师后端登录的返回值格式化
    // ionViewWillEnter() {
    //     console.log('ionViewWillEnter');
    //
    //     const res = localStorage['loginResState0'];
    //     if (res != null) {
    //         // 将 AuthToken:sraQpTzss/ZYyXD0FFtGrvVMt/wluI+ceW0M/o9k9b4eXHtVM2oMXkKDTag37eyipPJppgDoEQHX4tu8tF/P2OPq6gNONOpGWpLeiORHVWnknxQwcUEuXz/oOaM6CnI+Vb9J9ZMaK7VJPhdLtusFIsPUVxSVlExkp87MPJgDHO0=&ClientIP:WIN-S7CCO4232OQ(10.24.20.42)&UserID:2f34224e-9fc7-4476-a0f1-61a14e8b9aec&LoginDate:2019/10/12 13:36:30&ProcessID:ab8780ab-3a50-4d52-90e5-25d8ac77668d&MainDBCode:MES&CurrentAppID:GSP&USERASSOBJECT:0&UserCode:yzy&AppInstanceName:华力电机MES&ID:dafca9ac-8a7b-4c6a-8ea8-02ba90b41b2a&BizDate:2019/10/12 5:36:51&FrameType:0&ClientToken:WIN-S7CCO4232OQ(10.24.20.42)&USERNAME:yzy&Language:zh-CN&AppInstanceID:MES&
    //         // 上面样子的字符串格式化
    //         this.loginResUserInformation = this.formatLoginResState0(res);
    //         console.log('loginResUserInformation = ', this.loginResUserInformation);
    //         if (this.loginResUserInformation !== '}' && this.loginResUserInformation != null) {
    //             this.userLogin = true;
    //         } else {
    //             this.userLogin = false;
    //         }
    //     } else {
    //         this.userLogin = false;
    //     }
    //
    // }

    // 四院后端登录接口的返回值
    ionViewWillEnter() {
        const res = localStorage['userInfo'];
        console.log('res= ', JSON.parse(res));
        if (res) {
            this.userLogin = true;
            this.loginResUserInformation = JSON.parse(res);
        } else {
            this.userLogin = false;
        }
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter');
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit');
    }

    /**
     * 将下面样子的字符串格式化
     * AuthToken:sraQpTzss/ZYyXD0FFtGrvVMt/wluI+ceW0M/o9k9b4eXHtVM2oMXkKDTag37eyipPJppgDoEQHX4tu8tF/P2OPq6gNONOpGWpLeiORHVWnknxQwcUEuXz/oOaM6CnI+Vb9J9ZMaK7VJPhdLtusFIsPUVxSVlExkp87MPJgDHO0=&ClientIP:WIN-S7CCO4232OQ(10.24.20.42)&UserID:2f34224e-9fc7-4476-a0f1-61a14e8b9aec&LoginDate:2019/10/12 13:36:30&ProcessID:ab8780ab-3a50-4d52-90e5-25d8ac77668d&MainDBCode:MES&CurrentAppID:GSP&USERASSOBJECT:0&UserCode:yzy&AppInstanceName:华力电机MES&ID:dafca9ac-8a7b-4c6a-8ea8-02ba90b41b2a&BizDate:2019/10/12 5:36:51&FrameType:0&ClientToken:WIN-S7CCO4232OQ(10.24.20.42)&USERNAME:yzy&Language:zh-CN&AppInstanceID:MES&
     * formatLoginResState0()
     */
    // formatLoginResState0(res): any {
    //     var strs = new Array(); // 定义一数组
    //     strs = res.split('&'); // 字符分割
    //     strs.pop();  // 删除掉最后一个数组元素，因为最后一个是空的
    //     console.log('strs = ', strs);
    //     var c;
    //     var jsonRes = '{';
    //     for (const item of strs) {
    //         c = '"' + item + '"';
    //         // console.log('c =', c.replace(/:/, '\":\"'));
    //         jsonRes = jsonRes + c.replace(/:/, '\":\"') + ',';
    //     }
    //     // 去掉 最后一个字符（,）
    //     jsonRes = jsonRes.slice(0, jsonRes.length - 1) + '}';
    //     // console.log('jsonRes = ', jsonRes);
    //     // console.log('user page de state0 = ', strs);
    //     return JSON.parse(jsonRes);
    // }

    // logout() {
    //     this.loginService.logout4gsp7PubAPI(localStorage['GSPToken'], this.url.jgserverhost).subscribe(res => {
    //         console.log('退出登录 返回值 res  = ', res);
    //         this.userLogin = false;
    //
    //         window.localStorage.removeItem('loginResResult');
    //         window.localStorage.removeItem('loginResState0');
    //         window.localStorage.removeItem('loginResToken');
    //         window.localStorage.removeItem('GSPToken');
    //     }, err => {
    //         console.log('退出登录 返回值 err  = ', err);
    //         if (!err.ok) {
    //             ToastService.offline(err.message);
    //         }
    //     });
    // }

    logout() {
        this.userLogin = false;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userinfo');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('factory');
    }

    login() {
        this.router.navigate(['']);
        // this.router.navigate(['/login'], {relativeTo: this.route, replaceUrl: true});
    }


}
