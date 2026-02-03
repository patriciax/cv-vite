<template>
  <section id="experience" class="experience container">
    <div class="section-header">
      <h2 class="section-title">{{ $t('experience.title') }}</h2>
      <p class="section-tag">/ 02</p>
    </div>
    
    <div class="experience-list">
      <div v-for="job in jobs" :key="job.id" class="exp-item">
        <div class="exp-header">
          <div class="job-role">
            <h3>{{ job.role }}</h3>
            <p class="company">{{ job.company }}</p>
          </div>
          <div class="job-date">
            <span>{{ job.date }}</span>
          </div>
        </div>
        <div class="exp-body">
          <p>{{ job.description[locale] }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n()
const { data: content } = await useFetch('/api/content')
const jobs = computed(() => content.value?.experience || [])
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

.experience-list {
  max-width: 800px;
  margin: 0 auto;
}

.exp-item {
  padding: 3rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
}

.job-role h3 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  color: white;
}

.company {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.job-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-family: var(--font-body);
}

.exp-body p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .exp-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
