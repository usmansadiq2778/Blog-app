import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import postReducer from "./postRedux";
import userprofileReducer from "./userprofileRedux";
import commentReducer from "./commentRedux";
import categoryReducer from "./categoryRedux";
export default configureStore({
  reducer: {
    user: userReducer,
    userprofile: userprofileReducer,
    post: postReducer,
    category: categoryReducer,
    comment: commentReducer,
  },
});


