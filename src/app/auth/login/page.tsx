"use client";

import { useDispatch } from "react-redux";
import { setProfile, setToken } from "@/redux/slices/AuthSlice";
import { useEffect, useState } from "react";
import { store } from "@/redux/store";
import services from "@/services/Index";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { EXPIRES_COOKIE_DAY } from "@/constants/application";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DATE_REGISTER_ACCOUNT } from "@/constants/application";
import moment from "moment";
import VALIDATION from "@/constants/validation";
import HTTP_CODE from "@/constants/http-code";
import RESPONSE_CODE from "@/constants/response-code";
import { DataUserLoginSuccess } from "@/types";
import Link from "next/link";
import { useValidator } from "@/helpers/validation";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState(Array<string>);
  const [errorMessagesRegister, setErrorMessagesRegister] = useState(
    Array<string>
  );
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSucess] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [dayOfBirthArray, setDayOfBirthArray] = useState(Array<number>);
  const [monthOfBirthArray, setMonthOfBirthArray] = useState(Array<number>);
  const [yearOfBirthArray, setYearOfBirthArray] = useState(Array<number>);
  const [surName, setSurName] = useState("");
  const [name, setName] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState(moment().date());
  const [monthOfBirth, setMonthOfBirth] = useState(moment().month() + 1);
  const [yearOfBirth, setYearOfBirth] = useState(moment().year());
  const [gender, setGender] = useState(1);
  const [showModalVerifyOTP, setShowModalVerifyOTP] = useState(false);
  const [codeOTP, setCodeOTP] = useState("");
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [failVerify, setFailVerify] = useState(false);
  const [errorMessageVerifyOTP, setErrorMessageVerifyOTP] = useState([]);
  const [validateMessageEmailBeforeSubmit, setValidateMessageEmailBeforeSubmit] = useState("");
  const [validateMessagePasswordBeforeSubmit, setValidateMessagePasswordBeforeSubmit] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();
  const validateHelper = useValidator();

  const login: Function = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!validateLoginForm()) {
        return ;
      }

      setLoading(true);
      let res = await services.auth.login({
        email: email,
        password: password,
        remember_me: false,
      });

      loginSuccessAndRedirectToHome(res);
    } catch (error: any) {
      if (
        error.code == HTTP_CODE.FORBIDDEN &&
        error.codeEnumError == RESPONSE_CODE.AUTH.EMAIL_NOT_VERIFY
      ) {
        setCodeOTP("");
        setShowModalVerifyOTP(true);
      }
      setLoading(false);
      setErrorMessages(error.message);
    }
  };

  const validateLoginForm: Function = () => {
    let isPassAllValidate: boolean = true;
    let validateMessageDefault: string = "";
    let validateMessagePasswordDefault: string = "";
    let requiredEmail = validateHelper.required(email, "Email");
    let isLengthEmail = validateHelper.isLength(
      email,
      "Email",
      VALIDATION.EMAIL.MIN_LENGTH,
      VALIDATION.EMAIL.MAX_LENGTH
    );
    let inValidEmail = validateHelper.isInvalidEmail(email, true);
    let requiredPassword = validateHelper.required(password, "Mật khẩu");
    let isLengthPassword = validateHelper.isLength(
      password,
      "Mật khẩu",
      VALIDATION.PASSWORD.MIN_LENGTH,
      VALIDATION.PASSWORD.MAX_LENGTH
    );

    validateMessageDefault = requiredEmail === true ? "" : requiredEmail;
    isPassAllValidate = isPassAllValidate && requiredEmail === true;

    validateMessageDefault = isLengthEmail === true ? "" : isLengthEmail;
    isPassAllValidate = isPassAllValidate && isLengthEmail === true;
    
    validateMessageDefault = (validateMessageDefault.length > 0  ? 
      validateMessageDefault : (inValidEmail === true ? "" : "Định dạng email sai"));
    isPassAllValidate = isPassAllValidate && inValidEmail === true;

    validateMessagePasswordDefault = requiredPassword === true ? "" : requiredPassword;
    isPassAllValidate = isPassAllValidate && requiredPassword === true;

    validateMessagePasswordDefault = isLengthPassword === true ? "" : isLengthPassword;
    isPassAllValidate = isPassAllValidate && isLengthPassword === true;

    setValidateMessageEmailBeforeSubmit(validateMessageDefault);
    setValidateMessagePasswordBeforeSubmit(validateMessagePasswordDefault);

    return isPassAllValidate;
  };

  const loginSuccessAndRedirectToHome: Function = (
    res: DataUserLoginSuccess
  ) => {
    dispatch(setToken(res.data.token));
    setCookie("isLogined", true, {
      expires: new Date(new Date().getTime() + EXPIRES_COOKIE_DAY),
    });
    setCookie("token", res.data.token, {
      expires: new Date(new Date().getTime() + EXPIRES_COOKIE_DAY),
    });
    dispatch(
      setProfile({
        id: res.data.user.id,
        userName: res.data.user.first_name + " " + res.data.user.last_name,
        avatar: res.data.user.avatar,
      })
    );
    setCookie("userProfile", JSON.stringify({
      id: res.data.user.id,
      userName: res.data.user.first_name + " " + res.data.user.last_name,
      avatar: res.data.user.avatar,
    }), {
      expires: new Date(new Date().getTime() + EXPIRES_COOKIE_DAY)
    });

    setLoading(false);
    setLoginSucess(true);
    router.push("/");
  };

  const checkIsLogined: Function = () => {
    if (store.getState().auth.isLogined == "true") {
      router.push("/");
    }
  };

  const handleCloseNotification: Function = () => {
    setLoginSucess(false);
  };

  const handleClickOpenModalRegister: Function = () => {
    setOpenModalRegister(true);
  };

  const handleCloseModalRegister: Function = () => {
    setOpenModalRegister(false);
  };

  const register: Function = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    setOpenModalRegister(false);

    try {
      let res;
      res = await services.auth.registerUser({
        first_name: surName,
        last_name: name,
        email: emailRegister,
        password: passwordRegister,
        day_of_birth: dayOfBirth,
        month_of_birth: monthOfBirth,
        year_of_birth: yearOfBirth,
        gender: gender,
      });

      setLoading(false);
      router.push("/auth/verify-email/" + res.data.id);
    } catch (error: any) {
      setOpenModalRegister(true);
      setLoading(false);
      setErrorMessagesRegister(error.message);
    }
  };

  const setTimeOfBirthArrayFromConfig = () => {
    const arrayDate: number[] = Array.from(
      { length: DATE_REGISTER_ACCOUNT.COUNT_DATE_OF_MONTH },
      (_, index) => index + 1
    );

    const arrayMonth: number[] = Array.from(
      { length: DATE_REGISTER_ACCOUNT.COUNT_MONTH_OF_YEAR },
      (_, index) => index + 1
    );

    const arrayYear: number[] = Array.from(
      {
        length:
          moment().year() - DATE_REGISTER_ACCOUNT.MIN_YEAR_REGISTER_ACCOUNT + 1,
      },
      (_, index) => DATE_REGISTER_ACCOUNT.MIN_YEAR_REGISTER_ACCOUNT + index
    );

    setDayOfBirthArray(arrayDate);
    setMonthOfBirthArray(arrayMonth);
    setYearOfBirthArray(arrayYear);
  };

  const verifyEmailOTPAfterLogin: Function = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    setShowModalVerifyOTP(false);

    try {
      let res;
      res = await services.auth.verifyEmailAfterLogin({
        email: email,
        verify_code: codeOTP,
      });
      setVerifySuccess(true);
      setLoading(false);
      loginSuccessAndRedirectToHome(res);
    } catch (error: any) {
      setFailVerify(true);
      setLoading(false);
      setErrorMessageVerifyOTP(error.message.slice());
      setShowModalVerifyOTP(true);
    }
  };

  const handleCloseModalVerifyOTP: Function = () => {
    setShowModalVerifyOTP(false);
  };

  useEffect(() => {
    checkIsLogined();
    setTimeOfBirthArrayFromConfig();
  }, []);

  return (
    <main>
      {/* alert and notification  */}
      <Snackbar
        open={loginSuccess}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Đăng nhập thành công!
        </Alert>
      </Snackbar>
      <Snackbar open={failVerify} autoHideDuration={1000}>
        <Alert
          severity={!verifySuccess ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {!verifySuccess ? errorMessageVerifyOTP : "Xác thực thành công!"}
        </Alert>
      </Snackbar>
      {loading && (
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress />
        </Backdrop>
      )}
      {/* end alert and notification  */}
      <section className="text-gray-600 body-font bg-gray-100">
        <div className="container xl:px-32 px-5 py-36 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-bold lg:text-7xl text-6xl text-blue-600 text-center md:text-left ">
              fakebook
            </h1>
            <p className="leading-relaxed mt-4 lg:text-3xl text-2xl lg:max-w-xl font-medium  text-black text-center md:text-left ">
              fakebook helps you connect and share with the people in your life.
            </p>
          </div>
          <form
            className="lg:w-2/6 md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
            onSubmit={login}
          >
            {errorMessages.length > 0 && (
              <div className="mb-4">
                {errorMessages.map((errorMessage, index) => (
                  <Alert key={index} severity="error">
                    {errorMessage}
                  </Alert>
                ))}
              </div>
            )}
            <div className="relative mb-4">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {validateMessageEmailBeforeSubmit.length > 0 && (
              <div className="mb-4">
                <Alert severity="error">
                  {validateMessageEmailBeforeSubmit}
                </Alert>
              </div>
            )}
            <div className="relative mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {validateMessagePasswordBeforeSubmit.length > 0 && (
                <div className="mb-4">
                  <Alert severity="error">
                    {validateMessagePasswordBeforeSubmit}
                  </Alert>
                </div>
              )}
            </div>
            <button
              id="submit-login"
              className="text-white border-0 py-2 px-8 focus:outline-none font-medium  rounded text-xl bg-blue-600 "
            >
              Log In
            </button>
            <Link
              href={"/auth/forgot-password"}
              className="text-sm text-blue-500 mt-5 block mx-auto max-w-max"
            >
              Quên mật khẩu?
            </Link>
            <hr className="my-5" />
            <Button
              variant="outlined"
              onClick={handleClickOpenModalRegister}
              className="text-white border-0 py-2 px-8 hover:bg-green-500 focus:outline-none font-medium rounded text-xl bg-green-400"
            >
              Tạo tài khoản mới
            </Button>
          </form>
          <Dialog
            open={openModalRegister}
            onClose={handleCloseModalRegister}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Đăng ký"}</DialogTitle>
            <DialogContent>
              <form
                className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                onSubmit={register}
              >
                {errorMessagesRegister.length > 0 && (
                  <div className="mb-2 col-span-full">
                    {errorMessagesRegister.map((errorMessage, index) => (
                      <Alert
                        key={index}
                        severity="error"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {errorMessage}
                      </Alert>
                    ))}
                  </div>
                )}
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      type="text"
                      name="sur-name"
                      placeholder="Họ"
                      minLength={2}
                      maxLength={25}
                      id="sur-name"
                      value={surName}
                      onChange={(e) => setSurName(e.target.value)}
                      required
                      autoComplete="given-name"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Tên"
                      id="name"
                      minLength={2}
                      maxLength={25}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="family-name"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <div className="">
                    <input
                      type="email"
                      name="email-register"
                      placeholder="Địa chỉ email"
                      id="email-register"
                      minLength={6}
                      maxLength={255}
                      value={emailRegister}
                      onChange={(e) => setEmailRegister(e.target.value)}
                      autoComplete="given-name"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <div className="">
                    <input
                      type="password"
                      name="password-register"
                      placeholder="Mật khẩu mới"
                      id="password-register"
                      minLength={8}
                      maxLength={25}
                      required
                      value={passwordRegister}
                      onChange={(e) => setPasswordRegister(e.target.value)}
                      autoComplete="given-name"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <legend className="sm:col-span-6 text-sm font-semibold leading-6 text-gray-900">
                  Ngày sinh
                </legend>
                <div className="sm:col-span-2">
                  <div className="">
                    <select
                      name="day-of-birth"
                      placeholder="Mật khẩu mới"
                      id="day-of-birth-register"
                      autoComplete="given-name"
                      value={dayOfBirth}
                      onChange={(e) => setDayOfBirth(parseInt(e.target.value))}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {dayOfBirthArray.map((option, index) => (
                        <option
                          key={index}
                          value={option}
                          className="text-center"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="">
                    <select
                      name="month-of-birth"
                      placeholder="Mật khẩu mới"
                      id="month-of-birth-register"
                      autoComplete="given-name"
                      value={monthOfBirth}
                      onChange={(e) =>
                        setMonthOfBirth(parseInt(e.target.value))
                      }
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {monthOfBirthArray.map((option, index) => (
                        <option
                          key={index}
                          value={option}
                          className="text-center"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="">
                    <select
                      name="year-of-birth"
                      id="year-of-birth-register"
                      autoComplete="given-name"
                      value={yearOfBirth}
                      onChange={(e) => setYearOfBirth(parseInt(e.target.value))}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {yearOfBirthArray.map((option, index) => (
                        <option
                          key={index}
                          value={option}
                          className="text-center"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <legend className="sm:col-span-6 text-sm font-semibold leading-6 text-gray-900">
                  Giới tính
                </legend>
                <div className="sm:col-span-2">
                  <>
                    <input
                      id="men-gender"
                      name="gender"
                      type="radio"
                      value={1}
                      checked={gender == 1}
                      onChange={(e) => setGender(parseInt(e.target.value))}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="men-gender"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nam
                    </label>
                  </>
                </div>
                <div className="sm:col-span-2">
                  <>
                    <input
                      id="female-gender"
                      name="gender"
                      type="radio"
                      value={0}
                      checked={gender == 0}
                      onChange={(e) => setGender(parseInt(e.target.value))}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="female-gender"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nữ
                    </label>
                  </>
                </div>
                <div className="sm:col-span-6">
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Những người dùng dịch vụ của chúng tôi có thể đã tải thông
                    tin liên hệ của bạn lên fakebook.
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính
                    sách quyền riêng tư và Chính sách cookie của chúng tôi. Bạn
                    có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận
                    bất kỳ lúc nào.
                  </p>
                </div>
                <div className="sm:col-span-6 flex justify-center">
                  <Button
                    type="submit"
                    variant="outlined"
                    className="text-white border-0 py-2 px-8 hover:bg-green-500 focus:outline-none font-medium rounded text-xl bg-green-400"
                  >
                    Đăng ký
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          {/* modal show confirm otp */}
          <Dialog
            open={showModalVerifyOTP}
            onClose={handleCloseModalVerifyOTP}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Xác thực email"}
            </DialogTitle>
            <DialogContent>
              <form
                className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12"
                onSubmit={verifyEmailOTPAfterLogin}
              >
                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nhập OTP
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="verify-otp"
                      id="street-verify"
                      autoComplete="verify"
                      placeholder="OTP gồm 6 số"
                      value={codeOTP}
                      min={VALIDATION.OTP.MIN_VALUE}
                      max={VALIDATION.OTP.MAX_VALUE}
                      onChange={(e) => setCodeOTP(e.target.value)}
                      required
                      className="pl-2 pr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full flex justify-center">
                  <Button
                    type="submit"
                    variant="outlined"
                    className="text-white border-0 py-2 px-8 hover:bg-green-500 focus:outline-none font-medium rounded text-xl bg-green-400"
                  >
                    Xác thực
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          {/* end modal show confirm otp */}
          <div className="lg:w-2/6 md:w-1/2 bg-transparent rounded-lg p-8 flex flex-col md:ml-auto w-full mt-3 md:mt-0">
            <p className="text-sm text-gray-700 mt-3 text-center">
              <b>Create a Page</b> for a celebrity, band or business
            </p>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6">
        <div className="mt-10 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-blue-700 font-bold mb-2">
              Responsive fakebook Login clone © 2023 Created by Namdv
            </p>
          </div>
        </div>
      </div>
      <footer className="rounded-lg m-8">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
