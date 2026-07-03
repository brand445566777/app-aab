import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Platform } from "react-native";

interface UMPContextType {
  isConsentFormAvailable: boolean;
  isConsentFormLoading: boolean;
  userConsent: "UNKNOWN" | "REQUIRED" | "NOT_REQUIRED" | "OBTAINED";
  canRequestAds: boolean;
  showConsentForm: () => Promise<void>;
  resetConsent: () => Promise<void>;
}

const UMPContext = createContext<UMPContextType | undefined>(undefined);

export const useUMP = () => {
  const context = useContext(UMPContext);
  if (!context) {
    throw new Error("useUMP must be used within UMPProvider");
  }
  return context;
};

interface UMPProviderProps {
  children: ReactNode;
}

export function UMPProvider({ children }: UMPProviderProps) {
  const [isConsentFormAvailable, setIsConsentFormAvailable] = useState(false);
  const [isConsentFormLoading, setIsConsentFormLoading] = useState(true);
  const [userConsent, setUserConsent] = useState<
    "UNKNOWN" | "REQUIRED" | "NOT_REQUIRED" | "OBTAINED"
  >("UNKNOWN");
  const [canRequestAds, setCanRequestAds] = useState(false);

  useEffect(() => {
    initializeUMP();
  }, []);

  const initializeUMP = async () => {
    try {
      setIsConsentFormLoading(true);

      if (Platform.OS === "android" || Platform.OS === "ios") {
        const hasConsentBeenObtained = await checkPreviousConsent();

        if (hasConsentBeenObtained) {
          setUserConsent("OBTAINED");
          setCanRequestAds(true);
        } else {
          setIsConsentFormAvailable(true);
          setUserConsent("REQUIRED");
          setCanRequestAds(false);
        }
      } else {
        setUserConsent("NOT_REQUIRED");
        setCanRequestAds(true);
      }
    } catch (error) {
      console.warn("Error initializing UMP:", error);
      setCanRequestAds(true);
    } finally {
      setIsConsentFormLoading(false);
    }
  };

  const checkPreviousConsent = async (): Promise<boolean> => {
    try {
      return false;
    } catch (error) {
      console.warn("Error checking previous consent:", error);
      return false;
    }
  };

  const showConsentForm = async () => {
    try {
      console.log("Showing consent form...");
      setUserConsent("OBTAINED");
      setCanRequestAds(true);
      setIsConsentFormAvailable(false);
    } catch (error) {
      console.error("Error showing consent form:", error);
    }
  };

  const resetConsent = async () => {
    try {
      setUserConsent("REQUIRED");
      setIsConsentFormAvailable(true);
      setCanRequestAds(false);
    } catch (error) {
      console.error("Error resetting consent:", error);
    }
  };

  const value: UMPContextType = {
    isConsentFormAvailable,
    isConsentFormLoading,
    userConsent,
    canRequestAds,
    showConsentForm,
    resetConsent,
  };

  return <UMPContext.Provider value={value}>{children}</UMPContext.Provider>;
}

UMPProvider.displayName = "UMPProvider";
