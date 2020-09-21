import { TFunction } from "i18next";

function numberToTime(time: number) {
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;
  var ret = "";
  if (hrs > 0) {
    ret += "" + (hrs < 10 ? "0" : "") + hrs + ":";
  }
  ret +=
    "" +
    (mins < 10 ? "0" : "") +
    mins +
    ":" +
    (secs < 10 ? "0" : "") +
    "" +
    secs;
  return ret;
}

function numberToText(views: number, t: any) {
  if (views > 999_999_999) {
    return t("numbers.billionMinify", {
      count: (views / 1_000_000_000).toFixed(1),
    });
  } else if (views > 999_999) {
    return t("numbers.millionMinify", {
      count: (views / 1_000_000).toFixed(1),
    });
  } else if (views > 999) {
    return t("numbers.thousandMinify", { count: (views / 1_000).toFixed(1) });
  } else {
    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

function calculateVideoPostingTime(rawDate: string, t: TFunction) {
  let unix_timestamp = Date.parse(rawDate) / 1000;
  var seconds = Math.floor(
    (new Date().getTime() - new Date(unix_timestamp * 1000).getTime()) / 1000
  );
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return t("time.year", { count: interval });
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return t("time.month", { count: interval });
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return t("time.week", { count: interval });
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return t("time.day", { count: interval });
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return t("time.hour", { count: interval });
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return t("time.minute", { count: interval });
  }
  return t("time.second", { count: Math.floor(seconds) });
}

export { numberToTime, numberToText, calculateVideoPostingTime };
