---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "FuzzyIDE Documentation"
  text: "A modern, high-performance internal C# editor and terminal for Unity 6."
  image:
    src: images/fuzzy_ide_cover.png
    alt: FuzzyIDE Showcase
  actions:
    - theme: brand
      text: Documentation
      link: /guide/toolbar
---

<style>
/* Logo Boyutu Ayarı (Tüm sayfalarda geçerli olması için bunu ileride .vitepress/theme/style.css içine alabilirsiniz) */
.VPNavBarTitle .logo {
  height: 65px !important; 
  width: auto !important;
  margin-right: 8px;
  margin-left: 0px !important;
}

/* Ana Sayfa Görsel Boyutu ve Pozisyonu */
:root {
  /* VitePress'in kendi değişkenini kullanarak resmin kapsayıcısını güvenli bir şekilde büyütüyoruz */
  --vp-home-hero-image-max-width: 600px; 
}

/* Görsel Efektleri ve Boyutlandırma */
.VPHero .image-src {
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  
  /* Çarpıcı Görsel Efektler */
  filter: drop-shadow(0px 10px 30px rgba(90, 150, 255, 0.4)) !important;
  animation: floating-image 5s ease-in-out infinite;
  border-radius: 12px;
}

@keyframes floating-image {
  0% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, calc(-50% - 15px)); }
  100% { transform: translate(-50%, -50%); }
}
</style>
