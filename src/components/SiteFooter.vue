<template>
  <section class="footer">
    <div class="fade-section" v-intersect>
      <!-- 사진 영역 -->
      <div class="footer-image-wrapper">
        <!-- ✅ 실제 경로에 맞게 src만 바꿔서 사용해 -->
        <img
          src="/img/footer.jpg"
          alt="꾸벅"
          class="footer-image"
        />
      </div>

      <div class="footer-text">
        함께 해주셔서 감사합니다.<br />
        따뜻한 축복 속에서 좋은 추억 만들겠습니다.
      </div>
    </div>

    <div
      class="footer-kakao-share"
      role="button"
      tabindex="0"
      @click="shareKakao"
      @keydown.enter.prevent="shareKakao"
    >
      <div class="footer-kakao-share-inner" >
        <i style="background-image: url(/wedding-invitation/img/icon-kakaotalk.svg);"></i>
        <span>카카오톡으로 공유하기</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const shareKakao = () => {
  if (!window.Kakao) {
    alert('카카오 SDK 로딩에 실패했습니다.')
    return
  }

  // 혹시 초기화 안 되어 있으면 한번 더 안전하게
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('7e1beebb63bdf07979bb3578a4101369') // main.js와 동일 키
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '정필 ♥️ 유지 결혼합니다.',
      description: '2026.02.07(토)\n오전 11시 이룸웨딩컨벤션',
      imageUrl: 'https://github.com/2jeongfeel/wedding-invitation/blob/main/public/img/main.jpg?raw=true', // 예: 배포된 main.jpg 절대경로
      link: {
        mobileWebUrl: 'https://2jeongfeel.github.io/wedding-invitation/',
        webUrl: 'https://2jeongfeel.github.io/wedding-invitation/'
      }
    },
    buttons: [
      {
        title: '모바일 청첩장 보기',
        link: {
          mobileWebUrl: 'https://2jeongfeel.github.io/wedding-invitation/',
          webUrl: 'https://2jeongfeel.github.io/wedding-invitation/'
        }
      }
    ]
  })
}
</script>

