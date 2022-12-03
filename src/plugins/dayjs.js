import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default dayjs;