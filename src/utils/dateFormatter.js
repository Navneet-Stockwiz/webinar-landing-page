import dayjs from 'dayjs';

/**
 * Formats a date string to the desired UI format
 * Input: "Jul 16, 2024 12:25 PM" or ISO date string
 * Output: "Sunday 05th Mar, 8:00 PM" (consistent format for both mobile and desktop)
 */
export const formatWebinarDateTime = (dateTimeString) => {
  if (!dateTimeString) {
    return 'Date & Time TBA';
  }

  try {
    // Parse the date string using dayjs
    const date = dayjs(dateTimeString);
    
    if (!date.isValid()) {
      console.warn('Invalid date string:', dateTimeString);
      return 'Invalid Date';
    }

    // Format: "Sunday 05th Mar, 8:00 PM"
    const dayName = date.format('dddd');
    const dayWithSuffix = addOrdinalSuffix(date.date());
    const month = date.format('MMM');
    const time = date.format('h:mm A');
    
    return `${dayName} ${dayWithSuffix} ${month}, ${time}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date Format Error';
  }
};

/**
 * Adds ordinal suffix to day number with zero padding (01st, 02nd, 03rd, 05th, etc.)
 */
const addOrdinalSuffix = (day) => {
  // Add zero padding for single digits
  const paddedDay = day.toString().padStart(2, '0');
  
  if (day >= 11 && day <= 13) {
    return paddedDay + 'th';
  }
  
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return paddedDay + 'st';
    case 2:
      return paddedDay + 'nd';
    case 3:
      return paddedDay + 'rd';
    default:
      return paddedDay + 'th';
  }
};

/**
 * Formats a date string for desktop with full month name
 * Input: "Jul 16, 2024 12:25 PM" or ISO date string
 * Output: "Sunday 14th September, 5:00 PM" (full month name for desktop)
 */
export const formatWebinarDateTimeDesktop = (dateTimeString) => {
  if (!dateTimeString) {
    return 'Date & Time TBA';
  }

  try {
    // Parse the date string using dayjs
    const date = dayjs(dateTimeString);
    
    if (!date.isValid()) {
      console.warn('Invalid date string:', dateTimeString);
      return 'Invalid Date';
    }

    // Format: "Sunday 14th September, 5:00 PM" (full month name)
    const dayName = date.format('dddd');
    const dayWithSuffix = addOrdinalSuffix(date.date());
    const month = date.format('MMMM'); // Full month name
    const time = date.format('h:mm A');
    
    return `${dayName} ${dayWithSuffix} ${month}, ${time}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date Format Error';
  }
};

/**
 * Short batch label for hero: "Mon, 20 Apr • 8:00 PM IST"
 */
export const formatWebinarBatchDate = (dateTimeString) => {
  if (!dateTimeString) {
    return null;
  }

  try {
    const date = dayjs(dateTimeString);
    if (!date.isValid()) {
      return null;
    }
    return `${date.format("ddd, DD MMM")} • ${date.format("h:mm A")} IST`;
  } catch {
    return null;
  }
};

/**
 * Gets the formatted dates for both English and Hindi webinars
 * Returns an object with consistent formatting
 */
export const getFormattedWebinarDates = (webinarData, isPaid = false) => {
  const d = webinarData?.data;
  const englishDate = isPaid
    ? d?.strykex_english_date_time
    : d?.strykex_free_english_date_time;
  const hindiDate = isPaid
    ? d?.strykex_hindi_date_time
    : d?.strykex_free_hindi_date_time;

  return {
    english: formatWebinarDateTime(englishDate),
    hindi: formatWebinarDateTime(hindiDate),
  };
};

/**
 * Gets the formatted dates for desktop version with full month names
 */
export const getFormattedWebinarDatesDesktop = (webinarData, isPaid = false) => {
  const d = webinarData?.data;
  const englishDate = isPaid
    ? d?.strykex_english_date_time
    : d?.strykex_free_english_date_time;
  const hindiDate = isPaid
    ? d?.strykex_hindi_date_time
    : d?.strykex_free_hindi_date_time;

  return {
    english: formatWebinarDateTimeDesktop(englishDate),
    hindi: formatWebinarDateTimeDesktop(hindiDate),
  };
};
