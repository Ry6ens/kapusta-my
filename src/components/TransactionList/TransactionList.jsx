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

import s from './TransactionList.module.scss';

export default function TransactionList({ listClass = 'list' }) {
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
    <li key={_id} className={s.item}>
      <p className={s.title}>{description}</p>
      <p
        className={
          category === 'Salary' || category === 'Add.Income' ? s.priceInc : s.priceExp
        }
      >
        {category === 'Salary' || category === 'Add.Income' ? '' : '-'}
        {amount} UAH
      </p>
      <DeleteIcon
        iconClass="iconProductList"
        width="20"
        height="20"
        id={_id}
        onClick={handelDelete}
      />
      <p className={s.date}>{moment(date).format('DD.MM.YYYY')}</p>
      <p className={s.category}>{category}</p>
    </li>
  ));

  return (
    <>
      <ul className={s[listClass]}>{elements}</ul>
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
