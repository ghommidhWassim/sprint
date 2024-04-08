import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const GET_LOGIN = 'GET_LOGIN';
export const GET_LOGIN_SUCCES = 'GET_LOGIN_SUCCES';
export const FAILURE = 'FAIlURE'
export const getLogin = createAction(GET_LOGIN,  props<{ email: string; password: string }>());
export const getLoginSucces = createAction(GET_LOGIN_SUCCES, props<{userdata:User}>())
export const getLoginFailure= createAction(FAILURE)