<template>
  <section>
    <div class="fade-section" v-intersect>
      <div class="section-label">LOCATION</div>
      <div class="section-title">오시는 길</div>
      <div class="divider"></div>

      <div class="location-box">
        <div class="location-name">공덕역 이룸 웨딩 컨벤션</div>
        <div class="location-address">
        서울 마포구 마포대로 78<br />
        (도화동, 경찰공제회 자람빌딩 5F)
        </div>
        <div class="location-subway">
        5·6호선 공덕역 8번 출구 도보 약 2분
        경의선·공항철도 공덕역 인근
        </div>

        <!-- 기존 kakao-map-container를 그대로 사용해도 됨 -->
        <div class="kakao-map-container">
          <div id="naverMap" style="width: 100%; height: 260px;"></div>
        </div>
      </div>

      <!-- 지하철 / 버스 / 자가용 안내 블록 -->
      <div class="location-transport">
        <!-- 지하철 -->
        <div class="transport-group">
          <div class="transport-title">지하철</div>
          <p class="transport-line">
            <span style="color:#996CAC;">●</span>
            5호선 
            <span style="color:#CD7C2F;">●</span> 6호선 공덕역 8번 출구
          </p>
          <p class="transport-line">
            <span style="color:#996CAC;">●</span> 5호선 마포역 3번 출구
          </p>
          <p class="transport-line">
            <span style="color:#0090D2;">●</span>공항철도
            <span style="color:#77C4A3;">●</span>경의중앙선 공덕역 9번 출구
          </p>
        </div>

        <!-- 버스 -->
        <div class="transport-group">
          <div class="transport-title">버스</div>
          <p class="transport-line">
            공덕역 · 공덕오거리 정류장 하차
          </p>
          <p class="transport-line">
            <span style="color:#00a0e9;">●</span> 공항&nbsp;6015, 6021, 6702
          </p>
          <p class="transport-line">
            <span style="color:#0068b7;">●</span> 간선&nbsp;160, 260, 463, 600
          </p>
          <p class="transport-line">
            <span style="color:#53b332;">●</span> 지선&nbsp;7013A · 7013B, 7016, 7611, 7613
          </p>
          <p class="transport-line">
            <span style="color:#e60012;">●</span> 급행&nbsp;8601, 2500, 8600
          </p>
        </div>

        <!-- 자가용 -->
        <div class="transport-group">
          <div class="transport-title">자가용</div>
          <p class="transport-line">
            ● 네비게이션
            <br/>
            &nbsp; &nbsp;· ‘이룸웨딩컨벤션’ 또는
            <br/>
            &nbsp; &nbsp;· ‘마포구 마포대로 78’ 검색
         </p>
          <br/>
          <p class="transport-line">
            ● 주차장 안내 
            <br/>
            &nbsp; &nbsp;· 건물 내 지하 주차장 이용
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
// 네이버 지도 스크립트가 로드되었는지 확인
  if (!window.naver || !window.naver.maps) {
    console.warn('Naver Maps script not loaded')
    return
  }

  // ★ 공덕역 이룸 웨딩 컨벤션 좌표로 변경해서 사용하면 됩니다.
  const center = new naver.maps.LatLng(37.541884, 126.949776)

  const map = new naver.maps.Map('naverMap', {
    center,
    zoom: 16
  })

  new naver.maps.Marker({
    position: center,
    map
  })  
})
</script>
