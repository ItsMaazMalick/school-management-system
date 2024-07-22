export function formatDate(date: string | Date) {
  let year, month, day;

  if (typeof date === "string") {
    [year, month, day] = date.split("-");
  } else {
    year = date.getFullYear();
    month = String(date.getMonth() + 1).padStart(2, "0");
    day = String(date.getDate()).padStart(2, "0");
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = parseInt(month, 10) - 1; // Convert month to 0-based index
  const monthName = months[monthIndex];

  return `${monthName} ${day}, ${year}`;
}
