import { configureStore } from '@reduxjs/toolkit';
import projectReducers from './project/project-slice';
import loading from './loading';
import user from './user';
import moveTask from './move-task';
import updateComplete from './update-complete';
import notification from './notification';
export const store = configureStore({
    reducer: {
        projects: projectReducers,
        loading: loading,
        user: user,
        moveTask: moveTask,
        updateComplete: updateComplete,
        notification: notification,
    },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
