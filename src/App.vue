<template>
  <div class="ambient" aria-hidden="true" />
  <div v-if="leafParticlesOn" class="folio-leaf-particles" aria-hidden="true">
    <vue-particles id="folio-leaf-particles" :options="leafParticleOptions" />
  </div>
  <BodyContent />
  <div class="custom-cursor" ref="cursorRef" aria-hidden="true" />
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import BodyContent from './components/BodyContent.vue';
import { createFallingLeafParticlesOptions } from './fallingLeafParticlesOptions.js';

export default {
  name: 'App',
  components: {
    BodyContent,
  },
  setup() {
    const cursorRef = ref(null);
    const leafParticlesOn = ref(false);

    const leafParticleOptions = computed(() =>
      createFallingLeafParticlesOptions(process.env.BASE_URL || '/')
    );

    const onMove = (e) => {
      const el = cursorRef.value;
      if (!el) return;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = !!under?.closest?.(
        'a, button, input, textarea, select, [role="button"]'
      );
      el.classList.toggle('custom-cursor--active', interactive);
    };

    onMounted(() => {
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }
      leafParticlesOn.value = true;

      const finePointer =
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (finePointer) {
        window.addEventListener('mousemove', onMove, { passive: true });
      }
    });

    onUnmounted(() => {
      window.removeEventListener('mousemove', onMove);
    });

    return { cursorRef, leafParticlesOn, leafParticleOptions };
  },
};
</script>

<style lang="scss">
@import '@/styles/photo-palette.scss';

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

#app {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  color: $text-cream;
  isolation: isolate;
}

#app::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(ellipse 100% 70% at 50% -20%, $grad-hero 0%, transparent 55%),
    radial-gradient(ellipse 80% 50% at 100% 40%, $grad-side 0%, transparent 50%),
    radial-gradient(ellipse 70% 45% at 0% 80%, $grad-floor 0%, transparent 45%),
    linear-gradient(165deg, $grad-base-top 0%, $grad-base-mid 42%, $grad-base-bottom 100%);
  pointer-events: none;
}

.ambient {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.52;
}

.ambient::before,
.ambient::after {
  content: '';
  position: absolute;
  width: 55vmax;
  height: 55vmax;
  border-radius: 50%;
  filter: blur(80px);
  mix-blend-mode: screen;
  animation: drift 22s ease-in-out infinite alternate;
}

.ambient::before {
  left: -15%;
  top: 10%;
  background: radial-gradient(
    circle,
    rgba(116, 158, 82, 0.26) 0%,
    rgba(54, 70, 40, 0.1) 48%,
    transparent 72%
  );
  animation-delay: -4s;
}

.ambient::after {
  right: -20%;
  bottom: -5%;
  background: radial-gradient(
    circle,
    rgba(160, 145, 95, 0.12) 0%,
    rgba(54, 60, 38, 0.08) 52%,
    transparent 72%
  );
  animation-duration: 28s;
}

@media (max-width: 48rem) {
  .ambient {
    opacity: 0.36;
  }

  .ambient::before,
  .ambient::after {
    filter: blur(56px);
  }
}

@keyframes drift {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(6vw, 4vh) scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient::before,
  .ambient::after {
    animation: none;
  }
}

/* tsParticles full-screen layer: behind .page (z-index 1), never intercept clicks */
.folio-leaf-particles {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.folio-leaf-particles :deep(#folio-leaf-particles),
.folio-leaf-particles :deep(canvas) {
  pointer-events: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .folio-leaf-particles {
    display: none !important;
  }
}

html,
body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.custom-cursor {
  width: 1px;
  height: 1px;
  background-color: transparent;
  border: 2px solid rgba(188, 210, 158, 0.72);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  box-shadow:
    0 0 140px 38px rgba(168, 200, 132, 0.42),
    0 0 72px 18px rgba(255, 248, 230, 0.38),
    0 0 28px 6px rgba(255, 252, 242, 0.22);
  transform: translate(-50%, -50%);
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s ease;
}

.custom-cursor--active {
  border-color: rgba(208, 228, 175, 0.95);
  box-shadow:
    0 0 160px 48px rgba(178, 218, 138, 0.55),
    0 0 88px 26px rgba(200, 222, 148, 0.45),
    0 0 44px 12px rgba(255, 250, 235, 0.35);
  transform: translate(-50%, -50%) scale(1.35);
}

@media (prefers-reduced-motion: reduce) {
  .custom-cursor {
    transition: none;
  }
}

/* Glow cursor is for fine pointers only — touch/tablet uses the system caret. */
@media (hover: none), (pointer: coarse) {
  .custom-cursor {
    display: none !important;
  }
}
</style>
