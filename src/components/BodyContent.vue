<template>
  <main class="page">
    <header id="top" class="hero">
      <div class="hero-accent" aria-hidden="true"></div>
      <div class="hero-layout">
        <div class="hero-copy">
          <p class="hero-eyebrow js-reveal" :style="{ '--reveal-delay': '0ms' }">Portfolio</p>
          <h1 class="hero-name js-reveal" :style="{ '--reveal-delay': '70ms' }">Kristen Picard</h1>
          <div class="hero-rule js-reveal" :style="{ '--reveal-delay': '120ms' }" aria-hidden="true"></div>
          <p class="hero-role js-reveal" :style="{ '--reveal-delay': '140ms' }">
            Software engineer · Beast Code
          </p>
          <p class="hero-lead js-reveal" :style="{ '--reveal-delay': '200ms' }">
            Full-stack web developer focused on clear, usable experiences—HTML, CSS, TypeScript,
            Vue.js, .NET/C#, and APIs that stay reliable as products evolve.
          </p>
          <nav
            class="jump-links js-reveal"
            :style="{ '--reveal-delay': '280ms' }"
            aria-label="Page sections and profiles"
          >
            <a href="#about" class="jump-pill">About</a>
            <span class="jump-sep" aria-hidden="true">·</span>
            <a href="#projects" class="jump-pill">Projects</a>
            <span class="jump-sep" aria-hidden="true">·</span>
            <a
              class="jump-pill"
              :href="linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kristen Picard on LinkedIn (opens in a new tab)"
              >LinkedIn</a
            >
            <span class="jump-sep" aria-hidden="true">·</span>
            <a
              class="jump-pill"
              href="https://github.com/kristenpicard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kristen Picard on GitHub (opens in a new tab)"
              >GitHub</a
            >
          </nav>
        </div>
        <figure class="hero-photo js-reveal" :style="{ '--reveal-delay': '160ms' }">
          <div class="hero-photo-frame">
            <img
              class="hero-photo-img"
              :src="portraitUrl"
              width="811"
              height="1024"
              alt="Portrait of Kristen Picard outdoors, smiling."
              loading="eager"
              decoding="async"
            />
          </div>
        </figure>
      </div>
    </header>

    <section id="about" class="section about js-reveal" aria-labelledby="about-heading">
      <h2 id="about-heading" class="section-title">
        <span class="section-title-mark" aria-hidden="true"></span>
        About
      </h2>
      <div class="prose">
        <p>
          I'm a software engineer at
          <a
            class="inline-link"
            href="https://www.beast-code.com/"
            target="_blank"
            rel="noopener noreferrer"
            >Beast Code</a
          >, architecting and delivering high-performance web applications with TypeScript, Vue.js,
          and .NET/C#. I partner with product, design, and QA to translate requirements into elegant
          solutions that balance technical rigor with user needs.
        </p>
        <p>
          My work spans both new feature development and legacy stewardship—designing new features,
          optimizing performance bottlenecks, and refactoring systems for scalability. I thrive in
          collaborative environments where clear communication and deliberate problem-solving drive
          impact. As a Team Lead, I mentor engineers through code review and pair programming,
          fostering a culture of continuous improvement and raising our collective standards.
        </p>
        <p>
          Beyond shipped features, I'm drawn to exploring adjacent technologies and sharpening
          fundamentals. My work history, education, and recommendations are on
          <a
            class="inline-link"
            :href="linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            >LinkedIn</a
          >; public code and demos live on
          <a
            class="inline-link"
            href="https://github.com/kristenpicard"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub</a
          >.
        </p>
      </div>
    </section>

    <section id="projects" class="section projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" class="section-title js-reveal">
        <span class="section-title-mark" aria-hidden="true"></span>
        Selected work
      </h2>
      <p class="section-intro js-reveal" :style="{ '--reveal-delay': '60ms' }">
        Highlights from my public GitHub repositories. &ldquo;Demo&rdquo; opens a GitHub Pages
        build where one is configured; otherwise use &ldquo;Repository&rdquo; for code and README.
      </p>
      <ul class="project-grid">
        <li
          v-for="(project, index) in projects"
          :key="index"
          class="project-card js-reveal"
          :style="{ '--reveal-delay': `${index * 75}ms` }"
        >
          <span class="project-card-shine" aria-hidden="true"></span>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.description }}</p>
          <ul class="tag-list" aria-label="Technologies">
            <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
          </ul>
          <div class="project-actions">
            <a
              v-if="project.demoUrl"
              class="action-link"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo
              <span class="action-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              class="action-link"
              :class="{ 'action-link--muted': project.demoUrl }"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository
              <span class="action-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </li>
      </ul>
      <p class="back-top js-reveal">
        <a href="#top" class="back-top-link">Back to top</a>
      </p>
    </section>
  </main>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import portraitUrl from '../assets/portrait.png';
import { projects } from '../content/projects';

const linkedinUrl = 'https://www.linkedin.com/in/kristen-picard/';

export default {
  name: 'BodyContent',
  setup() {
    let observer;

    onMounted(() => {
      const nodes = () => Array.from(document.querySelectorAll('.js-reveal'));
      const prefersReduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduce) {
        nodes().forEach((el) => el.classList.add('is-visible'));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -7% 0px' }
      );

      nodes().forEach((el) => observer.observe(el));
    });

    onUnmounted(() => {
      observer?.disconnect();
    });

    return { projects, portraitUrl, linkedinUrl };
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/photo-palette.scss';

$ease-out: cubic-bezier(0.22, 1, 0.36, 1);

.page {
  position: relative;
  z-index: 1;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  line-height: 1.62;
  padding-top: calc(clamp(2rem, 6vw, 5.5rem) + env(safe-area-inset-top, 0px));
  padding-right: calc(clamp(1rem, 5vw, 4rem) + env(safe-area-inset-right, 0px));
  padding-bottom: calc(clamp(2.75rem, 5vw, 4.5rem) + env(safe-area-inset-bottom, 0px));
  padding-left: calc(clamp(1rem, 5vw, 4rem) + env(safe-area-inset-left, 0px));
  max-width: 54rem;
  margin: 0 auto;
  overflow-wrap: break-word;
  background-image: radial-gradient(rgba(220, 205, 180, 0.04) 1px, transparent 1px);
  background-size: 22px 22px;
  background-clip: padding-box;
}

/* Scroll / load reveals */
.js-reveal {
  opacity: 0;
  transform: translateY(1.35rem);
  transition:
    opacity 0.75s $ease-out,
    transform 0.75s $ease-out;
  transition-delay: var(--reveal-delay, 0ms);
}

.js-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .js-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.hero {
  position: relative;
  padding-bottom: clamp(2.25rem, 5vw, 3.75rem);
  margin-bottom: 0.25rem;
}

.hero-layout {
  position: relative;
  display: grid;
  gap: clamp(1.75rem, 4vw, 2.75rem);
  align-items: center;
  grid-template-columns: 1fr;
}

@media (min-width: 56rem) {
  .hero-layout {
    grid-template-columns: minmax(0, 1fr) minmax(200px, 32%);
    gap: clamp(2rem, 4vw, 3rem);
  }
}

.hero-copy {
  min-width: 0;
}

.hero-photo {
  margin: 0;
  width: min(100%, 20rem);
  justify-self: center;
}

@media (min-width: 56rem) {
  .hero-photo {
    width: 100%;
    max-width: 22rem;
    justify-self: end;
  }
}

.hero-photo-frame {
  position: relative;
  border-radius: 18px;
  padding: 1px;
  background: linear-gradient(
    145deg,
    rgba(180, 210, 150, 0.32) 0%,
    rgba(255, 250, 240, 0.08) 45%,
    rgba(120, 100, 70, 0.18) 100%
  );
  box-shadow:
    0 28px 70px rgba(0, 0, 0, 0.42),
    0 0 48px rgba(90, 120, 70, 0.14);
  transition:
    transform 0.45s $ease-out,
    box-shadow 0.45s $ease-out;
}

.hero-photo-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
}

.hero-photo.is-visible .hero-photo-frame:hover,
.hero-photo.is-visible .hero-photo-frame:focus-within {
  transform: translateY(-5px) scale(1.02);
  box-shadow:
    0 36px 88px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(110, 145, 85, 0.2);
}

/* Natural aspect — no object-fit crop; file is used as-is (only scaled to column width). */
.hero-photo-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 17px;
}

@media (prefers-reduced-motion: reduce) {
  .hero-photo-frame {
    transition: none;
  }

  .hero-photo.is-visible .hero-photo-frame:hover,
  .hero-photo.is-visible .hero-photo-frame:focus-within {
    transform: none;
  }
}

.hero-accent {
  position: absolute;
  left: -12%;
  top: -30%;
  width: 55%;
  height: 85%;
  background: radial-gradient(
    ellipse at 30% 40%,
    rgba(110, 150, 85, 0.16) 0%,
    transparent 65%
  );
  pointer-events: none;
  filter: blur(2px);
}

.hero-eyebrow {
  position: relative;
  margin: 0 0 0.85rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: $faint;
}

.hero-name {
  position: relative;
  margin: 0 0 0.65rem;
  font-size: clamp(2.15rem, 6.5vw, 3.65rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.05;
  background: linear-gradient(
    118deg,
    #faf7f2 0%,
    #e8ead8 28%,
    #a4c080 55%,
    #d8e4c8 82%,
    #fffcf7 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@supports not ((-webkit-background-clip: text) or (background-clip: text)) {
  .hero-name {
    color: $text-cream;
  }
}

.hero-rule {
  width: min(8rem, 28vw);
  height: 3px;
  margin: 0 0 1.1rem;
  border-radius: 3px;
  background: linear-gradient(90deg, $accent, $accent-line-soft, transparent);
  box-shadow: 0 0 24px $accent-shadow-strong;
}

.hero-role {
  margin: 0 0 1.2rem;
  font-size: 1.08rem;
  font-weight: 600;
  color: $accent-dim;
  letter-spacing: 0.01em;
}

.hero-lead {
  margin: 0 0 2rem;
  max-width: 38rem;
  font-size: clamp(0.98rem, 2.8vw, 1.06rem);
  color: $muted;
}

.jump-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem 0.75rem;
  font-size: 0.92rem;
  touch-action: manipulation;
}

.jump-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.15rem;
  color: $accent-dim;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid $accent-border;
  background: rgba(255, 252, 245, 0.04);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    color 0.3s $ease-out,
    border-color 0.3s $ease-out,
    background 0.3s $ease-out,
    transform 0.3s $ease-out,
    box-shadow 0.3s $ease-out;
}

.jump-pill:hover {
  color: $text-cream;
  border-color: $accent-border-strong;
  background: $accent-fill;
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

.jump-pill:focus-visible {
  outline: 2px solid $accent;
  outline-offset: 4px;
}

.jump-pill:active {
  transform: translateY(-1px);
}

@media (pointer: coarse) {
  .jump-pill {
    min-height: 44px;
    padding: 0.62rem 1.25rem;
  }
}

.jump-sep {
  color: $faint;
  user-select: none;
  opacity: 0.6;
}

.section {
  padding: clamp(2.75rem, 5vw, 4rem) 0;
  scroll-margin-top: clamp(0.75rem, 3vw, 1.5rem);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 1.15rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: $faint;
}

.section-title-mark {
  display: inline-block;
  width: 4px;
  height: 1.1em;
  border-radius: 2px;
  background: linear-gradient(180deg, $accent, rgba(143, 184, 110, 0.22));
  box-shadow: 0 0 14px $accent-shadow-strong;
}

.section-intro {
  margin: 0 0 1.75rem;
  max-width: 42rem;
  font-size: clamp(0.92rem, 2.2vw, 0.96rem);
  color: $muted;
}

.prose {
  max-width: 42rem;
}

.prose p {
  margin: 0 0 1.05rem;
  color: $muted;
  font-size: clamp(0.98rem, 2.4vw, 1.02rem);
}

.prose p:last-child {
  margin-bottom: 0;
}

.inline-link {
  color: $accent-dim;
  text-decoration: none;
  border-bottom: 1px solid $accent-line;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.inline-link:hover {
  color: $text-cream;
  border-bottom-color: $accent-underline;
  box-shadow: 0 2px 0 rgba(143, 184, 110, 0.12);
}

.inline-link:focus-visible {
  outline: 2px solid $accent;
  outline-offset: 3px;
  border-radius: 2px;
}

.project-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.35rem;
  grid-template-columns: 1fr;
}

@media (min-width: 34rem) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 34rem) and (max-width: 55.99rem) {
  .project-grid {
    gap: 1.5rem;
  }
}

@media (min-width: 56rem) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.45rem 1.5rem;
  background: $surface;
  border: 1px solid $surface-border;
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;
  transition:
    border-color 0.35s $ease-out,
    background 0.35s $ease-out,
    transform 0.35s $ease-out,
    box-shadow 0.35s $ease-out;
}

.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(143, 184, 110, 0.42) 0%,
    transparent 42%,
    transparent 58%,
    rgba(130, 110, 75, 0.22) 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s $ease-out;
  pointer-events: none;
  z-index: 1;
}

.project-card:hover,
.project-card:focus-within {
  border-color: rgba(143, 184, 110, 0.35);
  background: $surface-hover;
  transform: translateY(-5px);
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.35),
    0 0 0 1px $accent-ring;
}

.project-card:hover::before,
.project-card:focus-within::before {
  opacity: 1;
}

.project-card-shine {
  position: absolute;
  inset: -50% -40%;
  background: linear-gradient(
    105deg,
    transparent 42%,
    rgba(255, 255, 255, 0.09) 50%,
    transparent 58%
  );
  transform: translateX(-100%) rotate(12deg);
  transition: transform 0.65s $ease-out;
  pointer-events: none;
  z-index: 0;
}

.project-card:hover .project-card-shine {
  transform: translateX(100%) rotate(12deg);
}

.project-title,
.project-desc,
.tag-list,
.project-actions {
  position: relative;
  z-index: 2;
}

.project-title {
  margin: 0 0 0.55rem;
  font-size: 1.12rem;
  font-weight: 650;
  color: $text-cream;
  letter-spacing: -0.02em;
}

.project-desc {
  margin: 0 0 1.05rem;
  flex: 1;
  font-size: 0.9rem;
  color: $muted;
  line-height: 1.58;
}

.tag-list {
  list-style: none;
  margin: 0 0 1.15rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tag {
  margin: 0;
  padding: 0.28rem 0.62rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(228, 216, 198, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.15);
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}

.project-card:hover .tag {
  border-color: $accent-card-border;
}

.tag:hover {
  color: rgba(238, 228, 212, 0.88);
  transform: translateY(-1px);
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem 1.1rem;
  touch-action: manipulation;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: $accent-dim;
  text-decoration: none;
  border-bottom: 1px solid rgba(143, 184, 110, 0.35);
  transition:
    color 0.25s ease,
    gap 0.25s $ease-out,
    border-color 0.25s ease;
}

.action-link:hover {
  color: $text-cream;
  gap: 0.45rem;
  border-bottom-color: $accent-underline;
}

.action-arrow {
  font-size: 0.85em;
  opacity: 0.85;
  transition: transform 0.25s $ease-out;
}

.action-link:hover .action-arrow {
  transform: translate(2px, -2px);
}

.action-link--muted {
  color: rgba(230, 218, 200, 0.68);
  border-bottom-color: rgba(220, 205, 185, 0.22);
}

.action-link--muted:hover {
  color: $text-cream;
}

.action-link:focus-visible {
  outline: 2px solid $accent;
  outline-offset: 3px;
  border-radius: 2px;
}

@media (pointer: coarse) {
  .action-link {
    min-height: 44px;
    padding: 0.5rem 0.2rem;
    box-sizing: border-box;
    align-items: center;
  }

  .back-top-link {
    min-height: 44px;
    padding: 0.65rem 0;
    box-sizing: border-box;
  }
}

.back-top {
  margin: 2.75rem 0 0;
  font-size: 0.92rem;
}

.back-top-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: $faint;
  text-decoration: none;
  padding: 0.35rem 0;
  border-bottom: 1px solid rgba(220, 205, 185, 0.2);
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.back-top-link:hover {
  color: $accent-dim;
  border-bottom-color: $accent-line;
  transform: translateX(2px);
}

.back-top-link:focus-visible {
  outline: 2px solid $accent;
  outline-offset: 4px;
  border-radius: 2px;
}
</style>
