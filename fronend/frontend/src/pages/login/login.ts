import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SignupPage} from '../../pages/signup/signup';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: HttpClient) {
  }

  presentToast(message: string) {
     let toast = this.toastCtrl.create({
         message: message,
         duration: 3000,
         position: 'bottom'
     });

     toast.present();

     return toast;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  username: string;
  password: string;

  login(){
    var jsonData = {
    	'username': this.username,
	'password': this.password
    };
    if (this.username == null || this.password == null) {
       this.presentToast("Please enter User Name and Password");
    } else if (this.username.length == 0 || this.password.length == 0) {
       this.presentToast("Please enter User Name and Password");
    } else {
      let myheaders = new HttpHeaders({ });
      this.http.post("http://localhost:3000/login", jsonData, {headers: myheaders, withCredentials: true , responseType:'text'})
      .subscribe((data) => {
    	  if (data == "SUCCESS") {
	     this.navCtrl.push(TabsPage);
	  } else if (data == "FAILED") {
	     this.presentToast("Wrong User Name or Password");
 	  } else {
	     this.presentToast(data);
	  }
       }, error => {
       	  console.log(error);
	  this.presentToast("Error connecting to backend server");
       });
    }
  }
  signup(){
    this.navCtrl.push(SignupPage);
  }
}


