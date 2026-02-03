<template>
  <div class="app-wrapper">
    <div class="bg-glow"></div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  // Subtle glow follow mouse
  const glow = document.querySelector('.bg-glow')
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e
    gsap.to(glow, {
      duration: 1.5,
      x: clientX - window.innerWidth / 2,
      y: clientY - window.innerHeight / 2,
      ease: 'power3.out'
    })
  })
})
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
