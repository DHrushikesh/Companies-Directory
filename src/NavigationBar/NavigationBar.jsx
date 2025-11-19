import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { toggleMode } from "../redux/Slices/themeslice.js"; 
import useTheme from "../custom hooks/theme";

function NavigationBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme(); 

  return (
    <header
      className="flex justify-between items-center p-4  shadow-md flex-wrap gap-4 transition"
      style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        color: theme.textPrimary,
      }}
    >
      {/* Title */}
      <h1 className="text-xl font-semibold" style={{ color: theme.textPrimary }}>
        Companies Directory
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">

    
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-lg text-sm font-medium border transition hover:scale-95"
          style={{
            background: theme.primary,
            borderColor: theme.border,
            color: theme.mode === "light" ? "white" : "#e0f2fe",
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => dispatch(toggleMode())}
          className="px-4 py-2 rounded-lg text-sm font-medium transition hover:scale-95"
          style={{
            background: theme.secondary,
            color: "white",
          }}
        >
          {theme.mode === "light" ? "Dark Mode" : "Light Mode"}
        </button>

      </div>
    </header>
  );
}

export default NavigationBar;
