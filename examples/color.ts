import Canvas from '../mod.ts'
import { serve } from "https://deno.land/std@0.78.0/http/server.ts";

const canvas = Canvas.createCanvas(200, 200);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#4d5e94';
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);

const server = serve({ hostname: "0.0.0.0", port: 8080 });
console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);

for await (const request of server) {
  request.respond({ status: 200, body: canvas.toBuffer() });
}