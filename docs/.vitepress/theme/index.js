import DefaultTheme from 'vitepress/theme'
import './custom.css'

import ProjectCard from './components/ProjectCard.vue'
import MiniProjectCard from './components/MiniProjectCard.vue'
import LanguageCard from './components/LanguageCard.vue'
import SkillCard from './components/SkillCard.vue'
import BadgeCard from './components/BadgeCard.vue'
import FeatureList from './components/FeatureList.vue'
import ImageSlider from './components/ImageSlider.vue'
import Carrousel from './components/Carrousel.vue'
import ImageGrid from './components/ImageGrid.vue';
import InfoCard from './components/InfoCard.vue';
import TextCard from './components/TextCard.vue';
import * as lucide from 'lucide-vue-next'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProjectCard', ProjectCard)
    app.component('MiniProjectCard', MiniProjectCard)
    app.component('LanguageCard', LanguageCard)
    app.component('SkillCard', SkillCard)
    app.component('BadgeCard', BadgeCard)
    app.component('FeatureList', FeatureList)
    app.component('ImageSlider', ImageSlider)
    app.component('Carrousel', Carrousel)
    app.component('ImageGrid', ImageGrid)
    app.component('InfoCard', InfoCard)
    app.component('TextCard', TextCard)

    Object.entries(lucide).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}