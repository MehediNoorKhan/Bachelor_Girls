import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
} from "date-fns";

export const dateFormate = (value: string) => {
  const dateString = value;
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Define options for toLocaleDateString
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

// utils/dateUtils.ts
export const stringToDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const formatDateTime = (value: string): string => {
  const date = new Date(value);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

// Helper function to convert 24-hour format to 12-hour format with AM/PM
export const formatTimeTo12Hour = (time: string): string => {
  // Remove seconds if present (e.g., "18:50:00" -> "18:50")
  const timeParts = time.split(":");
  const hour = parseInt(timeParts[0]);
  const minute = timeParts[1];

  // Convert to 12-hour format
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const ampm = hour >= 12 ? "PM" : "AM";

  return `${hour12}:${minute} ${ampm}`;
};

export function formatBookingDate(dateStr: string): string {
  const date = new Date(dateStr);
  const weekday = date.toLocaleString("en-US", { weekday: "short" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  return `${weekday} ${month} ${day}`;
}

export function formatFullMonthDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

// Usage:
// formatFullMonthDate("2025-03-10") // "March 10, 2025"

export function formatDateTimeToDisplay(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);

  // Format time part: "10:45 AM"
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const time = date.toLocaleString("en-US", timeOptions);

  return `${time}`;
}

// Usage:
// formatDateTimeToDisplay("2025-10-15 03:05:32")
// Returns: "Wed October 15\n3:05 AM"

export function formatBookingTime(timeStr: string): string {
  // Remove seconds if present (e.g., "16:06:00" -> "16:06")
  const timeParts = timeStr.split(":");
  const hour = parseInt(timeParts[0]);
  const minute = timeParts[1];

  // Convert to 12-hour format
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const ampm = hour >= 12 ? "PM" : "AM";

  return `${hour12}:${minute} ${ampm}`;
}

// Usage:
// formatBookingTime("16:06:00") // "4:06 PM"
// formatBookingTime("08:30:00") // "8:30 AM"

// =============================================
// TIME AGO UTILITIES USING DATE-FNS
// =============================================

/**
 * Standard time ago format for general use
 * @param dateString - ISO date string or any valid date string
 * @returns Human-readable time ago string
 */
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  // Check if date is invalid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const minutesAgo = differenceInMinutes(now, date);
  const hoursAgo = differenceInHours(now, date);
  const daysAgo = differenceInDays(now, date);

  // Just now (less than 1 minute)
  if (minutesAgo < 1) {
    return "Just now";
  }

  // Less than 1 hour ago
  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }

  // Less than 24 hours ago
  if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  }

  // Yesterday
  if (isYesterday(date)) {
    return "Yesterday";
  }

  // Today (but more than 24 hours ago - edge case)
  if (isToday(date)) {
    return "Today";
  }

  // Less than 7 days ago
  if (daysAgo < 7) {
    return `${daysAgo}d ago`;
  }

  // Less than 30 days ago
  if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${weeksAgo}w ago`;
  }

  // More than 30 days ago - show actual date
  return format(date, "MMM d, yyyy");
};

/**
 * Smart time ago format specifically for messaging/chat applications
 * @param dateString - ISO date string or any valid date string
 * @returns Smart format based on recency
 */
export const formatMessageTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const minutesAgo = differenceInMinutes(now, date);

  // Just now (less than 1 minute)
  if (minutesAgo < 1) {
    return "now";
  }

  // Less than 1 hour ago
  if (minutesAgo < 60) {
    return `${minutesAgo}m`;
  }

  // Today - show time
  if (isToday(date)) {
    return format(date, "h:mm a"); // "2:30 PM"
  }

  // Yesterday
  if (isYesterday(date)) {
    return "Yesterday";
  }

  // This week (less than 7 days)
  if (differenceInDays(now, date) < 7) {
    return format(date, "EEE"); // "Mon", "Tue", etc.
  }

  // This year
  if (date.getFullYear() === now.getFullYear()) {
    return format(date, "MMM d"); // "Jan 15"
  }

  // Different year
  return format(date, "MMM d, yyyy"); // "Jan 15, 2023"
};

/**
 * Detailed time ago format using date-fns built-in function
 * @param dateString - ISO date string or any valid date string
 * @returns Detailed human-readable time ago string (e.g., "about 2 hours ago")
 */
export const formatDetailedTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return formatDistanceToNow(date, { addSuffix: true });
};

/**
 * Compact time ago format for space-constrained UIs
 * @param dateString - ISO date string or any valid date string
 * @returns Very compact time ago string
 */
export const formatCompactTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "?";
  }

  const minutesAgo = differenceInMinutes(now, date);
  const hoursAgo = differenceInHours(now, date);
  const daysAgo = differenceInDays(now, date);

  if (minutesAgo < 1) return "now";
  if (minutesAgo < 60) return `${minutesAgo}m`;
  if (hoursAgo < 24) return `${hoursAgo}h`;
  if (daysAgo < 7) return `${daysAgo}d`;
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)}w`;
  if (daysAgo < 365) return `${Math.floor(daysAgo / 30)}mo`;

  return `${Math.floor(daysAgo / 365)}y`;
};

/**
 * Relative time format with exact units and pluralization
 * @param dateString - ISO date string or any valid date string
 * @returns Exact relative time string (e.g., "2 hours ago", "1 minute ago")
 */
export const formatExactTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  return "Just now";
};

// Usage Examples:
/*
const messageTime = "2024-12-21T10:30:00Z";

formatTimeAgo(messageTime);           // "2h ago" or "Yesterday" or "Dec 20, 2024"
formatMessageTimeAgo(messageTime);    // "2:30 PM" or "Yesterday" or "Dec 20"
formatDetailedTimeAgo(messageTime);   // "about 2 hours ago"
formatCompactTimeAgo(messageTime);    // "2h"
formatExactTimeAgo(messageTime);      // "2 hours ago"
*/
