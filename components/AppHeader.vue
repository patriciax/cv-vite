<template>
  <header class="header">
    <div class="container nav-container">
      <NuxtLink :to="localePath('/')" class="logo">YIVELY.</NuxtLink>
      <nav class="nav">
        <NuxtLink :to="localePath('#projects')">{{ $t('header.work') }}</NuxtLink>
        <NuxtLink :to="localePath('#experience')">{{ $t('header.journey') }}</NuxtLink>
        
        <div class="lang-switcher">
          <button 
            v-for="loc in locales" 
            :key="loc.code"
            @click="setLocale(loc.code)"
            :class="{ active: locale === loc.code }"
          >
            {{ loc.name }}
          </button>
        </div>

        <a href="https://www.linkedin.com/in/yively-alvarez/" target="_blank" rel="noopener noreferrer" class="nav-contact">{{ $t('header.contact') }}</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.05em;
}

.nav {
  display: flex;
  gap: 2.5rem;
  align-items: center;
  
  a {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: color 0.3s ease;
    
    &:hover, &.router-link-active {
      color: white;
    }
  }
}

.lang-switcher {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 100px;
  
  button {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    border-radius: 100px;
    transition: all 0.3s ease;
    
    &.active {
      background: white;
      color: black;
    }
  }
}

.nav-contact {
  background: white;
  color: black !important;
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
}

@media (max-width: 768px) {
  .nav {
    gap: 1rem;
    
    a:not(.nav-contact) {
      display: none;
    }
  }
}
</style>
