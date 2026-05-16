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
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import api from "../../api/axios";
import { useSelectedStrategy } from "../../contexts/SelectedStrategyContext";

const BacktestResultsDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [navigationData, setNavigationData] = useState(null);

  // Get selectedStrategy from context
  const { selectedStrategy } = useSelectedStrategy();

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

  // 🚀 UPDATED: Disable dates outside API range AND future dates for FROM date
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

  // 🚀 UPDATED: Disable dates outside API range AND future dates for TO date
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

  // 🚀 FIXED: Date range calculation with STRICT boundary enforcement
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

  // Fetch date range and set defaults
  useEffect(() => {
    const fetchDateRange = async () => {
      if (!selectedStrategy?._id || dateRangeLoaded) return;

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

            // Calculate intelligent default date range within STRICT constraints
            const { fromDate: defaultFromDate, toDate: defaultToDate } =
              calculateDefaultDateRange(apiStartDate, apiEndDate);

            // 🚀 TRIPLE CHECK: Final validation before setting state
            const effectiveMaxDate = getEffectiveMaxDate(apiEndDate);
            const finalFromDate = getMaxDate(defaultFromDate, apiStartDate);
            const finalToDate = getMinDate(defaultToDate, effectiveMaxDate);

            // 🚀 ABSOLUTE SAFETY: Ensure dates never exceed API boundaries
            if (finalFromDate.isAfter(apiEndDate) || finalToDate.isBefore(apiStartDate)) {
              console.error("❌ INVALID date range calculated!");
              return;
            }

            // 🚀 FINAL BOUNDARY CHECK: Ensure to date doesn't exceed API end date
            if (finalToDate.isAfter(apiEndDate)) {
              console.error("❌ TO DATE EXCEEDS API BOUNDARY!", {
                finalToDate: finalToDate.format("DD/MM/YYYY"),
                apiEndDate: apiEndDate.format("DD/MM/YYYY")
              });
              return;
            }

            setFromDate(finalFromDate);
            setToDate(finalToDate);
            setDateRangeLoaded(true);

            console.log("📅 FINAL SAFE date range set (STRICT END DATE):", {
              from: finalFromDate.format("DD/MM/YYYY"),
              to: finalToDate.format("DD/MM/YYYY"),
              duration: finalToDate.diff(finalFromDate, "day") + 1 + " days",
              strictValidation: {
                fromWithinBounds: isSameOrAfter(finalFromDate, apiStartDate) && isSameOrBefore(finalFromDate, apiEndDate),
                toWithinBounds: isSameOrAfter(finalToDate, apiStartDate) && isSameOrBefore(finalToDate, apiEndDate),
                noFutureDates: isSameOrBefore(finalToDate, today),
                toDateMatchesApi: finalToDate.format("YYYY-MM-DD") === endDateOnly,
              }
            });
          } else {
            console.error("❌ Invalid API dates received");
            setDateRangeLoaded(true);
          }
        }
      } catch (error) {
        console.error("Error fetching date range:", error);
        setDateRangeLoaded(true);
      }
    };

    if (open && selectedStrategy?._id) {
      fetchDateRange();
    }
  }, [selectedStrategy?._id, open, dateRangeLoaded]);

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
    const effectiveMaxDate = getEffectiveMaxDate(apiMaxDate);

    // Apply strict constraints
    validDate = getMaxDate(validDate, apiMinDate);           // Never before API start
    validDate = getMinDate(validDate, effectiveMaxDate);     // Never after effective end
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

  // 🚀 UPDATED: Enhanced validation including future date check
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

  // Handle navigation after dialog closes
  useEffect(() => {
    if (shouldNavigate && navigationData) {
      console.log("Navigating with data:", navigationData);
      navigate("/backtest/results", {
        state: navigationData,
        replace: false,
      });
      setShouldNavigate(false);
      setNavigationData(null);
    }
  }, [shouldNavigate, navigationData, navigate]);

  const handleGetResults = () => {
    console.log("handleGetResults called");

    // Only proceed if both dates are selected and valid
    if (!areBothDatesSelected) {
      console.warn("❌ Invalid date selection");
      return;
    }

    // Format dates for navigation
    const formattedFrom = fromDate.format("YYYY-MM-DD");
    const formattedTo = toDate.format("YYYY-MM-DD");

    console.log("✅ Proceeding with STRICTLY VALID dates:", {
      formattedFrom,
      formattedTo,
      withinApiBounds: {
        from: isSameOrAfter(fromDate, apiMinDate) && isSameOrBefore(fromDate, apiMaxDate),
        to: isSameOrAfter(toDate, apiMinDate) && isSameOrBefore(toDate, apiMaxDate),
      }
    });

    // Prepare navigation data with date range
    const navData = {
      _id: selectedStrategy?._id,
      strategy: selectedStrategy,
      dateRange: {
        from: formattedFrom,
        to: formattedTo,
      },
    };

    setNavigationData(navData);
    onClose();

    setTimeout(() => {
      setShouldNavigate(true);
    }, 100);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={onClose}
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
          {selectedStrategy?.name}
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
            onClick={handleGetResults}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${
              areBothDatesSelected && dateRangeLoaded
                ? "bg-[#407AFF] hover:bg-[#2F64E1] text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!areBothDatesSelected || !dateRangeLoaded}
          >
            {!dateRangeLoaded ? "Loading..." : "Get Backtest Results"}
          </button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default BacktestResultsDialog;
