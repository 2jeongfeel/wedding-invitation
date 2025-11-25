<template>
  <section>
    <div class="section-label">LOCATION</div>
    <div class="section-title">오시는 길</div>
    <div class="divider"></div>

    <div class="location-box">
      <div class="location-name">공덕역 이룸 웨딩 컨벤션</div>
      <div class="location-address">
      서울 마포구 마포대로 78<br />
      (도화동, 경찰공제회 자람빌딩 4~6층)
      </div>
      <div class="location-subway">
      5·6호선 공덕역 8번 출구 도보 약 2분
      경의선·공항철도 공덕역 인근
      </div>

      <!-- ✅ 1. 지도 노드 (퍼가기에서 준 div 그대로) -->
      <div
        id="daumRoughmapContainer1763216299474"
        class="root_daum_roughmap root_daum_roughmap_landing kakao-map-container"
      >
      </div>
      <!-- ✅ 계좌는 별도 컴포넌트로 분리 -->
      <AccountSection />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import AccountSection from './AccountSection.vue'

onMounted(() => {
  // roughmap 로더가 로드될 때까지 기다렸다가 실행
  const startMap = () => {
    if (!window.daum || !window.daum.roughmap) return

    // 이미 렌더된 적 있으면 또 만들지 않도록 방어 (선택이지만 있으면 좋음)
    const container = document.getElementById('daumRoughmapContainer1763216299474')
    if (!container) return
    if (container.getAttribute('data-map-loaded') === 'true') return

    new window.daum.roughmap.Lander({
      timestamp: '1763216299474',
      key: 'c95vj8jo724',
      mapWidth: '640',
      mapHeight: '360'
    }).render()

    container.setAttribute('data-map-loaded', 'true')
  }

  // roughmap 로더(script)가 이미 로드됐으면 바로 실행
  if (window.daum && window.daum.roughmap) {
    startMap()
  } else {
    // 아직이면 로더 스크립트가 로드될 때까지 기다렸다가 실행
    const loader = document.querySelector('.daum_roughmap_loader_script')
    if (loader) {
      loader.addEventListener('load', startMap, { once: true })
    }
  }
})
</script>
