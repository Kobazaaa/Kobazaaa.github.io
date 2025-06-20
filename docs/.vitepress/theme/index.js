import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ProjectCard from './components/ProjectCard.vue'
import LanguageCard from './components/LanguageCard.vue'
import SkillCard from './components/SkillCard.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProjectCard', ProjectCard)
    app.component('LanguageCard', LanguageCard)
    app.component('SkillCard', SkillCard)
}
}