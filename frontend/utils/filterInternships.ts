import { Internship } from "@/lib/definitions";

export const filterInternships = (
  internship: Internship,
  params: { [key: string]: string | string[] | undefined } | undefined
): boolean => {
  return Object.entries(params || {}).every(([key, value]) => {
    if (key in internship) {
      const internshipValue = internship[key as keyof Internship];

      if (key === "stipend") {
        const stipendValue = parseFloat(value as string);
        return typeof internshipValue === "number" && internshipValue >= stipendValue;
      }

      if (typeof internshipValue === "string") {
        return internshipValue.toLowerCase().includes((value as string).toLowerCase());
      }
    }
    return true;
  });
};
