 import { createServer } from "vite"
 import react from "@vitejs/plugin-react"
 
 const server = await createServer({
   configFile: false,
   plugins: [react()],
   root: ".",
   server: { port: 5173, host: "0.0.0.0", fs: { strict: false } },
 })
 await server.listen()
 const urls = server.resolvedUrls
 const localUrl = urls?.local?.[0] || "http://localhost:5173"
 console.log("\n  ➜  Local:  " + localUrl + "\n")
