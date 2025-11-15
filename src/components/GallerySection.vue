<template>
  <section>
    <div class="section-label">GALLERY</div>
    <div class="section-title">웨딩 갤러리</div>
    <div class="divider"></div>

    <div class="gallery">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img.src"
        :alt="`웨딩 사진 ${index + 1}`"
        @click="openModal(index)"
      />
    </div>

    <!-- 확대 모달 -->
    <div
      v-if="selectedIndex !== null"
      class="gallery-modal-backdrop"
      @click.self="closeModal"
    >
      <div class="gallery-modal-image-wrapper">
        <img :src="images[selectedIndex].src" :alt="`웨딩 사진 확대`" />
      </div>
      <div class="gallery-modal-close" @click="closeModal">×</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const images = [
  { src: '/wedding-invitation/img/wedding1.jpg' },
  { src: '/wedding-invitation/img/main.jpg' },
  { src: '/wedding-invitation/img/wedding3.jpg' },
  { src: '/wedding-invitation/img/wedding4.jpg' },
  { src: '/wedding-invitation/img/wedding5.jpg' },
  { src: '/wedding-invitation/img/wedding6.png' },
  { src: '/wedding-invitation/img/wedding7.jpg' },
  { src: '/wedding-invitation/img/wedding8.jpg' },
  { src: '/wedding-invitation/img/wedding9.jpg' },
  { src: '/wedding-invitation/img/wedding10.jpg' },
  { src: '/wedding-invitation/img/wedding11.jpg' },
  { src: '/wedding-invitation/img/wedding12.jpg' },
  { src: '/wedding-invitation/img/wedding13.jpg' },
  { src: '/wedding-invitation/img/wedding14.jpg' },
  { src: '/wedding-invitation/img/wedding15.jpg' }
]

const selectedIndex = ref(null)

function openModal(index) {
  selectedIndex.value = index
}

function closeModal() {
  selectedIndex.value = null
}
</script>
