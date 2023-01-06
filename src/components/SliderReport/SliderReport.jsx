import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getIncomesData, getExpensesData } from 'redux/transaction/transaction-selectors';

import ArrowCalendLeftIcon from 'components/icons/ArrowCalendLeft/ArrowCalendLeft';
import ArrowCalendRightIcon from 'components/icons/ArrowCalendRight/ArrowCalendRight';
import ProductsIcon from 'components/icons/Products/Products';
import AlcoholIcon from 'components/icons/Alcohol/Alcohol';
import EntertainmentIcon from 'components/icons/Entertainment/Entertainment';
import HealthIcon from 'components/icons/Health/Health';
import TransportIcon from 'components/icons/Transport/Transport';
import HousingIcon from 'components/icons/Housing/Housing';
import TechniqueIcon from 'components/icons/Technique/Technique';
import CommunalIcon from 'components/icons/Communal/Communal';
import SportsIcon from 'components/icons/Sports/Sports';
import EducationIcon from 'components/icons/Education/Education';
import OtherIcon from 'components/icons/Other/Other';
import SalaryIcon from 'components/icons/Salary/Salary';
import AddIncomeIcon from 'components/icons/AddIncome/AddIncome';
import RectangleIcon from 'components/icons/Rectangle/Rectangle';

import Text from 'components/ui/Text/Text';

import s from './SliderReport.module.scss';

import { expenses, income } from './data.js';

const FilterIcon = (category, height) => {
  switch (category?.toLocaleLowerCase()) {
    case 'products':
      return <ProductsIcon height={height} />;
    case 'alcohol':
      return <AlcoholIcon height={height} />;
    case 'entertainment':
      return <EntertainmentIcon height={height} />;
    case 'health':
      return <HealthIcon height={height} />;
    case 'transport':
      return <TransportIcon height={height} />;
    case 'housing':
      return <HousingIcon height={height} />;
    case 'technique':
      return <TechniqueIcon height={height} />;
    case 'communal':
      return <CommunalIcon height={height} />;
    case 'sports':
      return <SportsIcon height={height} />;
    case 'education':
      return <EducationIcon height={height} />;
    case 'other':
      return <OtherIcon height={height} />;
    case 'salary':
      return <SalaryIcon height={height} />;
    case 'add.income':
      return <AddIncomeIcon height={height} />;
    default:
      return '';
  }
};

export default function SliderReport() {
  const [item, setItem] = useState(true);

  const incomesData = useSelector(getIncomesData);
  const expensesData = useSelector(getExpensesData);

  if (incomesData === undefined || expensesData === undefined) return;

  let incomesItems = [];
  let expensesItems = [];

  for (const key in incomesData) {
    incomesItems.push({ category: key, total: incomesData[key].total });
  }

  for (const key in expensesData) {
    expensesItems.push({ category: key, total: expensesData[key].total });
  }

  const handlerToggle = () => {
    setItem(!item);
  };

  return (
    <div className={s.overlay}>
      <div className={s.overlayBtn}>
        <ArrowCalendLeftIcon
          className={s.btn}
          width="7px"
          height="10px"
          onClick={handlerToggle}
        />
        {item ? (
          <Text text="Expenses" textClass="textSliderTitle" />
        ) : (
          <Text text="Income" textClass="textSliderTitle" />
        )}
        <ArrowCalendRightIcon
          className={s.btn}
          width="7px"
          height="10px"
          onClick={handlerToggle}
        />
      </div>

      {item && (
        <ul className={s.list}>
          {expensesItems?.map(({ category, total }) => (
            <li key={category} className={s.item}>
              <Text text={total} />
              {FilterIcon(category, '56')}
              <div className={s.overlayIcon}>
                <RectangleIcon width="59px" height="46px" fill="#F5F6FB" />
              </div>
              <Text text={category} />
            </li>
          ))}
        </ul>
      )}
      {!item && (
        <ul className={s.list}>
          {incomesItems?.map(({ category, total }) => (
            <li key={category} className={s.item}>
              <Text text={total} />
              {FilterIcon(category, '56')}
              <div className={s.overlayIcon}>
                <RectangleIcon width="59px" height="46px" fill="#F5F6FB" />
              </div>
              <Text text={category} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
