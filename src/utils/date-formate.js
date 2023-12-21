export default function dateFormat(inputDate, locale = "ru-RU") {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(inputDate).toLocaleDateString(locale, options);
    const time = new Date(inputDate).toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    const cleanedDate = locale === "ru-RU" ? date.replace(/ г\.$/, "") : date;
  
    return { date: cleanedDate, time };
  }