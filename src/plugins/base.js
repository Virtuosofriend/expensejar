import Vue from "vue";

const requireComponent = require.context(
    '@/components/BaseComponents',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
  );
  
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
   
    const componentName = fileName
      .replace(/\.\w+$/, '')
      .split('./')
      .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
      .join('');
  
    Vue.component(
      componentName,
      componentConfig.default || componentConfig
    )
  });