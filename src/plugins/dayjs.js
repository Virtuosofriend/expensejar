import Vue from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

Object.defineProperties(Vue.prototype, {
    $date: {
        get() {
            return dayjs;
        }
    }
});