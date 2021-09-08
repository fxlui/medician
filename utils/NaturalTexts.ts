import moment from "moment";

export const greetingTextFromTime = () => {
  const now = new Date();
  if (now.getHours() > 21 || now.getHours() < 5) {
    return "Good night! 💤";
  } else if (now.getHours() < 12) {
    return "Good morning! 🌅";
  } else if (now.getHours() < 18) {
    return "Good afternoon! ☀️";
  } else {
    return "Good evening! 🌙";
  }
};

export const getDateText = (date: Date) => {
  const now = new Date();
  const momentNow = moment(now);
  if (date.getDate() === now.getDate()) {
    return `Today ${date.getHours()}:${date.getMinutes()}`;
  } else if (date.getDate() === now.getDate() - 1) {
    return `Yesterday ${date.getHours()}:${date.getMinutes()}`;
  } else if (date.getDate() === now.getDate() + 1) {
    return `Tomorrow ${date.getHours()}:${date.getMinutes()}`;
  } else if (momentNow.isoWeek() === moment(date).isoWeek()) {
    return moment(date).format("dddd");
  } else if (momentNow.isoWeek() + 1 === moment(date).isoWeek()) {
    return `Next ${moment(date).format("dddd")}`;
  } else {
    return moment(date).format("MMM Do");
  }
};

export const getMedicationDoseText = (medicationDose: string) => {
  const split = medicationDose.split(" × ");
  if (split.length === 1) {
    return `${split[0]}`;
  } else if (/\d/.test(split[1])) {
    return medicationDose;
  }
  const firstNum = parseInt(split[0]);
  const ifS = firstNum === 1 ? "" : "s";
  return `${split[0]} ${split[1]}${ifS}`;
};
