import { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { Application, ICanvas } from "pixi.js";
import RouletteAnimator from "./RouletteAnimator";

export default function Roulette() {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const rouletteAnimatorRef = useRef<RouletteAnimator>(new RouletteAnimator());
  const rouletteAnimator = rouletteAnimatorRef.current;

  useEffect(() => {
    const app = new Application();

    app
      .init({
        backgroundAlpha: 0,
        antialias: true,
        view: containerRef.current as ICanvas,
      })      
      .then(() => {
        app.stage.eventMode = "static";
        app.stage.hitArea = app.screen;

        rouletteAnimator.initialization(app);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "300px",
          height: "300px",
          //backgroundColor: "red",
          borderRadius: "50%",
        }}
      >
        Roulette
        <canvas
          ref={containerRef}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    </Box>
  );
}
