<template>
  <section>
    <!-- 영어 섹션 라벨 -->
    <div class="section-label">ACCOUNT</div>
    <div class="section-title">마음 전하실 곳</div>
    <div class="divider"></div>

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
      <br /><br /><br />
    </p>

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
          <!-- 한 줄: 이름 / 은행+계좌 / 복사버튼 -->
          <div
            class="account-row"
            v-for="item in currentAccounts"
            :key="item.name"
          >
            <div class="account-main">
              <div class="account-name">
                {{ item.name }}
              </div>
              <div class="account-detail">
                {{ item.bank }} {{ item.number }}
              </div>
            </div>
            <div class="account-actions">
              <button
                type="button"
                class="account-copy-button"
                @click="copyAccount(item.number)"
              >
                복사
              </button>
            </div>
          </div>

          <div class="account-copy-guide">
            복사 버튼을 누르시면 계좌번호가 클립보드에 복사됩니다.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const showModal = ref(false)
const currentSide = ref('groom') // 'groom' | 'bride'

// 🔸 실제 계좌정보로 바꿔서 사용하면 됩니다.
const groomAccounts = [
  { name: '신랑 이정필', bank: 'OO은행', number: '000-0000-0000-00' },
  { name: '신랑 아버지 이성재', bank: 'OO은행', number: '000-0000-0000-00' },
  { name: '신랑 어머니 전미희', bank: 'OO은행', number: '000-0000-0000-00' }
]

const brideAccounts = [
  { name: '신부 장유지', bank: 'OO은행', number: '000-0000-0000-00' },
  { name: '신부 아버지 장영덕', bank: 'OO은행', number: '000-0000-0000-00' },
  { name: '신부 어머니 정수선', bank: 'OO은행', number: '000-0000-0000-00' }
]

const openModal = side => {
  currentSide.value = side
  showModal.value = true
  document.body.classList.add('modal-open') // 배경 스크롤 막기
}

const closeModal = () => {
  showModal.value = false
  document.body.classList.remove('modal-open')
}

const currentAccounts = computed(() =>
  currentSide.value === 'groom' ? groomAccounts : brideAccounts
)

const currentSideLabel = computed(() =>
  currentSide.value === 'groom' ? '신랑측' : '신부측'
)

const copyAccount = number => {
  if (!number) return
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(number)
      .then(() => {
        alert('계좌번호가 복사되었습니다.')
      })
      .catch(() => {
        fallbackCopy(number)
      })
  } else {
    fallbackCopy(number)
  }
}

const fallbackCopy = text => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    alert('계좌번호가 복사되었습니다.')
  } catch (e) {
    alert('복사에 실패했습니다. 계좌번호를 직접 확인해주세요.')
  } finally {
    document.body.removeChild(textarea)
  }
}
</script>
