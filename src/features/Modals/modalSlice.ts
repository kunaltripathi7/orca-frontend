import { ChannelModeType, ChannelType, ServerType } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "manageMembers"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel";
// export type OnCloseType = () => void;

export interface AuthState {
  isOpen: boolean;
  type: ModalType | null;
  server?: ServerType;
  channelType?: ChannelModeType;
  channel?: ChannelType;
  // onClose: OnCloseType | null;
}

const initialState: AuthState = {
  isOpen: false,
  type: null,
  server: undefined,
  channelType: undefined,
  channel: undefined,
  // onClose: null,
};

interface OpenModalPayload {
  type: ModalType;
  server?: ServerType;
  channelType?: ChannelModeType;
  channel?: ChannelType;
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.server = action.payload.server;
      state.channelType = action.payload.channelType;
      state.channel = action.payload.channel;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.server = undefined;
      state.channelType = undefined;
      state.channel = undefined;
      // state.onClose = null;
    },
    // setOnClose: (state, action: PayloadAction<OnCloseType>) => {
    //   state.onClose = action.payload;
    // },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
