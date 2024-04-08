import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { getLoginSucces } from './users.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface UserState extends EntityState<User> {}

export const userAdapter = createEntityAdapter<User>();
export const userInitialState: UserState = userAdapter.getInitialState();

export const userReducer = createReducer(
  userInitialState,
  on(getLoginSucces, (state, { userdata }) => ({
    ...state,
  }))
);
