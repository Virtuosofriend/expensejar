import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css"
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";

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
    icons: {
        defaultSet: "fa",
        aliases,
        sets: {
            fa,
        }
    },
    theme: {
        defaultTheme: "expenseJarTheme",
        themes: {
            expenseJarTheme,
        }
    }
});

export default vuetify;