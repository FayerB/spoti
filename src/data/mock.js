export const COLORS = {
  neon: "#00ff87", blue: "#3d9fff", pink: "#ff3cac",
  amber: "#ffb347", purple: "#a855f7", teal: "#14b8a6",
};

export const ARTISTS = [
  { id: "ar1", name: "Neon Drift",  img: "https://picsum.photos/seed/neon/300",  genre: "Synthwave",  color: "#00ff87" },
  { id: "ar2", name: "Solstice",    img: "https://picsum.photos/seed/sol/300",   genre: "Ambient",    color: "#3d9fff" },
  { id: "ar3", name: "Mira Vale",   img: "https://picsum.photos/seed/mira/300",  genre: "Indie Pop",  color: "#ff3cac" },
  { id: "ar4", name: "Cold Altar",  img: "https://picsum.photos/seed/cold/300",  genre: "Post-Metal", color: "#ffb347" },
  { id: "ar5", name: "Volt System", img: "https://picsum.photos/seed/volt/300",  genre: "Electronic", color: "#a855f7" },
  { id: "ar6", name: "Dusk Harbor", img: "https://picsum.photos/seed/dusk/300",  genre: "Lo-Fi",      color: "#14b8a6" },
];

export const ALBUMS = [
  { id:"al1", title:"Signals",       artist:"Neon Drift",  artistId:"ar1", year:2024, img:"https://picsum.photos/seed/sig/300",  color:"#00ff87" },
  { id:"al2", title:"Equinox",       artist:"Solstice",    artistId:"ar2", year:2023, img:"https://picsum.photos/seed/equ/300",  color:"#3d9fff" },
  { id:"al3", title:"Pastoral",      artist:"Mira Vale",   artistId:"ar3", year:2024, img:"https://picsum.photos/seed/pas/300",  color:"#ff3cac" },
  { id:"al4", title:"Monuments",     artist:"Cold Altar",  artistId:"ar4", year:2023, img:"https://picsum.photos/seed/mon/300",  color:"#ffb347" },
  { id:"al5", title:"Deep Solstice", artist:"Solstice",    artistId:"ar2", year:2024, img:"https://picsum.photos/seed/dep/300",  color:"#6366f1" },
  { id:"al6", title:"Grid Dreams",   artist:"Volt System", artistId:"ar5", year:2024, img:"https://picsum.photos/seed/grid/300", color:"#a855f7" },
  { id:"al7", title:"Harbour Fog",   artist:"Dusk Harbor", artistId:"ar6", year:2023, img:"https://picsum.photos/seed/harb/300", color:"#14b8a6" },
];

const MP3 = "/music/CHOLOGANTE ☾ VIDEO OFFICIAL.mp3";

export const TRACKS = [
  { id:"t1",  title:"Drift Away",       artist:"Neon Drift",  albumId:"al1", album:"Signals",       duration:213, img:"https://picsum.photos/seed/sig/300",  color:"#00ff87", src:MP3 },
  { id:"t2",  title:"Velvet Storm",     artist:"Solstice",    albumId:"al2", album:"Equinox",       duration:187, img:"https://picsum.photos/seed/equ/300",  color:"#3d9fff", src:MP3 },
  { id:"t3",  title:"Ghost Circuit",    artist:"Neon Drift",  albumId:"al1", album:"Signals",       duration:241, img:"https://picsum.photos/seed/sig/300",  color:"#00ff87", src:MP3 },
  { id:"t4",  title:"Copper Bell",      artist:"Mira Vale",   albumId:"al3", album:"Pastoral",      duration:198, img:"https://picsum.photos/seed/pas/300",  color:"#ff3cac", src:MP3 },
  { id:"t5",  title:"Iron Shore",       artist:"Cold Altar",  albumId:"al4", album:"Monuments",     duration:265, img:"https://picsum.photos/seed/mon/300",  color:"#ffb347", src:MP3 },
  { id:"t6",  title:"Midnight Grid",    artist:"Neon Drift",  albumId:"al1", album:"Signals",       duration:222, img:"https://picsum.photos/seed/sig/300",  color:"#00ff87", src:MP3 },
  { id:"t7",  title:"Tidal Hymn",       artist:"Solstice",    albumId:"al2", album:"Equinox",       duration:194, img:"https://picsum.photos/seed/equ/300",  color:"#3d9fff", src:MP3 },
  { id:"t8",  title:"Prism Walk",       artist:"Mira Vale",   albumId:"al3", album:"Pastoral",      duration:230, img:"https://picsum.photos/seed/pas/300",  color:"#ff3cac", src:MP3 },
  { id:"t9",  title:"Obsidian Path",    artist:"Cold Altar",  albumId:"al4", album:"Monuments",     duration:278, img:"https://picsum.photos/seed/mon/300",  color:"#ffb347", src:MP3 },
  { id:"t10", title:"Signal Fade",      artist:"Neon Drift",  albumId:"al1", album:"Signals",       duration:205, img:"https://picsum.photos/seed/sig/300",  color:"#00ff87", src:MP3 },
  { id:"t11", title:"Aurora Drift",     artist:"Solstice",    albumId:"al5", album:"Deep Solstice", duration:210, img:"https://picsum.photos/seed/dep/300",  color:"#6366f1", src:MP3 },
  { id:"t12", title:"Stone Echo",       artist:"Cold Altar",  albumId:"al4", album:"Monuments",     duration:245, img:"https://picsum.photos/seed/mon/300",  color:"#ffb347", src:MP3 },
  { id:"t13", title:"Pulse Generator",  artist:"Volt System", albumId:"al6", album:"Grid Dreams",   duration:199, img:"https://picsum.photos/seed/grid/300", color:"#a855f7", src:MP3 },
  { id:"t14", title:"Harbour Lights",   artist:"Dusk Harbor", albumId:"al7", album:"Harbour Fog",   duration:223, img:"https://picsum.photos/seed/harb/300", color:"#14b8a6", src:MP3 },
  { id:"t15", title:"Cascade Protocol", artist:"Volt System", albumId:"al6", album:"Grid Dreams",   duration:188, img:"https://picsum.photos/seed/grid/300", color:"#a855f7", src:MP3 },
  { id:"t16", title:"Soft Static",      artist:"Dusk Harbor", albumId:"al7", album:"Harbour Fog",   duration:257, img:"https://picsum.photos/seed/harb/300", color:"#14b8a6", src:MP3 },
];

export const PLAYLISTS = [
  { id:"p1", title:"Morning Focus",    description:"Start the day right", img:"https://picsum.photos/seed/morn/300",  color:"#00ff87", tracks:[TRACKS[0],TRACKS[3],TRACKS[6],TRACKS[9],TRACKS[13]] },
  { id:"p2", title:"Late Night Drive", description:"Infinite highways",   img:"https://picsum.photos/seed/nite/300",  color:"#3d9fff", tracks:[TRACKS[1],TRACKS[4],TRACKS[7],TRACKS[10],TRACKS[14]] },
  { id:"p3", title:"Pure Intensity",   description:"Full throttle",       img:"https://picsum.photos/seed/pure/300",  color:"#ff3cac", tracks:[TRACKS[2],TRACKS[5],TRACKS[8],TRACKS[11],TRACKS[15]] },
  { id:"p4", title:"Digital Haze",     description:"Synths and static",   img:"https://picsum.photos/seed/haze/300",  color:"#a855f7", tracks:[TRACKS[12],TRACKS[0],TRACKS[6],TRACKS[3],TRACKS[9]] },
  { id:"p5", title:"Coastal Calm",     description:"Ocean and fog",       img:"https://picsum.photos/seed/coast/300", color:"#14b8a6", tracks:[TRACKS[13],TRACKS[15],TRACKS[1],TRACKS[7],TRACKS[4]] },
];

export const FEATURED = [
  { id:"f1", title:"Chart Breakers",   subtitle:"The hottest tracks right now", img:"https://picsum.photos/seed/feat1/800/400", color:"#00ff87", tracks:TRACKS.slice(0,5) },
  { id:"f2", title:"Midnight Signals", subtitle:"Deep cuts for the night",      img:"https://picsum.photos/seed/feat2/800/400", color:"#3d9fff", tracks:TRACKS.slice(3,8) },
  { id:"f3", title:"Voltage Dreams",   subtitle:"Electronic & beyond",          img:"https://picsum.photos/seed/feat3/800/400", color:"#a855f7", tracks:TRACKS.slice(6,11) },
];