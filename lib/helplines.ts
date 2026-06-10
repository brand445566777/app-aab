/**
 * Pakistan Emergency & Utility Helpline Database
 * Comprehensive directory of emergency, security, hospital, and government helplines
 */

export type CategoryType = "emergency" | "police" | "rescue" | "fire" | "health" | "utility" | "government" | "security" | "welfare" | "transport";
export type ColorType = "red" | "blue" | "green" | "purple" | "orange" | "white";
export type ProvinceType = "national" | "federal" | "punjab" | "sindh" | "balochistan" | "kpk" | "gb" | "ajk";

export interface Helpline {
  id: string;
  category: CategoryType;
  categoryColor: ColorType;
  name: string;
  nameUrdu: string;
  number: string;
  icon: string;
  province: ProvinceType;
  description?: string;
  isFavorite?: boolean;
}

export interface HelplineSection {
  title: string;
  titleUrdu: string;
  helplines: Helpline[];
}

export interface ProvinceData {
  name: string;
  nameUrdu: string;
  sections: HelplineSection[];
}

// Color mapping for categories
const categoryColorMap: Record<CategoryType, ColorType> = {
  emergency: "red",
  rescue: "red",
  fire: "red",
  police: "blue",
  security: "blue",
  transport: "green",
  health: "white",
  utility: "orange",
  government: "orange",
  welfare: "purple",
};

// Icon mapping for categories
const categoryIconMap: Record<CategoryType, string> = {
  emergency: "phone-emergency",
  rescue: "ambulance",
  fire: "fire",
  police: "shield-alert",
  security: "security",
  transport: "directions-car",
  health: "hospital-box",
  utility: "settings",
  government: "account-balance",
  welfare: "people",
};

// Helper function to create helpline object
function createHelpline(
  id: string,
  category: CategoryType,
  name: string,
  nameUrdu: string,
  number: string,
  province: ProvinceType,
  description?: string
): Helpline {
  return {
    id,
    category,
    categoryColor: categoryColorMap[category],
    name,
    nameUrdu,
    number,
    icon: categoryIconMap[category],
    province,
    description,
    isFavorite: false,
  };
}

// NATIONAL EMERGENCY NUMBERS
export const nationalEmergency: ProvinceData = {
  name: "National Emergency",
  nameUrdu: "ملکی ایمرجنسی",
  sections: [
    {
      title: "Emergency & Rescue",
      titleUrdu: "ایمرجنسی اور ریسکیو",
      helplines: [
        createHelpline("nat-001", "police", "Police Emergency", "پولیس ایمرجنسی", "15", "national"),
        createHelpline("nat-002", "rescue", "Rescue 1122", "ریسکیو 1122", "1122", "national"),
        createHelpline("nat-003", "fire", "Fire Brigade", "فائر بریگیڈ", "16", "national"),
        createHelpline("nat-004", "transport", "Motorway & Highway Police", "موٹروے اور ہائی وے پولیس", "130", "national"),
        createHelpline("nat-005", "health", "Edhi Ambulance", "ایڈھی ایمبولنس", "115", "national"),
        createHelpline("nat-006", "emergency", "National Emergency (PEHEL)", "ملکی ایمرجنسی (پہل)", "911", "national"),
        createHelpline("nat-007", "welfare", "Army Flood Relief", "آرمی سیلاب ریلیف", "1135", "national"),
      ],
    },
    {
      title: "Security & Law Enforcement",
      titleUrdu: "سیکیورٹی اور قانون نافذی",
      helplines: [
        createHelpline("nat-008", "security", "NCCIA Cyber Crime", "سائبر کرائم", "1799", "national"),
        createHelpline("nat-009", "transport", "Railway Helpline", "ریلوے ہیلپ لائن", "117", "national"),
        createHelpline("nat-010", "welfare", "Human Rights Helpline", "انسانی حقوق ہیلپ لائن", "1099", "national"),
        createHelpline("nat-011", "police", "FIA General", "ایف آئی اے جنرل", "1991", "national"),
        createHelpline("nat-012", "police", "FIA Alt", "ایف آئی اے متبادل", "051-111-345-786", "national"),
        createHelpline("nat-013", "police", "FIA Immigration", "ایف آئی اے امیگریشن", "051-9260951", "national"),
        createHelpline("nat-014", "police", "Human Trafficking", "انسانی سمگلنگ", "051-9260363", "national"),
        createHelpline("nat-015", "police", "Anti Corruption", "بدعنوانی کے خلاف", "051-9260850", "national"),
      ],
    },
    {
      title: "Government & Utilities",
      titleUrdu: "حکومتی اور یوٹیلیٹی سروسز",
      helplines: [
        createHelpline("nat-016", "government", "NADRA", "نادرا", "1777", "national"),
        createHelpline("nat-017", "utility", "Sui Gas", "سوئی گیس", "1199", "national"),
        createHelpline("nat-018", "utility", "Electricity Complaint", "بجلی کی شکایت", "118", "national"),
        createHelpline("nat-019", "government", "Passport Office", "پاسپورٹ آفس", "051-111-344-777", "national"),
        createHelpline("nat-020", "government", "FBR", "ایف بی آر", "051-111-772-772", "national"),
        createHelpline("nat-021", "welfare", "PTA Support", "پی ٹی اے سپورٹ", "0800-55055", "national"),
        createHelpline("nat-022", "welfare", "Pakistan Citizen Portal", "پاکستان شہری پورٹل", "051-9000111", "national"),
      ],
    },
  ],
};

// FEDERAL (ISLAMABAD)
export const federal: ProvinceData = {
  name: "Federal (Islamabad)",
  nameUrdu: "وفاقی (اسلام آباد)",
  sections: [
    {
      title: "Emergency & Police",
      titleUrdu: "ایمرجنسی اور پولیس",
      helplines: [
        createHelpline("fed-001", "rescue", "Rescue 1122", "ریسکیو 1122", "1122", "federal"),
        createHelpline("fed-002", "fire", "Fire Brigade", "فائر بریگیڈ", "16", "federal"),
        createHelpline("fed-003", "police", "Police", "پولیس", "15", "federal"),
        createHelpline("fed-004", "police", "Police Emergency Alt", "پولیس ایمرجنسی متبادل", "051-9001581", "federal"),
        createHelpline("fed-005", "transport", "Motorway & Highway Police", "موٹروے اور ہائی وے پولیس", "130", "federal"),
        createHelpline("fed-006", "police", "Police Islamabad", "اسلام آباد پولیس", "051-9100008", "federal"),
        createHelpline("fed-007", "transport", "Traffic Helpline", "ٹریفک ہیلپ لائن", "1915", "federal"),
        createHelpline("fed-008", "transport", "Traffic Helpline Alt", "ٹریفک ہیلپ لائن متبادل", "051-9261992", "federal"),
        createHelpline("fed-009", "security", "Rangers Islamabad", "رینجرز اسلام آباد", "042-33220030", "federal"),
        createHelpline("fed-010", "security", "FC Islamabad", "ایف سی اسلام آباد", "091-9210014", "federal"),
        createHelpline("fed-011", "welfare", "Women Helpline", "خواتین ہیلپ لائن", "1815", "federal"),
        createHelpline("fed-012", "police", "Police Khidmat Markaz", "پولیس خدمت مرکز", "051-9201522", "federal"),
        createHelpline("fed-013", "security", "Safe City Command Center", "سیف سٹی کمانڈ سینٹر", "051-9001561", "federal"),
        createHelpline("fed-014", "transport", "IGP Complaint", "آئی جی پی شکایت", "1715", "federal"),
        createHelpline("fed-015", "welfare", "Wildlife Emergency", "جنگلی حیات ایمرجنسی", "0333-3334551", "federal"),
        createHelpline("fed-016", "welfare", "Wildlife Rescue Emergency", "جنگلی حیات ریسکیو", "0336-5070707", "federal"),
        createHelpline("fed-017", "government", "NDMA Disaster", "ڈی ایم اے آفت", "051-111-157-157", "federal"),
      ],
    },
    {
      title: "Hospitals",
      titleUrdu: "ہسپتالیں",
      helplines: [
        createHelpline("fed-018", "health", "PIMS", "پی آئی ایم ایس", "051-9261170", "federal"),
        createHelpline("fed-019", "health", "Polyclinic", "پولی کلینک", "051-9214965", "federal"),
      ],
    },
    {
      title: "Security Agencies",
      titleUrdu: "سیکیورٹی ایجنسیز",
      helplines: [
        createHelpline("fed-020", "police", "FIA HQ", "ایف آئی اے ہیڈ کوارٹرز", "051-9260093", "federal"),
        createHelpline("fed-021", "police", "FIA Immigration", "ایف آئی اے امیگریشن", "051-9260951", "federal"),
        createHelpline("fed-022", "police", "Human Trafficking", "انسانی سمگلنگ", "051-9260363", "federal"),
        createHelpline("fed-023", "police", "Anti Corruption", "بدعنوانی کے خلاف", "051-9260850", "federal"),
        createHelpline("fed-024", "police", "Anti Narcotics", "منشیات کے خلاف", "1415", "federal"),
        createHelpline("fed-025", "security", "NCCIA Cyber", "سائبر کرائم", "1799", "federal"),
      ],
    },
    {
      title: "Government & Utilities",
      titleUrdu: "حکومتی اور یوٹیلیٹی سروسز",
      helplines: [
        createHelpline("fed-026", "government", "NADRA", "نادرا", "1777", "federal"),
        createHelpline("fed-027", "government", "Passport", "پاسپورٹ", "051-111-344-777", "federal"),
        createHelpline("fed-028", "government", "FBR", "ایف بی آر", "051-111-772-772", "federal"),
        createHelpline("fed-029", "welfare", "PTA", "پی ٹی اے", "0800-55055", "federal"),
        createHelpline("fed-030", "welfare", "Lost Phone Block", "کھوئے ہوئے فون کو بلاک کریں", "0800-25625", "federal"),
        createHelpline("fed-031", "welfare", "Citizen Portal", "شہری پورٹل", "051-9000111", "federal"),
        createHelpline("fed-032", "government", "FPSC", "ایف پی ایس سی", "051-111-000-248", "federal"),
      ],
    },
  ],
};

// PUNJAB
export const punjab: ProvinceData = {
  name: "Punjab",
  nameUrdu: "پنجاب",
  sections: [
    {
      title: "Emergency & Police",
      titleUrdu: "ایمرجنسی اور پولیس",
      helplines: [
        createHelpline("pun-001", "rescue", "Rescue 1122", "ریسکیو 1122", "1122", "punjab"),
        createHelpline("pun-002", "fire", "Fire Brigade", "فائر بریگیڈ", "16", "punjab"),
        createHelpline("pun-003", "police", "Police", "پولیس", "15", "punjab"),
        createHelpline("pun-004", "transport", "Motorway & Highway Police", "موٹروے اور ہائی وے پولیس", "130", "punjab"),
        createHelpline("pun-005", "security", "Punjab Rangers", "پنجاب رینجرز", "042-33220030", "punjab"),
        createHelpline("pun-006", "police", "IGP Complaint", "آئی جی پی شکایت", "1787", "punjab"),
        createHelpline("pun-007", "security", "CTD Punjab", "سی ٹی ڈی پنجاب", "0800-111-11", "punjab"),
        createHelpline("pun-008", "transport", "Punjab Highway Patrol", "پنجاب ہائی وے پیٹرول", "1124", "punjab"),
        createHelpline("pun-009", "transport", "Ring Road", "رنگ روڈ", "1103", "punjab"),
        createHelpline("pun-010", "transport", "Traffic Police", "ٹریفک پولیس", "1915", "punjab"),
        createHelpline("pun-011", "security", "FC Punjab", "ایف سی پنجاب", "091-9210014", "punjab"),
        createHelpline("pun-012", "security", "FC Punjab Alt", "ایف سی پنجاب متبادل", "091-9210016", "punjab"),
        createHelpline("pun-013", "police", "Lahore Police Complaint", "لاہور پولیس شکایت", "8300", "punjab"),
        createHelpline("pun-014", "police", "Lahore Police UAN", "لاہور پولیس یو اے این", "0304-1110911", "punjab"),
        createHelpline("pun-015", "police", "Police Khidmat Markaz", "پولیس خدمت مرکز", "042-99211356", "punjab"),
      ],
    },
    {
      title: "Social Helplines",
      titleUrdu: "سماجی ہیلپ لائنز",
      helplines: [
        createHelpline("pun-016", "welfare", "Women", "خواتین", "1043", "punjab"),
        createHelpline("pun-017", "welfare", "Human Rights", "انسانی حقوق", "1040", "punjab"),
        createHelpline("pun-018", "welfare", "Wildlife", "جنگلی حیات", "0800-11120", "punjab"),
        createHelpline("pun-019", "welfare", "Child Protection", "بچوں کی حفاظت", "1121", "punjab"),
        createHelpline("pun-020", "health", "Sehat Sahulat", "صحت سہولت", "0800-01166", "punjab"),
        createHelpline("pun-021", "welfare", "CM Complaint", "وزیر اعلیٰ شکایت", "0800-0234", "punjab"),
      ],
    },
    {
      title: "Utilities",
      titleUrdu: "یوٹیلیٹی سروسز",
      helplines: [
        createHelpline("pun-022", "utility", "Electricity", "بجلی", "118", "punjab"),
        createHelpline("pun-023", "utility", "Sui Gas", "سوئی گیس", "1199", "punjab"),
        createHelpline("pun-024", "utility", "MEPCO", "میپکو", "061-6513988", "punjab"),
        createHelpline("pun-025", "government", "PDMA Punjab", "پی ڈی ایم اے پنجاب", "042-99204408", "punjab"),
      ],
    },
    {
      title: "Lahore Hospitals",
      titleUrdu: "لاہور ہسپتالیں",
      helplines: [
        createHelpline("pun-026", "health", "Mayo", "میو", "042-99211100", "punjab"),
        createHelpline("pun-027", "health", "Jinnah", "جناح", "042-99231400", "punjab"),
        createHelpline("pun-028", "health", "Services", "سروسز", "042-99203402", "punjab"),
        createHelpline("pun-029", "health", "General", "جنرل", "042-99264091", "punjab"),
        createHelpline("pun-030", "health", "PIC", "پی آئی سی", "042-99203051", "punjab"),
        createHelpline("pun-031", "health", "Sir Ganga Ram", "سر گنگا رام", "042-99200572", "punjab"),
        createHelpline("pun-032", "health", "Fatimid Blood Bank", "فاطمیہ بلڈ بینک", "042-35863950", "punjab"),
      ],
    },
    {
      title: "FIA Regional",
      titleUrdu: "ایف آئی اے ریجیونل",
      helplines: [
        createHelpline("pun-033", "police", "FIA Multan", "ایف آئی اے ملتان", "061-9201189", "punjab"),
        createHelpline("pun-034", "police", "FIA Faisalabad", "ایف آئی اے فیصل آباد", "041-9330865", "punjab"),
        createHelpline("pun-035", "police", "FIA Gujranwala", "ایف آئی اے گجرانوالہ", "055-4299056", "punjab"),
      ],
    },
  ],
};

// SINDH
export const sindh: ProvinceData = {
  name: "Sindh",
  nameUrdu: "سندھ",
  sections: [
    {
      title: "Emergency & Police",
      titleUrdu: "ایمرجنسی اور پولیس",
      helplines: [
        createHelpline("sin-001", "police", "Police Emergency", "پولیس ایمرجنسی", "15", "sindh"),
        createHelpline("sin-002", "rescue", "Rescue", "ریسکیو", "1122", "sindh"),
        createHelpline("sin-003", "fire", "Fire Brigade", "فائر بریگیڈ", "16", "sindh"),
        createHelpline("sin-004", "transport", "Motorway & Highway Police", "موٹروے اور ہائی وے پولیس", "130", "sindh"),
        createHelpline("sin-005", "security", "Sindh Rangers", "سندھ رینجرز", "1101", "sindh"),
        createHelpline("sin-006", "police", "IGP Sindh Complaint", "آئی جی پی سندھ شکایت", "1715", "sindh"),
        createHelpline("sin-007", "police", "CPLC Helpline", "سی پی ایل سی ہیلپ لائن", "1102", "sindh"),
        createHelpline("sin-008", "transport", "Traffic Police Karachi", "کراچی ٹریفک پولیس", "1915", "sindh"),
        createHelpline("sin-009", "welfare", "Women Police Helpline", "خواتین پولیس ہیلپ لائن", "1213", "sindh"),
        createHelpline("sin-010", "welfare", "Child Protection", "بچوں کی حفاظت", "1121", "sindh"),
        createHelpline("sin-011", "security", "CTD Sindh", "سی ٹی ڈی سندھ", "021-99216192", "sindh"),
      ],
    },
    {
      title: "Army & Security (Karachi)",
      titleUrdu: "فوج اور سیکیورٹی (کراچی)",
      helplines: [
        createHelpline("sin-012", "security", "Army Line 1", "فوج لائن 1", "021-34491082", "sindh"),
        createHelpline("sin-013", "security", "Army Line 2", "فوج لائن 2", "021-99247267", "sindh"),
        createHelpline("sin-014", "security", "Army Line 3", "فوج لائن 3", "021-99207795", "sindh"),
      ],
    },
    {
      title: "Ambulance & Health",
      titleUrdu: "ایمبولنس اور صحت",
      helplines: [
        createHelpline("sin-015", "health", "Edhi Ambulance", "ایڈھی ایمبولنس", "115", "sindh"),
        createHelpline("sin-016", "health", "Chhipa Ambulance", "چھپہ ایمبولنس", "1020", "sindh"),
        createHelpline("sin-017", "health", "Tele-Tabeeb", "ٹیلی طبیب", "1123", "sindh"),
      ],
    },
    {
      title: "Utilities & Government",
      titleUrdu: "یوٹیلیٹی اور حکومتی سروسز",
      helplines: [
        createHelpline("sin-018", "utility", "K-Electric", "کے الیکٹرک", "118", "sindh"),
        createHelpline("sin-019", "utility", "SSGC Gas", "ایس ایس جی سی گیس", "1199", "sindh"),
        createHelpline("sin-020", "utility", "Water Board (KWSB)", "واٹر بورڈ", "1334", "sindh"),
        createHelpline("sin-021", "welfare", "Commissioner Control", "کمشنر کنٹرول", "021-99203443", "sindh"),
        createHelpline("sin-022", "government", "PDMA Sindh", "پی ڈی ایم اے سندھ", "1736", "sindh"),
        createHelpline("sin-023", "police", "FIA Sindh", "ایف آئی اے سندھ", "021-99203081", "sindh"),
        createHelpline("sin-024", "welfare", "Wildlife Helpline", "جنگلی حیات ہیلپ لائن", "021-99203161", "sindh"),
      ],
    },
  ],
};

// BALOCHISTAN
export const balochistan: ProvinceData = {
  name: "Balochistan",
  nameUrdu: "بلوچستان",
  sections: [
    {
      title: "Emergency & Police",
      titleUrdu: "ایمرجنسی اور پولیس",
      helplines: [
        createHelpline("bal-001", "police", "Police", "پولیس", "15", "balochistan"),
        createHelpline("bal-002", "rescue", "Rescue", "ریسکیو", "1122", "balochistan"),
        createHelpline("bal-003", "fire", "Fire Brigade", "فائر بریگیڈ", "16", "balochistan"),
        createHelpline("bal-004", "transport", "Motorway & Highway Police", "موٹروے اور ہائی وے پولیس", "130", "balochistan"),
        createHelpline("bal-005", "emergency", "Civil Defence", "سول ڈیفنس", "1122", "balochistan"),
        createHelpline("bal-006", "transport", "IGP Complaint", "آئی جی پی شکایت", "1715", "balochistan"),
        createHelpline("bal-007", "transport", "Traffic Police Quetta", "کویٹہ ٹریفک پولیس", "081-9213316", "balochistan"),
        createHelpline("bal-008", "transport", "Balochistan Highway Police", "بلوچستان ہائی وے پولیس", "081-9201849", "balochistan"),
      ],
    },
    {
      title: "Security Agencies",
      titleUrdu: "سیکیورٹی ایجنسیز",
      helplines: [
        createHelpline("bal-009", "security", "Levies Force HQ", "لیویز فورس ہیڈ کوارٹرز", "081-9202400", "balochistan"),
        createHelpline("bal-010", "security", "FC Balochistan (Quetta)", "ایف سی بلوچستان", "081-9201262", "balochistan"),
        createHelpline("bal-011", "security", "FC South", "ایف سی جنوب", "0309-5049065", "balochistan"),
        createHelpline("bal-012", "security", "CTD Balochistan", "سی ٹی ڈی بلوچستان", "081-9203644", "balochistan"),
        createHelpline("bal-013", "police", "Terrorism Reporting", "دہشت گردی کی رپورٹنگ", "1135", "balochistan"),
        createHelpline("bal-014", "police", "NACTA", "ناکتا", "1717", "balochistan"),
        createHelpline("bal-015", "police", "NACTA Alt", "ناکتا متبادل", "1719", "balochistan"),
      ],
    },
    {
      title: "Services & Support",
      titleUrdu: "سروسز اور معاونت",
      helplines: [
        createHelpline("bal-016", "health", "Civil Hospital Quetta", "سول ہسپتال کویٹہ", "081-9202017", "balochistan"),
        createHelpline("bal-017", "rescue", "Edhi Quetta", "ایڈھی کویٹہ", "081-2830861", "balochistan"),
        createHelpline("bal-018", "government", "PDMA Balochistan", "پی ڈی ایم اے بلوچستان", "1129", "balochistan"),
        createHelpline("bal-019", "utility", "QUESCO Electricity", "کویسکو بجلی", "118", "balochistan"),
        createHelpline("bal-020", "police", "FIA Balochistan", "ایف آئی اے بلوچستان", "081-9202774", "balochistan"),
        createHelpline("bal-021", "welfare", "Women Protection", "خواتین کی حفاظت", "1099", "balochistan"),
        createHelpline("bal-022", "welfare", "Women Helpline", "خواتین ہیلپ لائن", "1213", "balochistan"),
        createHelpline("bal-023", "welfare", "Minister Health Complaint", "وزیر صحت شکایت", "081-9211592", "balochistan"),
        createHelpline("bal-024", "welfare", "Wildlife Helpline", "جنگلی حیات ہیلپ لائن", "081-9201194", "balochistan"),
      ],
    },
  ],
};

// KHYBER PAKHTUNKHWA (KPK)
export const kpk: ProvinceData = {
  name: "Khyber Pakhtunkhwa",
  nameUrdu: "خیبر پختونخوا",
  sections: [
    {
      title: "Emergency",
      titleUrdu: "ایمرجنسی",
      helplines: [
        createHelpline("kpk-001", "rescue", "Rescue", "ریسکیو", "1122", "kpk"),
        createHelpline("kpk-002", "police", "Police", "پولیس", "15", "kpk"),
        createHelpline("kpk-003", "fire", "Fire Brigade", "فائر بریگیڈ", "16", "kpk"),
        createHelpline("kpk-004", "transport", "Motorway & Highway Police", "موٹروے اور ہائی وے پولیس", "130", "kpk"),
        createHelpline("kpk-005", "police", "IG KPK", "آئی جی کے پی کے", "0800-00400", "kpk"),
        createHelpline("kpk-006", "transport", "Traffic Police", "ٹریفک پولیس", "1915", "kpk"),
        createHelpline("kpk-007", "welfare", "Tourist Helpline", "سیاح ہیلپ لائن", "1422", "kpk"),
      ],
    },
    {
      title: "Security",
      titleUrdu: "سیکیورٹی",
      helplines: [
        createHelpline("kpk-008", "security", "DIG CTD (Peshawar)", "ڈی آئی جی سی ٹی ڈی", "091-9212524", "kpk"),
        createHelpline("kpk-009", "security", "DIG Counter Terrorism", "ڈی آئی جی دہشت گردی مخالف", "091-9217527", "kpk"),
        createHelpline("kpk-010", "security", "CTD Monitoring Cell", "سی ٹی ڈی نگرانی سیل", "091-9216999", "kpk"),
        createHelpline("kpk-011", "welfare", "Tourism Police", "سیاحت پولیس", "1422", "kpk"),
        createHelpline("kpk-012", "welfare", "Women's Helpline", "خواتین ہیلپ لائن", "0800-22227", "kpk"),
        createHelpline("kpk-013", "welfare", "CM Complaint Cell", "وزیر اعلیٰ شکایت سیل", "1800", "kpk"),
        createHelpline("kpk-014", "welfare", "CM Complaint Cell Alt", "وزیر اعلیٰ شکایت سیل متبادل", "091-9222460", "kpk"),
        createHelpline("kpk-015", "health", "Health (EPI)", "صحت (ای پی آئی)", "1166", "kpk"),
        createHelpline("kpk-016", "security", "FC KPK", "ایف سی کے پی کے", "091-9210014", "kpk"),
        createHelpline("kpk-017", "security", "FC KPK Alt", "ایف سی کے پی کے متبادل", "091-9210015", "kpk"),
        createHelpline("kpk-018", "security", "FC KPK North", "ایف سی کے پی کے شمال", "033-11-110-885", "kpk"),
        createHelpline("kpk-019", "police", "Elite Force HQ", "ایلیٹ فورس ہیڈ کوارٹرز", "091-9223508", "kpk"),
        createHelpline("kpk-020", "police", "Special Branch", "خصوصی شاخ", "091-9218173", "kpk"),
        createHelpline("kpk-021", "welfare", "Terror Complaint Cell", "دہشت گردی شکایت سیل", "0800-57784", "kpk"),
        createHelpline("kpk-022", "police", "Counter Terrorism", "دہشت گردی مخالف", "1719", "kpk"),
        createHelpline("kpk-023", "police", "ASB Directorate", "ایس بی ڈائریکٹوریٹ", "091-9212802", "kpk"),
        createHelpline("kpk-024", "police", "Police Control Peshawar", "پیشاور پولیس کنٹرول", "091-9210000", "kpk"),
      ],
    },
    {
      title: "Health & Utilities",
      titleUrdu: "صحت اور یوٹیلیٹی",
      helplines: [
        createHelpline("kpk-025", "health", "Sehat Tahafuz", "صحت تحفظ", "1166", "kpk"),
        createHelpline("kpk-026", "health", "Lady Reading Hospital", "لیڈی ریڈنگ ہسپتال", "091-9211430", "kpk"),
        createHelpline("kpk-027", "welfare", "Child Protection", "بچوں کی حفاظت", "1121", "kpk"),
        createHelpline("kpk-028", "welfare", "Wildlife Helpline", "جنگلی حیات ہیلپ لائن", "091-9211511", "kpk"),
        createHelpline("kpk-029", "utility", "PESCO Electricity", "پیسکو بجلی", "118", "kpk"),
        createHelpline("kpk-030", "utility", "SNGPL Gas", "ایس این جی پی ایل گیس", "1199", "kpk"),
        createHelpline("kpk-031", "government", "PDMA KPK", "پی ڈی ایم اے کے پی کے", "1700", "kpk"),
        createHelpline("kpk-032", "police", "FIA KPK", "ایف آئی اے کے پی کے", "091-9217801", "kpk"),
      ],
    },
  ],
};

// GILGIT BALTISTAN (GB)
export const gb: ProvinceData = {
  name: "Gilgit Baltistan",
  nameUrdu: "گلگت بلتستان",
  sections: [
    {
      title: "Emergency",
      titleUrdu: "ایمرجنسی",
      helplines: [
        createHelpline("gb-001", "rescue", "Rescue", "ریسکیو", "1122", "gb"),
        createHelpline("gb-002", "fire", "Fire Brigade", "فائر بریگیڈ", "16", "gb"),
        createHelpline("gb-003", "police", "Police", "پولیس", "15", "gb"),
        createHelpline("gb-004", "transport", "Motorway & Highway Police", "موٹروے اور ہائی وے پولیس", "130", "gb"),
        createHelpline("gb-005", "welfare", "Tourist Helpline", "سیاح ہیلپ لائن", "1422", "gb"),
        createHelpline("gb-006", "transport", "GB Traffic Tourist", "جی بی ٹریفک سیاح", "05811-930055", "gb"),
      ],
    },
    {
      title: "Security",
      titleUrdu: "سیکیورٹی",
      helplines: [
        createHelpline("gb-007", "police", "GB IG Office", "جی بی آئی جی آفس", "05811-930230", "gb"),
        createHelpline("gb-008", "security", "FC Gilgit Office", "ایف سی گلگت آفس", "091-9210016", "gb"),
        createHelpline("gb-009", "welfare", "Army Flood Relief", "فوج سیلاب ریلیف", "1135", "gb"),
        createHelpline("gb-010", "emergency", "National Emergency", "ملکی ایمرجنسی", "911", "gb"),
        createHelpline("gb-011", "police", "FC GB North", "ایف سی جی بی شمال", "1029", "gb"),
        createHelpline("gb-012", "security", "CTD GB", "سی ٹی ڈی جی بی", "05811-930017", "gb"),
        createHelpline("gb-013", "police", "Special Branch GB", "خصوصی شاخ جی بی", "05811-920330", "gb"),
        createHelpline("gb-014", "police", "DIG Police HQ", "ڈی آئی جی پولیس ہیڈ کوارٹرز", "05811-930328", "gb"),
        createHelpline("gb-015", "police", "DIG Police Alt", "ڈی آئی جی پولیس متبادل", "05811-930409", "gb"),
        createHelpline("gb-016", "security", "FC Gilgit Office", "ایف سی گلگت آفس", "091-9210014", "gb"),
        createHelpline("gb-017", "police", "GB Violence Reporting", "جی بی تشدد رپورٹنگ", "1064", "gb"),
        createHelpline("gb-018", "police", "Central Police Office (CPO)", "مرکزی پولیس آفس", "05811-930345", "gb"),
        createHelpline("gb-019", "police", "FIA GB", "ایف آئی اے جی بی", "05811-960707", "gb"),
      ],
    },
    {
      title: "Disaster & Utilities",
      titleUrdu: "آفت اور یوٹیلیٹی",
      helplines: [
        createHelpline("gb-020", "government", "GBDMA Disaster", "جی بی ڈی ایم اے آفت", "05811-920874", "gb"),
        createHelpline("gb-021", "health", "Red Crescent (PRCS)", "ریڈ کریسنٹ", "1030", "gb"),
        createHelpline("gb-022", "utility", "Electricity WPDGB & Power Theft", "بجلی اور چوری", "05811-922158", "gb"),
        createHelpline("gb-023", "utility", "Unified Electricity", "متحدہ بجلی", "118", "gb"),
        createHelpline("gb-024", "welfare", "Child Protection", "بچوں کی حفاظت", "1121", "gb"),
        createHelpline("gb-025", "welfare", "Human Rights", "انسانی حقوق", "1099", "gb"),
        createHelpline("gb-026", "welfare", "Wildlife Helpline", "جنگلی حیات ہیلپ لائن", "05811-920271", "gb"),
      ],
    },
  ],
};

// AZAD JAMMU & KASHMIR (AJK)
export const ajk: ProvinceData = {
  name: "Azad Kashmir",
  nameUrdu: "آزاد کشمیر",
  sections: [
    {
      title: "Emergency",
      titleUrdu: "ایمرجنسی",
      helplines: [
        createHelpline("ajk-001", "police", "Police", "پولیس", "15", "ajk"),
        createHelpline("ajk-002", "rescue", "Rescue", "ریسکیو", "1122", "ajk"),
        createHelpline("ajk-003", "fire", "Fire Brigade", "فائر بریگیڈ", "16", "ajk"),
        createHelpline("ajk-004", "transport", "Motorway & Highway Police", "موٹروے اور ہائی وے پولیس", "130", "ajk"),
        createHelpline("ajk-005", "welfare", "Tourist Helpline", "سیاح ہیلپ لائن", "1422", "ajk"),
        createHelpline("ajk-006", "police", "AJK IG Helpline", "آزاد کشمیر آئی جی ہیلپ لائن", "9121", "ajk"),
        createHelpline("ajk-007", "police", "AJK IG Alt", "آزاد کشمیر آئی جی متبادل", "05822-930810", "ajk"),
      ],
    },
    {
      title: "Security",
      titleUrdu: "سیکیورٹی",
      helplines: [
        createHelpline("ajk-008", "police", "DIGP Rangers", "ڈی آئی جی پی رینجرز", "05822-930004", "ajk"),
        createHelpline("ajk-009", "police", "Police Control Muzaffarabad", "مظفر آباد پولیس کنٹرول", "05822-930418", "ajk"),
        createHelpline("ajk-010", "security", "Army Welfare AJK", "فوج بہبود آزاد کشمیر", "05822-920034", "ajk"),
        createHelpline("ajk-011", "police", "NACTA", "ناکتا", "1717", "ajk"),
        createHelpline("ajk-012", "police", "NACTA Alt", "ناکتا متبادل", "1719", "ajk"),
        createHelpline("ajk-013", "police", "CPO Muzaffarabad", "سی پی او مظفر آباد", "05822-930812", "ajk"),
        createHelpline("ajk-014", "police", "DIGP Special Branch", "ڈی آئی جی پی خصوصی شاخ", "05822-930424", "ajk"),
      ],
    },
    {
      title: "Disaster & Utilities",
      titleUrdu: "آفت اور یوٹیلیٹی",
      helplines: [
        createHelpline("ajk-015", "government", "SDMA", "ایس ڈی ایم اے", "05822-921643", "ajk"),
        createHelpline("ajk-016", "government", "SDMA Alt", "ایس ڈی ایم اے متبادل", "05822-921536", "ajk"),
        createHelpline("ajk-017", "utility", "Electricity", "بجلی", "118", "ajk"),
        createHelpline("ajk-018", "utility", "Sui Gas", "سوئی گیس", "1199", "ajk"),
        createHelpline("ajk-019", "welfare", "Wildlife", "جنگلی حیات", "05822-920120", "ajk"),
        createHelpline("ajk-020", "welfare", "Child Protection", "بچوں کی حفاظت", "1121", "ajk"),
        createHelpline("ajk-021", "welfare", "Human Rights", "انسانی حقوق", "1099", "ajk"),
      ],
    },
  ],
};

// Export all provinces
export const allProvinces: Record<ProvinceType, ProvinceData> = {
  national: nationalEmergency,
  federal: federal,
  punjab: punjab,
  sindh: sindh,
  balochistan: balochistan,
  kpk: kpk,
  gb: gb,
  ajk: ajk,
};

// Get all helplines from all provinces
export function getAllHelplines(): Helpline[] {
  const helplines: Helpline[] = [];
  Object.values(allProvinces).forEach((province) => {
    province.sections.forEach((section) => {
      helplines.push(...section.helplines);
    });
  });
  return helplines;
}

// Get helplines by province
export function getHelplinesByProvince(province: ProvinceType): Helpline[] {
  const provinceData = allProvinces[province];
  if (!provinceData) return [];
  const helplines: Helpline[] = [];
  provinceData.sections.forEach((section) => {
    helplines.push(...section.helplines);
  });
  return helplines;
}

// Get helplines by category
export function getHelplinesByCategory(category: CategoryType): Helpline[] {
  return getAllHelplines().filter((h) => h.category === category);
}

// Search helplines
export function searchHelplines(query: string): Helpline[] {
  const lowerQuery = query.toLowerCase();
  return getAllHelplines().filter(
    (h) =>
      h.name.toLowerCase().includes(lowerQuery) ||
      h.nameUrdu.includes(query) ||
      h.number.includes(query)
  );
}
