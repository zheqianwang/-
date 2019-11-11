import {Component, Input, OnInit} from '@angular/core';
import {UrlService} from '../../url.service';
import {PopoverController} from '@ionic/angular';
import {ToastService} from 'ng-zorro-antd-mobile';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-add-or-edit',
    templateUrl: './add-or-edit.page.html',
    styleUrls: ['./add-or-edit.page.scss'],
})
export class AddOrEditPage implements OnInit {

    constructor(
        private url: UrlService,
        private _toast: ToastService,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit() {
    }




}
