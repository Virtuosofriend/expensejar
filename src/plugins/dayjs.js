import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default dayjs;