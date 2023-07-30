import { format } from "./format";
import { describe, expect, it } from "vitest";

const minToMS = 1000 * 60,
  hrToMS = minToMS * 60,
  dayToMS = hrToMS * 24,
  weekToMS = dayToMS * 7;

describe("parsing date in day format", () => {
  it("returns a day passed", () => {
    const date = new Date(Date.now() - dayToMS).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("1 day ago");
  });
  it("returns 5 days passed", () => {
    const date = new Date(Date.now() - dayToMS * 5).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("5 days ago");
  });
});
describe("parsing date in hour format", () => {
  it("returns an hour passed", () => {
    const date = new Date(Date.now() - hrToMS).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("1 hour ago");
  });
  it("returns 3 hour passed", () => {
    const date = new Date(Date.now() - hrToMS * 3).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("3 hours ago");
  });
  it("returns 23 hour passed", () => {
    const date = new Date(Date.now() - hrToMS * 23).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("23 hours ago");
  });
});
describe("parsing date in minute format", () => {
  it("returns a minute passed", () => {
    const date = new Date(Date.now() - minToMS).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("1 minute ago");
  });
  it("returns 2 minutes passed", () => {
    const date = new Date(Date.now() - minToMS * 2).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("2 minutes ago");
  });
  it("returns 59 minute passed", () => {
    const date = new Date(Date.now() - minToMS * 59).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("59 minutes ago");
  });
});
describe("parsing date in seconds format", () => {
  it("returns 3 seconds passed", () => {
    const date = new Date(Date.now() - 3000).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("3 seconds ago");
  });
  it("returns 59 seconds passed", () => {
    const date = new Date(Date.now() - 1000 * 59).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("59 seconds ago");
  });
  it("returns 30 seconds passed", () => {
    const date = new Date(Date.now() - 30000).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual("30 seconds ago");
  });
});
describe("parsing date in a full date time format", () => {
  const parseDateTime = (ISOString: string) =>
    Intl.DateTimeFormat("en-ph", {
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(new Date(ISOString));

  it("returns 1 week passed", () => {
    const date = new Date(Date.now() - weekToMS).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual(parseDateTime(date));
  });
  it("returns 1 month passed", () => {
    const date = new Date(Date.now() - dayToMS * 30).toISOString();
    const formatted = format(date);
    expect(formatted).toEqual(parseDateTime(date));
  });
});
