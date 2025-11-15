<template>
  <div class="account-section">
    <!-- 영어 섹션 라벨 추가 -->
    <div class="section-label">ACCOUNT</div>
    <div class="account-title">마음 전하실 곳</div>

    <!-- 신랑측 / 신부측 탭 -->
    <div class="account-tabs">
      <button
        type="button"
        class="account-tab"
        @click="openModal('groom')"
      >
        신랑측
      </button>
      <button
        type="button"
        class="account-tab"
        @click="openModal('bride')"
      >
        신부측
      </button>
    </div>

    <!-- 계좌 모달 -->
    <div
      v-if="showModal"
      class="account-modal-backdrop"
      @click.self="closeModal"
    >
      <div class="account-modal">
        <div class="account-modal-header">
          <div class="account-modal-title">
            {{ currentSideLabel }} 계좌 안내
          </div>
          <button
            class="account-modal-close"
            type="button"
            @click="closeModal"
          >
            ×
          </button>
        </div>

        <div class="account-modal-body">
          <div
            class="account-group"
            v-for="item in currentAccounts"
            :key="item.label"
          >
            <div class="account-group-label">{{ item.label }}</div>
            <div class="account-line">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const showModal = ref(false)
const currentSide = ref('groom') // 'groom' | 'bride'

// ⚠️ 실제 계좌정보로 수정해서 사용하면 됩니다.
const groomAccounts = [
  { label: '신랑', text: '은행 / 계좌번호 / 예금주' },
  { label: '신랑 아버지', text: '은행 / 계좌번호 / 예금주' },
  { label: '신랑 어머니', text: '은행 / 계좌번호 / 예금주' }
]

const brideAccounts = [
  { label: '신부', text: '은행 / 계좌번호 / 예금주' },
  { label: '신부 아버지', text: '은행 / 계좌번호 / 예금주' },
  { label: '신부 어머니', text: '은행 / 계좌번호 / 예금주' }
]

const openModal = side => {
  currentSide.value = side
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const currentAccounts = computed(() =>
  currentSide.value === 'groom' ? groomAccounts : brideAccounts
)

const currentSideLabel = computed(() =>
  currentSide.value === 'groom' ? '신랑측' : '신부측'
)
</script>
