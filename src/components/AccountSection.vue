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
        <!-- ───────── 신랑측 ───────── -->
        <div class="account-side">
          <div class="account-side-header" @click="toggleGroom">
            <div class="account-side-title">신랑측</div>
            <span
              class="account-toggle-button"
            >
              <!-- font awesome 아이콘으로 접기/펼치기 -->
              <i
                v-if="isGroomOpen"
                class="fa-solid fa-chevron-up"
                aria-hidden="true"
              ></i>
              <i
                v-else
                class="fa-solid fa-chevron-down"
                aria-hidden="true"
              ></i>
            </span>
          </div>

          <transition name="fade-accounts">
            <div v-if="isGroomOpen" class="account-side-body">
              <div
                v-for="item in groomAccounts"
                :key="item.role + item.name"
                class="account-row"
              >
                <div class="account-main">
                  <div class="account-name">
                    <span class="account-role">{{ item.role }}</span>
                    <span class="account-name-strong">{{ item.name }}</span>
                  </div>
                  <div class="account-detail">
                    {{ item.bank }} {{ item.number }}
                  </div>
                </div>
                <div class="account-actions">
                  <button
                    type="button"
                    class="account-copy-button"
                    @click.stop="copyAccount(item)"
                  >
                    <i class="fa-regular fa-copy" aria-hidden="true"></i>
                    <span>복사</span>
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- ───────── 신부측 ───────── -->
        <div class="account-side">
          <div class="account-side-header" @click="toggleBride">
            <div class="account-side-title">신부측</div>
            <span
              class="account-toggle-button"
            >
              <i
                v-if="isBrideOpen"
                class="fa-solid fa-chevron-up"
                aria-hidden="true"
              ></i>
              <i
                v-else
                class="fa-solid fa-chevron-down"
                aria-hidden="true"
              ></i>
            </span>
          </div>

          <transition name="fade-accounts">
            <div v-if="isBrideOpen" class="account-side-body">
              <div
                v-for="item in brideAccounts"
                :key="item.role + item.name"
                class="account-row"
              >
                <div class="account-main">
                  <div class="account-name">
                    <span class="account-role">{{ item.role }}</span>
                    <span class="account-name-strong">{{ item.name }}</span>
                  </div>
                  <div class="account-detail">
                    {{ item.bank }} {{ item.number }}
                  </div>
                </div>
                <div class="account-actions">
                  <button
                    type="button"
                    class="account-copy-button"
                    @click.stop="copyAccount(item)"
                  >
                    <i class="fa-regular fa-copy" aria-hidden="true"></i>
                    <span>복사</span>
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 복사 안내 토스트 -->
        <div v-if="copyMessage" class="account-copy-guide">
          {{ copyMessage }}
          <br/>
          복사 완료
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isGroomOpen = ref(true)
const isBrideOpen = ref(true)

// ───────── 계좌 데이터 ─────────
const groomAccounts = [
  {
    role: '신랑',
    name: '이정필',
    bank: '신한은행',
    number: '110-545-887230'
  },
  {
    role: '아버지',
    name: '이성재',
    bank: '국민은행',
    number: '815-21-0741-253'
  },
  {
    role: '어머니',
    name: '전미희',
    bank: '국민은행',
    number: '507401-01-017060'
  }
]

const brideAccounts = [
  {
    role: '신부',
    name: '장유지',
    bank: '국민은행',
    number: '110-407-258772'
  },
  {
    role: '아버지',
    name: '장영덕',
    bank: '국민은행',
    number: '392002-04-164359'
  },
  {
    role: '어머니',
    name: '정수선',
    bank: '신한은행',
    number: '827-21-0129-769'
  }
]

const toggleGroom = () => {
  isGroomOpen.value = !isGroomOpen.value
}

const toggleBride = () => {
  isBrideOpen.value = !isBrideOpen.value
}

// ───────── 복사 기능 ─────────
const copyMessage = ref('')

function copyAccount(item) {
  const text = `${item.bank} ${item.number}`

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => {
        copyMessage.value = `${item.bank} ${item.number}`
        setTimeout(() => {
          copyMessage.value = ''
        }, 2000)
      },
      () => fallbackCopy(text)
    )
  } else {
    fallbackCopy(text)
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    copyMessage.value = `${text}`
  } catch (e) {
    copyMessage.value = '복사를 지원하지 않는 브라우저입니다.'
  }
  document.body.removeChild(textarea)
  setTimeout(() => {
    copyMessage.value = ''
  }, 2000)
}
</script>
