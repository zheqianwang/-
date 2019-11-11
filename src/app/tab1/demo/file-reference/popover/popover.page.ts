import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.page.html',
    styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

    constructor(
        private pop: PopoverController
    ) {
    }

    async dismiss() {
        await this.pop.dismiss();
    }

    ngOnInit() {
    }

}
