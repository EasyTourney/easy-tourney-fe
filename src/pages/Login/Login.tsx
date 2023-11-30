import React, { useCallback, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { LoginSchema } from '../../services/validator/auth.validator'
import { Box, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { LoginForm } from './Login.types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import styles from './Login.module.css'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmitForm = useCallback((values: LoginForm, { resetForm }: { resetForm: () => void }) => {
    alert(
      JSON.stringify({
        email: values.email,
        password: values.password.trim()
      })
    )
    resetForm()
    setShowPassword(false)
  }, [])

  const handleTogglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  return (
    <Box className={styles['login-container']}>
      <Box className={styles['login-wrapper']}>
        <h1 className={styles['login-title']}>LOGIN PAGE</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmitForm}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(formProps: any) => (
            <Form onSubmit={formProps.handleSubmit} className={styles['login-form']}>
              <Stack spacing={2} width={'60vw'} maxWidth={500}>
                <Field
                  fullWidth
                  as={TextField}
                  id="email-login"
                  name="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  color={formProps.errors.email && 'error'}
                />
                <span className={styles['error-message']}>
                  <ErrorMessage name="email" />
                </span>
              </Stack>
              <Stack spacing={2} width={'60vw'} maxWidth={500}>
                <Field
                  fullWidth
                  as={TextField}
                  id="password-login"
                  name="password"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  color={formProps.errors.password && 'error'}
                  InputProps={{
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
              <Button variant="contained" type="submit" size="large" className={styles['submit-login-btn']}>
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
