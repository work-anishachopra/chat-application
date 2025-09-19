// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInstance } from "../lib/fetch";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

let socket = null;

// --- THUNKS ---
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetchInstance("/auth/check");
      dispatch(connectSocket());
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Auth check failed");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetchInstance("/auth/signup", {
        method: "POST",
        body: formData,
      });
      toast.success("Account created successfully!");
      dispatch(connectSocket());
      return data;
    } catch (err) {
      toast.error(err.message || "Signup failed");
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetchInstance("/auth/login", {
        method: "POST",
        body: formData,
      });
      toast.success("Logged in successfully");
      dispatch(connectSocket());
      return data;
    } catch (err) {
      toast.error(err.message || "Login failed");
      return rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await fetchInstance("/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      dispatch(disconnectSocket());
      return null;
    } catch (err) {
      toast.error("Error logging out");
      return rejectWithValue(err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetchInstance("/auth/update-profile", {
        method: "PUT",
        body: formData,
      });
      toast.success("Profile updated successfully");
      return data;
    } catch (err) {
      toast.error(err.message || "Update failed");
      return rejectWithValue(err.message);
    }
  }
);

// --- SOCKET actions ---
export const connectSocket = () => (dispatch, getState) => {
  const { authUser } = getState().auth;
  if (!authUser || socket?.connected) return;

  socket = io(BASE_URL, { withCredentials: true });
  socket.connect();

  socket.on("getOnlineUsers", (userIds) => {
    dispatch(setOnlineUsers(userIds));
  });

  dispatch(setSocketConnected(true));
};

export const disconnectSocket = () => (dispatch) => {
  if (socket?.connected) socket.disconnect();
  dispatch(setSocketConnected(false)); // Add this
};

// --- SLICE ---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],
    isSocketConnected: false,
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocketConnected: (state, action) => {
      state.isSocketConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })

      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      })

      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
        state.isSocketConnected = false; // Add this
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
      });
  },
});

export const { setOnlineUsers, setSocketConnected } = authSlice.actions;

export default authSlice.reducer;

export const getSocket = () => socket;
