// @/lib/utils/phone.utils.ts

import { parsePhoneNumber } from "react-phone-number-input";

/**
 * Décompose une valeur E.164 (ex: "+22890123456")
 * en { countryCode: "+228", phone: "90123456" }.
 * Retourne null si la valeur est vide ou invalide.
 */
export function splitE164(e164: string | null | undefined): {
  countryCode: string | null;
  phone: string | null;
} {
  if (!e164) return { countryCode: null, phone: null };

  try {
    const parsed = parsePhoneNumber(e164);
    if (!parsed) return { countryCode: null, phone: null };

    const countryCode = `+${parsed.countryCallingCode}`;
    const phone       = parsed.nationalNumber;
    return { countryCode, phone };
  } catch {
    return { countryCode: null, phone: null };
  }
}