<template>
  <section>
    <div class="section-label">INVITATION</div>
    <div class="section-title">소중한 분들을 초대합니다</div>
    <div class="divider"></div>

    <p class="invitation-text">
    오랜시간 친구로 함께한 저희,
    <br>
    이제는 서로의 삶을 함께 나아가기로 약속했습니다.
    <br>
    <br>
    새로운 시작의 자리에 초대드리오니
    <br>
    따뜻한 축복으로 함께해 주시면 감사하겠습니다.
    <br>
    <br>
    </p>

    <!-- 혼주 & 신랑신부 표현 -->
    <div class="parents-lines">
      <div class="parents-line">
        <span class="name-strong">이성재</span> · <span class="name-strong">전미희</span>의&nbsp;&nbsp;
        장남 <span class="name-strong">이정필</span>
      </div>
      <div class="parents-line">
        <span class="name-strong">장영덕</span> · <span class="name-strong">정수선</span>의&nbsp;&nbsp;
        장녀 <span class="name-strong">장유지</span>
      </div>
    </div>

    <!-- 연락하기 버튼 (1개) -->
    <div class="contact-buttons single">
      <button class="contact-button" type="button" @click="openContactModal">
        연락하기
      </button>
    </div>

    <!-- 연락처 모달 -->
    <div
      v-if="showContactModal"
      class="contact-modal-backdrop"
      @click.self="closeContactModal"
    >
      <div class="contact-modal">
        <div class="contact-modal-header">
          <div class="contact-modal-title">연락하기</div>
          <button
            class="contact-modal-close"
            type="button"
            @click="closeContactModal"
          >
            ×
          </button>
        </div>

        <div class="contact-modal-body">
          <!-- 신랑측 -->
          <div class="contact-group">
            <div class="contact-group-label">신랑측</div>

            <div class="contact-row">
              <div class="contact-name">신랑 이정필</div>
              <div class="contact-actions">
                <a class="contact-action-button" href="tel:01075703708">
                  전화
                </a>
                <a class="contact-action-button" href="sms:01075703708">
                  문자
                </a>
              </div>
            </div>

            <div class="contact-row">
              <div class="contact-name">아버지 이성재</div>
              <div class="contact-actions">
                <a class="contact-action-button" href="tel:01094305565">
                  전화
                </a>
                <a class="contact-action-button" href="sms:01094305565">
                  문자
                </a>
              </div>
            </div>

            <div class="contact-row">
              <div class="contact-name">어머니 전미희</div>
              <div class="contact-actions">
                <a class="contact-action-button" href="tel:01076793708">
                  전화
                </a>
                <a class="contact-action-button" href="sms:01076793708">
                  문자
                </a>
              </div>
            </div>
          </div>

          <!-- 신부측 -->
          <div class="contact-group" style="margin-top: 14px;">
            <div class="contact-group-label">신부측</div>

            <div class="contact-row">
              <div class="contact-name">신부 장유지</div>
              <div class="contact-actions">
                <a class="contact-action-button" href="tel:01065101129">
                  전화
                </a>
                <a class="contact-action-button" href="sms:01065101129">
                  문자
                </a>
              </div>
            </div>

            <div class="contact-row">
              <div class="contact-name">아버지 장영덕</div>
              <div class="contact-actions">
                <a class="contact-action-button" href="tel:01087610255">
                  전화
                </a>
                <a class="contact-action-button" href="sms:01087610255">
                  문자
                </a>
              </div>
            </div>

            <div class="contact-row">
              <div class="contact-name">어머니 정수선</div>
              <div class="contact-actions">
                <a class="contact-action-button" href="tel:01030800156">
                  전화
                </a>
                <a class="contact-action-button" href="sms:01030800156">
                  문자
                </a>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const showContactModal = ref(false)

function openContactModal() {
  showContactModal.value = true
  document.body.classList.add('modal-open')
}

function closeContactModal() {
  showContactModal.value = false
  document.body.classList.remove('modal-open')
}
</script>
