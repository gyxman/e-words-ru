import {createAction, props} from '@ngrx/store';
import {SignInWithEmailAndPassword} from '../models/sign-in-with-email-and-password';
import {NotificationModel} from '../../utils/modules/notification/models/notification';

const signInWithEmailAndPasswordStart = createAction(
    '[auth] Начать авторизацию в приложении с помощью логина и пароля',
    props<{data: SignInWithEmailAndPassword}>(),
);

const signInWithEmailAndPasswordSuccess = createAction(
    '[auth] Успешная авторизация в приложении с помощью логина и пароля',
    props<{refreshToken: string}>(),
);

const signInWithEmailAndPasswordError = createAction(
    '[auth] Ошибка при авторизации в приложении с помощью логина и пароля',
);

const showNotification = createAction(
    '[auth] Показать нотификацию',
    props<{data: NotificationModel}>(),
);

export const authActions = {
    signInWithEmailAndPasswordStart,
    signInWithEmailAndPasswordSuccess,
    signInWithEmailAndPasswordError,
    showNotification,
};
