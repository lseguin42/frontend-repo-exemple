import Vue from 'vue'
import App from './App.vue'
import wrap from '@vue/web-component-wrapper';

window.customElements.define('vue-app-1', wrap(Vue, App));
