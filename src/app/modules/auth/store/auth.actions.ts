import {createAction} from '@ngrx/store';

const loginStart = createAction('[auth] Начать авторизацию в приложении');

const loginSuccess = createAction('[auth] Успешная авторизация в приложении');

const loginError = createAction('[auth] Ошибка при авторизации в приложении');

export const authActions = {
    loginStart,
    loginSuccess,
    loginError,
};
