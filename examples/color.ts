import { Canvas, loadImage } from '../mod.ts'
import { serve } from "https://deno.land/std@0.78.0/http/server.ts";

const image = await loadImage("https://cdn.discordapp.com/embed/avatars/0.png");
const canvas = Canvas.createCanvas(image.width(), image.height());
const ctx = canvas.getContext("2d");

ctx.drawImage(image, 0, 0);
ctx.globalCompositeOperation = "color";
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const server = serve({ hostname: "0.0.0.0", port: 8080 });
console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);

for await (const request of server) {
  request.respond({ status: 200, body: canvas.toBuffer() });
}