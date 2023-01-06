export const getExpCateg = ({ transactions }) => transactions.expensesCategories;
export const getIncomCateg = ({ transactions }) => transactions.incomeCategories;

export const getIncomesTotal = ({ transactions }) =>
  transactions.transactions.incomes?.total;
export const getIncomesData = ({ transactions }) =>
  transactions.transactions.incomes?.incomesData;
export const getExpensesTotal = ({ transactions }) =>
  transactions.transactions.expenses?.total;
export const getExpensesData = ({ transactions }) =>
  transactions.transactions.expenses?.expensesData;
export const getSummary = ({ transactions }) => transactions.summary;
export const getTransactions = ({ transactions }) => transactions.transactions;
export const getCurrentDate = ({ transactions }) => transactions.currentDate;
export const getCalendarDate = ({ transactions }) => transactions.calendarDate;
export const getCategoryData = ({ transactions }) => transactions.chartData;

export const isMessage = ({ transactions }) => transactions.message;
export const isLoading = ({ transactions }) => transactions.loading;
