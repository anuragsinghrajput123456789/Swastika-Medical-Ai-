
// Common health-related utility functions

// Medical triage severity levels
export type TriageSeverity = "low" | "medium" | "high" | "emergency";

// Medication information structure
export interface MedicationInfo {
  name: string;
  usage: string;
  dosage: string;
  sideEffects: string[];
  warnings: string[];
}

// Emergency symptoms that require immediate attention
export const emergencySymptoms = [
  "chest-pain",
  "shortness-of-breath",
  "severe-bleeding",
  "stroke-symptoms",
  "unconsciousness",
  "severe-head-injury",
  "poisoning",
  "severe-burn",
  "severe-allergic-reaction"
];

// Function to determine triage severity based on symptoms
export const determineTriageSeverity = (symptoms: string[]): TriageSeverity => {
  // Check for emergency symptoms first
  if (symptoms.some(symptom => emergencySymptoms.includes(symptom))) {
    return "emergency";
  }
  
  // For demo purposes, using a simple count-based approach
  // In a real system, this would use more sophisticated rules
  if (symptoms.length > 5) return "high";
  if (symptoms.length > 3) return "medium";
  return "low";
};

// Function to get triage advice
export const getTriageAdvice = (severity: TriageSeverity): string => {
  switch (severity) {
    case "emergency":
      return "Seek immediate medical attention. Call emergency services (911) or go to the nearest emergency room.";
    case "high":
      return "Contact your doctor today or visit an urgent care facility within the next 24 hours.";
    case "medium":
      return "Schedule an appointment with your primary care physician within the next few days.";
    case "low":
      return "Monitor your symptoms. If they persist for more than a week or worsen, schedule a routine appointment with your doctor.";
    default:
      return "If concerned, consult with a healthcare professional.";
  }
};

// Mock medication database for demo purposes
export const medicationsDatabase: Record<string, MedicationInfo> = {
  "acetaminophen": {
    name: "Acetaminophen (Tylenol)",
    usage: "Used to treat pain and reduce fever.",
    dosage: "Adults: 325-650mg every 4-6 hours as needed. Do not exceed 3000mg in 24 hours.",
    sideEffects: ["Nausea", "Stomach pain", "Headache", "Skin rash"],
    warnings: ["May cause liver damage in high doses or with alcohol consumption."]
  },
  "ibuprofen": {
    name: "Ibuprofen (Advil, Motrin)",
    usage: "Anti-inflammatory medication used to reduce pain, inflammation, and fever.",
    dosage: "Adults: 200-400mg every 4-6 hours as needed. Do not exceed 1200mg in 24 hours.",
    sideEffects: ["Stomach upset", "Heartburn", "Dizziness", "Headache"],
    warnings: ["May increase risk of heart attack or stroke with prolonged use.", "Not recommended for pregnant women in the third trimester."]
  },
  "amoxicillin": {
    name: "Amoxicillin",
    usage: "Antibiotic used to treat bacterial infections.",
    dosage: "Adults: 250-500mg every 8 hours or 500-875mg every 12 hours, as prescribed.",
    sideEffects: ["Diarrhea", "Stomach upset", "Rash", "Vomiting"],
    warnings: ["May cause allergic reactions in people with penicillin allergy.", "Complete the full prescribed course even if symptoms improve."]
  },
  "loratadine": {
    name: "Loratadine (Claritin)",
    usage: "Antihistamine used to treat allergy symptoms.",
    dosage: "Adults and children over 12: 10mg once daily.",
    sideEffects: ["Headache", "Drowsiness", "Dry mouth", "Fatigue"],
    warnings: ["May interact with certain medications. Consult your doctor if taking other medications."]
  }
};

// Health education resources
export const healthEducationTopics = [
  "Understanding Blood Pressure",
  "Managing Diabetes",
  "Heart Health Basics",
  "Seasonal Allergies",
  "Nutrition Fundamentals",
  "Exercise Guidelines",
  "Sleep Hygiene",
  "Mental Health Awareness",
  "Preventive Screenings",
  "Vaccination Schedule"
];

// Mock function to get lifestyle & diet tips based on condition
export const getLifestyleAdvice = (condition: string): string[] => {
  const adviceMap: Record<string, string[]> = {
    "Common Cold": [
      "Stay hydrated with water, tea, and clear broths",
      "Rest adequately to help your immune system recover",
      "Use a humidifier to ease congestion",
      "Consider vitamin C-rich foods like citrus fruits and leafy greens"
    ],
    "Flu": [
      "Get plenty of rest to help your body fight the infection",
      "Stay hydrated, especially if you have a fever",
      "Consume easy-to-digest foods like soups and broths",
      "Avoid contact with others to prevent spreading the virus"
    ],
    "COVID-19": [
      "Self-isolate to prevent spreading the virus",
      "Monitor your oxygen levels with a pulse oximeter if possible",
      "Stay well-hydrated and rest as much as possible",
      "Eat nutritious foods to support your immune system"
    ],
    "Hypertension": [
      "Adopt the DASH diet (rich in fruits, vegetables, whole grains, lean proteins)",
      "Reduce sodium intake to less than 1,500mg per day",
      "Engage in regular moderate aerobic exercise (150 minutes/week)",
      "Limit alcohol consumption and avoid smoking"
    ],
    "default": [
      "Maintain a balanced diet rich in fruits, vegetables, and whole grains",
      "Aim for at least 30 minutes of moderate physical activity daily",
      "Stay hydrated by drinking plenty of water throughout the day",
      "Ensure 7-9 hours of quality sleep each night",
      "Manage stress through mindfulness, meditation, or relaxation techniques"
    ]
  };
  
  return adviceMap[condition] || adviceMap.default;
};
