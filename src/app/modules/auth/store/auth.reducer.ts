import {AuthState} from './auth.state';
import {Action, createReducer, on} from '@ngrx/store';
import {authActions} from './auth.actions';

const initialState: AuthState = {
    isLoading: false,
};

const reducer = createReducer(
    initialState,

    on(authActions.signInWithEmailAndPasswordStart, state => ({
        ...state,
        isLoading: true,
    })),

    on(
        authActions.signInWithEmailAndPasswordSuccess,
        authActions.signInWithEmailAndPasswordError,
        state => ({
            ...state,
            isLoading: false,
        }),
    ),
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
}
