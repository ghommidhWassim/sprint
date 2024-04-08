// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { userAdapter } from './users.reducers';
// import { UserModel } from './users.reducers';
// import { User } from 'src/app/models/user';
// import { StorageService } from 'src/app/services/storage.service';
// import { from, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// // Select the user feature state
// export const selectUserState = createFeatureSelector<UserModel>('user');

// // Use the entity adapter to get selectors
// const {
//   selectAll, // Get all users as an array
// } = userAdapter.getSelectors();

// // Create a selector function that returns a selector to get the authenticated user
// export function createAuthenticatedUserSelector(storageService: StorageService) {
//   return createSelector(
//     selectUserState,
//     selectAll, // Assuming you're storing the authenticated user as part of all users
//     (state, users: User[]) => {
//       // Your logic to find the authenticated user here
//       // For example, find the user with the token in storage
//       return from(storageService.get('token')).pipe(
//         switchMap(token => {
//           const authenticatedUser = users.find(user => user.token === token);
//           return of(authenticatedUser);
//         })
//       );
//     }
//   );
// }
