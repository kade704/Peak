import { formatDistanceToNow, subDays } from "date-fns";
import { ko } from "date-fns/locale";

export function postItemDate(date: string) {
    if (subDays(new Date(), 1) < new Date(date)) {
        return formatDistanceToNow(new Date(date), { locale: ko }) + " 전";
    } else {
        return new Date(date).toLocaleDateString();
    }
}
