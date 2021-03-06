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
  const momentDate = moment(date);
  if (date.getDate() === now.getDate()) {
    return `Today ${momentDate.format("HH:mm")}`;
  } else if (date.getDate() === now.getDate() - 1) {
    return `Yesterday ${momentDate.format("HH:mm")}`;
  } else if (date.getDate() === now.getDate() + 1) {
    return `Tomorrow ${momentDate.format("HH:mm")}`;
  } else if (momentNow.isoWeek() === momentDate.isoWeek()) {
    return momentDate.format("dddd");
  } else if (momentNow.isoWeek() + 1 === momentDate.isoWeek()) {
    return `Next ${momentDate.format("dddd")}`;
  } else {
    return momentDate.format("MMM Do");
  }
};

export const getDateTextFull = (date: Date) => {
  const now = new Date();
  const momentNow = moment(now);
  const momentDate = moment(date);
  if (date.getDate() === now.getDate()) {
    return `Today ${momentDate.format("HH:mm")}`;
  } else if (date.getDate() === now.getDate() - 1) {
    return `Yesterday ${momentDate.format("HH:mm")}`;
  } else if (date.getDate() === now.getDate() + 1) {
    return `Tomorrow ${momentDate.format("HH:mm")}`;
  } else if (momentNow.isoWeek() === momentDate.isoWeek()) {
    return momentDate.format("dddd HH:mm");
  } else if (momentNow.isoWeek() + 1 === momentDate.isoWeek()) {
    return `Next ${momentDate.format("dddd HH:mm")}`;
  } else {
    return momentDate.format("MMM Do YYYY HH:mm");
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
