import { Network } from '@ionic-native/network/ngx';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class Tools {
   
    notification;
    loading;

    constructor(
        public alertController: AlertController,private apiServices: ApiService,
        public toastController: ToastController, public network: Network,
        public loadingController: LoadingController, public router: Router,private navCtrl: NavController,
    ) {
      
    }

    backPage(){
        this.navCtrl.back();
    }
  
      async callStateList(isShow?:any) {    
        if (this.isNetwork()) {
            if(isShow)
            this.openLoader();
             this.apiServices.stateList().subscribe(response => {
                var res:any = response;  
                this.closeLoader();              
                if(res.status){
                    localStorage.setItem('stateList',JSON.stringify(res.state_list))
                }else{
                    localStorage.setItem('stateList',JSON.stringify([]))
                    return [];
                }
              }, (error: Response) => {
                this.closeLoader(); 
                console.log('Error ', error);
              });
            }else{
                this.closeLoader(); 
                return [];
            }      
      }

     getCities(stateList,id){
        if(stateList.length > 0){       
            if(stateList.filter(x => x.StateID === id).length > 0 )     
            return stateList.filter(x => x.StateID === id)[0].City;
            else{
                return [];
            }
        }
      }
      

    isNetwork(){
        this.closeLoader();
        if (this.network.type == 'none') {
            this.presentAlert('No internet', 'You do not have an Internet connection. Please check your connection status', 'Ok')
            return false;
        } else {
            return true;
        }
    }
    formatephone(phonenumber) {
        // tslint:disable-next-line:prefer-const
        let phonestring = phonenumber.replace(/[^a-zA-Z0-9]/g, '');
        // tslint:disable-next-line:prefer-const
        let formatednumber = phonestring.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        return formatednumber;
    }


    async openNotification(options) {
        this.notification = await this.toastController.create({
            message: options.message,
            duration: options.duration ? options.duration : 3000,
            position: options.position ? options.position : 'top',
            cssClass: options.class ? options.class : 'info'
        });
        this.notification.present();
    }
    
    async formateDateyyyymmddhis(date) {
        // tslint:disable-next-line:prefer-const
        let mm = ('0' + (date.getMonth() + 1)).slice(-2);
        // tslint:disable-next-line:prefer-const
        let dd = ('0' + (date.getDate())).slice(-2);
        // tslint:disable-next-line:prefer-const
        let yyyy = date.getFullYear();
        // tslint:disable-next-line:prefer-const
        let h = ('0' + (date.getHours())).slice(-2);
        // tslint:disable-next-line:prefer-const
        let i = ('0' + (date.getMinutes())).slice(-2);
        // tslint:disable-next-line:prefer-const
        let s = ('0' + (date.getSeconds())).slice(-2);
        // tslint:disable-next-line:prefer-const
        let today = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + i + ':' + s;
        return today;
    }

    async formateDay(today) {
        let dd = today.getDate();
        // tslint:disable-next-line:prefer-const
        let yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // January is 0!

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    async formatAMPM1(date) {
        // console.log(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        // tslint:disable-next-line:prefer-const
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        // tslint:disable-next-line:prefer-const
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    async formatAMPM(date) {
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        // tslint:disable-next-line:prefer-const
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        // tslint:disable-next-line:prefer-const
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    async openLoader(cssClass = '', msg?) {
        // console.log(' ===> ',msg);
        this.loading = await this.loadingController.create({
            message: msg ? msg : '',
            keyboardClose: true,
            showBackdrop: true,
            cssClass: cssClass
        });
        await this.loading.present();
    }

    async openAlert(message) {
        const alert = await this.alertController.create({
            message: message ? message : 'This is an alert message.',
            buttons: ['OK'],
            backdropDismiss: false
        });
        return await alert.present();
    }
    async openAlertToken(status,message) {
        console.log('Api Status ',status)
        const alert = await this.alertController.create({
            message: message ? message : 'This is an alert message.',
            buttons:  [
                {
                    text: status==401?'Login':'Ok',
                    handler: () => {
                        if(status==401){
                            localStorage.setItem('userdata','');
                            localStorage.setItem('login_token','');
                            localStorage.clear();
                            this.router.navigateByUrl('/login', { replaceUrl: true });            
                                    }
                    }
                }
            ],
            backdropDismiss: false
        });
        return await alert.present();
    }

    async presentLogout(message, btnYes, btnNo) {
        const alert = await this.alertController.create({
            message: message,
            buttons: [
                {
                    text: btnNo ? btnNo : 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: btnYes ? btnYes : 'Yes',
                    handler: () => {
                        localStorage.setItem('userdata','');
                        localStorage.setItem('login_token','');
                        localStorage.clear();
                        this.router.navigateByUrl('/login', { replaceUrl: true });
                    }
                }
            ], backdropDismiss: true
        });
        return await alert.present();
    }
    async presentAlertToLogin(title, msg, btnOk) {
        this.closeLoader();
        const alert = await this.alertController.create({
            header: title,
            message: msg,
            buttons: [
                {
                    text: btnOk,
                    handler: () => {
                        
                        localStorage.setItem('userdata','');
                        localStorage.setItem('login_token','');
                        localStorage.clear();
                        this.router.navigateByUrl('/login', { replaceUrl: true });
                    }
                }
            ]
        });
        await alert.present();
    }

    async presentAlert(title, msg, btnOk,isMove?) {
        const alert = await this.alertController.create({
            header: title,
            message: msg,
            buttons: [
                {
                    text: btnOk,
                    handler: () => {
                        if(isMove)
                        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
                    }
                }
            ]
        });
        await alert.present();
    }

    async presentConfirm(message, btnYes, btnNo) {
        const alert = await this.alertController.create({
            message: message ? message : 'Do you want to buy this book?',
            buttons: [
                {
                    text: btnNo ? btnNo : 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: btnYes ? btnYes : 'Yes',
                    handler: () => {
                        // console.log('Buy clicked');
                    }
                }
            ], backdropDismiss: false
        });
        return await alert.present();
    }
    closeLoader() {
        // setTimeout(() => {
            if (this.loading) {
                this.loading.dismiss();
            }
        // }, 500);
    }

    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = unescape(dataURI.split(',')[1]);
        }
        // separate out the mime component
        // tslint:disable-next-line:prefer-const
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        // tslint:disable-next-line:prefer-const
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {
            type: mimeString
        });
    }

    returnImageName(keys, file, blob) {
        let imagename;
        if (blob) {
          imagename = new Date().getTime() + keys + '.jpg';
          blob.lastModified = new Date();
          blob.name = imagename;
        } else {
          imagename = new Date().getTime() + keys + file.name;
        }
        imagename.replace(/_/g, ' ');
        imagename = imagename.replace(/\s+/g, '-');
        imagename = imagename.replace(/%20/g, '_');
        return imagename;
      }
      
}

