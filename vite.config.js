import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
 
export default defineConfig({
  plugins: [
    react(),
    {
      name: "serve-xgzzl",
      configureServer(server) {
        server.middlewares.use("/xgzzl", (req, res) => {
          const data = fs.readFileSync("./xgzzl", "utf8");
          res.setHeader("Content-Type", "application/json");
          res.end(data);
        });
      }
    }
  ],
  server: { port: 5173, host: "0.0.0.0" },
})
