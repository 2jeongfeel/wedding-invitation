<template>
  <section>
    <div class="fade-section" v-intersect>
      <!-- 섹션 타이틀 -->
      <div class="section-label">ACCOUNT</div>
      <div class="section-title">마음 전하실 곳</div>
      <div class="divider"></div>

      <!-- 안내 문구 -->
      <p class="account-text">
        소중한 주말, 전국 각지에서 저희를 위해
        <br />
        귀한 마음 써주심에 감사드립니다.
        <br /><br />
        비대면으로 축하를 전하고자
        <br />
        하시는 분들을 위해
        <br />
        계좌번호를 기재하였습니다.
        <br />
        너그러운 마음으로 양해 부탁드립니다.
        <br /><br />
        잊지 않고 꼭 보답하며 평생 간직하겠습니다.
        <br /><br />
      </p>

      <div class="account-section">
        <!-- 신랑측 / 신부측 탭 (가운데 토글) -->
        <div class="account-tabs">
          <button
            type="button"
            class="account-tab"
            :class="{ active: currentSide === 'groom' }"
            @click="changeSide('groom')"
          >
            신랑측
          </button>
          <button
            type="button"
            class="account-tab"
            :class="{ active: currentSide === 'bride' }"
            @click="changeSide('bride')"
          >
            신부측
          </button>
        </div>

        <!-- 가운데 카드 캐러셀 (양옆 살짝 보이게) -->
        <div
          class="account-slider"
          ref="sliderWrapper"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseLeave"
        >
          <div class="account-slider-track" :style="sliderStyle">
            <div
              v-for="(item, index) in currentAccounts"
              :key="item.name + index"
              class="account-slide"
              :style="{
                width: slideWidth + 'px',
                marginRight:
                  index === currentAccounts.length - 1 ? '0px' : slideGap + 'px'
              }"
            >
              <div class="account-card">
                <!-- 1줄 : 이름 -->
                <div class="account-card-name">
                  {{ item.name }}
                </div>
                <!-- 2줄 : 은행 + 계좌 + 복사버튼 한 줄 -->
                <div class="account-card-detail-row">
                  <span class="account-card-bank">{{ item.bank }}</span>
                  <span class="account-card-number">{{ item.number }}</span>
                  <button
                    type="button"
                    class="account-copy-button"
                    @click.stop="copyAccount(item)"
                  >
                    <i class="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 복사 안내 문구 -->
        <div v-if="copyMessage" class="account-copy-guide">
          {{ copyMessage }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue'

// ───────────────── 신랑/신부 데이터 ─────────────────
const currentSide = ref('groom')

const groomAccounts = [
  {
    name: '이성재',
    bank: '국민은행',
    number: '815-21-0741-253'
  },
  {
    name: '전미희',
    bank: '국민은행',
    number: '507401-01-017060'
  },
  {
    name: '이정필',
    bank: '신한은행',
    number: '110-545-887230'
  }
]

const brideAccounts = [
  {
    name: '장영덕',
    bank: '국민은행',
    number: '392002-04-164359'
  },
  {
    name: '정수선',
    bank: '신한은행',
    number: '827-21-0129-769'
  },
  {
    name: '장유지',
    bank: '국민은행',
    number: '110-407-258772'
  }
]

const currentAccounts = computed(() =>
  currentSide.value === 'groom' ? groomAccounts : brideAccounts
)

// 현재 중앙에 보이는 카드 인덱스
const currentIndex = ref(0)

// ───────────────── 슬라이더 위치/드래그 관련 ─────────────────
const sliderWrapper = ref(null)
const wrapperWidth = ref(0)
const slideWidth = ref(0)
const slideGap = ref(0)

const isDragging = ref(false)
const startX = ref(0)
const deltaX = ref(0)

// 카드/간격 계산: 카드 폭 넓게, 양 옆 살짝 보이도록
function initSlideMetrics() {
  if (!sliderWrapper.value) return
  const W = sliderWrapper.value.offsetWidth || window.innerWidth
  wrapperWidth.value = W

  // 카드 너비: 화면의 88% (👉 기존보다 좀 더 넓게)
  slideWidth.value = W * 0.67
  // 카드 사이 간격: 화면의 10% (양 옆 카드 살짝 보이게)
  slideGap.value = W * 0.01
}

// 현재 index의 카드가 중앙에 오도록 transform 계산
const sliderStyle = computed(() => {
  const W = wrapperWidth.value || window.innerWidth
  const cardW = slideWidth.value || W * 0.7
  const gap = slideGap.value || W * 0.01

  // 현재 카드(center)의 x 좌표
  const centerX = currentIndex.value * (cardW + gap) + cardW / 2
  // viewport 중앙(W/2)에 맞추기 위한 offset
  const offset = W / 2 - centerX

  return {
    transform: `translateX(${offset + deltaX.value}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.25s ease'
  }
})

// 첫 렌더 시 메트릭 계산
onMounted(() => {
  nextTick(() => {
    initSlideMetrics()
  })
})

// 탭 바뀔 때 첫 카드로 & 메트릭 재계산
function changeSide(side) {
  currentSide.value = side
}

watch(currentSide, () => {
  currentIndex.value = 0
  resetDrag()
  nextTick(() => {
    initSlideMetrics()
  })
})

// 공통 드래그 시작
function beginDrag(clientX) {
  initSlideMetrics()
  isDragging.value = true
  startX.value = clientX
  deltaX.value = 0
}

// 공통 드래그 종료 → threshold 넘으면 카드 이동
function endDrag() {
  if (!isDragging.value) return
  const cardW = slideWidth.value || wrapperWidth.value * 0.7
  const threshold = cardW * 0.1 // 카드 폭의 10%만 드래그해도 이동

  if (
    deltaX.value < -threshold &&
    currentIndex.value < currentAccounts.value.length - 1
  ) {
    // 왼쪽으로 드래그 → 다음 카드
    currentIndex.value += 1
  } else if (deltaX.value > threshold && currentIndex.value > 0) {
    // 오른쪽으로 드래그 → 이전 카드
    currentIndex.value -= 1
  }

  resetDrag()
}

function resetDrag() {
  isDragging.value = false
  deltaX.value = 0
}

// 터치 이벤트
function onTouchStart(e) {
  if (!e.touches || e.touches.length === 0) return
  beginDrag(e.touches[0].clientX)
}

function onTouchMove(e) {
  if (!isDragging.value || !e.touches || e.touches.length === 0) return
  const x = e.touches[0].clientX
  deltaX.value = x - startX.value
}

function onTouchEnd() {
  endDrag()
}

// 마우스 이벤트
function onMouseDown(e) {
  e.preventDefault()
  beginDrag(e.clientX)
}

function onMouseMove(e) {
  if (!isDragging.value) return
  e.preventDefault()
  const x = e.clientX
  deltaX.value = x - startX.value
}

function onMouseUp() {
  endDrag()
}

function onMouseLeave() {
  endDrag()
}

// ───────────────── 계좌 복사 ─────────────────
const copyMessage = ref('')

function copyAccount(item) {
  const text = `${item.bank} ${item.number}`

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => {
        copyMessage.value = `${item.bank} ${item.number} 복사 완료`
        setTimeout(() => {
          copyMessage.value = ''
        }, 2000)
      },
      () => fallbackCopy(text, item.name)
    )
  } else {
    fallbackCopy(text, item.name)
  }
}

function fallbackCopy(text, name) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    copyMessage.value = `${name} 계좌번호가 복사되었습니다.`
  } catch (e) {
    copyMessage.value = '복사를 지원하지 않는 브라우저입니다.'
  }
  document.body.removeChild(textarea)
  setTimeout(() => {
    copyMessage.value = ''
  }, 2000)
}
</script>
