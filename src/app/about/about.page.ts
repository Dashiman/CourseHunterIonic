import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Backlight } from '@ionic-native/backlight/ngx';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
lumosBool:boolean=false;
  constructor(private youtube: YoutubeVideoPlayer,private iab: InAppBrowser,private backlight: Backlight) { }

  ngOnInit() {

  }
easterEgg(){ 

  this.youtube.openVideo('BBGEG21CGo0');
}
openWzr(){ 
this.iab.create('https://wzr.ug.edu.pl/glowna/','_blank')

}

}
