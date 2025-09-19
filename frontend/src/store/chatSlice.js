// src/store/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInstance } from "../lib/fetch";
import toast from "react-hot-toast";
import { getSocket } from "./authSlice";

export const getAllContacts = createAsyncThunk(
  "chat/getAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchInstance("/messages/contacts");
    } catch (err) {
      toast.error(err.message || "Failed to load contacts");
      return rejectWithValue(err.message);
    }
  }
);

export const getMyChatPartners = createAsyncThunk(
  "chat/getMyChatPartners",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchInstance("/messages/chats");
    } catch (err) {
      toast.error(err.message || "Failed to load chats");
      return rejectWithValue(err.message);
    }
  }
);

export const getMessagesByUserId = createAsyncThunk(
  "chat/getMessagesByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchInstance(`/messages/${userId}`);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      return rejectWithValue(err.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { messageData, selectedUser, authUser },
    { getState, rejectWithValue }
  ) => {
    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    const { messages } = getState().chat;

    try {
      const data = await fetchInstance(`/messages/send/${selectedUser._id}`, {
        method: "POST",
        body: messageData,
      });
      return [...messages, data];
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      return rejectWithValue(messages); // rollback
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  },
  reducers: {
    toggleSound: (state) => {
      state.isSoundEnabled = !state.isSoundEnabled;
      localStorage.setItem("isSoundEnabled", state.isSoundEnabled);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.allContacts = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(getAllContacts.rejected, (state) => {
        state.isUsersLoading = false;
      })

      .addCase(getMyChatPartners.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getMyChatPartners.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(getMyChatPartners.rejected, (state) => {
        state.isUsersLoading = false;
      })

      .addCase(getMessagesByUserId.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessagesByUserId.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isMessagesLoading = false;
      })
      .addCase(getMessagesByUserId.rejected, (state) => {
        state.isMessagesLoading = false;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const {
  toggleSound,
  setActiveTab,
  setSelectedUser,
  addMessage,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;

// --- socket subscription helper ---
export const subscribeToMessages = () => (dispatch, getState) => {
  const { selectedUser, isSoundEnabled } = getState().chat;
  if (!selectedUser) return;

  const socket = getSocket();
  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId !== selectedUser._id) return;

    dispatch(addMessage(newMessage));

    if (isSoundEnabled) {
      const audio = new Audio("/sounds/notification.mp3");
      audio.currentTime = 0;
      audio.play().catch((e) => console.log("Audio play failed:", e));
    }
  });
};

export const unsubscribeFromMessages = () => () => {
  const socket = getSocket();
  socket.off("newMessage");
};
