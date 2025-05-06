
// Mock diagnosis data
export const mockDiagnosis = {
  "headache+fever+fatigue": {
    possibleConditions: ["Common Cold", "Flu", "COVID-19"],
    recommendations: "Rest, hydrate well, and monitor your symptoms. If fever persists over 101°F for more than 2 days, consult a doctor.",
    urgencyLevel: "medium",
  },
  "headache+fever": {
    possibleConditions: ["Common Cold", "Flu", "Sinus Infection"],
    recommendations: "Rest, stay hydrated, and take over-the-counter pain relievers if needed.",
    urgencyLevel: "low",
  },
  "chest-pain+shortness-of-breath": {
    possibleConditions: ["Anxiety Attack", "Asthma", "Heart Issue"],
    recommendations: "This combination of symptoms requires immediate medical attention. Please consult a healthcare provider right away.",
    urgencyLevel: "high",
  },
  "default": {
    possibleConditions: ["Multiple possibilities"],
    recommendations: "Based on your symptoms, I recommend consulting with a healthcare provider for proper diagnosis.",
    urgencyLevel: "medium",
  }
};

export type DiagnosisType = typeof mockDiagnosis.default;
