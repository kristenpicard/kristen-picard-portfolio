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
      <div class="projects-head">
        <h2 id="projects-heading" class="section-title js-reveal">
          <span class="section-title-mark" aria-hidden="true"></span>
          Selected work
        </h2>
        <p class="section-intro js-reveal" :style="{ '--reveal-delay': '60ms' }">
          Highlights from my public GitHub repositories. &ldquo;Demo&rdquo; opens a GitHub Pages
          build where one is configured; otherwise use &ldquo;Repository&rdquo; for code and README.
        </p>
      </div>
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
  box-sizing: border-box;
  width: 100%;
  max-width: none;
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  line-height: 1.62;
  padding-top: calc(clamp(1.35rem, 4vw, 4.25rem) + env(safe-area-inset-top, 0px));
  padding-right: calc(clamp(0.85rem, 3.5vw, 4.5rem) + env(safe-area-inset-right, 0px));
  padding-bottom: calc(clamp(2rem, 4vw, 3.75rem) + env(safe-area-inset-bottom, 0px));
  padding-left: calc(clamp(0.85rem, 3.5vw, 4.5rem) + env(safe-area-inset-left, 0px));
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
  padding-bottom: clamp(1.5rem, 3.5vw, 2.75rem);
  margin-bottom: 0;
}

.hero-layout {
  position: relative;
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
  align-items: center;
  grid-template-columns: 1fr;
}

@media (min-width: 56rem) {
  .hero-layout {
    grid-template-columns: minmax(0, 1fr) minmax(12rem, 34%);
    gap: clamp(1.35rem, 3vw, 2.5rem);
  }
}

@media (min-width: 72rem) {
  .hero-layout {
    grid-template-columns: minmax(0, 1fr) minmax(14rem, min(36vw, 30rem));
    gap: clamp(1.5rem, 3.5vw, 3.25rem);
    align-items: center;
  }
}

@media (min-width: 96rem) {
  .hero-layout {
    grid-template-columns: minmax(0, 1.12fr) minmax(16rem, min(28vw, 34rem));
    gap: clamp(1.65rem, 3.5vw, 3.5rem);
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
    max-width: min(24rem, 100%);
    justify-self: end;
  }
}

@media (min-width: 72rem) {
  .hero-photo {
    max-width: min(30rem, 100%);
  }
}

@media (min-width: 96rem) {
  .hero-photo {
    max-width: min(34rem, 100%);
  }
}

.hero-photo-frame {
  position: relative;
  border-radius: 18px;
  padding: 1px;
  background: linear-gradient(
    145deg,
    rgba(172, 200, 142, 0.32) 0%,
    rgba(255, 250, 240, 0.08) 45%,
    rgba(120, 100, 70, 0.18) 100%
  );
  box-shadow:
    0 28px 70px rgba(0, 0, 0, 0.42),
    0 0 48px rgba(88, 114, 66, 0.14);
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
    0 0 60px rgba(106, 138, 78, 0.2);
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
    rgba(106, 142, 78, 0.16) 0%,
    transparent 65%
  );
  pointer-events: none;
  filter: blur(2px);
}

.hero-eyebrow {
  position: relative;
  margin: 0 0 0.65rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: $faint;
}

.hero-name {
  position: relative;
  margin: 0 0 0.5rem;
  font-size: clamp(2.05rem, 6.2vw, 3.85rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.05;
  background: linear-gradient(
    118deg,
    #faf7f2 0%,
    #e7ead4 28%,
    #9db078 55%,
    #d4e0c4 82%,
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
  margin: 0 0 0.85rem;
  border-radius: 3px;
  background: linear-gradient(90deg, $accent, $accent-line-soft, transparent);
  box-shadow: 0 0 24px $accent-shadow-strong;
}

.hero-role {
  margin: 0 0 0.85rem;
  font-size: clamp(1.02rem, 2vw, 1.14rem);
  font-weight: 600;
  color: $accent-dim;
  letter-spacing: 0.01em;
}

.hero-lead {
  margin: 0 0 1.35rem;
  max-width: min(38rem, 100%);
  font-size: clamp(0.98rem, 2.6vw, 1.08rem);
  line-height: 1.58;
  color: $muted;
}

@media (min-width: 72rem) {
  .hero-lead {
    max-width: min(52rem, 100%);
    font-size: clamp(1.02rem, 1.25vw, 1.14rem);
    line-height: 1.55;
  }
}

.jump-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.6rem;
  font-size: clamp(0.9rem, 2.2vw, 0.98rem);
  touch-action: manipulation;
}

.jump-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.52rem 1.2rem;
  color: $accent-dim;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid $accent-border;
  background: rgba(255, 252, 245, 0.05);
  box-shadow:
    inset 0 1px 0 rgba(255, 252, 245, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    color 0.22s $ease-out,
    border-color 0.22s $ease-out,
    background 0.22s $ease-out,
    transform 0.2s $ease-out,
    box-shadow 0.22s $ease-out;
}

@media (hover: hover) and (pointer: fine) {
  .jump-pill:hover {
    color: $text-cream;
    border-color: rgba(188, 212, 152, 0.88);
    background: linear-gradient(
      165deg,
      rgba(138, 154, 102, 0.32) 0%,
      rgba(86, 112, 64, 0.28) 100%
    );
    transform: translateY(-4px) scale(1.02);
    box-shadow:
      0 0 0 1px rgba(138, 154, 102, 0.35),
      0 0 24px rgba(138, 154, 102, 0.28),
      0 16px 40px rgba(0, 0, 0, 0.38);
  }
}

.jump-pill:focus-visible {
  outline: 2px solid rgba(188, 212, 152, 0.95);
  outline-offset: 3px;
  border-color: rgba(188, 212, 152, 0.65);
}

.jump-pill:active {
  color: $text-cream;
  border-color: rgba(138, 154, 102, 0.95);
  background: linear-gradient(180deg, rgba(35, 44, 28, 0.92) 0%, rgba(22, 28, 18, 0.96) 100%);
  transform: translateY(1px) scale(0.97);
  box-shadow:
    inset 0 2px 10px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(138, 154, 102, 0.45),
    0 4px 14px rgba(0, 0, 0, 0.35);
}

@media (pointer: coarse) {
  .jump-pill {
    min-height: 44px;
    padding: 0.62rem 1.25rem;
  }
}

@media (min-width: 56rem) and (hover: hover) and (pointer: fine) {
  .jump-pill {
    padding: 0.58rem 1.35rem;
    font-size: 0.98rem;
  }
}

.jump-sep {
  color: $faint;
  user-select: none;
  opacity: 0.6;
}

/* Mobile: centered columns / blocks; compact jump row */
@media (max-width: 47.99rem) {
  .hero-copy {
    text-align: center;
  }

  .hero-rule {
    margin-left: auto;
    margin-right: auto;
  }

  .jump-links {
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0.12rem 0.28rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .jump-pill {
    flex: 0 1 auto;
    padding: 0.38rem 0.48rem;
    font-size: clamp(0.65rem, 3.1vw, 0.78rem);
    min-height: 0;
    line-height: 1.2;
  }

  .jump-sep {
    flex-shrink: 0;
    font-size: 0.75em;
    line-height: 1;
    opacity: 0.45;
  }

  .section-title {
    justify-content: center;
  }

  .projects-head {
    text-align: center;
  }

  .projects-head .section-intro {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 47.99rem) and (pointer: coarse) {
  .jump-pill {
    min-height: 40px;
    padding: 0.42rem 0.5rem;
  }
}

.section {
  padding: clamp(1.65rem, 3.5vw, 2.85rem) 0;
  scroll-margin-top: clamp(0.65rem, 2.5vw, 1.25rem);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 0 0.85rem;
  font-size: clamp(0.76rem, 1.5vw, 0.82rem);
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
  background: linear-gradient(180deg, $accent, rgba(138, 154, 102, 0.22));
  box-shadow: 0 0 14px $accent-shadow-strong;
}

.section-intro {
  margin: 0 0 1.25rem;
  max-width: min(48rem, 100%);
  font-size: clamp(0.93rem, 2vw, 1.02rem);
  line-height: 1.52;
  color: $muted;
}

.projects-head .section-title {
  margin-bottom: 0.85rem;
}

.projects-head .section-intro {
  margin-bottom: 1.25rem;
}

@media (min-width: 52rem) {
  .projects-head {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: clamp(1.15rem, 2.5vw, 2.75rem);
    align-items: start;
    margin-bottom: 1.25rem;
  }

  .projects-head .section-title {
    margin-bottom: 0;
    padding-top: 0.15rem;
  }

  .projects-head .section-intro {
    margin: 0;
    max-width: none;
    line-height: 1.5;
    font-size: clamp(0.94rem, 1.35vw, 1.04rem);
  }
}

.prose {
  max-width: min(42rem, 100%);
}

.about .prose {
  max-width: none;
}

@media (min-width: 56rem) {
  .about .prose {
    column-count: 2;
    column-gap: clamp(1.35rem, 2.5vw, 2.5rem);
  }

  .about .prose p {
    break-inside: avoid;
  }
}

@media (min-width: 96rem) {
  .about .prose {
    column-count: 3;
  }
}

.prose p {
  margin: 0 0 0.85rem;
  color: $muted;
  font-size: clamp(0.98rem, 2.2vw, 1.05rem);
  line-height: 1.58;
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
  box-shadow: 0 2px 0 rgba(138, 154, 102, 0.12);
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
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 34rem) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.1rem;
  }
}

@media (min-width: 56rem) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.15rem;
  }
}

/* Full-width / large screens: three columns, wider gutters only */
@media (min-width: 80rem) {
  .project-grid {
    gap: clamp(1.25rem, 1.6vw, 1.75rem);
  }
}

@media (min-width: 112rem) {
  .project-grid {
    gap: clamp(1.35rem, 1.75vw, 2rem);
  }
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(1.35rem, 2.8vw, 1.75rem) clamp(1.35rem, 2.5vw, 1.65rem);
  background: $surface;
  border: 1px solid $surface-border;
  border-radius: clamp(14px, 1.2vw, 18px);
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
    rgba(138, 154, 102, 0.42) 0%,
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
  border-color: rgba(138, 154, 102, 0.35);
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
  margin: 0 0 0.5rem;
  font-size: clamp(1.08rem, 1.8vw, 1.22rem);
  font-weight: 650;
  color: $text-cream;
  letter-spacing: -0.02em;
}

.project-desc {
  margin: 0 0 0.9rem;
  flex: 1;
  font-size: clamp(0.9rem, 1.5vw, 0.97rem);
  color: $muted;
  line-height: 1.55;
}

.tag-list {
  list-style: none;
  margin: 0 0 0.95rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.5rem;
}

.tag {
  margin: 0;
  padding: 0.32rem 0.68rem;
  font-size: clamp(0.66rem, 1.2vw, 0.72rem);
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
  gap: 0.65rem 1rem;
  touch-action: manipulation;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: clamp(0.88rem, 1.35vw, 0.95rem);
  font-weight: 600;
  min-height: 2.35rem;
  padding: 0.38rem 0.95rem;
  box-sizing: border-box;
  color: $accent-dim;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid rgba(138, 154, 102, 0.32);
  background: rgba(0, 0, 0, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 252, 245, 0.05);
  transition:
    color 0.2s $ease-out,
    gap 0.2s $ease-out,
    border-color 0.2s $ease-out,
    background 0.2s $ease-out,
    transform 0.18s $ease-out,
    box-shadow 0.2s $ease-out;
}

@media (hover: hover) and (pointer: fine) {
  .action-link:hover {
    color: $text-cream;
    gap: 0.48rem;
    border-color: rgba(188, 212, 152, 0.75);
    background: linear-gradient(
      165deg,
      rgba(138, 154, 102, 0.35) 0%,
      rgba(72, 94, 52, 0.42) 100%
    );
    box-shadow:
      0 0 0 1px rgba(138, 154, 102, 0.2),
      0 8px 22px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 252, 245, 0.12);
  }
}

.action-arrow {
  font-size: 0.85em;
  opacity: 0.88;
  transition: transform 0.2s $ease-out, opacity 0.2s ease;
}

@media (hover: hover) and (pointer: fine) {
  .action-link:hover .action-arrow {
    transform: translate(3px, -2px);
    opacity: 1;
  }
}

.action-link--muted {
  color: rgba(230, 218, 200, 0.72);
  border-color: rgba(210, 200, 180, 0.18);
  background: rgba(0, 0, 0, 0.12);
}

@media (hover: hover) and (pointer: fine) {
  .action-link--muted:hover {
    color: $text-cream;
    border-color: rgba(188, 212, 152, 0.55);
    background: rgba(138, 154, 102, 0.14);
  }
}

.action-link:active {
  color: $text-cream;
  transform: scale(0.96);
  border-color: rgba(138, 154, 102, 0.5);
  background: linear-gradient(180deg, rgba(24, 30, 18, 0.95) 0%, rgba(12, 16, 10, 0.98) 100%);
  box-shadow:
    inset 0 2px 8px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(138, 154, 102, 0.25);
}

.action-link:focus-visible {
  outline: 2px solid rgba(188, 212, 152, 0.9);
  outline-offset: 3px;
}

@media (pointer: coarse) {
  .action-link {
    min-height: 44px;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    align-items: center;
  }
}

.back-top {
  margin: 2rem 0 0;
  font-size: clamp(0.9rem, 1.5vw, 0.98rem);
}

.back-top-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: $faint;
  text-decoration: none;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(210, 200, 180, 0.14);
  background: rgba(0, 0, 0, 0.08);
  transition:
    color 0.2s $ease-out,
    border-color 0.2s $ease-out,
    background 0.2s $ease-out,
    transform 0.18s $ease-out,
    box-shadow 0.2s $ease-out;
}

@media (hover: hover) and (pointer: fine) {
  .back-top-link:hover {
    color: $text-cream;
    border-color: rgba(188, 212, 152, 0.55);
    background: rgba(138, 154, 102, 0.14);
    transform: translateY(-2px);
    box-shadow:
      0 0 0 1px rgba(138, 154, 102, 0.18),
      0 10px 26px rgba(0, 0, 0, 0.3);
  }
}

.back-top-link:active {
  color: $accent-dim;
  transform: translateY(1px) scale(0.97);
  border-color: rgba(138, 154, 102, 0.45);
  background: rgba(18, 22, 14, 0.85);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
}

.back-top-link:focus-visible {
  outline: 2px solid rgba(188, 212, 152, 0.85);
  outline-offset: 3px;
}

@media (pointer: coarse) {
  .back-top-link {
    min-height: 44px;
    padding: 0.55rem 1.15rem;
    box-sizing: border-box;
  }
}
</style>
