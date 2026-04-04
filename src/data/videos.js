export function getYouTubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function getThumbnail(url, quality = 'hqdefault') {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : '';
}

export function getHeroThumbnail(url) {
  const id = getYouTubeId(url);
  if (!id) return '';
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function getHeroThumbnailFallback(url) {
  return getThumbnail(url, 'sddefault');
}

export const heroClips = [
  {
    id: 'good-game-empire',
    title: 'Good Game Empire',
    description: 'Epic game trailer voiced by Guy Harris, the voice that commands empires.',
    url: 'https://www.youtube.com/watch?v=z6WhxrAwfWw',
    genre: 'Game Trailer',
    profile: 'Epic',
    heroImage: '/heroes/good-game-empire.webp',
  },
  {
    id: 'movie-trailer-voice-in-action',
    title: 'The Movie Trailer Voice in Action',
    description: 'The definitive movie trailer voice. Cinematic, powerful, unforgettable.',
    url: 'https://www.youtube.com/watch?v=bcCpLnX-1ck',
    genre: 'Trailer',
    profile: 'Dark',
    heroImage: '/heroes/movie-trailer-voice-in-action.webp',
  },
  {
    id: 'dragon-city-trailer',
    title: 'Dragon City Trailer',
    description: 'Unleash the power. Dragon City, voiced with fire and fury.',
    url: 'https://www.youtube.com/watch?v=ZtkYHKpKomM',
    genre: 'Game Trailer',
    profile: 'Action',
    heroImage: '/heroes/dragon-city.webp',
  },
  {
    id: 'minecraft-beginners-handbook',
    title: 'Minecraft Beginners Handbook',
    description: "Even Minecraft gets the Hollywood treatment. That voice, though.",
    url: 'https://www.youtube.com/watch?v=embrh2Y5VjI',
    genre: 'Trailer',
    profile: 'Spoof',
    heroImage: '/heroes/minecraft-beginners-handbook.webp',
  },
  {
    id: 'circus-penarium',
    title: 'Circus Penarium',
    description: 'Roll up, roll up. The big top gets the big voice treatment.',
    url: 'https://www.youtube.com/watch?v=zxxR7tENfcE',
    genre: 'Game Trailer',
    profile: 'Circus',
    heroImage: '/heroes/penarium.jpeg',
  },
  {
    id: 'hide-the-corpse',
    title: 'Hide the Corpse',
    description: "Nothing to see here. Definitely not a body. Guy Harris, voice of the suspiciously innocent.",
    url: 'https://www.youtube.com/watch?v=I0LcSnCasGY',
    genre: 'Game Trailer',
    profile: 'Mystery',
    heroImage: '/heroes/hide-the-corpse.jpg',
  },
  {
    id: 'hammerman-boom-beach',
    title: 'Hammerman Strikes Back',
    description: 'Boom Beach. Hammerman strikes back — and the voice of doom strikes first.',
    url: 'https://www.youtube.com/watch?v=JId2ODYrXq4',
    genre: 'Game Trailer',
    profile: 'Commander',
    heroImage: '/heroes/hammerman-boom-beach.webp',
  },
];

export const profileHeroMap = {
  Epic: 0,
  Dark: 1,
  Action: 2,
  Spoof: 3,
  Circus: 4,
  Mystery: 5,
  Commander: 6,
};

export const movieTrailerRow = {
  id: 'trailers',
  title: 'Movie Trailer Voice',
  clips: [
    { title: 'Good Game Empire', url: 'https://www.youtube.com/watch?v=z6WhxrAwfWw', genre: 'Game Trailer' },
    { title: 'The Movie Trailer Voice in Action', url: 'https://www.youtube.com/watch?v=bcCpLnX-1ck', genre: 'Trailer' },
    { title: 'Scottish National Party Parody Film', url: 'https://www.youtube.com/watch?v=18oOI8mHZzs', genre: 'Parody' },
    { title: 'Walking Dead: No Man\'s Land', url: 'https://www.youtube.com/watch?v=hZfE57Wdeew', genre: 'Trailer' },
    { title: 'Prison Architect Trailer', url: 'https://www.youtube.com/watch?v=dABtGif6pmE', genre: 'Game Trailer' },
    { title: 'Dragon City Trailer', url: 'https://www.youtube.com/watch?v=ZtkYHKpKomM', genre: 'Game Trailer' },
    { title: 'Minecraft Beginners Handbook', url: 'https://www.youtube.com/watch?v=embrh2Y5VjI', genre: 'Trailer' },
    { title: 'Thorpe Park Fright Nights', url: 'https://www.youtube.com/watch?v=MD6hG2HVid0', genre: 'Promo' },
    { title: 'Turtle Strike Game Trailer', url: 'https://www.youtube.com/watch?v=IEqODwRGQig', genre: 'Game Trailer' },
    { title: 'Circus Penarium Game Trailer', url: 'https://www.youtube.com/watch?v=zxxR7tENfcE', genre: 'Game Trailer' },
    { title: 'UK Construction Week Trailer', url: 'https://www.youtube.com/watch?v=tr7YU4ExFXQ', genre: 'Promo' },
    { title: 'Combat 8 Launch', url: 'https://www.youtube.com/watch?v=hYboVy3gKOw', genre: 'Game Trailer' },
    { title: 'Robocide Trailer', url: 'https://www.youtube.com/watch?v=7PAXKApMYy8', genre: 'Game Trailer' },
    { title: 'Kings Road Trailer', url: 'https://www.youtube.com/watch?v=Af5szC15B_8', genre: 'Game Trailer' },
    { title: 'Land of Eyas', url: 'https://www.youtube.com/watch?v=439KyoB033w', genre: 'Game Trailer' },
    { title: 'Movie Trailer Cliches', url: 'https://www.youtube.com/watch?v=URTglYVLaps', genre: 'Parody' },
    { title: 'Judgment Apocalypse Survival', url: 'https://www.youtube.com/watch?v=6YcpADKL15U', genre: 'Game Trailer' },
  ],
};

export const bMovieRow = {
  id: 'b-movie',
  title: 'B-Movie Trailers',
  clips: [
    { title: 'B-Movie Trailer Voice', url: 'https://www.youtube.com/watch?v=bTUlbDBdT6A', genre: 'Parody' },
    { title: 'Rocket & Groot B-Movie Voice', url: 'https://www.youtube.com/watch?v=lw3_DUx5jrk', genre: 'Parody' },
    { title: 'FESPA', url: 'https://www.youtube.com/watch?v=91_4NJA5U_Y', genre: 'Parody' },
  ],
};

export const gameTrailersRow = {
  id: 'game-trailers',
  title: 'Game Trailers',
  clips: [
    { title: 'Good Game Empire', url: 'https://www.youtube.com/watch?v=z6WhxrAwfWw', genre: 'Game Trailer' },
    { title: 'Walking Dead: No Man\'s Land', url: 'https://www.youtube.com/watch?v=hZfE57Wdeew', genre: 'Game Trailer' },
    { title: 'Prison Architect Trailer', url: 'https://www.youtube.com/watch?v=dABtGif6pmE', genre: 'Game Trailer' },
    { title: 'Dragon City Trailer', url: 'https://www.youtube.com/watch?v=ZtkYHKpKomM', genre: 'Game Trailer' },
    { title: 'Turtle Strike Game Trailer', url: 'https://www.youtube.com/watch?v=IEqODwRGQig', genre: 'Game Trailer' },
    { title: 'Circus Penarium Game Trailer', url: 'https://www.youtube.com/watch?v=zxxR7tENfcE', genre: 'Game Trailer' },
    { title: 'Robocide Trailer', url: 'https://www.youtube.com/watch?v=7PAXKApMYy8', genre: 'Game Trailer' },
    { title: 'Kings Road Trailer', url: 'https://www.youtube.com/watch?v=Af5szC15B_8', genre: 'Game Trailer' },
    { title: 'Land of Eyas', url: 'https://www.youtube.com/watch?v=439KyoB033w', genre: 'Game Trailer' },
    { title: 'This War of Mine Trailer', url: 'https://www.youtube.com/watch?v=z4KMUa14NfM', genre: 'Game Trailer' },
    { title: 'Winterstate Trailer Voice', url: 'https://www.youtube.com/watch?v=FpXaS3fvggI', genre: 'Game Trailer' },
    { title: 'The Escapists Game Trailer', url: 'https://www.youtube.com/watch?v=yq3bttMIbuI', genre: 'Game Trailer' },
    { title: 'War Friends Army Voice', url: 'https://www.youtube.com/watch?v=-rAockr9los', genre: 'Game Trailer' },
    { title: 'WORMS WMD Game Trailer', url: 'https://www.youtube.com/watch?v=ttcUCCYa7Uk', genre: 'Game Trailer' },
    { title: 'MMX Hill Climb Game Trailer', url: 'https://www.youtube.com/watch?v=17XTUByi28Q', genre: 'Game Trailer' },
    { title: 'Farm Heroes Saga', url: 'https://www.youtube.com/watch?v=7QXZdT4y0uI', genre: 'Game Trailer' },
    { title: 'Hide the Corpse', url: 'https://www.youtube.com/watch?v=I0LcSnCasGY', genre: 'Game Trailer' },
    { title: 'Smash Bandits', url: 'https://www.youtube.com/watch?v=4hHuiPqQkvs', genre: 'Game Trailer' },
    { title: '13 Dead End Drive', url: 'https://www.youtube.com/watch?v=2mqiqOcM7t0', genre: 'Game Trailer' },
  ],
};

export const fullCollectionRow = {
  id: 'full-collection',
  title: 'VoiceoverGuy',
  clips: [
    { title: 'Vintage Cash Cow', url: 'https://www.youtube.com/watch?v=2SSgZGK1S9U', genre: 'TV Ad' },
    { title: 'TV Choice Awards', url: 'https://www.youtube.com/watch?v=4Le6P6sk7cs', genre: 'Awards' },
    { title: 'GB News', url: 'https://www.youtube.com/watch?v=5jEcPyu2S5s', genre: 'Broadcast' },
    { title: 'Star Wars Characters', url: 'https://www.youtube.com/watch?v=Fm0qSBLhA6A', genre: 'Character Voice' },
    { title: 'Superhero Voiceover', url: 'https://www.youtube.com/watch?v=91_4NJA5U_Y', genre: 'Character Voice' },
    { title: 'The Masked Singer Opener', url: 'https://www.youtube.com/watch?v=e0vZ9cxdilo', genre: 'TV' },
    { title: "Britain's Got Talent", url: 'https://www.youtube.com/watch?v=4yTnVRDXZfQ', genre: 'TV' },
    { title: 'Radio 1 Big Weekend', url: 'https://www.youtube.com/watch?v=RPOCEix4cDQ', genre: 'Broadcast' },
    { title: 'ITV Santa Claus', url: 'https://www.youtube.com/watch?v=_TEzjgOkHYo', genre: 'TV' },
    { title: 'Hotels.com', url: 'https://www.youtube.com/watch?v=kxB1NMpHSes', genre: 'TV Ad' },
    { title: 'In for a Penny', url: 'https://www.youtube.com/watch?v=QKDoDngvBjU', genre: 'TV' },
    { title: 'Voice of Santa', url: 'https://www.youtube.com/watch?v=P44bGiUI0vE', genre: 'Character Voice' },
    { title: 'Character Voices', url: 'https://www.youtube.com/watch?v=Ad85PPvSfbc', genre: 'Character Voice' },
    { title: 'Joker Voice', url: 'https://www.youtube.com/watch?v=OMlBk5QBnyM', genre: 'Character Voice' },
    { title: 'Saturday Night Takeaway Tour', url: 'https://www.youtube.com/watch?v=W99pMUr6G8Q', genre: 'TV' },
    { title: 'Apple iPhone TV Ads', url: 'https://www.youtube.com/watch?v=V6HuBB4WqxQ', genre: 'TV Ad' },
    { title: 'Worms Ultimate Mayhem Outtakes', url: 'https://www.youtube.com/watch?v=3hx2CoIlZBc', genre: 'Game' },
    { title: 'Gooey Louie', url: 'https://www.youtube.com/watch?v=YtTD1k-AGJY', genre: 'Character Voice' },
    { title: 'Silly Moo', url: 'https://www.youtube.com/watch?v=XsV-0ovRCK0', genre: 'Character Voice' },
    { title: 'Scream Ghost Face', url: 'https://www.youtube.com/watch?v=veUdsSVFn6A', genre: 'Character Voice' },
    { title: 'P&O Ferries Santa', url: 'https://www.youtube.com/watch?v=Jjj1as7mpUw', genre: 'TV Ad' },
    { title: 'Clash of Clans Goblins', url: 'https://www.youtube.com/watch?v=_CPrYB6Q-HM', genre: 'Character Voice' },
    { title: 'David Attenborough - Biffa', url: 'https://www.youtube.com/watch?v=09ulDo-3reM', genre: 'Character Voice' },
    { title: 'Boom Beach Hammerman', url: 'https://www.youtube.com/watch?v=JId2ODYrXq4', genre: 'Character Voice' },
  ],
};
