import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const expenseJarTheme = {
    dark: false,
    colors: {
        surface:    "#FFFFFF",
        primary:    "#3154AC",
        secondary:  "#CCDAFC",
        accent:     "#f7ac1a",
        error:      "#E28173",
        success:    "#2ECC71",
        warning:    "#F7CC74",
        background: "#F6F9FF"
    }
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "expenseJarTheme",
        themes: {
            expenseJarTheme,
        }
    }
});

export default vuetify;