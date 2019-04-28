import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
urls=[]
  constructor(public navCtrl: NavController) {

  }
  ngOnInit(){
    for(let i=0;i<10;i++){
      var width = this.getRandomSize(200, 400);
      var height =  this.getRandomSize(200, 400);
      this.urls.push(`https://placekitten.com/${width}/${height}`)
    }
  }
  getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  NavPostPage(){
    this.navCtrl.push(PostPage)
  }
}
