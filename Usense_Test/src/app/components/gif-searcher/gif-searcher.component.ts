import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GiphyService } from '../../shared/services/giphy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'usense-gif-searcher',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './gif-searcher.component.html',
  styleUrl: './gif-searcher.component.scss',
})
@AutoUnsubscribe()
export class GifSearchComponent implements OnInit, OnDestroy {
  public searchQuery: string = '';
  public gifs: any[] = [];
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private giphyService: GiphyService) {}

  public ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => {
        if (!query.trim()) {
          this.gifs = [];
          return;
        }

        this.giphyService.searchGifs(query.trim()).subscribe((response) => {
          this.gifs = response.data;
        });
      });
  }

  public searchGIFs() {
    this.searchSubject.next(this.searchQuery);
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      alert('Посилання скопійовано!');
    });
  }

  public downloadGIF(url: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'gif-animation.gif';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error('Помилка завантаження:', error));
  }
}
