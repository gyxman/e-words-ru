import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ReplaySubject} from 'rxjs';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit {
    @Input() seconds: number;
    @Input() callback: () => any;
    formattedTime$ = new ReplaySubject<string>(1);
    attention = false;
    timerId: number;

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'timer',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-timer.svg'),
        );
    }

    ngOnInit() {
        this.setTimer(this.seconds);

        this.formattedTime$.next(this.getFormatTime(this.seconds));
    }

    private getFormatTime(count: number): string {
        if (count < 10) {
            this.attention = true;
        }

        if (count < 1) {
            this.clearTimer();
        }

        const minutes = Math.floor(count / 60);
        const seconds = count - minutes * 60;

        return `${minutes < 10 ? '0' + minutes : minutes}:${
            seconds < 10 ? '0' + seconds : seconds
        }`;
    }

    private setTimer(time: number) {
        this.timerId = window.setInterval(() => {
            this.formattedTime$.next(this.getFormatTime(--time));
        }, 1000);
    }

    private clearTimer() {
        clearInterval(this.timerId);

        this.callback();
    }
}
