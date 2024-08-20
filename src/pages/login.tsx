import {FormEvent, ReactEventHandler, useEffect, useState} from 'react';
import {login} from '../features/thunks/auth.ts';
import {useAppDispatch} from '../components/app/hooks';
import Header from '../components/app/header/header.tsx';

type HTMLLoginForm = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  function checkPassword(password: string) {
    const letter = /[a-zA-Z]/;
    const number = /[0-9]/;
    return number.test(password) && letter.test(password);
  }

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleChange: ChangeHandler = (evt) => {
    const {name, value} = evt.currentTarget;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  function handleSubmit(event: FormEvent<HTMLLoginForm>) {
    event.preventDefault();
    dispatch(login(formData));
  }

  useEffect(() => {
    checkPassword(formData.password);
  }, [formData.password]);

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" onChange={handleChange} placeholder="Email" value={formData.email} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" onChange={handleChange} placeholder="Password" value={formData.password} required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
