import { useSelector } from 'react-redux';

import {
  getIncomesTotal,
  getExpensesTotal,
} from 'redux/transaction/transaction-selectors';

import Text from 'components/ui/Text/Text';

import s from './BalanceChart.module.scss';

export default function BalanceChart() {
  const incomesTotal = useSelector(getIncomesTotal);
  const expensesTotal = useSelector(getExpensesTotal);

  if (incomesTotal === undefined || expensesTotal === undefined) return;

  return (
    <div className={s.overlay}>
      <div className={s.overlayExp}>
        <Text text="Expenses:" textClass="textBalanceChart" />
        <p className={s.priceExp}>- {expensesTotal} UAH</p>
      </div>
      <div className={s.vertBorder}></div>
      <div className={s.overlayInc}>
        <Text text="Income:" textClass="textBalanceChart" />
        <p className={s.priceInc}>+ {incomesTotal} UAH</p>
      </div>
    </div>
  );
}
