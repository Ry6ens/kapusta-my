import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { logIn } from 'redux/auth/auth-operations';
import { getErrorLogIn } from 'redux/auth/auth-selectors';

import Text from 'components/ui/Text/Text';
import ButtonGoogle from 'components/ui/ButtonGoogle/ButtonGoogle';

import FormInputEmail from 'components/FormComponents/FormInputEmail';
import FormInputPassword from 'components/FormComponents/FormInputPassword';

import s from './FormLogin.module.scss';
import Button from 'components/ui/Button/Button';

export default function FormLogin() {
  const dispatch = useDispatch();

  const errorLogIn = useSelector(getErrorLogIn);

  const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    dispatch(logIn(data));
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Text
        text="You can log in with your Google &#173; Account:"
        textClass="textFormHead"
      />
      <ButtonGoogle />
      <Text
        text="Or log in using an email and password,
after registering:"
        textClass="textFormCommit"
      />
      <Text text="Email:" textClass="textFormEmail" />
      <FormInputEmail
        name="email"
        control={control}
        label="your@email.com"
        type="email"
        required="This is a required field"
      />
      <Text text="Password:" textClass="textFormPassword" />
      <FormInputPassword
        name="password"
        control={control}
        label="Password"
        type="password"
        required="This is a required field"
      />
      {errorLogIn && <Text textClass="textError" text={errorLogIn} />}
      <div className={s.buttonsLay}>
        <Button text="Log In" btnClass="btnLogin" />
        <NavLink className={getClassName} to="/signup">
          Sign Up
        </NavLink>
      </div>
    </form>
  );
}
