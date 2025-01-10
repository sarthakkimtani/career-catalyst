import { Internship } from "@/lib/definitions";

interface SearchParams {
  title?: string;
  location?: string;
  stipend?: number;
  mode?: string;
  duration?: string;
}

export const filterInternships = (
  internship: Internship,
  params: SearchParams | undefined
): boolean => {
  if (!params) return true;
  const { title, location, stipend, mode, duration } = params;

  if (title && internship.title?.toLowerCase().includes(title.toLowerCase()) === false)
    return false;
  if (location && internship.location?.toLowerCase().includes(location.toLowerCase()) === false)
    return false;
  if (stipend && typeof internship.stipend === "number" && internship.stipend < stipend)
    return false;

  if (mode) {
    const modeArray = mode.split(",");
    if (modeArray.includes("remote") && modeArray.includes("onsite")) {
      // Allow all internships
    } else if (modeArray.includes("remote")) {
      if (internship.location?.toLowerCase() !== "work from home") {
        return false;
      }
    } else if (modeArray.includes("onsite")) {
      if (internship.location?.toLowerCase() === "work from home") {
        return false;
      }
    }
  }

  if (duration) {
    const durationArray = duration.split(",");
    const durationValue = internship.duration;
    const isValidDuration = durationArray.some((range: string) => {
      if (range === "0-3 Months" && durationValue > 0 && durationValue <= 3) return true;
      if (range === "3-6 Months" && durationValue > 3 && durationValue <= 6) return true;
      if (range === "6+ Months" && durationValue > 6) return true;
      return false;
    });
    if (!isValidDuration) return false;
  }
  return true;
};
