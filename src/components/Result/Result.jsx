import React from "react";
import { useNavigate } from "react-router-dom";
import RunSummary from "./RunSummary.jsx";
import StatsCard from "./StatsCard.jsx";
import TransactionAnalytics from "./TransactionAnalytics.jsx";
import TransactionOrderDetails from "./Transactionorderdetails.jsx";
import ResultSummaryBar from "./ResultSummaryBar.jsx";

const Result = () => {
  const navigate = useNavigate();

  const handleChooseStrategyClick = () => {
    navigate(-1); // Navigate back to strategy selection
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="md:p-4 w-full flex flex-col gap-4">
        <StatsCard />
        <ResultSummaryBar />
        <RunSummary />
        <TransactionAnalytics />
        <TransactionOrderDetails />
      </div>
    </div>
  );
};

export default Result;
