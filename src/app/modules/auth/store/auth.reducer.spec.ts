import {AuthState} from './auth.state';
import {authReducer} from './auth.reducer';
import {authActions} from './auth.actions';
import {SignInWithEmailAndPassword} from '../models/sign-in-with-email-and-password';

describe('authReducer - редьюсер авторизационной группы', () => {
    it('Если приходит информация о начале авторизации с помощью логина и пароля, то ставим флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: false,
        } as AuthState;

        const data = {
            email: 'testEmail',
            password: 'testPassword',
        } as SignInWithEmailAndPassword;

        // act & assert
        expect(
            authReducer(undefined, authActions.signInWithEmailAndPasswordStart({data})),
        ).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('Если приходит информация об успехе авторизации с помощью логина и пароля, то снимаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: true,
        } as AuthState;

        // act & assert
        expect(
            authReducer(
                undefined,
                authActions.signInWithEmailAndPasswordSuccess({refreshToken: 'token'}),
            ),
        ).toEqual({
            ...initialState,
            isLoading: false,
        });
    });

    it('Если приходит информация об ошибке при авторизации с помощью логина и пароля, то снимаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: true,
        } as AuthState;

        // act & assert
        expect(
            authReducer(undefined, authActions.signInWithEmailAndPasswordError()),
        ).toEqual({
            ...initialState,
            isLoading: false,
        });
    });
});
