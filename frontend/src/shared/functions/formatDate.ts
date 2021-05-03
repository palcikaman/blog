import { format } from "date-fns";
import { hu, enGB } from "date-fns/locale";

const locales: { [key: string]: Locale } = { hu, enGB };

export default function formatDate(
  date: number | Date,
  formatStr = "PP",
  locale?: string
) {
  return format(date, formatStr, {
    locale: locales[locale ?? "enGB"],
  });
}
