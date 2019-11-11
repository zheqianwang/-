import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
    @Input() noData: boolean;
    loadingSrc = '../../../assets/img/loading.gif';
    emptySrc = '../../../assets/img/empty.png';

    constructor() {
    }

    ngOnInit() {
    }

}
