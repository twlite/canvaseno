import * as lib from "./lib.js";
import { CanvasKit, SkImage } from "./types.ts";
import { fetchAuto, Buffer } from './deps.ts'

const Canvas = await lib.CanvasKitInit({}) as CanvasKit;

export type BufferLike = ArrayBuffer | Buffer | Uint8Array | SharedArrayBuffer;

export function dataURLtoBuffer(dataurl: string) {
    let arr: string[] = dataurl.split(',');
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let data = new Uint8Array(n);
    while(n--){
        data[n] = bstr.charCodeAt(n);
    }
    return data;
}

export async function loadImage(url: string): Promise<SkImage> {
    const base64 = await fetchAuto(url);
    const bf = dataURLtoBuffer(base64);
    let img = Canvas.MakeImageFromEncoded(bf);
    if (!img) throw new Error("Invalid Image");

    return img;
}

export function encodeAsBuffer(data: BufferLike): Buffer {
    if (!data) throw new Error("data was not specified!");
    return Buffer.from(data);
}

Object.defineProperty(Canvas, "createCanvas", { value: Canvas.MakeCanvas });

export * from "./types.ts";
export default Canvas;
export { Canvas };