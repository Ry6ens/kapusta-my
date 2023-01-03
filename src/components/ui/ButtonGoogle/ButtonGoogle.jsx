import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import { googleLogIn } from 'redux/auth/auth-operations';

import GoogleIcon from 'components/icons/Google/Google';

import s from './ButtonGoogle.module.scss';

export default function ButtonGoogle() {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => dispatch(googleLogIn(tokenResponse)),
  });

  return (
    <button className={s.btn} type="button" onClick={() => login()}>
      <GoogleIcon width="17" height="17" />
      <span>Google</span>
    </button>
  );
}
