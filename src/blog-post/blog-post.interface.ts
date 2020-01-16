export interface BlogPost {
  author: string;
  title?: string;
  body: string;
  location: Location;
  date: Date;
  hidden: boolean;
  moon?: Moon;
}

export interface Location {
  name?: string;
  latitude?: number;
  longitude?: number;
}

type MoonEmoji = '🌑' | '🌒' | '🌓' | '🌔' | '🌕' | '🌖' | '🌗' | '🌘';

interface Moon {
  percentageOfMoon: number;
  emojiOfMoon?: MoonEmoji;
}
