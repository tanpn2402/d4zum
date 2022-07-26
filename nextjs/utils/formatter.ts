const NumberFormatter: Intl.NumberFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
const DateTimeFormatter = new Intl.DateTimeFormat("vi", {
  timeStyle: "short",
  dateStyle: "medium"
});
const TimeFormatter = new Intl.DateTimeFormat("vi", {
  timeStyle: "short"
});

function formatCcy(value: number | bigint) {
  return NumberFormatter.format(value)
}

function formatDateTime(value: string | number | Date) {
  const today = new Date();
  const date = new Date(value);

  if (today.toDateString() === date.toDateString()) {
    return TimeFormatter.format(date) + " Hôm nay";
  }

  return DateTimeFormatter.format(date)
}

export {
  formatCcy,
  formatDateTime
}