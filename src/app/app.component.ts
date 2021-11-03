import { 
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit 
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public constraints = {
    video: {
      width : {max : 640},
      height : {max : 480},
      facingMode: "user", // 전면 카메라
      frameRate: { ideal: 10, max: 15 }
    },
    audio: false
  }

  public localVideoTag : any;



  constructor() {
  }
  
  ngAfterViewInit(){
    if(navigator.mediaDevices != null){
      this.localVideoTag = document.getElementById('localVideo') as HTMLVideoElement;
      console.log(this.localVideoTag)
      navigator.mediaDevices.getUserMedia(this.constraints)
      .then(stream => {
        console.log('Adding local stream.');
        console.log(stream)
        let video = this.localVideoTag.nativeElement;
        console.log(video);
        this.localVideoTag.srcObject = stream;
      })
      .catch(e => {
          console.log(e);
          alert('카메라 접근이 허용되지 않았습니다.');
      });
    }
  }

  initWebRTCPage(){
    if(navigator.mediaDevices != null){
      console.log(this.localVideoTag)
      navigator.mediaDevices.getUserMedia(this.constraints)
      .then(this.gotStream)
      .catch(function(e) {
          console.log(e);
          alert('카메라 접근이 허용되지 않았습니다@');
      });
    }
  }

  gotStream(stream){
    let video = this.localVideoTag.nativeElement;
    console.log('Adding local stream.');
    console.log(video)
    console.log(stream)
    video.srcObject = stream;
  }
}
