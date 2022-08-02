const NumberFormatter: Intl.NumberFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

const TimeFormatter = new Intl.DateTimeFormat("vi", {
  timeStyle: "short"
});
const DateFormatter = new Intl.DateTimeFormat("vi", {
  dateStyle: "short"
});

function formatCcy(value: number | bigint) {
  return NumberFormatter.format(value)
}

function formatDateTime(value: string | number | Date, options: { timeFormat?: string, dateFormat?: string } = {
  timeFormat: "HH:mm",
  dateFormat: "DD/MM/yyyy"
}) {
  const today = new Date();
  const date = new Date(value);
  let dateStr = "", timeStr = TimeFormatter.format(date), result = "";

  if (today.toDateString() === date.toDateString()) {
    dateStr = " Hôm nay"
  }
  else {
    dateStr = " " + DateFormatter.format(date)
  }

  if (options?.timeFormat !== "none") {
    result = timeStr
  }
  if (options?.dateFormat !== "none") {
    result += dateStr
  }

  return result
}

export {
  formatCcy,
  formatDateTime
}