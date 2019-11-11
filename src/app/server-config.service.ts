import {Injectable, OnInit} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServerConfigService implements OnInit {

    constructor() {
    }

    serverIp;
    serverPort;

    ngOnInit() {
        this.serverIp = localStorage['memoryServerIp'];
        this.serverPort = localStorage['memoryServerPort'];
    }

    getServer(): any {
        this.serverIp = localStorage['memoryServerIp'];
        this.serverPort = localStorage['memoryServerPort'];
        return {ip: this.serverIp, port: this.serverPort};
    }
}
