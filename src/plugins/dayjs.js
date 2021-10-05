import Vue from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.extend(utc);

Object.defineProperties(Vue.prototype, {
    $date: {
        get() {
            return dayjs;
        }
    }
});