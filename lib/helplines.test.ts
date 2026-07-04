import { describe, it, expect } from "vitest";
import {
  getAllHelplines,
  getHelplinesByProvince,
  getHelplinesByCategory,
  searchHelplines,
  allProvinces,
  nationalEmergency,
  federal,
  punjab,
  sindh,
  balochistan,
  kpk,
  gb,
  ajk,
} from "./helplines";

describe("Helplines Database", () => {
  describe("Province Data", () => {
    it("should have all 8 provinces", () => {
      expect(Object.keys(allProvinces)).toHaveLength(8);
      expect(allProvinces).toHaveProperty("national");
      expect(allProvinces).toHaveProperty("federal");
      expect(allProvinces).toHaveProperty("punjab");
      expect(allProvinces).toHaveProperty("sindh");
      expect(allProvinces).toHaveProperty("balochistan");
      expect(allProvinces).toHaveProperty("kpk");
      expect(allProvinces).toHaveProperty("gb");
      expect(allProvinces).toHaveProperty("ajk");
    });

    it("should have national emergency with multiple sections", () => {
      expect(nationalEmergency.name).toBe("National Emergency");
      expect(nationalEmergency.sections.length).toBeGreaterThan(0);
    });

    it("should have federal with multiple sections", () => {
      expect(federal.name).toBe("Federal (Islamabad)");
      expect(federal.sections.length).toBeGreaterThan(0);
    });

    it("should have punjab with multiple sections", () => {
      expect(punjab.name).toBe("Punjab");
      expect(punjab.sections.length).toBeGreaterThan(0);
    });

    it("should have sindh with multiple sections", () => {
      expect(sindh.name).toBe("Sindh");
      expect(sindh.sections.length).toBeGreaterThan(0);
    });
  });

  describe("getAllHelplines", () => {
    it("should return all helplines from all provinces", () => {
      const helplines = getAllHelplines();
      expect(helplines.length).toBeGreaterThan(0);
    });

    it("should have unique IDs for all helplines", () => {
      const helplines = getAllHelplines();
      const ids = helplines.map((h) => h.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have valid phone numbers", () => {
      const helplines = getAllHelplines();
      helplines.forEach((h) => {
        expect(h.number).toBeTruthy();
        expect(h.number.length).toBeGreaterThan(0);
      });
    });

    it("should have valid categories", () => {
      const helplines = getAllHelplines();
      const validCategories = [
        "emergency",
        "rescue",
        "fire",
        "police",
        "security",
        "transport",
        "health",
        "utility",
        "government",
        "welfare",
      ];
      helplines.forEach((h) => {
        expect(validCategories).toContain(h.category);
      });
    });

    it("should have valid colors", () => {
      const helplines = getAllHelplines();
      const validColors = ["red", "blue", "green", "purple", "orange", "white"];
      helplines.forEach((h) => {
        expect(validColors).toContain(h.categoryColor);
      });
    });

    it("should have valid provinces", () => {
      const helplines = getAllHelplines();
      const validProvinces = [
        "national",
        "federal",
        "punjab",
        "sindh",
        "balochistan",
        "kpk",
        "gb",
        "ajk",
      ];
      helplines.forEach((h) => {
        expect(validProvinces).toContain(h.province);
      });
    });

    it("should have English and Urdu names", () => {
      const helplines = getAllHelplines();
      helplines.forEach((h) => {
        expect(h.name).toBeTruthy();
        expect(h.nameUrdu).toBeTruthy();
      });
    });

    it("should have icons for all helplines", () => {
      const helplines = getAllHelplines();
      helplines.forEach((h) => {
        expect(h.icon).toBeTruthy();
      });
    });
  });

  describe("getHelplinesByProvince", () => {
    it("should return helplines for national province", () => {
      const helplines = getHelplinesByProvince("national");
      expect(helplines.length).toBeGreaterThan(0);
      helplines.forEach((h) => {
        expect(h.province).toBe("national");
      });
    });

    it("should return helplines for federal province", () => {
      const helplines = getHelplinesByProvince("federal");
      expect(helplines.length).toBeGreaterThan(0);
      helplines.forEach((h) => {
        expect(h.province).toBe("federal");
      });
    });

    it("should return helplines for punjab province", () => {
      const helplines = getHelplinesByProvince("punjab");
      expect(helplines.length).toBeGreaterThan(0);
      helplines.forEach((h) => {
        expect(h.province).toBe("punjab");
      });
    });

    it("should return empty array for invalid province", () => {
      const helplines = getHelplinesByProvince("invalid" as any);
      expect(helplines).toEqual([]);
    });
  });

  describe("getHelplinesByCategory", () => {
    it("should return police helplines", () => {
      const helplines = getHelplinesByCategory("police");
      expect(helplines.length).toBeGreaterThan(0);
      helplines.forEach((h) => {
        expect(h.category).toBe("police");
      });
    });

    it("should return rescue helplines", () => {
      const helplines = getHelplinesByCategory("rescue");
      expect(helplines.length).toBeGreaterThan(0);
      helplines.forEach((h) => {
        expect(h.category).toBe("rescue");
      });
    });

    it("should return health helplines", () => {
      const helplines = getHelplinesByCategory("health");
      expect(helplines.length).toBeGreaterThan(0);
      helplines.forEach((h) => {
        expect(h.category).toBe("health");
      });
    });

    it("should return utility helplines", () => {
      const helplines = getHelplinesByCategory("utility");
      expect(helplines.length).toBeGreaterThan(0);
      helplines.forEach((h) => {
        expect(h.category).toBe("utility");
      });
    });
  });

  describe("searchHelplines", () => {
    it("should find helplines by name", () => {
      const results = searchHelplines("Police");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((h) => h.name.toLowerCase().includes("police"))).toBe(
        true
      );
    });

    it("should find helplines by number", () => {
      const results = searchHelplines("15");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((h) => h.number.includes("15"))).toBe(true);
    });

    it("should be case insensitive", () => {
      const results1 = searchHelplines("police");
      const results2 = searchHelplines("POLICE");
      expect(results1.length).toBe(results2.length);
    });

    it("should return empty array for no matches", () => {
      const results = searchHelplines("nonexistent12345");
      expect(results).toEqual([]);
    });

    it("should find rescue helpline", () => {
      const results = searchHelplines("1122");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((h) => h.number === "1122")).toBe(true);
    });
  });

  describe("Critical Helplines", () => {
    it("should have Police Emergency (15)", () => {
      const helplines = getAllHelplines();
      const police = helplines.find((h) => h.number === "15");
      expect(police).toBeDefined();
      expect(police?.category).toBe("police");
    });

    it("should have Rescue 1122", () => {
      const helplines = getAllHelplines();
      const rescue = helplines.find((h) => h.number === "1122");
      expect(rescue).toBeDefined();
      expect(rescue?.category).toBe("rescue");
    });

    it("should have Fire Brigade (16)", () => {
      const helplines = getAllHelplines();
      const fire = helplines.find((h) => h.number === "16");
      expect(fire).toBeDefined();
      expect(fire?.category).toBe("fire");
    });

    it("should have National Emergency (911)", () => {
      const helplines = getAllHelplines();
      const emergency = helplines.find((h) => h.number === "911");
      expect(emergency).toBeDefined();
      expect(emergency?.category).toBe("emergency");
    });

    it("should have Edhi Ambulance (115)", () => {
      const helplines = getAllHelplines();
      const edhi = helplines.find((h) => h.number === "115");
      expect(edhi).toBeDefined();
      expect(edhi?.category).toBe("health");
    });
  });

  describe("Category Color Mapping", () => {
    it("should map police to blue", () => {
      const helplines = getHelplinesByCategory("police");
      helplines.forEach((h) => {
        expect(h.categoryColor).toBe("blue");
      });
    });

    it("should map rescue to red", () => {
      const helplines = getHelplinesByCategory("rescue");
      helplines.forEach((h) => {
        expect(h.categoryColor).toBe("red");
      });
    });

    it("should map health to white", () => {
      const helplines = getHelplinesByCategory("health");
      helplines.forEach((h) => {
        expect(h.categoryColor).toBe("white");
      });
    });

    it("should map utility to orange", () => {
      const helplines = getHelplinesByCategory("utility");
      helplines.forEach((h) => {
        expect(h.categoryColor).toBe("orange");
      });
    });

    it("should map welfare to purple", () => {
      const helplines = getHelplinesByCategory("welfare");
      helplines.forEach((h) => {
        expect(h.categoryColor).toBe("purple");
      });
    });
  });

  describe("Data Integrity", () => {
    it("should not have duplicate helpline IDs across provinces", () => {
      const allIds: string[] = [];
      Object.values(allProvinces).forEach((province) => {
        province.sections.forEach((section) => {
          section.helplines.forEach((helpline) => {
            allIds.push(helpline.id);
          });
        });
      });
      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });

    it("should have at least 100 total helplines", () => {
      const helplines = getAllHelplines();
      expect(helplines.length).toBeGreaterThanOrEqual(100);
    });

    it("should have helplines in all provinces", () => {
      Object.entries(allProvinces).forEach(([provinceName, province]) => {
        const helplines = getHelplinesByProvince(provinceName as any);
        expect(helplines.length).toBeGreaterThan(0);
      });
    });
  });
});
