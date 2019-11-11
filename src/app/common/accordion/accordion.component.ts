import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
    temp: string;
    items = [{
        'name': '张三',
        'age': 18
    }, {
        'name': '李四',
        'age': 20
    }, {
        'name': '王五',
        'age': 21
    }];

    constructor() {
    }

    ngOnInit() {
    }

    accordion(index, temp) {
        console.log('index = ', index, 'temp = ', temp);
        this.temp = temp + index;
    }

}
