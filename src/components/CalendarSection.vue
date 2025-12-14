<template>
  <section >
    <div class="fade-section" v-intersect>
      <div class="section-label">CALENDAR</div>
      <div class="divider"></div>

      <div class="calendar-wrapper">
        <div class="calendar-header">2026년 2월</div>
        <div class="calendar-grid">
          <div
            v-for="dayName in dayNames"
            :key="dayName"
            class="calendar-day-name"
          >
            {{ dayName }}
          </div>

          <div
            v-for="(cell, idx) in cells"
            :key="idx"
            class="calendar-cell"
            :class="{
              'calendar-cell-muted': cell.muted,
              'calendar-cell-wedding': cell.isWedding
            }"
          >
            <span v-if="cell.day">{{ cell.day }}</span>
          </div>
        </div>
        <div class="calendar-caption">
          <br/>
          2월 7일 토요일 오전 11시<br />
          저희 두 사람의 소중한 날에 함께해 주시길 바랍니다.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const dayNames = ['일', '월', '화', '수', '목', '금', '토']

// 2026년 2월: 일요일 시작, 28일까지, 7일은 토요일
// 그리드는 6주(6*7=42칸)로 구성
const cells = []

// 2월 1~28
for (let d = 1; d <= 28; d++) {
  cells.push({
    day: d,
    muted: false,
    isWedding: d === 7
  })
}

</script>
