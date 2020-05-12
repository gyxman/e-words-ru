import {AuthState} from './auth.state';
import {authReducer} from './auth.reducer';
import {authActions} from './auth.actions';

describe('authReducer - редьюсер авторизационной группы', () => {
    it('Если приходит информация о начале авторизации, то ставим флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: false,
        } as AuthState;

        // act & assert
        expect(authReducer(undefined, authActions.loginStart())).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('Если приходит информация об успехе авторизации, то снимаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: true,
        } as AuthState;

        // act & assert
        expect(authReducer(undefined, authActions.loginSuccess())).toEqual({
            ...initialState,
            isLoading: false,
        });
    });

    it('Если приходит информация об ошибке при авторизации, то снимаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: true,
        } as AuthState;

        // act & assert
        expect(authReducer(undefined, authActions.loginError())).toEqual({
            ...initialState,
            isLoading: false,
        });
    });
});
