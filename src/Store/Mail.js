import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    inboxMails: [],
    sentMails: [],
    markUnRead: [],
    offline: true,
  },
  reducers: {
    AllinboxMails(state, action) {
      state.inboxMails = action.payload;
    },
    AddsentMails(state, action) {
      state.sentMails = action.payload;
    },
    ReadData(state, action) {
      state.markUnRead = action.payload;
    },
    online(state) {
      state.offline = false;
    },
    offline(state) {
      state.offline = true;
    },
  },
});

export const mailSliceAction = mailSlice.actions;
export default mailSlice.reducer;
