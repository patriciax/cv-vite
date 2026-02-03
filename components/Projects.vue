<template>
  <section id="projects" class="projects mb-10 container">
    <div class="section-header">
      <h2 class="section-title">{{ $t('projects.title') }}</h2>
      <p class="section-tag">/ 01</p>
    </div>
    
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-image">
          <div class="image-mock" :style="{ backgroundImage: `url(${project.image})`, backgroundColor: project.color }"></div>
        </div>
        <div class="project-info">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.description[locale] }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <a v-if="project.github" :href="project.github" target="_blank" class="project-link gray">
            Repositorio <Icon name="ph:arrow-up-right-bold" />
          </a>
          <br>
          <a :href="project.link" target="_blank" class="project-link">
            {{ $t('projects.visitSite') }} <Icon name="ph:arrow-up-right-bold" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n()
const { data: content } = await useFetch('/api/content')
const projects = computed(() => content.value?.projects || [])
</script>

<style lang="scss" scoped>
/* (Styles unchanged) */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.section-title {
  font-size: 2rem;
  letter-spacing: 0.1em;
}

.section-tag {
  color: var(--text-secondary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 3rem;
}

.project-card {
  background: var(--surface-color);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    border-color: rgba(59, 130, 246, 0.3);
  }
}

.project-image {
  height: 250px;
}

.image-mock {
  width: 100%;
  height: 100%;
  opacity: 0.2;
}

.project-info {
  padding: 2rem;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.project-desc {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--primary-color);
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }

  
}
.gray{
    color: var(--text-secondary);
    cursor: pointer;
  }
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

.mb-10{
  margin-bottom: 5rem;
  margin-top: 5rem;
}
</style>
