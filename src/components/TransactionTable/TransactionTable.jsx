import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { deleteTransaction } from 'redux/transaction/transaction-operations';
import { getTransactions } from 'redux/transaction/transaction-selectors';

import Modal from 'components/layout/Modal/Modal';

import Text from 'components/ui/Text/Text';
import Button from 'components/ui/Button/Button';

import DeleteIcon from 'components/icons/Delete/Delete';
import CloseIcon from 'components/icons/Close/Close';

import s from './TransactionTable.module.scss';

export default function TransactionTable({ sectionClass = 'tbody' }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  const { transactions } = useSelector(getTransactions);

  if (transactions === undefined) return;

  const reversedItems = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handelDelete = ({ currentTarget: { id } }) => {
    document.body.classList.add('no-scroll');

    setShowModal(true);
    setId(id);
  };

  const handelClose = () => {
    setShowModal(false);
  };

  const handleDeleteItem = () => {
    dispatch(deleteTransaction(id));
    setShowModal(false);
  };

  const elements = reversedItems.map(({ _id, description, amount, date, category }) => (
    <tr key={_id} className={s.item}>
      <td>{moment(date).format('DD.MM.YYYY')}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td
        className={
          category === 'Salary' || category === 'Add.Income' ? s.priceInc : s.priceExp
        }
      >
        {category === 'Salary' || category === 'Add.Income' ? '' : '-'}
        {amount} UAH
      </td>
      <td className={s.icon}>
        <DeleteIcon
          iconClass="iconTransactionTable"
          width="18"
          height="18"
          id={_id}
          onClick={handelDelete}
        />
      </td>
    </tr>
  ));

  return (
    <>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            <th className={s.th}>Date</th>
            <th className={s.th}>Description</th>
            <th className={s.th}>Category</th>
            <th className={s.th}>Sum</th>
            <th className={s.th}></th>
          </tr>
        </thead>
        <tbody className={s[sectionClass]}>{elements}</tbody>
      </table>
      {showModal && (
        <Modal onClose={handelClose}>
          <CloseIcon width="12" height="12" iconClass="iconModal" onClick={handelClose} />
          <Text text="Are you sure?" textClass="textModal" />
          <div className={s.overlayBtns}>
            <Button text="Yes" onClick={handleDeleteItem} />
            <Button text="No" onClick={handelClose} />
          </div>
        </Modal>
      )}
    </>
  );
}
