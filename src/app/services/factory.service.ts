import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FactoryService {

    FACTORY = 'factory';

    factory;

    constructor() {
        this.factory = this.getFactory();
    }

    // 设置工厂缓存
    setFactory(obj: any) {
        // localStorage.setItem(this.FACTORY, obj);
        window.localStorage[this.FACTORY] = obj;
    }

    // 取工厂缓存
    getFactory() {
        // let f = localStorage.getItem(this.FACTORY);
        let f = localStorage[this.FACTORY];
        return (f == null || f == 'false') ? false : f;
    }

}
