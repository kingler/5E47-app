# Landing assets

Drop photographic imagery into this directory to replace the hand-crafted SVG
layers on the landing page. File names are exact — components look for them
verbatim.

## Slots

```
/public/landing/
├── hero.jpg                 # cinematic interior; ~2400×1500
├── portraits/
│   ├── 01.jpg .. 32.jpg     # B&W headshots; square 800×800
│   └── ...
└── houses/
    ├── music.jpg            # 1200×800 detail crop
    ├── video.jpg            # 1200×800
    ├── masterclass.jpg      # 1200×800
    └── founders.jpg         # 1200×800
```

## Style notes

- **Hero**: dark, single key light, plenty of negative space — text overlays
  on top. Grade is added in CSS, so deliver natural exposure.
- **Portraits**: chiaroscuro, single key light, B&W. Faces partially in
  shadow read better than fully lit. Center the head in the upper-third.
- **Houses**: macro detail, not establishing shots. A close keyboard key,
  a clapper edge, a notebook corner — the *feel* of the room, not the room.

## Activation

Components automatically prefer the photo when present:

- `<Portrait index={i} src="/landing/portraits/03.jpg" />`
- `<FilmStill src="/landing/hero.jpg" />`
- `<HouseGlyph kind="music" src="/landing/houses/music.jpg" />`

Update `app/page.tsx` to pass the `src` props (or set a flag in
`USE_PHOTOS` near the top of the file).

When `src` is omitted or the file is missing, the SVG fallback renders.
