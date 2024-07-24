import { HEIGHT, NUM_SINKS, WIDTH, obstacleRadius, sinkWidth } from "./constants";
import { pad } from "./padding";

export interface Obstacle {
    x: number;
    y: number;
    radius: number;
}

export interface Sink {
    x: number;
    y: number;
    width: number;
    height: number;
    multiplier?: number;
}

const MULTIPLIERS: {[ key: number ]: number} = {
    1: 8,
    2: 5,
    3: 2,
    4: 1.4,
    5: 1.4,
    6: 1.2,
    7: 1.1,
    8: 1,
    9: 0.5,
    10: 1,
    11: 1.1,
    12: 1.2,
    13: 1.4,
    14: 1.4,
    15: 2,
    16: 5,
    17: 8
}

const MULTIPLIERSMEDIUM: {[ key: number ]: number} = {
    1: 100,
    2: 50,
    3: 10,
    4: 1.4,
    5: 1.4,
    6: 1.2,
    7: 0.7,
    8: 0.7,
    9: 0.5,
    10: 0.5,
    11: 0.7,
    12: 0.7,
    13: 1.4,
    14: 1.4,
    15: 10,
    16: 50,
    17: 100
    
}
const MULTIPLIERSHIGH: {[ key: number ]: number} = {
    1: 999,
    2: 100,
    3: 20,
    4: 5,
    5: 1,
    6: 0.7,
    7: 0.5,
    8: 0.1,
    9: 0,
    10: 0.1,
    11: 0.5,
    12: 0.7,
    13: 1,
    14: 5,
    15: 20,
    16: 100,
    17: 999
}

export const createObstacles = (): Obstacle[] => {
    const obstacles: Obstacle[] = [];
    const rows = 18; // number of obstacles
    for (let row = 2; row < rows; row++) {
        const numObstacles = row + 1;
        const y = 0 + row * 35;
        const spacing = 36;
        for (let col = 0; col < numObstacles; col++) {
            const x = WIDTH / 2 - spacing * (row / 2 - col);
            obstacles.push({x: pad(x), y: pad(y), radius: obstacleRadius });
        }   
    }
    return obstacles;
}

export const createSinks = (sinkRating: string): Sink[] => {
    const sinks = [];
    const SPACING = obstacleRadius * 2;

    for (let i = 0; i < NUM_SINKS; i++) {
      const x = WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS/2)) - SPACING * 1.5;
      const y = HEIGHT - 170;
      const width = sinkWidth;
      const height = width;
      sinks.push({ x, y, width, height, multiplier: sinkRating === 'low' ? MULTIPLIERS[i+1] : sinkRating === 'medium' ? MULTIPLIERSMEDIUM[i+1] : MULTIPLIERSHIGH[i+1]});
    }

    return sinks;
}
