import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

    constructor(
        public nav: NavController,
        private barcodeScanner: BarcodeScanner
    ) {
    }

    text;   //识别的条形码数据（数字列）

    ngOnInit() {
        // alert('Barcode');
        // this.barcodeScanner.scan().then(barcodeData => {
        //     // console.log('Barcode data', barcodeData);
        //     // alert('Barcode data' + JSON.stringify(barcodeData));
        //     if (barcodeData.text != '') {   //识别到
        //         this.text = barcodeData.text;
        //         if (barcodeData.format == 'EAN_13') { //识别到条形码
        //             // alert('识别结果为 条形码')
        //         } else if (barcodeData.format == 'QR_CODE') {  //识别到二维码
        //             // alert('识别结果为 二维码')
        //         }
        //     }
        //     if (barcodeData.cancelled) {  //用户点了取消识别
        //         // 页面不要进行跳转
        //         this.nav.pop();
        //     }
        // }).catch(err => {
        //     console.log('Error', err);
        //     alert('Error' + err);
        // });

    }


    // ionViewDidEnter() {
    //     alert('ionViewWil lEnter ----   Barcode');
    //     this.barcodeScanner.scan().then(barcodeData => {
    //         console.log('Barcode data', barcodeData);
    //         alert('Barcode data' + JSON.stringify(barcodeData));
    //     }).catch(err => {
    //         console.log('Error', err);
    //         alert('Error' + err);
    //     });
    // }

}
