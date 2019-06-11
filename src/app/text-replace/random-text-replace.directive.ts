import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { getRandomArbitrary } from '../utils/random-arbitrary';

@Directive({
  selector: '[appRandomTextReplace]'
})
export class RandomTextReplaceDirective implements AfterViewInit, OnDestroy {
  @Input()
  public duration = 5000;

  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef) {
  }

  public ngAfterViewInit(): void {
    timer(0, this.duration)
      .pipe(
        map(() => this.elementRef.nativeElement.innerText),
        map((text: string) => {
          const words = text.split(' ');
          const randomWord = words[getRandomArbitrary(0, words.length)];
          const index = text.indexOf(randomWord);
          let highlightedText = '';
          if (index >= 0) {
            highlightedText = `<span class=\'highlight\'>${text.substring(index, index + randomWord.length)}</span>`;
            text = text.substring(0, index) + highlightedText + text.substring(index + randomWord.length);
            this.elementRef.nativeElement.innerHTML = text;
          }
          return {text, highlightedText};
        }),
        switchMap(({text, highlightedText}) => timer(2000)
          .pipe(
            tap(() => {
              this.elementRef.nativeElement.innerHTML = text.replace(highlightedText, '');
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
