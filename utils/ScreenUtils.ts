import uniqueSymptoms from "../assets/uniqueSymptoms.json"

export function getEditDescription(symptom: string, area: string | undefined) {
  const type = uniqueSymptoms.filter(item => item.type === symptom)[0].title
  if(area === "other") {
    return type;
  }
  return `${type} at ${area}`;
}