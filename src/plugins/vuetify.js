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
        primary:    "#162e47",
        secondary:  "#FABC3C",
        accent:     "#bbb8b8",
        error:      "#E28173",
        success:    "#2ECC71",
        warning:    "#F7CC74",
        background: "#07213b"
    },
}

const vuetify = createVuetify({
    components,
    directives,
    defaults: {
        VBtn: {
            elevation: 0
        }
    },
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