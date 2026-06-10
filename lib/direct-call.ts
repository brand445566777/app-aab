import { Linking, Platform, Alert } from 'react-native';

/**
 * Direct Call Utility
 * 
 * Uses Intent.ACTION_DIAL to initiate phone calls without requiring
 * FOREGROUND_SERVICE or FOREGROUND_SERVICE_MEDIA_PLAYBACK permissions.
 * 
 * This approach is compliant with Google Play Store policies for emergency
 * helpline apps that only provide dialing functionality.
 * 
 * Permissions required (already in AndroidManifest.xml):
 * - android.permission.CALL_PHONE (for direct calling)
 * - android.permission.INTERNET (for network access)
 * - android.permission.ACCESS_NETWORK_STATE (for network state)
 */

interface CallResult {
  success: boolean;
  message: string;
  phoneNumber?: string;
}

/**
 * Initiates a direct phone call using the device's dialer.
 * 
 * On Android: Uses Intent.ACTION_DIAL via Linking API
 * On iOS: Uses tel: scheme
 * 
 * @param phoneNumber - The phone number to call (e.g., "15" for Police in Pakistan)
 * @returns Promise with call result status
 * 
 * @example
 * const result = await directCall('15');
 * if (result.success) {
 *   console.log('Call initiated:', result.phoneNumber);
 * } else {
 *   Alert.alert('Error', result.message);
 * }
 */
export async function directCall(phoneNumber: string): Promise<CallResult> {
  try {
    // Validate phone number
    if (!phoneNumber || phoneNumber.trim() === '') {
      return {
        success: false,
        message: 'Phone number is required',
      };
    }

    // Sanitize phone number (remove spaces, dashes, parentheses)
    const cleanNumber = phoneNumber.replace(/[\s\-()]/g, '');

    // Validate that it contains only digits and + (for international format)
    if (!/^[\d+]+$/.test(cleanNumber)) {
      return {
        success: false,
        message: 'Invalid phone number format',
      };
    }

    // Create the tel: URI
    const telUri = `tel:${cleanNumber}`;

    // Check if the device can handle tel: URIs
    const canOpenURL = await Linking.canOpenURL(telUri);

    if (!canOpenURL) {
      return {
        success: false,
        message: 'Device cannot make calls. Please ensure phone capability is available.',
      };
    }

    // Attempt to open the dialer
    await Linking.openURL(telUri);

    return {
      success: true,
      message: 'Call initiated successfully',
      phoneNumber: cleanNumber,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Direct call error:', errorMessage);

    return {
      success: false,
      message: `Failed to initiate call: ${errorMessage}`,
    };
  }
}

/**
 * Safe wrapper for direct calling with error handling and user feedback.
 * 
 * @param phoneNumber - The phone number to call
 * @param serviceName - Optional name of the service (e.g., "Police Emergency")
 */
export async function safeDirectCall(
  phoneNumber: string,
  serviceName?: string
): Promise<void> {
  try {
    const result = await directCall(phoneNumber);

    if (!result.success) {
      Alert.alert(
        'Call Failed',
        result.message,
        [{ text: 'OK' }]
      );
    }
  } catch (error) {
    Alert.alert(
      'Error',
      `Unable to initiate call to ${serviceName || 'the service'}. Please try again.`,
      [{ text: 'OK' }]
    );
  }
}

/**
 * Batch call multiple emergency numbers with confirmation.
 * Useful for scenarios where you want to provide multiple options.
 * 
 * @param emergencyNumbers - Array of emergency numbers with labels
 * @param selectedIndex - Index of the selected number to call
 */
export async function callEmergencyNumber(
  emergencyNumbers: { label: string; number: string }[],
  selectedIndex: number
): Promise<CallResult> {
  if (selectedIndex < 0 || selectedIndex >= emergencyNumbers.length) {
    return {
      success: false,
      message: 'Invalid emergency number selection',
    };
  }

  const selected = emergencyNumbers[selectedIndex];
  return directCall(selected.number);
}

/**
 * Format phone number for display purposes.
 * Converts raw number to a user-friendly format.
 * 
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number string
 * 
 * @example
 * formatPhoneNumber('15') => '15'
 * formatPhoneNumber('03001234567') => '0300-123-4567'
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Pakistan format: 0300-123-4567
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  // International format: +92-300-123-4567
  if (cleaned.length === 12 && cleaned.startsWith('92')) {
    return `+${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }

  // Short codes: 15, 1122, etc.
  if (cleaned.length <= 4) {
    return cleaned;
  }

  // Default: return as-is
  return phoneNumber;
}

/**
 * Verify if a phone number is a valid emergency short code for Pakistan.
 * 
 * @param phoneNumber - The phone number to verify
 * @returns true if valid, false otherwise
 */
export function isValidEmergencyNumber(phoneNumber: string): boolean {
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Valid short codes
  const validShortCodes = [
    '15',      // Police
    '1122',    // Rescue
    '1110',    // Fire
    '1129',    // Ambulance
    '1193',    // Earthquake
  ];

  // Valid full numbers (10 digits starting with 0, or 12 digits starting with 92)
  const isValidFullNumber =
    (cleaned.length === 10 && cleaned.startsWith('0')) ||
    (cleaned.length === 12 && cleaned.startsWith('92'));

  return validShortCodes.includes(cleaned) || isValidFullNumber;
}
