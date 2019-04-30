import { Entry } from './../models/entry';
import { EntryServiceService } from './../services/entry-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.css']
})
export class DiaryEntryComponent implements OnInit {
  
  public entries: Entry[];
  token: string;

  userData: any;
  data:any;

  constructor(private entryServiceService: EntryServiceService, private route: ActivatedRoute) {
    this.userData = {}
    this.data = {};
   }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
    this.getEntries()
  }

  getEntries() {
    this.entryServiceService.getEntries(this.token)
      .subscribe(data => {
        this.entries = [];
        this.data = data;
        this.parseData();
      });
  }

  parseData(){
    if(this.data.sharedData && this.data.sharedData.diary) {
      this.userData = this.data.sharedData.diary;
    } else {
      return;
    }
    if(this.userData && this.userData.length > 0) {
      this.userData.forEach(element => {
        var entry = new Entry();
          element.title? entry.title = element.title:0;
          element.message? entry.message = element.message: 0;
          element.dated? entry.dated = element.dated: 0;
          if(element.mediaUrl) {
            var typeOfMedia = this.checkMediaType(element.mediaUrl);
            if (typeOfMedia === 2) {
              entry.mediaType = "audio";
              entry.mediaUrl = element.mediaUrl;
            } else {
              entry.mediaType = "img";
              entry.mediaUrl = element.mediaUrl;
            }
          } else {
            entry.mediaType = null;
            entry.mediaUrl = null;
          }
          this.entries.push(entry);
      });
    }
  }

  checkMediaType(file) {
		var fileIsImage = this.isImage(file);
		if (fileIsImage) {
			return 1;
		}
		var fileIsAudio = this.isAudio(file);
		if (fileIsAudio) {
			return 2;
		}
	}
	getExtension(filename) {
		var parts = filename.split('.');
		return parts[parts.length - 1];
	}

	isImage(filename) {
		var ext = this.getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'bmp':
			case 'png':
				//etc
				return true;
		}
		return false;
	}

	isAudio(filename) {
		var ext = this.getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'x-wav':
			case 'wav':
				// etc
				return true;
		}
		return false;
	}
}
