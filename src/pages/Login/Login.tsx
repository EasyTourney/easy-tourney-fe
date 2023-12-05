import React, { useCallback, useState } from 'react'
import { Formik, Field, Form, ErrorMessage, FormikProps } from 'formik'
import { LoginSchema } from '../../services/validator/auth.validator'
import { Alert, Box, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { LoginForm } from './Login.types'
import { LockOutlined, PersonOutline, Visibility, VisibilityOff } from '@mui/icons-material'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmitForm = useCallback(
    (values: LoginForm, { resetForm }: { resetForm: () => void }) => {
      if (values.email === 'nguyenhuuhuy@gmail.com' && values.password.trim() === '123456') {
        navigate('/categories')
      } else {
        setError(true)
      }

      resetForm()
      setShowPassword(false)
    },
    [navigate]
  )

  const handleTogglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  return (
    <Box className={styles['login-container']}>
      <Box className={styles['login-wrapper']}>
        <h1 className={styles['login-title']}>EASY TOURNEY</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmitForm}
          validateOnBlur={true}
          validateOnChange={false}
          validateOnMount={true}
        >
          {(formProps: FormikProps<any>) => (
            <Form onSubmit={formProps.handleSubmit} className={styles['login-form']}>
              <Stack spacing={2} width={'60vw'} maxWidth={450}>
                {error && (
                  <Alert className={styles['login-alert-message']} severity="error">
                    Login failed! Incorrect username or password
                  </Alert>
                )}
                <Field
                  as={TextField}
                  color={formProps.touched.email && formProps.errors.email && 'error'}
                  error={formProps.touched.email && formProps.errors.email ? true : false}
                  fullWidth
                  id="email-login"
                  label="Email"
                  name="email"
                  placeholder="Email address"
                  required
                  type="email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    )
                  }}
                />
                <span className={styles['error-message']}>
                  <ErrorMessage name="email" />
                </span>
              </Stack>
              <Stack spacing={2} width={'60vw'} maxWidth={450}>
                <Field
                  as={TextField}
                  color={formProps.touched.password && formProps.errors.password && 'error'}
                  error={formProps.touched.password && formProps.errors.password ? true : false}
                  fullWidth
                  id="password-login"
                  label="Password"
                  name="password"
                  placeholder="Password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <span className={styles['error-message']}>
                  <ErrorMessage name="password" />
                </span>
              </Stack>
              <Button
                className={styles['submit-login-btn']}
                disabled={!formProps.isValid || !formProps.dirty}
                size="large"
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Login
