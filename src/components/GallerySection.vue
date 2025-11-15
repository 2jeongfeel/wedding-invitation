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
  { src: './src/img/wedding1.jpg' },
  { src: './src/img/wedding2.jpg' },
  { src: './src/img/wedding3.jpg' },
  { src: './src/img/wedding4.jpg' },
  { src: './src/img/wedding5.jpg' },
  { src: './src/img/wedding6.png' },
  { src: './src/img/wedding7.jpg' },
  { src: './src/img/wedding8.jpg' },
  { src: './src/img/wedding9.jpg' },
  { src: './src/img/wedding10.jpg' },
  { src: './src/img/wedding11.jpg' },
  { src: './src/img/wedding12.jpg' },
  { src: './src/img/wedding13.jpg' },
  { src: './src/img/wedding14.jpg' },
  { src: './src/img/wedding15.jpg' }
]

const selectedIndex = ref(null)

function openModal(index) {
  selectedIndex.value = index
}

function closeModal() {
  selectedIndex.value = null
}
</script>
