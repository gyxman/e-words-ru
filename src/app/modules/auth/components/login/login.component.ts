import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthFacadeService} from '../../services/auth-facade.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    form = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.minLength(8), Validators.required]),
    });

    readonly showLoader$ = this.authFacadeService.showLoader$;

    constructor(private readonly authFacadeService: AuthFacadeService) {}

    get emailControl(): FormControl {
        return this.form.get('email') as FormControl;
    }

    get passwordControl(): FormControl {
        return this.form.get('password') as FormControl;
    }

    onSubmit() {
        const data = this.form.value;

        this.authFacadeService.signInWithEmail(data);
    }
}
