import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black via-cyan-950 to-black px-6 py-12">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-10 text-center tracking-tight leading-tight px-4 select-none cursor-default bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200 bg-[length:200%_auto] animate-[gradient_5s_ease-in-out_infinite] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
          Note App
        </h1>
        <br></br>
        <button  onClick={() => navigate("/home")} className="text-2xl font-semibold bg-white text-blue-800 !px-10 !py-2 rounded-2xl hover:bg-purple-50 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg mt-4 border-4 border-white/30 cursor-pointer select-none">
          Go to App
        </button>
      </div>
    </>
  );
}

export default App;
