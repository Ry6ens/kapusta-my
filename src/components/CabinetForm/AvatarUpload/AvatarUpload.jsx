import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { getUser } from 'redux/auth/auth-selectors';
import { userUpdateAvatar } from 'redux/auth/auth-operations';

import Button from 'components/ui/Button/Button';

import FormInputFile from 'components/CabinetForm/FormComponents/FormInputFile';

import s from './AvatarUpload.module.scss';

export default function AvatarUpload() {
  const dispatch = useDispatch();
  const { avatarUrl, name } = useSelector(getUser);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      avatar: {},
    },
  });

  const onSubmit = ({ avatar }) => {
    const avatarIMG = avatar[0];

    dispatch(userUpdateAvatar(avatarIMG));
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Avatar alt={name} src={avatarUrl} width="72px" height="72px" />
      <FormInputFile register={register} />
      <Button text="Upload" btnClass="btnUpload" type="submit" />
    </form>
  );
}
