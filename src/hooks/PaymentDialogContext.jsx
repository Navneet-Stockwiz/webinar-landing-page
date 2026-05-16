import React, { createContext, useContext, useState, useCallback } from "react";
import StrykexPaymentDialog from "../components/StrykexPaymentDialog"; // adjust the path if needed

const PaymentDialogContext = createContext({
  openPaymentDialog: () => {},
  closePaymentDialog: () => {},
});

export const PaymentDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openPaymentDialog = useCallback(() => setOpen(true), []);
  const closePaymentDialog = useCallback(() => setOpen(false), []);

  return (
    <PaymentDialogContext.Provider value={{ openPaymentDialog, closePaymentDialog }}>
      {children}
      <StrykexPaymentDialog open={open} handleClose={closePaymentDialog} />
    </PaymentDialogContext.Provider>
  );
};

export const usePaymentDialog = () => useContext(PaymentDialogContext);
