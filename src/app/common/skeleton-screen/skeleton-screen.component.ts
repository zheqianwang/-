import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-skeleton-screen',
    templateUrl: './skeleton-screen.component.html',
    styleUrls: ['./skeleton-screen.component.scss'],
})
export class SkeletonScreenComponent {
    @Input() noData: boolean;
    skeleton = new Array(20);   // 骨架屏的数据条数

    constructor() {
        console.log('this.noData = ', this.noData);
    }

}
