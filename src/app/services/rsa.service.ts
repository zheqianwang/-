import {Injectable} from '@angular/core';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class RsaService {

    rsaKeyUrl: string;
    withOutHeader: Array<any> = [];

    constructor(
        private http: HttpClient,
        private url: UrlService
    ) {
        this.rsaKeyUrl = this.url.jungongService + '/publickey';
        this.withOutHeader.push(this.rsaKeyUrl);
    }

  //rsa非对称加密
  encrypt(obj: any) {
    return this.http.get(this.rsaKeyUrl, {responseType: 'text'}).pipe(
        tap(res => {
        }, catchError(err => {
          throw new Error("获取加密证书失败");
        }))
    );
  }

}
