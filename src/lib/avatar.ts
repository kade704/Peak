"use server";

import { createCanvas } from "canvas";

type Color = [r: number, g: number, b: number];

const pixelSize = 10;
const pixelCount = 8;

const resolution = pixelSize * pixelCount;

function getRandomColor(): Color {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
}

function generateTheme(): Color[] {
    return [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()];
}

function getPixelColor(theme: Color[]): Color {
    const colorIdx = Math.floor(Math.random() * theme.length);
    return theme[colorIdx];
}

export async function generateAvatar(): Promise<string> {
    const theme = generateTheme();

    const canvas = createCanvas(resolution, resolution);
    const ctx = canvas.getContext("2d");

    for (let x = 0; x < pixelCount / 2; x++) {
        for (let y = 0; y < pixelCount; y++) {
            const color = getPixelColor(theme);
            ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

            ctx.fillRect((pixelCount - x - 1) * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }

    return canvas.toDataURL();
}
