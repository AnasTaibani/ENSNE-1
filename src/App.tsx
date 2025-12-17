import { useEffect, useRef } from "react";
import "./App.css";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let drawing = false;

    const startDraw = (x: number, y: number) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (x: number, y: number) => {
      if (!drawing) return;
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(0, 255, 204, 0.6)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const stopDraw = () => {
      drawing = false;
      ctx.closePath();
    };

    // Mouse
    canvas.addEventListener("mousedown", (e) =>
      startDraw(e.clientX, e.clientY)
    );
    canvas.addEventListener("mousemove", (e) =>
      draw(e.clientX, e.clientY)
    );
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    // Touch
    canvas.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      startDraw(t.clientX, t.clientY);
    });
    canvas.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      draw(t.clientX, t.clientY);
    });
    canvas.addEventListener("touchend", stopDraw);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* Doodle Layer */}
      <canvas ref={canvasRef} className="doodle-canvas" />

      {/* Main Content */}
      <main className="hero">
        <div className="hero-text">
          <h1>
            BUILDING <br />
            <span>SOMETHING ENSNE</span>
          </h1>
          <p>Go ahead. Draw on it.</p>
        </div>

        <div className="hero-image">
          <div className="image-placeholder">IMAGE</div>
        </div>
      </main>
    </>
  );
};

export default App;
