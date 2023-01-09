import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

import { checkBalance } from 'redux/balance/balance-selectors';
import { getCurrentDate } from 'redux/transaction/transaction-selectors';
import { getTransactionsByMonth } from 'redux/transaction/transaction-operations';

import Section from 'components/layout/Section/Section';

import ButtonBack from 'components/ui/ButtonBack/ButtonBack';

import Text from 'components/ui/Text/Text';
import Calendar from 'components/Calendar/Calendar';
import BalanceChart from 'components/BalanceChart/BalanceChart';
import SliderReport from 'components/SliderReport/SliderReport';
import Chart from 'components/Chart/Chart';

import KapustaTwoIcon from 'components/icons/KapustaTwo/KapustaTwo';
import KapustaManyIcon from 'components/icons/KapustaMany/KapustaMany';

import s from './ReportPage.module.scss';

export default function ReportPage() {
  const isMobile = useMediaQuery('(max-width: 767.98px)');
  const isTabletMin = useMediaQuery('(min-width: 768px)');
  const isTabletMax = useMediaQuery('(max-width: 1279.98px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const balance = useSelector(checkBalance);
  const currentDate = useSelector(getCurrentDate);

  useEffect(() => {
    if (!isMounted.current) {
      dispatch(getTransactionsByMonth({ date: currentDate }));
    }

    isMounted.current = false;
  }, [dispatch, currentDate]);

  const newStyleBalance = balance + ' UAH';

  return (
    <Section sectionClass="sectionMarg">
      {isMobile && (
        <>
          <ButtonBack text="Main page" width="18" height="12" to="/" />
          <Text text="Current period:" textClass="textReport" />
          <Calendar dateFormat="MMMM yyyy" showMonthYearPicker={true} />
          <Text text="Balance:" textClass="textBalance" />
          <Text text={newStyleBalance} textClass="textBalanceDisplay" />
          <BalanceChart />
          <SliderReport />
          <Chart />
        </>
      )}

      {isTabletMin && isTabletMax && (
        <>
          <div className={s.overlay}>
            <ButtonBack text="Main page" width="18" height="12" to="/" />
            <div className={s.overlayBalance}>
              <Text text="Balance:" textClass="textBalance" />
              <Text text={newStyleBalance} textClass="textBalanceDisplay" />
            </div>
            <div className={s.overlayCalendar}>
              <Text text="Current period:" textClass="textReport" />
              <Calendar dateFormat="MMMM yyyy" showMonthYearPicker={true} />
            </div>
          </div>
          <BalanceChart />
          <SliderReport />
          <Chart />
          <KapustaTwoIcon iconClass="reportBottom" width="183" height="142" />
        </>
      )}

      {isDesktop && (
        <>
          <div className={s.overlay}>
            <ButtonBack text="Main page" width="18" height="12" to="/" />
            <div className={s.overlayBalance}>
              <Text text="Balance:" textClass="textBalance" />
              <Text text={newStyleBalance} textClass="textBalanceDisplay" />
            </div>
            <div className={s.overlayCalendar}>
              <Text text="Current period:" textClass="textReport" />
              <Calendar dateFormat="MMMM yyyy" showMonthYearPicker={true} />
            </div>
          </div>
          <BalanceChart />
          <SliderReport />
          <Chart />
          <KapustaManyIcon iconClass="expens" width="1334" height="232" />
        </>
      )}
    </Section>
  );
}
