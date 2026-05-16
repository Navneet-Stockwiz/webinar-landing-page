import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import api from "../../api/axios";
import { useLocation } from "react-router-dom";

const DateRangeEditDialog = ({ open, onClose, currentDateRange, onSave }) => {
  const location = useLocation();
  const selectedStrategy = location.state?.strategy;

  // Local date states
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [dateRangeLoaded, setDateRangeLoaded] = useState(false);

  // API date range constraints
  const [apiMinDate, setApiMinDate] = useState(null);
  const [apiMaxDate, setApiMaxDate] = useState(null);

  // 🚀 NEW: Get today's date to prevent future date selection
  const today = dayjs().startOf('day');

  // Helper functions to replace dayjs.min and dayjs.max
  const getMinDate = (date1, date2) => {
    if (!date1) return date2;
    if (!date2) return date1;
    return date1.isBefore(date2) ? date1 : date2;
  };

  const getMaxDate = (date1, date2) => {
    if (!date1) return date2;
    if (!date2) return date1;
    return date1.isAfter(date2) ? date1 : date2;
  };

  // Helper functions for date comparisons (replacing isSameOrBefore/isSameOrAfter)
  const isSameOrBefore = (date1, date2) => {
    return date1.isSame(date2) || date1.isBefore(date2);
  };

  const isSameOrAfter = (date1, date2) => {
    return date1.isSame(date2) || date1.isAfter(date2);
  };

  // 🚀 FIXED: Calculate effective max date with STRICT boundary enforcement
  const getEffectiveMaxDate = (apiMax) => {
    if (!apiMax) return today;
    
    // NEVER go beyond API max date OR today - use the earliest of both
    const strictMaxDate = getMinDate(apiMax, today);
    
    console.log("🔒 Strict boundary check:", {
      apiMax: apiMax.format("DD/MM/YYYY"),
      today: today.format("DD/MM/YYYY"),
      effectiveMax: strictMaxDate.format("DD/MM/YYYY")
    });
    
    return strictMaxDate;
  };

  // 🚀 NEW: Disable dates outside API range AND future dates for FROM date
  const shouldDisableFromDate = (date) => {
    if (!apiMinDate || !apiMaxDate) return true;
    
    // 🚀 NEW: Disable if date is in the future (after today)
    if (date.isAfter(today, 'day')) {
      console.log("🚫 Future date blocked:", date.format("DD/MM/YYYY"));
      return true;
    }
    
    // Disable if before API min date
    if (date.isBefore(apiMinDate, 'day')) return true;
    
    // Disable if after API max date  
    if (date.isAfter(apiMaxDate, 'day')) return true;
    
    // Disable if after selected "to" date
    if (toDate && date.isAfter(toDate, 'day')) return true;
    
    return false;
  };

  // 🚀 NEW: Disable dates outside API range AND future dates for TO date
  const shouldDisableToDate = (date) => {
    if (!apiMinDate || !apiMaxDate) return true;
    
    // 🚀 NEW: Disable if date is in the future (after today)
    if (date.isAfter(today, 'day')) {
      console.log("🚫 Future date blocked:", date.format("DD/MM/YYYY"));
      return true;
    }
    
    // Disable if before API min date
    if (date.isBefore(apiMinDate, 'day')) return true;
    
    // Disable if after API max date
    if (date.isAfter(apiMaxDate, 'day')) return true;
    
    // Disable if before selected "from" date  
    if (fromDate && date.isBefore(fromDate, 'day')) return true;
    
    return false;
  };

  // 🚀 UPDATED: Fixed date range calculation to default from 01/01/24 with strict boundaries
  const calculateDefaultDateRange = (apiStartDate, apiEndDate) => {
    console.log("🔍 API boundaries received:", {
      apiStart: apiStartDate.format("DD/MM/YYYY"),
      apiEnd: apiEndDate.format("DD/MM/YYYY"),
      today: today.format("DD/MM/YYYY"),
    });

    // 🚀 STRICT: Calculate absolute boundaries - NEVER exceed these
    const absoluteMinDate = apiStartDate;
    const absoluteMaxDate = getEffectiveMaxDate(apiEndDate);

    console.log("🔒 Absolute boundaries calculated:", {
      minBoundary: absoluteMinDate.format("DD/MM/YYYY"),
      maxBoundary: absoluteMaxDate.format("DD/MM/YYYY"),
    });

    // 🚀 NEW: Set desired start date to 01/01/24
    const desiredFromDate = dayjs("2024-01-01").startOf("day");
    
    // Determine the best from date within STRICT constraints
    let idealFromDate;
    
    if (desiredFromDate.isBefore(absoluteMinDate)) {
      // If desired date is before API range, use API minimum
      idealFromDate = absoluteMinDate;
      console.log("📅 Using API minimum date (01/01/24 too early)");
    } else if (desiredFromDate.isAfter(absoluteMaxDate)) {
      // If desired date is after API range, use 1-year back logic
      const oneYearFromEnd = absoluteMaxDate.subtract(1, "year");
      idealFromDate = getMaxDate(oneYearFromEnd, absoluteMinDate);
      console.log("📅 Using 1-year back logic (01/01/24 too late)");
    } else {
      // 01/01/24 is within range, use it
      idealFromDate = desiredFromDate;
      console.log("📅 Using desired date 01/01/24");
    }
    
    // 🚀 CRITICAL: Use absolute max date (never exceeds API boundary)
    const idealToDate = absoluteMaxDate;

    // 🚀 FINAL SAFETY CHECK: Double-ensure dates are within boundaries
    const safeDateRange = {
      fromDate: getMaxDate(idealFromDate, absoluteMinDate), // Never before API start
      toDate: getMinDate(idealToDate, absoluteMaxDate),     // Never after API end
    };

    console.log("✅ SAFE calculated range (STRICT boundaries):", {
      from: safeDateRange.fromDate.format("DD/MM/YYYY"),
      to: safeDateRange.toDate.format("DD/MM/YYYY"),
      duration: safeDateRange.toDate.diff(safeDateRange.fromDate, "day") + 1,
      withinApiBounds: 
        isSameOrAfter(safeDateRange.fromDate, absoluteMinDate) && 
        isSameOrBefore(safeDateRange.toDate, absoluteMaxDate),
      usedDesiredDate: safeDateRange.fromDate.isSame(desiredFromDate),
    });

    return safeDateRange;
  };

  // 🚀 UPDATED: Validate and correct dates with STRICT API boundary enforcement
  const validateAndCorrectDate = (date, isFromDate = false) => {
    if (!date || !apiMinDate || !apiMaxDate) return date;

    let validDate = date;

    // 🚀 STRICT: Apply absolute boundaries - NEVER exceed API range
    validDate = getMaxDate(validDate, apiMinDate);           // Never before API start
    validDate = getMinDate(validDate, apiMaxDate);           // 🚀 KEY FIX: Use API max directly
    validDate = getMinDate(validDate, today);                // Never in future

    // Additional constraints based on date type
    if (isFromDate && toDate && validDate.isAfter(toDate)) {
      validDate = toDate;
    } else if (!isFromDate && fromDate && validDate.isBefore(fromDate)) {
      validDate = fromDate;
    }

    console.log("🔒 Date validated with strict boundaries:", {
      original: date.format("DD/MM/YYYY"),
      validated: validDate.format("DD/MM/YYYY"),
      withinApiBounds: isSameOrAfter(validDate, apiMinDate) && isSameOrBefore(validDate, apiMaxDate),
    });

    return validDate;
  };

  // Fetch API constraints and handle prefill dates
  useEffect(() => {
    const fetchDateRange = async () => {
      if (!selectedStrategy?._id || !open) return;

      try {
        const response = await api.get(
          `getWebStrykexDateRange/${selectedStrategy._id}`
        );
        console.log("🚀 ~ fetchDateRange ~ response:", response);

        if (response.data?.status && response.data?.data) {
          const { startDateTime, endDateTime } = response.data.data;

          // 🚀 CRITICAL FIX: Proper end date parsing to prevent going beyond API boundary
          const apiStartDate = dayjs(startDateTime).startOf("day");
          
          // 🚀 KEY FIX: For end date, extract just the date part to avoid timezone/time issues
          const endDateOnly = endDateTime.split('T')[0]; // Get "2025-07-30" from "2025-07-30T23:59:59.999Z"
          const apiEndDate = dayjs(endDateOnly).startOf("day");

          console.log("📋 FIXED API Date Range Processing:", {
            rawStart: startDateTime,
            rawEnd: endDateTime,
            extractedEndDate: endDateOnly,
            parsedStart: apiStartDate.format("DD/MM/YYYY"),
            parsedEnd: apiEndDate.format("DD/MM/YYYY"),
            today: today.format("DD/MM/YYYY"),
            totalDays: apiEndDate.diff(apiStartDate, "day") + 1,
          });

          // 🚀 VALIDATION: Ensure parsed end date matches expected date
          if (endDateTime.includes("2025-07-30") && !apiEndDate.isSame(dayjs("2025-07-30"))) {
            console.error("❌ END DATE PARSING ERROR - Expected 30/07/2025, got:", apiEndDate.format("DD/MM/YYYY"));
          }

          // 🚀 CRITICAL: Set API constraints FIRST with strict validation
          if (apiStartDate.isValid() && apiEndDate.isValid()) {
            setApiMinDate(apiStartDate);
            setApiMaxDate(apiEndDate);

            // Handle prefilled dates or set defaults
            if (currentDateRange?.from && currentDateRange?.to) {
              console.log("Setting prefill dates:", currentDateRange);

              // Validate prefilled dates are within API range AND not future
              const prefillFromDate = dayjs(currentDateRange.from).startOf("day");
              const prefillToDate = dayjs(currentDateRange.to).startOf("day");

              const validFromDate = validateAndCorrectDate(prefillFromDate, true);
              const validToDate = validateAndCorrectDate(prefillToDate, false);

              // 🚀 FINAL BOUNDARY CHECK: Ensure dates don't exceed API boundaries
              if (validFromDate.isAfter(apiEndDate) || validToDate.isAfter(apiEndDate)) {
                console.error("❌ PREFILL DATES EXCEED API BOUNDARY!");
                return;
              }

              setFromDate(validFromDate);
              setToDate(validToDate);

              console.log("📅 Prefilled dates validated (STRICT boundaries):", {
                originalFrom: prefillFromDate.format("DD/MM/YYYY"),
                validatedFrom: validFromDate.format("DD/MM/YYYY"),
                originalTo: prefillToDate.format("DD/MM/YYYY"),
                validatedTo: validToDate.format("DD/MM/YYYY"),
                strictValidation: {
                  fromWithinBounds: isSameOrAfter(validFromDate, apiStartDate) && isSameOrBefore(validFromDate, apiEndDate),
                  toWithinBounds: isSameOrAfter(validToDate, apiStartDate) && isSameOrBefore(validToDate, apiEndDate),
                  noFutureDates: isSameOrBefore(validFromDate, today) && isSameOrBefore(validToDate, today),
                }
              });
            } else {
              // Calculate intelligent default date range within strict constraints
              const { fromDate: defaultFromDate, toDate: defaultToDate } =
                calculateDefaultDateRange(apiStartDate, apiEndDate);

              // 🚀 TRIPLE CHECK: Final validation before setting state
              const effectiveMaxDate = getEffectiveMaxDate(apiEndDate);
              const validFromDate = getMaxDate(defaultFromDate, apiStartDate);
              const validToDate = getMinDate(defaultToDate, effectiveMaxDate);

              // 🚀 ABSOLUTE SAFETY: Ensure dates never exceed API boundaries
              if (validFromDate.isAfter(apiEndDate) || validToDate.isAfter(apiEndDate)) {
                console.error("❌ DEFAULT DATES EXCEED API BOUNDARY!");
                return;
              }

              setFromDate(validFromDate);
              setToDate(validToDate);

              console.log("📅 Default date range set (STRICT boundaries):", {
                from: validFromDate.format("DD/MM/YYYY"),
                to: validToDate.format("DD/MM/YYYY"),
                duration: validToDate.diff(validFromDate, "day") + 1 + " days",
                strictValidation: {
                  fromWithinBounds: isSameOrAfter(validFromDate, apiStartDate) && isSameOrBefore(validFromDate, apiEndDate),
                  toWithinBounds: isSameOrAfter(validToDate, apiStartDate) && isSameOrBefore(validToDate, apiEndDate),
                  noFutureDates: isSameOrBefore(validFromDate, today) && isSameOrBefore(validToDate, today),
                }
              });
            }

            setDateRangeLoaded(true);
          } else {
            console.error("❌ Invalid API dates received");
            setDateRangeLoaded(true);
          }
        }
      } catch (error) {
        console.error("Error fetching date range:", error);

        // 🚀 FIXED: Fallback handling with strict boundaries
        if (currentDateRange?.from && currentDateRange?.to) {
          const fallbackFrom = dayjs(currentDateRange.from);
          const fallbackTo = dayjs(currentDateRange.to);
          
          // 🚀 STRICT: Ensure fallback dates are not future AND within reasonable bounds
          setFromDate(getMinDate(fallbackFrom, today));
          setToDate(getMinDate(fallbackTo, today));
        }

        setDateRangeLoaded(true);
      }
    };

    fetchDateRange();
  }, [selectedStrategy?._id, open, currentDateRange]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setDateRangeLoaded(false);
      setApiMinDate(null);
      setApiMaxDate(null);
      setFromDate(null);
      setToDate(null);
    }
  }, [open]);

  // 🚀 ENHANCED: Strict date change handlers with future date prevention
  const handleFromDateChange = (newDate) => {
    if (!newDate || !apiMinDate || !apiMaxDate) return;

    // 🚀 STRICT: Check boundaries first
    if (newDate.isAfter(today, 'day')) {
      console.warn("🚫 Future date rejected:", newDate.format("DD/MM/YYYY"));
      return;
    }

    if (newDate.isBefore(apiMinDate, 'day') || newDate.isAfter(apiMaxDate, 'day')) {
      console.warn("🚫 Date outside API range rejected:", newDate.format("DD/MM/YYYY"));
      return;
    }

    // Check if date is actually selectable
    if (shouldDisableFromDate(newDate)) {
      console.warn("🚫 Attempted to select disabled date:", newDate.format("DD/MM/YYYY"));
      return;
    }

    // 🚀 STRICT: Enforce absolute boundaries
    let validDate = newDate;

    // Apply strict constraints
    validDate = getMaxDate(validDate, apiMinDate);           // Never before API start
    validDate = getMinDate(validDate, apiMaxDate);           // 🚀 KEY FIX: Use API max directly
    validDate = getMinDate(validDate, today);                // Never in future
    if (toDate) validDate = getMinDate(validDate, toDate);   // Never after "to" date

    console.log("📅 From date validated:", {
      requested: newDate.format("DD/MM/YYYY"),
      validated: validDate.format("DD/MM/YYYY"),
      withinApiBounds: isSameOrAfter(validDate, apiMinDate) && isSameOrBefore(validDate, apiMaxDate),
    });

    setFromDate(validDate);
  };

  const handleToDateChange = (newDate) => {
    if (!newDate || !apiMinDate || !apiMaxDate) return;

    // 🚀 STRICT: Check boundaries first
    if (newDate.isAfter(today, 'day')) {
      console.warn("🚫 Future date rejected:", newDate.format("DD/MM/YYYY"));
      return;
    }

    if (newDate.isBefore(apiMinDate, 'day') || newDate.isAfter(apiMaxDate, 'day')) {
      console.warn("🚫 Date outside API range rejected:", newDate.format("DD/MM/YYYY"));
      return;
    }

    // Check if date is actually selectable  
    if (shouldDisableToDate(newDate)) {
      console.warn("🚫 Attempted to select disabled date:", newDate.format("DD/MM/YYYY"));
      return;
    }

    // 🚀 STRICT: Enforce absolute boundaries
    let validDate = newDate;

    // Apply strict constraints - NEVER exceed API max date
    validDate = getMaxDate(validDate, apiMinDate);           // Never before API start
    validDate = getMinDate(validDate, apiMaxDate);           // 🚀 KEY FIX: Use API max directly
    validDate = getMinDate(validDate, today);                // Never in future
    if (fromDate) validDate = getMaxDate(validDate, fromDate); // Never before "from" date

    console.log("📅 To date validated (STRICT API MAX):", {
      requested: newDate.format("DD/MM/YYYY"),
      validated: validDate.format("DD/MM/YYYY"),
      apiMaxDate: apiMaxDate.format("DD/MM/YYYY"),
      withinApiBounds: isSameOrAfter(validDate, apiMinDate) && isSameOrBefore(validDate, apiMaxDate),
    });

    setToDate(validDate);
  };

  // 🚀 UPDATED: Enhanced validation with strict API boundary check
  const areBothDatesSelected =
    fromDate &&
    toDate &&
    (fromDate.isSame(toDate) || fromDate.isBefore(toDate)) &&
    isSameOrAfter(fromDate, apiMinDate) &&
    isSameOrBefore(fromDate, apiMaxDate) &&  // 🚀 STRICT: Never beyond API max
    isSameOrAfter(toDate, apiMinDate) &&
    isSameOrBefore(toDate, apiMaxDate) &&    // 🚀 STRICT: Never beyond API max
    isSameOrBefore(fromDate, today) &&
    isSameOrBefore(toDate, today);

  const handleSave = () => {
    if (!areBothDatesSelected) {
      console.warn("❌ Cannot save invalid date selection");
      return;
    }

    const formattedFrom = fromDate.format("YYYY-MM-DD");
    const formattedTo = toDate.format("YYYY-MM-DD");

    console.log("✅ Saving STRICTLY VALID date range:", { 
      formattedFrom, 
      formattedTo,
      withinApiBounds: {
        from: isSameOrAfter(fromDate, apiMinDate) && isSameOrBefore(fromDate, apiMaxDate),
        to: isSameOrAfter(toDate, apiMinDate) && isSameOrBefore(toDate, apiMaxDate),
      }
    });

    onSave({
      from: formattedFrom,
      to: formattedTo,
    });

    onClose();
  };

  const handleClose = () => {
    // Reset to original values or clear on close
    if (currentDateRange?.from && currentDateRange?.to) {
      const resetFromDate = dayjs(currentDateRange.from);
      const resetToDate = dayjs(currentDateRange.to);

      // Validate reset dates are within current API range AND not future
      if (apiMinDate && apiMaxDate) {
        setFromDate(validateAndCorrectDate(resetFromDate, true));
        setToDate(validateAndCorrectDate(resetToDate, false));
      } else {
        // 🚀 STRICT: Ensure reset dates are not future AND reasonable
        setFromDate(getMinDate(resetFromDate, today));
        setToDate(getMinDate(resetToDate, today));
      }
    } else {
      setFromDate(null);
      setToDate(null);
    }
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: "12px",
            padding: 0,
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.1rem", px: 3, pt: 3, pb: 1 }}
        >
          Edit Date Range
        </DialogTitle>

        <div className="border w-full mb-3" />

        <DialogContent sx={{ pt: 0, px: 3, pb: 2 }}>
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label
                htmlFor="from-date"
                className="text-sm font-medium mb-1 block"
              >
                From Date
              </label>
              <DatePicker
                value={fromDate}
                onChange={handleFromDateChange}
                minDate={apiMinDate}
                maxDate={getMinDate(getMinDate(toDate || apiMaxDate, apiMaxDate), today)} // 🚀 Use apiMaxDate directly
                shouldDisableDate={shouldDisableFromDate}
                format="DD/MM/YYYY"
                disabled={!dateRangeLoaded}
                openTo="day"
                views={['year', 'month', 'day']}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    onClick: (e) => {
                      e.target.parentElement.querySelector('button').click();
                    },
                    inputProps: {
                      readOnly: true,
                      style: { 
                        cursor: 'pointer',
                        userSelect: 'none'
                      }
                    },
                    error:
                      fromDate &&
                      (!isSameOrAfter(fromDate, apiMinDate) ||
                        !isSameOrBefore(fromDate, apiMaxDate) ||  // 🚀 STRICT: Check API max
                        fromDate.isAfter(today)),
                    sx: {
                      backgroundColor: "#F7F7FA",
                      borderRadius: "8px",
                      cursor: "pointer",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        cursor: "pointer",
                        "&:hover": {
                          cursor: "pointer"
                        },
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#407AFF",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#407AFF",
                        },
                      },
                      "& .MuiInputBase-input": {
                        cursor: "pointer !important",
                        "&:hover": {
                          cursor: "pointer !important"
                        }
                      },
                      "& .MuiInputAdornment-root": {
                        cursor: "pointer"
                      }
                    },
                  },
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      }
                    }
                  }
                }}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="to-date"
                className="text-sm font-medium mb-1 block"
              >
                To Date
              </label>
              <DatePicker
                value={toDate}
                onChange={handleToDateChange}
                minDate={getMaxDate(fromDate || apiMinDate, apiMinDate)}
                maxDate={getMinDate(apiMaxDate, today)} // 🚀 CRITICAL FIX: Use apiMaxDate directly, no calculations
                shouldDisableDate={shouldDisableToDate}
                format="DD/MM/YYYY"
                disabled={!dateRangeLoaded}
                openTo="day"
                views={['year', 'month', 'day']}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    onClick: (e) => {
                      e.target.parentElement.querySelector('button').click();
                    },
                    inputProps: {
                      readOnly: true,
                      style: { 
                        cursor: 'pointer',
                        userSelect: 'none'
                      }
                    },
                    error:
                      toDate &&
                      (!isSameOrAfter(toDate, apiMinDate) ||
                        !isSameOrBefore(toDate, apiMaxDate) ||  // 🚀 STRICT: Check API max
                        toDate.isAfter(today)),
                    sx: {
                      backgroundColor: "#F7F7FA",
                      borderRadius: "8px",
                      cursor: "pointer",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        cursor: "pointer",
                        "&:hover": {
                          cursor: "pointer"
                        },
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#407AFF",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#407AFF",
                        },
                      },
                      "& .MuiInputBase-input": {
                        cursor: "pointer !important",
                        "&:hover": {
                          cursor: "pointer !important"
                        }
                      },
                      "& .MuiInputAdornment-root": {
                        cursor: "pointer"
                      }
                    },
                  },
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
          <button
            onClick={handleSave}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${
              areBothDatesSelected && dateRangeLoaded
                ? "bg-[#407AFF] hover:bg-[#2F64E1] text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!areBothDatesSelected || !dateRangeLoaded}
          >
            {!dateRangeLoaded ? "Loading..." : "Save Changes"}
          </button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default DateRangeEditDialog;
