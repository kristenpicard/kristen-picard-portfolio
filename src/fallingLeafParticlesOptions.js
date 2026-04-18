/**
 * tsParticles options for ambient falling leaves (image shapes in /public/particles/).
 * `baseUrl` should be `process.env.BASE_URL` (Vue CLI) so GitHub Pages `./` paths resolve.
 */
export function createFallingLeafParticlesOptions(baseUrl) {
  const root = baseUrl && String(baseUrl).length ? String(baseUrl) : '/';
  const prefix = root.endsWith('/') ? root : `${root}/`;
  const src = (file) => `${prefix}particles/${file}`;

  return {
    detectRetina: true,
    fpsLimit: 45,
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    background: {
      color: {
        value: 'transparent',
      },
      opacity: 0,
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    particles: {
      number: {
        value: 17,
        density: {
          enable: false,
        },
      },
      color: {
        value: '#ffffff',
      },
      opacity: {
        value: { min: 0.28, max: 0.45 },
      },
      size: {
        value: { min: 8, max: 17 },
      },
      rotate: {
        value: { min: -25, max: 25 },
        direction: 'random',
        path: false,
        animation: {
          enable: true,
          speed: { min: 1.4, max: 4.5 },
          decay: 0,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: { min: 0.52, max: 1.05 },
        direction: 'bottom',
        random: false,
        straight: true,
        drift: { min: -0.018, max: 0.018 },
        angle: {
          offset: 0,
          value: { min: 87, max: 93 },
        },
        outModes: {
          default: 'out',
        },
      },
      shape: {
        type: 'images',
        options: {
          images: [
            {
              name: 'leaf-maple',
              src: src('leaf-maple.svg'),
              width: 120,
              height: 140,
              gif: false,
            },
            {
              name: 'leaf-elm',
              src: src('leaf-elm.svg'),
              width: 100,
              height: 130,
              gif: false,
            },
            {
              name: 'leaf-ash',
              src: src('leaf-ash.svg'),
              width: 88,
              height: 136,
              gif: false,
            },
          ],
        },
      },
    },
  };
}
