import { Reducer } from 'redux';

import { IAuth as Auth } from '../../models/auth';
import { IUser } from '../../models/user';
import { Action, ActionType } from '../actionTypes/authActionTypes';
    

export interface IAuthState {
    authToken : string ,
    isPasswordChanged: boolean,
    user : IUser | undefined | null;
    loading: boolean;
    error? : any | null;
}

const initialState = {
    authToken : "" ,
    isPasswordChanged: false,
    user : null , 
    loading: false,
    error : null
}

export const AuthReducer: Reducer<IAuthState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.AUTH_START:
            return { ...state, loading: true };

        case ActionType.AUTH_SUCCESS:
            const auth: Auth = action.payload
            return {
                ...state,
                authToken : 'loggedin' , 
                user : auth.user ,
                error : null , 
                loading: false
            };
        case ActionType.AUTH_FAIL:
            // const err: any = action.payload ? action.payload : '';
            return {
                ...state,
                // error: err,
                user: null,
                loading: false
            };
        case ActionType.AUTH_LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                authToken: ''
            }

        default:
            return state;
    }
};