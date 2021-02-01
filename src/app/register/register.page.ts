import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Tools } from '../shared/tools';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  Fname:any = "";
  Lname:any = "";
  mobileno:any = "";

  loginForm: FormGroup;
  
  constructor(private route: Router,public formBuilder: FormBuilder,
    private apiServices: ApiService,public tools: Tools,
    public toastController: ToastController) {

    this.loginForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern('[a-zA-Z]+')]],
      lname: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('[a-zA-Z]+')]],
      mobileno: ['',[Validators.required, Validators.maxLength(10),Validators.pattern('[0-9]+')]],
    });
  
  }

  ngOnInit() {
  }

  onLogClick() {
    this.route.navigate(['/login']);
    }


    cliRegister() {

      var msg = ''

      
      if (this.Fname =='') {
        msg = msg + 'Please enter First name<br />'
      } else if (this.Fname.length != 3) {
        msg = msg + 'First name should be at least 3 letters long and without any space<br />'
      }else if (this.Lname =='') {
        msg = msg + 'Please enter Last name<br />'
      } else if (this.Lname.length != 3) {
        msg = msg + 'Last name should be at least 3 letters long and without any space<br />'
      }else if (this.mobileno =='') {
        msg = msg + 'Please enter mobile number<br />'
      } else if (this.mobileno.length != 10) {
        msg = msg + 'Please enter valid mobile number<br />'
      }

      if (msg != '') {
        this.tools.openAlert(msg);
      } else {
  
        if (this.tools.isNetwork()) {
          this.tools.openLoader();
          this.apiServices.Register(this.Fname,this.Lname,this.mobileno).subscribe(response => {
            this.tools.closeLoader();
            let res: any = response;
            console.log('response ', res.login_token);
  
            if(res.status && res.data.user.activated != '0'){
              localStorage.setItem('login_token', res.login_token);
              localStorage.setItem('userdata', JSON.stringify(res.data.user));
              this.route.navigateByUrl('/otpverification/'+this.mobileno);
            }else{
              this.tools.presentAlert('','Successfully Send OTP . Please wait for the admin to approve your request.', 'Ok');
            }
          }, (error: Response) => {
            this.tools.closeLoader();
            this.tools.closeLoader();
            console.log('Error ', error);
            let err:any = error;
            this.tools.openAlertToken(err.status, err.error.message);
      
            // }
            //  this.router.navigateByUrl('/dashboard');
          });
        } else {
          this.tools.closeLoader();
        }
      }
    }


  // async cliRegister() {
  //   const toast = await this.toastController.create({
  //     message: 'This Is Register',
  //     duration: 2000 ,
  //     color: 'primary'
  //   });
  //   toast.present();
  // }

}
