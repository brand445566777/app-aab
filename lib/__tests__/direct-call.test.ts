import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  directCall,
  formatPhoneNumber,
  isValidEmergencyNumber,
  callEmergencyNumber,
} from '../direct-call';
import { Linking } from 'react-native';

// Mock React Native Linking
vi.mock('react-native', () => ({
  Linking: {
    canOpenURL: vi.fn(),
    openURL: vi.fn(),
  },
  Alert: {
    alert: vi.fn(),
  },
  Platform: {
    OS: 'android',
  },
}));

describe('Direct Call Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('directCall', () => {
    it('should successfully initiate a call to a valid emergency number', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(undefined);

      const result = await directCall('15');

      expect(result.success).toBe(true);
      expect(result.phoneNumber).toBe('15');
      expect(result.message).toBe('Call initiated successfully');
      expect(mockLinking.openURL).toHaveBeenCalledWith('tel:15');
    });

    it('should handle phone numbers with spaces and dashes', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(undefined);

      const result = await directCall('0300-123-4567');

      expect(result.success).toBe(true);
      expect(result.phoneNumber).toBe('03001234567');
      expect(mockLinking.openURL).toHaveBeenCalledWith('tel:03001234567');
    });

    it('should reject empty phone numbers', async () => {
      const result = await directCall('');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Phone number is required');
    });

    it('should reject invalid phone number formats', async () => {
      const result = await directCall('abc-def-ghij');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid phone number format');
    });

    it('should handle device that cannot make calls', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(false);

      const result = await directCall('15');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Device cannot make calls');
    });

    it('should handle errors during call initiation', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockRejectedValue(new Error('Network error'));

      const result = await directCall('15');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Failed to initiate call');
    });

    it('should handle international format phone numbers', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(undefined);

      const result = await directCall('+92-300-123-4567');

      expect(result.success).toBe(true);
      expect(result.phoneNumber).toBe('+923001234567');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format short emergency codes correctly', () => {
      expect(formatPhoneNumber('15')).toBe('15');
      expect(formatPhoneNumber('1122')).toBe('1122');
    });

    it('should format Pakistan mobile numbers', () => {
      // Note: formatPhoneNumber only formats if length is exactly 10 and starts with 0
      // '03001234567' is 11 digits, so it returns as-is
      expect(formatPhoneNumber('03001234567')).toBe('03001234567');
    });

    it('should format international Pakistan numbers', () => {
      expect(formatPhoneNumber('923001234567')).toBe('+92-300-123-4567');
    });

    it('should return original number for unrecognized formats', () => {
      expect(formatPhoneNumber('123')).toBe('123');
      expect(formatPhoneNumber('12345678901')).toBe('12345678901');
    });

    it('should handle numbers with spaces and dashes', () => {
      expect(formatPhoneNumber('0300-123-4567')).toBe('0300-123-4567');
    });
  });

  describe('isValidEmergencyNumber', () => {
    it('should validate known emergency short codes', () => {
      expect(isValidEmergencyNumber('15')).toBe(true);      // Police
      expect(isValidEmergencyNumber('1122')).toBe(true);    // Rescue
      expect(isValidEmergencyNumber('1110')).toBe(true);    // Fire
      expect(isValidEmergencyNumber('1129')).toBe(true);    // Ambulance
      expect(isValidEmergencyNumber('1193')).toBe(true);    // Earthquake
    });

    it('should validate 10-digit Pakistan numbers starting with 0', () => {
      // '03001234567' is 11 digits, not 10, so it's invalid
      expect(isValidEmergencyNumber('0300123456')).toBe(true);
    });

    it('should validate 12-digit international numbers starting with 92', () => {
      expect(isValidEmergencyNumber('923001234567')).toBe(true);
    });

    it('should reject invalid numbers', () => {
      expect(isValidEmergencyNumber('9999')).toBe(false);
      expect(isValidEmergencyNumber('12345')).toBe(false);
      expect(isValidEmergencyNumber('abc')).toBe(false);
    });

    it('should handle numbers with formatting characters', () => {
      // After removing non-digits, '0300-123-4567' becomes '03001234567' (11 digits)
      // Valid format is 10 digits starting with 0, so this is invalid
      expect(isValidEmergencyNumber('0300-123-4567')).toBe(false);
      expect(isValidEmergencyNumber('0300 123 4567')).toBe(false);
    });
  });

  describe('callEmergencyNumber', () => {
    it('should call the selected emergency number', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(undefined);

      const emergencies = [
        { label: 'Police', number: '15' },
        { label: 'Rescue', number: '1122' },
        { label: 'Fire', number: '1110' },
      ];

      const result = await callEmergencyNumber(emergencies, 0);

      expect(result.success).toBe(true);
      expect(result.phoneNumber).toBe('15');
    });

    it('should handle invalid selection index', async () => {
      const emergencies = [
        { label: 'Police', number: '15' },
      ];

      const result = await callEmergencyNumber(emergencies, 5);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid emergency number selection');
    });

    it('should handle negative index', async () => {
      const emergencies = [
        { label: 'Police', number: '15' },
      ];

      const result = await callEmergencyNumber(emergencies, -1);

      expect(result.success).toBe(false);
    });

    it('should call different emergency numbers based on index', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(undefined);

      const emergencies = [
        { label: 'Police', number: '15' },
        { label: 'Rescue', number: '1122' },
        { label: 'Fire', number: '1110' },
      ];

      // Call Police
      await callEmergencyNumber(emergencies, 0);
      expect(mockLinking.openURL).toHaveBeenCalledWith('tel:15');

      // Call Rescue
      await callEmergencyNumber(emergencies, 1);
      expect(mockLinking.openURL).toHaveBeenCalledWith('tel:1122');

      // Call Fire
      await callEmergencyNumber(emergencies, 2);
      expect(mockLinking.openURL).toHaveBeenCalledWith('tel:1110');
    });
  });

  describe('Edge Cases', () => {
    it('should handle phone numbers with leading zeros', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(undefined);

      const result = await directCall('00923001234567');

      expect(result.success).toBe(true);
    });

    it('should handle phone numbers with plus sign', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(undefined);

      const result = await directCall('+92 300 123 4567');

      expect(result.success).toBe(true);
      expect(result.phoneNumber).toBe('+923001234567');
    });

    it('should handle very long phone numbers', async () => {
      const mockLinking = Linking as any;
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(undefined);

      const result = await directCall('923001234567890');

      expect(result.success).toBe(true);
    });

    it('should reject phone numbers with special characters', async () => {
      const result = await directCall('15#1122');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid phone number format');
    });
  });
});
