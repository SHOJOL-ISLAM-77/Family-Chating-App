const convertTimestamp = (timestamp) => {
  const { seconds } = timestamp;
  const date = new Date(seconds * 1000);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(date);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} ${time}`;
};

export default convertTimestamp;
