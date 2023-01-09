import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getChartData } from 'redux/transaction/transaction-selectors';

import s from './Chart.module.scss';

export default function Chart() {
  const isMobile = useMediaQuery('(max-width: 767.98px)');
  const isTabletMin = useMediaQuery('(min-width: 768px)');
  const isTabletMax = useMediaQuery('(max-width: 1279.98px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const data = useSelector(getChartData);

  const dinamicHeight = data.length === 0 ? 422 : data.length * 55;

  const descriptionLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <>
        {isMobile && (
          <text
            x={5}
            y={y + 24}
            fill="#52555F"
            textAnchor="start"
            dy={-6}
            className={s.text}
          >
            {value}
          </text>
        )}
        {isTabletMin && isTabletMax && (
          <text x={x} y={0} dy={10} textAnchor="middle" className={s.text}>
            {value}
          </text>
        )}
      </>
    );
  };

  const amountLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <>
        {isMobile && (
          <text
            x={width + 10}
            y={y}
            fill="#52555F"
            textAnchor="end"
            dy={-6}
          >{`${value} UAH`}</text>
        )}
        {isTabletMin && (
          <text
            x={x + 35}
            y={y}
            fill="#52555F"
            textAnchor="end"
            dy={-6}
          >{`${value} UAH`}</text>
        )}
      </>
    );
  };

  return (
    <>
      {isMobile && (
        <ResponsiveContainer width={280} height={dinamicHeight}>
          <BarChart layout="vertical" data={data}>
            <XAxis type="number" hide axisLine={false} tickLine={false} />
            <YAxis
              dataKey="description"
              type="category"
              hide
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="description" barSize={20} label={descriptionLabel} />
            <Bar
              dataKey="amount"
              barSize={20}
              fill="#ff751d"
              radius={10}
              label={amountLabel}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
      {isTabletMin && isTabletMax && (
        <BarChart width={725} height={422} data={data}>
          <XAxis
            dataKey="description"
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <CartesianGrid stroke="#F5F6FB" vertical={false} />
          <Bar dataKey="amount" fill="#ff751d" barSize={30} label={amountLabel} />
        </BarChart>
      )}

      {isDesktop && (
        <BarChart width={1098} height={422} data={data}>
          <XAxis
            dataKey="description"
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <CartesianGrid stroke="#F5F6FB" vertical={false} />
          <Bar dataKey="amount" fill="#ff751d" barSize={30} label={amountLabel} />
        </BarChart>
      )}
    </>
  );
}
