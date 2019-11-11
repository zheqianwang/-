import {Injectable} from '@angular/core';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {RsaService} from './rsa.service';
import * as  RSA from '../../assets/js/jsencrypt.js';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {FactoryService} from './factory.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    loginUrl;
    withOutHeader = [];

    constructor(
        private url: UrlService,
        private http: HttpClient,
        private rsa: RsaService,
        private factory: FactoryService,
    ) {

        this.loginUrl = this.url.jungongService + '/login';
        // this.loginUrl = 'http://localhost:8899/login';
        this.withOutHeader.push(this.loginUrl);

    }

    atou(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }

    // 用户登录,密码自动加密
    // 登录成功自动设置缓存
    login(username: string, pwd: string) {
        return this.rsa.encrypt(pwd).pipe(mergeMap(res => {
                let en = new RSA.JSEncrypt();
                en.setPublicKey(res);
                let r = en.encryptLong(pwd);
                let body = new FormData();
                body.set('code', username);
                body.set('password', r);
                // let body = {
                //   code: username,
                //   password: r
                // };
                return this.http.post(this.loginUrl, body, {responseType: 'text'}).pipe(map((res: string) => {
                        let obj = JSON.parse(res);
                        if (obj.status) {
                            // localStorage.setItem('token', obj.token);
                            // localStorage.setItem('userinfo', atob(obj.token));
                            // localStorage.setItem('user', obj.user);

                            window.localStorage['token'] = obj.token;
                            window.localStorage['userinfo'] = this.atou(obj.token);
                            window.localStorage['user'] = obj.user;
                            this.factory.setFactory(obj.factory);//无factory,设置为false
                        }
                        return obj.status;//true或false 都返回200
                    })
                );
            }), catchError(err => {
                throw new Error('用户信息加密失败');
            })
        );
    }


}
