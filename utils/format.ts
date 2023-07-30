const minToMS = 1000 * 60,
  hrToMS = minToMS * 60,
  dayToMS = hrToMS * 24,
  weekToMS = dayToMS * 7;
export function format(ISOString: string): string {
  const [dateMS, nowMS] = [Date.parse(ISOString), Date.now()];
  const difference = dateMS - nowMS;
  const rtf = new Intl.RelativeTimeFormat("en", {
    style: "long",
    numeric: "always",
  });
  if (Math.abs(difference) >= weekToMS) {
    return Intl.DateTimeFormat("en-ph", {
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(new Date(ISOString));
  } else if (Math.abs(difference) >= dayToMS) {
    return rtf.format(Math.floor(difference / dayToMS), "days");
  } else if (Math.abs(difference) >= hrToMS) {
    return rtf.format(Math.floor(difference / hrToMS), "hours");
  } else if (Math.abs(difference) >= minToMS) {
    return rtf.format(Math.floor(difference / minToMS), "minutes");
  }
  return rtf.format(Math.floor(difference / 1000), "seconds");
}
