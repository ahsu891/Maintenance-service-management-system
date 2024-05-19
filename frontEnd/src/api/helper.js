const originalDateString = "2023-12-26T06:11:23.000Z";
const originalDate = new Date(originalDateString);

// Formatting options
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",

  timeZone: "UTC",
};

// Formatting the date
// const formattedDate = originalDate.toLocaleDateString("en-US", options);
// const formattedTime = originalDate.toLocaleTimeString("en-US", options);

// // Combining date and time
// const formattedDateTime = `${formattedDate} ${formattedTime}`;

// console.log(formattedDateTime);

export function dateFormating(originalDateString) {
  const originalDate = new Date(originalDateString);

  const formattedDate = originalDate.toLocaleDateString("en-US", options);
  const formattedTime = originalDate.toLocaleTimeString("en-US", options);
  const formattedDateTime = `${formattedDate}`;

  return formattedDateTime;
}
export function formatDateRelativeToToday(inputDateString) {
  const inputDate = new Date(inputDateString);
  const today = new Date();

  // Check if the date is today
  if (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  ) {
    return "today";
  }

  // Check if the date is yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear()
  ) {
    return "yesterday";
  }

  // If it's not today or yesterday, format the date using your preferred format
  const options = { year: "numeric", month: "long", day: "numeric" };
  return inputDate.toLocaleDateString("en-US", options);
}

export function secondsToHMS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours > 0 ? `${hours} ` : "";
  const formattedMinutes = minutes > 0 ? `${minutes} ` : "";
  const formattedSeconds = `${remainingSeconds}s`;

  return `${formattedHours || 0}:${formattedMinutes || 0}`;
}
