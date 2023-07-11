import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'personal-soft-front';
  isLoading: boolean = false;

  constructor(
    private _loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading() {
    this._loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.isLoading = loading;
      });
  }
}
