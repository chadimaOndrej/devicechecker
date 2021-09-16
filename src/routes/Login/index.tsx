import React, { useEffect, useState } from 'react';
import NavMenu from '../../components/NavMenu';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Input, Button, Message, Card } from 'semantic-ui-react';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [loginError, setLoginError] = useState(false);
  const { currentUser, setCurrentUser, login } = useAuth();
  const history = useHistory();

  const setStorageWithExpiry = (value) => {
    const now = new Date()  
    const item = {
      user: value,
      expiry: now.getTime() + 86400000,
    }
    localStorage.setItem('currentUser', JSON.stringify(item))
  }

  const loginSubmit = async (values) => {
    try {
      const { data } = await login(values);
      setCurrentUser(data)
      setStorageWithExpiry(data)
      history.push('/devices')
    }
    catch (error) {
      setLoginError(true);
      console.error(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      history.push('/devices')
    }
  }, [])

  return (
    <>
      <NavMenu />
      <Card centered>
        <Card.Content header="Přihlášení" />
        <Card.Content>
          <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={
              yup.object().shape({
                login: yup.string().required('Povinný údaj'),
                password: yup.string().required('Povinný údaj')
              })
            }
            onSubmit={loginSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Field
                  id="login"
                  name="login"
                  control={Input}
                  placeholder="Přihlašovací jméno"
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.login && touched?.login ? errors.login : undefined}
                />

                <Form.Field
                  id="password"
                  name="password"
                  control={Input}
                  placeholder="Heslo"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.password && touched?.password ? errors.password : undefined}
                >
                </Form.Field>

                <Button
                  type='submit'
                  disable={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>

          {loginError ? (
            <Message
              error={true}
              header='Uživatel neexistuje'
              content='Chybně zadané přihlašovací jméno nebo heslo.'
            />
          ) : ''}
        </Card.Content>
      </Card>
    </>
  )
}

export default LoginPage;
