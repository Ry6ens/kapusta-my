import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { addBalance } from 'redux/balance/balance-operations';
import { checkBalance } from 'redux/balance/balance-selectors';

import FormInputNumber from './FormInputNumber';

import Button from 'components/ui/Button/Button';
import Text from 'components/ui/Text/Text';

import UAH from 'components/icons/UAH/UAH';

import s from './FormAddBalance.module.scss';

export default function FormAddBalance() {
  const dispatch = useDispatch();
  const balance = useSelector(checkBalance);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      newBalance: '',
    },
  });

  if (balance === undefined) {
    return;
  }

  const onSubmit = userData => {
    dispatch(addBalance(userData));
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Text text="Balance" textClass="textHomeBalance" />
      <div className={s.overlay}>
        <div className={s.inpOverlay}>
          <FormInputNumber
            name="newBalance"
            control={control}
            label={balance.toString()}
            required={true}
          />
          <UAH width="26px" height="24px" />
        </div>
        <Button text="Confirm" btnClass="btnConfirm" />
      </div>
    </form>
  );
}
