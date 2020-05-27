import {createAction, props} from '@ngrx/store';
import {SignInWithEmailAndPassword} from '../models/sign-in-with-email-and-password';
import {LocalstorageUserInfo} from '../models/localstorage-user-info';

const signInWithEmailAndPasswordStart = createAction(
    '[auth] Начать авторизацию в приложении с помощью логина и пароля',
    props<{data: SignInWithEmailAndPassword}>(),
);

const signInWithEmailAndPasswordSuccess = createAction(
    '[auth] Успешная авторизация в приложении с помощью логина и пароля',
    props<{data: LocalstorageUserInfo}>(),
);

const signInWithEmailAndPasswordError = createAction(
    '[auth] Ошибка при авторизации в приложении с помощью логина и пароля',
);

export const authActions = {
    signInWithEmailAndPasswordStart,
    signInWithEmailAndPasswordSuccess,
    signInWithEmailAndPasswordError,
};
