import { Component, OnInit } from '@angular/core';
import {sala, SalaAulaService} from '../services/sala-aula.service'
import { ActivatedRoute } from '@angular/router/';
/* import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { QRCodeModule } from 'angularx-qrcode'; */

@Component({
  selector: 'app-sala-home',
  templateUrl: './sala-home.page.html',
  styleUrls: ['./sala-home.page.scss'],
})
export class SalaHomePage implements OnInit {
  sala : sala
  createdCode = null
  idSala = this.router.snapshot.params["sala-aula"]
  constructor(private provider : SalaAulaService, private router : ActivatedRoute,
    /* private qrScanner: QRScanner,  private barcodeScanner : BarcodeScanner */) { }
    public myAngularxQrCode: string = null;
  ngOnInit() { 
    //this.myAngularxQrCode = 'Your QR code data string';
    this.provider.getByFilter(this.idSala).subscribe(res => {
      this.sala = res
    })
  }

  

  gerarQRCode(){
    /* this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
       
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);

          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
  })
  .catch((e: any) => console.log('Error is', e));*/
  } 

}
