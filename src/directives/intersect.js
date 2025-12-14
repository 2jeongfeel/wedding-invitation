// src/directives/intersect.js
export default {
  mounted(el) {
    // 처음에는 숨겨진 상태 (CSS에서 제어)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
        } else {
          el.classList.remove('is-visible')
        }
      },
      {
        threshold: 0.15 // 섹션의 15% 정도 보이면 "보이는 상태"로 판단
      }
    )

    el._intersectionObserver = observer
    observer.observe(el)
  },
  unmounted(el) {
    if (el._intersectionObserver) {
      el._intersectionObserver.disconnect()
    }
  }
}
