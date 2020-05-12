import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.state';
import {AUTH_STATE} from './auth.consts';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE);

const isLoading = createSelector(getAuthState, ({isLoading}) => isLoading);

export const fromAuth = {
    isLoading,
};
