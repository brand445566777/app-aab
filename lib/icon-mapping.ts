/**
 * Icon Mapping Utility
 * Maps helpline names and categories to professional Material Design icons
 */

import { Helpline, CategoryType } from "./helplines";

// Icon mapping by category
const categoryIconMap: Record<CategoryType, string> = {
  emergency: "phone-emergency",
  rescue: "local-hospital",
  fire: "fire-truck",
  police: "security",
  security: "verified-user",
  transport: "directions-car",
  health: "medical-services",
  utility: "settings",
  government: "account-balance",
  welfare: "people",
};

// Detailed icon mapping by helpline name (for more specific icons)
const helplineNameIconMap: Record<string, string> = {
  // Police services
  "Police Emergency": "local-police",
  "پولیس ایمرجنسی": "local-police",
  "Police": "local-police",
  "پولیس": "local-police",
  "Motorway Police": "directions-car",
  "موٹروے پولیس": "directions-car",
  "Highway Police": "directions-car",
  "ہائی وے پولیس": "directions-car",
  "Motorway & Highway Police": "directions-car",
  "موٹروے اور ہائی وے پولیس": "directions-car",
  // Rescue services
  "Rescue 1122": "local-hospital",
  "ریسکیو 1122": "local-hospital",
  "Rescue": "local-hospital",
  "ریسکیو": "local-hospital",
  "Emergency Rescue": "local-hospital",
  "ایمرجنسی ریسکیو": "local-hospital",

  // Fire services
  "Fire Brigade": "fire-truck",
  "فائر بریگیڈ": "fire-truck",
  "Fire": "fire-truck",
  "آگ": "fire-truck",

  // Ambulance/Medical services
  "Edhi Ambulance": "local-hospital",
  "ایڈھی ایمبولنس": "local-hospital",
  "Chhipa Ambulance": "local-hospital",
  "چھپہ ایمبولنس": "local-hospital",
  "Ambulance": "local-hospital",
  "ایمبولنس": "local-hospital",
  "Medical": "medical-services",
  "طبی": "medical-services",
  "Hospital": "local-hospital",
  "ہسپتال": "local-hospital",
  "PIMS": "local-hospital",
  "پی آئی ایم ایس": "local-hospital",
  "Polyclinic": "local-hospital",
  "پولی کلینک": "local-hospital",
  "Sehat Sahulat": "local-hospital",
  "صحت سہولت": "local-hospital",
  "Mayo": "local-hospital",
  "میو": "local-hospital",
  "Jinnah": "local-hospital",
  "جناح": "local-hospital",
  "Services": "local-hospital",
  "سروسز": "local-hospital",
  "General": "local-hospital",
  "جنرل": "local-hospital",
  "PIC": "local-hospital",
  "پی آئی سی": "local-hospital",
  "Sir Ganga Ram": "local-hospital",
  "سر گنگا رام": "local-hospital",
  "Fatimid Blood Bank": "bloodtype",
  "فاطمیہ بلڈ بینک": "bloodtype",
  "Tele-Tabeeb": "medical-services",
  "ٹیلی طبیب": "medical-services",
  "Civil Hospital Quetta": "local-hospital",
  "سول ہسپتال کویٹہ": "local-hospital",
  "Health (EPI)": "medical-services",
  "صحت (ای پی آئی)": "medical-services",
  "Sehat Tahafuz": "medical-services",
  "صحت تحفظ": "medical-services",
  "Lady Reading Hospital": "local-hospital",
  "لیڈی ریڈنگ ہسپتال": "local-hospital",
  "Red Crescent (PRCS)": "local-hospital",
  "ریڈ کریسنٹ": "local-hospital",
  "Edhi": "local-hospital",
  "ایڈھی": "local-hospital",
  "Chhipa": "local-hospital",
  "چھپہ": "local-hospital",
  "Blood": "bloodtype",
  "بلڈ": "bloodtype",
  "Bank": "bloodtype",
  "بینک": "bloodtype",
  "Clinic": "local-hospital",
  "کلینک": "local-hospital",
  "Care": "medical-services",
  "کیئر": "medical-services",
  "Health": "medical-services",
  "صحت": "medical-services",
  "Sehat": "medical-services",
  "سیہت": "medical-services",
  "Tahafuz": "medical-services",
  "تحفظ": "medical-services",
  "EPI": "medical-services",
  "ای پی آئی": "medical-services",
  "Crescent": "local-hospital",
  "کریسنٹ": "local-hospital",
  "PRCS": "local-hospital",
  "پی آر سی ایس": "local-hospital",

  // Gas/Utility services
  "Sui Gas": "local-gas-station",
  "سوئی گیس": "local-gas-station",
  "Gas": "local-gas-station",
  "گیس": "local-gas-station",
  "Electricity": "electrical-services",
  "بجلی": "electrical-services",
  "Water": "water",
  "پانی": "water",

  // Government services
  "Passport Office": "assignment",
  "پاسپورٹ آفس": "assignment",
  "NADRA": "badge",
  "نادرا": "badge",
  "Immigration": "flight-takeoff",
  "امیگریشن": "flight-takeoff",

  // Welfare services
  "Zakat": "volunteer-activism",
  "زکات": "volunteer-activism",
  "Welfare": "people",
  "بہبود": "people",
  "Social Services": "people",
  "سماجی خدمات": "people",
  "Army Flood Relief": "volunteer-activism",
  "آرمی سیلاب ریلیف": "volunteer-activism",
  "Human Rights Helpline": "volunteer-activism",
  "انسانی حقوق ہیلپ لائن": "volunteer-activism",
  "Human Trafficking": "security",
  "انسانی سمگلنگ": "security",
  "Anti Corruption": "security",
  "بدعنوانی کے خلاف": "security",
  "National Emergency (PEHEL)": "phone-emergency",
  "ملکی ایمرجنسی (پہل)": "phone-emergency",
  "NCCIA Cyber Crime": "security",
  "سائبر کرائم": "security",
  "Railway Helpline": "directions-train",
  "ریلوے ہیلپ لائن": "directions-train",
  "FIA General": "security",
  "ایف آئی اے جنرل": "security",
  "FIA Alt": "security",
  "ایف آئی اے متبادل": "security",
  "FIA Immigration": "flight-takeoff",
  "ایف آئی اے امیگریشن": "flight-takeoff",

  // Security services
  "Rangers": "security",
  "رینجرز": "security",
  "Army": "security",
  "فوج": "security",
  "Security": "verified-user",
  "سیکیورٹی": "verified-user",
};

/**
 * Get the appropriate icon for a helpline
 * First tries to match by specific helpline name, then falls back to category
 */
export function getHelplineIcon(helpline: Helpline): string {
  // Try to find a specific icon mapping for this helpline name
  const specificIcon = helplineNameIconMap[helpline.name] || helplineNameIconMap[helpline.nameUrdu];
  if (specificIcon) {
    return specificIcon;
  }

  // Fall back to category-based icon
  return categoryIconMap[helpline.category] || "help";
}

/**
 * Get icon for a category
 */
export function getCategoryIcon(category: CategoryType): string {
  return categoryIconMap[category] || "help";
}

/**
 * List of all available Material Design icons for reference
 * These are commonly used emergency/utility icons
 */
export const availableIcons = [
  // Emergency & Rescue
  "phone-emergency",
  "local-hospital",
  "fire-truck",
  "local-police",
  "directions-car",
  "medical-services",
  "emergency",
  "sos",

  // Security & Government
  "security",
  "verified-user",
  "account-balance",
  "badge",
  "assignment",
  "flight-takeoff",

  // Utilities
  "local-gas-station",
  "electrical-services",
  "water",
  "settings",

  // Welfare & Social
  "people",
  "volunteer-activism",
  "favorite",
  "star",

  // General
  "help",
  "info",
  "phone",
  "call",
];
