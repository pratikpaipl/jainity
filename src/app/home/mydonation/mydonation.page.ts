import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Tools } from 'src/app/shared/tools';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-mydonation',
  templateUrl: './mydonation.page.html',
  styleUrls: ['./mydonation.page.scss'],
})
export class MydonationPage implements OnInit {

  myDList = [];
  pageMsg = '';

  constructor(private route: Router, public router: ActivatedRoute,
    public alertController: AlertController, private iab: InAppBrowser,
    public apiService: ApiService, public formBuilder: FormBuilder,
    private apiServices: ApiService, public tools: Tools,
    public toastController: ToastController) {
      this.tools.closeLoader();
    localStorage.removeItem('reciept');
  }

  ionViewDidEnter() {
    this.getmyDonationLISTCall();
  }

  getmyDonationLISTCall() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      console.log('getSGLISTCall');
      this.apiServices.getMyDonation(this.apiService.getUserData().id).subscribe(response => {
        console.log('RESPONSE>>>');

        this.tools.closeLoader();
        let res: any = response;
        if (res.status) {
          this.myDList = res.data;
        } else {
          this.pageMsg = res.message
        }
        console.log(res)
      }, (error: Response) => {
        console.log('ERORR>>>');
        this.tools.closeLoader();
        this.tools.closeLoader();
        let err: any = error;
        console.log('Error ', err);
        this.tools.openAlertToken(err.status, err.error.message);

      });
    } else {
      console.log('ELSE>> ');
      this.tools.closeLoader();
    }
  }


  ngOnInit() {
  }

  onReceiptClick(item) {
    localStorage.setItem('reciept', item.PDFUrl);
    if (item.PDFUrl != undefined && item.PDFUrl != '') {

      const browserPay = this.iab.create(item.PDFUrl, '_blank', {});
      // browserPay.on("loadstart").subscribe((event) => {
      //   // console.log('Pay Data loadstart url ',event.url);
      // });
      browserPay.on("exit").subscribe(
        (event) => {

        }
      );
    } else {
      this.tools.openAlert('Reciept not found!');
    }
  }
}
