import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
import calendar from "dayjs/plugin/calendar";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import lvLocale from "dayjs/locale/lv";

export function configureDayJs(): void {
  dayjs.extend(utc);
  dayjs.extend(localeData);
  dayjs.extend(customParseFormat);
  dayjs.extend(calendar);
  dayjs.extend(timezone);
  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  dayjs.locale(lvLocale);
  dayjs.tz.setDefault("Europe/Riga");

}
