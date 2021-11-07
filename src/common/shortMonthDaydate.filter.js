import * as dayjs from "dayjs";

export default value => {
    if ( !value ) {
        return ""
    }
    return dayjs(value).format("DD MMM");
};