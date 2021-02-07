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

export async function loadImage(src: string | Uint8Array | Buffer | ArrayBuffer | SharedArrayBuffer): Promise<SkImage> {
    let bf: any;
    
    if (typeof src === "string") {
        const base64 = await fetchAuto(src);
        bf = dataURLtoBuffer(base64);
    } else {
        if (src instanceof Uint8Array) bf = src;
        else bf = Buffer.from(src);
    }
    let img = Canvas.MakeImageFromEncoded(bf);
    if (!img) throw new Error("Invalid Image");

    // prototype
    Object.defineProperty(img, "toString", { value: () => `<Image ${img?.width()}x${img?.height()}>` });

    return img;
}

export function encodeAsBuffer(data: BufferLike): Buffer {
    if (!data) throw new Error("data was not specified!");
    return Buffer.from(data);
}

// utility
Object.defineProperties(Canvas, {
    createCanvas: {
        value: Canvas.MakeCanvas,
        writable: true
    },
    loadImage: {
        value: loadImage,
        writable: true
    }
});

export * from "./types.ts";
export default Canvas;
export { Canvas };