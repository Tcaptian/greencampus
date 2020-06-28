<template>
  <div>
    <home-header></home-header>
    <home-content></home-content>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeContent from './components/Content'
import HomeFooter from './components/footer'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeContent,
    HomeFooter
  }
}
</script>

<style>

</style>