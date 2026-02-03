<template>
  <div class="layout">
    <AppHeader />
    <slot />
    <footer class="footer container">
       <div class="container">
          <p>© {{ new Date().getFullYear() }} Yively Alvarez. {{ $t('footer.builtWith') }}</p>
       </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 4rem 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>
