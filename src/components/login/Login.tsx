import { Link, useNavigate } from "react-router-dom"
import { Header } from "../header/Header"
import { schema } from "../../utils/rules";
import { AuthState, FormDataLogin } from "../../types/apiType/user.type";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { InputLogin } from "../input/InputLogin";

import { LOGIN } from '../../features/auth/authSlice';

import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "../../features/auth/authServices";
import { Button } from "../button/Button";

const loginSchema = schema.pick(['email', 'password'])

export const Login = () => {
  const [isRemenber, setIsRemenber] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {
    register, handleSubmit, setError, formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: yupResolver(loginSchema)
  });
  const loginAccountMutatin = useMutation({
    mutationFn: (body: FormDataLogin) => loginAccount(body),
  })
  const { user, isSuccess } = useSelector((state: { auth: AuthState }) => state.auth)


  const onSubmit = handleSubmit((data: FormDataLogin) => {
    setIsLoading(true)
    const body = data;

    loginAccountMutatin.mutate(body, {
      onSuccess: ({ data }) => {

        dispatch(LOGIN(data.result))
        localStorage.setItem('user', JSON.stringify(data.result))
        setIsLoading(false)
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.log(error.response.data)
        const formError = error.response.data

        const { message, path } = formError

        const field = path || message.split(' ')[0].toLowerCase()
        setError(field as keyof FormDataLogin, {
          type: "manual",
          message: message,
        });
        setIsLoading(false)
      }
    })
  })

  useEffect(() => {
    if (isSuccess && user.email) {
      navigate('/admin')
    }
  }, [user, isSuccess, navigate])


  return (
    <>
      <Header isLogo={true} />
      <section className="content-main mt-80 mb-80">
        <div className="card mx-auto card-login">
          <div className="card-body">
            <h4 className="card-title mb-4">Sign in</h4>
            <form action="" onSubmit={onSubmit}>
              <InputLogin type="text"
                name="email" placeholder="Username or email" classname="mb-3"
                register={register} errorMessage={errors.email?.message}
              />
              <InputLogin type="password"
                name="password" placeholder="Password" classname="mb-3"
                register={register} errorMessage={errors.password?.message}
              />
              <div className="mb-3">
                <Link to="/forgot-password" className="float-end font-sm text-muted">Forgot password?</Link>
                <label className="form-check" onClick={() => setIsRemenber(!isRemenber)}>
                  <input type="checkbox" className="form-check-input" defaultChecked={!isRemenber ? false : true} />
                  <span className="form-check-label">Remember</span>
                </label>
              </div>

              <div className="mb-4">
                <Button type="submit" isLoading={isLoading} className="btn btn-primary w-100 center-flex" style={{ fontWeight: "bold" }} >
                  Login
                </Button>
              </div>

            </form>
            <p className="text-center small text-muted mb-15">or sign up with</p>
            <div className="d-grid gap-3 mb-4">
              <Link to="/google-login" className="btn w-100 btn-light font-sm">
                <svg aria-hidden="true" className="icon-svg" width="20" height="20" viewBox="0 0 20 20">
                  <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path>
                  <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z" fill="#34A853"></path>
                  <path d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" fill="#FBBC05"></path>
                  <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z" fill="#EA4335"></path>
                </svg>
                Sign in using Google
              </Link>
              <Link to="/facebook-login" className="btn w-100 btn-light font-sm">
                <svg aria-hidden="true" className="icon-svg" width="20" height="20" viewBox="0 0 20 20">
                  <path d="M3 1a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2V3a2 2 0 00-2-2H3zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5z" fill="#4167B2"></path>
                </svg>
                Sign in using Facebook
              </Link>
            </div>
            <p className="text-center mb-4">Don't have account? <a href="#">Sign up</a></p>
          </div>
        </div>
      </section>
    </>
  )
}
