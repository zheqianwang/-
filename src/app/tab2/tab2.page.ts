import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    constructor(
        public nav: NavController,
        private qrScanner: QRScanner
    ) {
    }

    ngOnInit(): void {
    }

    /**
     * 扫码
     * scan()
     */
    scan() {
        // Optionally request the permission early
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // camera permission was granted----相机许可被批准

                    // start scanning----开始扫描
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        console.log('Scanned something', text);
                        alert('Scanned something' + text);
                        this.qrScanner.hide(); // hide camera preview---隐藏相机预览
                        scanSub.unsubscribe(); // stop scanning---停止扫描
                    });

                } else if (status.denied) {
                    // camera permission was permanently denied---摄像许可被永久拒绝
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                    alert('摄像许可被永久拒绝');
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                    //    许可被拒绝了，但不是永久的。你可以在以后的时间里再次请求许可
                    alert('许可被拒绝了，但不是永久的。你可以在以后的时间里再次请求许可');
                }
            })
            .catch((e: any) => {
                console.log('Error is', e);
                alert('Error is' + e);
            });
    }
}
