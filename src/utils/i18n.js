// 翻译router.meta。标题，用于面包屑侧边栏tagsview
export function generateTitle(title) {
    const hasKey = this.$te('route.' + title)
  
    if (hasKey) {
      // $t :this method from vue-i18n, inject in @/lang/index.js
      const translatedTitle = this.$t('route.' + title)
      console.log(translatedTitle)
      return translatedTitle
    }
    return title
  }
  