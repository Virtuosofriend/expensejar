const addBaseComponents = app => {
    const components = import.meta.glob("@/components/Base/*.vue",{ eager: true });
    Object.entries(components).forEach(([path, component]) => {
        app.component(component.default.name, component.default || component);
    });
    
};
export default addBaseComponents;