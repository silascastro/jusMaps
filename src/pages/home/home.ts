import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
//import { Button } from 'ionic-angular/components/button/button';

declare var google;
//let nome: string;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });
  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Local Atual!</h4>";

    this.addInfoWindow(marker, content);

  }



  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      //infoWindow.open(this.map, marker);
      this.presentPrompt();
    });

  }

  presentPrompt() {
    let myDate: string =  new Date().toString();
    alert(myDate)
    let Al = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'Local',
          placeholder: 'Local?'
        },
        {
          name: 'descricao',
          placeholder: 'Descrição',
          type: 'text'
        },
        {
          name: 'data',
          placeholder: 'Data'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.FirstName);
            console.log(data.LastName);
            //this.presentAlert();
          }
        }
      ]

    });
    
    Al.present();

  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Ok',
      subTitle: 'Informação Registrada!',
      buttons: ['Ok']
    });
    alert.present();
  }

  
}