import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-person',
    templateUrl: './person.page.html',
    styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

    personDetail;

    constructor(
        public nav: NavController,
    ) {

    }

    ngOnInit() {
        this.personDetail = JSON.parse(localStorage['userInfo']);
        console.log('this.personDetail = ', this.personDetail);
    }

}
