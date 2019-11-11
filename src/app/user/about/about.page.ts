import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';


@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage {

    constructor(
        public nav: NavController,
    ) {
    }

    openMenu() {
        document.querySelector('ion-menu')
            .open();
    }

}


