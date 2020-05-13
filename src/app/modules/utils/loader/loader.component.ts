import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
    @Input() showLoader = false;
    @Input() showOverlay = false;
}
