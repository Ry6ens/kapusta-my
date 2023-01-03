import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { getUser } from 'redux/auth/auth-selectors';
import { logOut, userDelete, userUpdateAccount } from 'redux/auth/auth-operations';

import TitleH1 from 'components/ui/TitleH1/TitleH1';
import Text from 'components/ui/Text/Text';
import Button from 'components/ui/Button/Button';

import Modal from 'components/layout/Modal/Modal';

import FormInputText from 'components/FormComponents/FormInputText';
import FormInputSelect from 'components/CabinetForm/FormComponents/FormInputSelect';
import FormInputEmail from 'components/FormComponents/FormInputEmail';
import AvatarUpload from './AvatarUpload/AvatarUpload';

import CloseIcon from 'components/icons/Close/Close';

import {
  optionsSex,
  optionsDate,
  optionsMonth,
  optionsYear,
} from './FormComponents/optionsSelect';

import s from './CabinetForm.module.scss';

export default function CabinetForm() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { id, firstName, lastName, gender, dateBirth, monthBirth, yearBirth, email } =
    useSelector(getUser);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dateBirth: '',
      monthBirth: '',
      yearBirth: '',
      email: '',
    },
  });

  const onSubmit = data => {
    dispatch(userUpdateAccount(data));
    reset();
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleDeleteAccount = () => {
    dispatch(userDelete(id));
    dispatch(logOut());
  };

  const handelClose = () => {
    setShowModal(false);
  };

  return (
    <div className={s.cabinetForm}>
      <TitleH1 text="Account settings" />
      <Text text="Profile photo" textClass="textAccount" />
      <AvatarUpload />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.names}>
          <div className={s.name}>
            <Text text="First Name:" textClass="textFormEmail" />
            <FormInputText name="firstName" control={control} label={firstName} />
          </div>
          <div className={s.name}>
            <Text text="Last Name:" textClass="textFormEmail" />
            <FormInputText name="lastName" control={control} label={lastName} />
          </div>
        </div>
        <Text text="Gender (optional):" textClass="textFormEmail" />
        <FormInputSelect
          name="gender"
          options={optionsSex}
          control={control}
          label={gender}
          required={false}
        />
        <Text text="Date of birth (optional):" textClass="textFormEmail" />
        <div className={s.date}>
          <FormInputSelect
            name="dateBirth"
            options={optionsDate}
            control={control}
            label={dateBirth}
            required={false}
          />
          <FormInputSelect
            name="monthBirth"
            options={optionsMonth}
            control={control}
            label={monthBirth}
            required={false}
          />
          <FormInputSelect
            name="yearBirth"
            options={optionsYear}
            control={control}
            label={yearBirth}
            required={false}
          />
        </div>
        <Text text="Email:" textClass="textFormEmail" />
        <FormInputEmail
          name="email"
          control={control}
          label={email}
          type="email"
          required={false}
        />
        <Button text="Update my settings" btnClass="btnAccount" type="submit" />
        <Button
          text="Delete Account"
          btnClass="btnAccountDelete"
          type="button"
          onClick={handleOpenModal}
        />
      </form>
      {showModal && (
        <Modal onClose={handelClose}>
          <CloseIcon width="12" height="12" iconClass="iconModal" onClick={handelClose} />
          <Text text="Do you really want to delete account?" textClass="textModal" />
          <div className={s.overlayBtns}>
            <Button text="Yes" onClick={handleDeleteAccount} />
            <Button text="No" onClick={handelClose} />
          </div>
        </Modal>
      )}
    </div>
  );
}
