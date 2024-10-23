import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IKanbanState } from "../interfaces/kanbanInterface";

const initialState: IKanbanState = {
  user: '',
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },

    resetUser(state) {
      state.user = initialState.user;
    },
  },
});

export const { setUser, resetUser } = kanbanSlice.actions;

export const kanbanReducer = kanbanSlice.reducer;
