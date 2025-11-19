import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  colors: {
    light: {
      primary: "linear-gradient(45deg, #3b82f6, #60a5fa)",  
      secondary: "linear-gradient(45deg, #38bdf8, #7dd3fc)",  
      balanceGradient: "linear-gradient(135deg, rgba(59,130,246,0.95) 0%, rgba(96,165,250,0.9) 50%, rgba(125,211,252,0.95) 100%)",  
      background: "#f0f9ff",  // very light blue background
      surface: "#ffffff",  
      textPrimary: "#1e3a8a",  
      textSecondary: "#2563eb",  
      border: "#bfdbfe",
    },
    dark: {
      primary: "linear-gradient(45deg, #1e3a8a, #2563eb)",  
      secondary: "linear-gradient(45deg, #0ea5e9, #38bdf8)",  
      balanceGradient: "linear-gradient(135deg, rgba(30,58,138,0.85) 0%, rgba(37,99,235,0.9) 50%, rgba(14,165,233,0.95) 100%)",  
      background: "#0f172a",  // deep slate blue
      surface: "#1e293b",     // slightly lighter surface
      textPrimary: "#e0f2fe",  
      textSecondary: "#93c5fd",
      border: "#3b82f6",
    },
  },
};


const themeSlice = createSlice({
  name: "ThemeStore",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setMode(state, action) {
      state.mode = action.payload; 
    },
  },
});

export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;