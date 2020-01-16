import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class MoonPipe implements PipeTransform<string, number> {
  private moons: string[];
  public constructor() {
    this.moons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  }
  transform(value: any, metadata: ArgumentMetadata): number {
    if (!parseInt(value.moon?.percentageOfMoon, 10) ||
      parseInt(value.moon?.percentageOfMoon, 10) < 0 ||
      parseInt(value.moon?.percentageOfMoon, 10) > 100) {
      value.moon = null;
      return value;
    }
    value.moon.emojiOfMoon = this.moons[Math.round(value.moon.percentageOfMoon / 100 * 8)];
    return value;
  }
}
