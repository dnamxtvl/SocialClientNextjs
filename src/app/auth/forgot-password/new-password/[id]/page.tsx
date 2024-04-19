"use client";

import { useState } from "react";
import services from "@/services/Index";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import VALIDATION from "@/constants/validation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";

export default function setNewPasswordAfterForgot({
  params,
}: {
  params: { id: number };
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(Array<string>);
  const [newPassword, setNewPassword] = useState<string>("");
  const [failVerify, setFailVerify] = useState<boolean>(false);
  const [openModalChangePasswordSuccess, setopenModalChangePasswordSuccess] =
    useState<boolean>(false);
  const searchParams = useSearchParams();

  const setNewPasswordAfterForgot: Function = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      await services.auth.setNewPasswordAfterForgot({
        otp_id: params.id,
        password: newPassword,
        token: searchParams.get("token"),
      });

      setLoading(false);
      setVerifySuccess(true);
      setopenModalChangePasswordSuccess(true);
    } catch (error: any) {
      setFailVerify(true);
      setVerifySuccess(false);
      setErrorMessage(error.message.slice());
      setLoading(false);
    }
  };

  const handleCloseModalChangePasswordSuccess = () => {
    setopenModalChangePasswordSuccess(false);
  };

  const handleCloseModalAndRedirectLogin = () => {
    setopenModalChangePasswordSuccess(false);
    router.push("/auth/login");
  };

  return (
    <main>
      <Dialog
        open={openModalChangePasswordSuccess}
        onClose={handleCloseModalChangePasswordSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reset mật khẩu thành công!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn đã đổi mật khẩu thành công,hãy đăng nhập lại với mật khẩu mới!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalChangePasswordSuccess}>Hủy</Button>
          <Button onClick={handleCloseModalAndRedirectLogin} autoFocus>
            Đi đến đăng nhập
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={failVerify} autoHideDuration={1000}>
        <Alert
          severity={!verifySuccess ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {!verifySuccess ? errorMessage : "Đổi mật khẩu thành công!"}
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
      <div className="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">
        <div className="mail__wrapper max-w-md mx-auto">
          <div className="mail__content bg-white p-8 shadow-md">
            <div className="content__header text-center tracking-wide border-b">
              <div className="text-center text-sm font-bold">
                <h1 className="title-font font-bold lg:text-7xl text-6xl text-blue-600 text-center">
                  fakebook
                </h1>
              </div>
              <h1 className="text-3xl h-48 flex items-center justify-center text-green-500 font-mono">
                Mật khẩu mới
              </h1>
            </div>
            <form onSubmit={setNewPasswordAfterForgot}>
              <div className="content__body py-8 border-b">
                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mật khẩu mới
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="street-verify"
                      autoComplete="verify"
                      placeholder="Mật khẩu lớn hơn 8 ký tự"
                      value={newPassword}
                      minLength={VALIDATION.PASSWORD.MIN_LENGTH}
                      maxLength={VALIDATION.PASSWORD.MAX_LENGTH}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="pl-2 pr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white border-0 py-2 px-8 focus:outline-none mt-4 mb-4 font-medium rounded text-xl bg-green-600 text-center rounded w-full"
                >
                  Submit
                </button>
                <p className="text-sm">
                  Namdv Dev lỏ
                  <br /> Your The App team
                </p>
              </div>
            </form>
            <div className="content__footer mt-8 text-center text-grey-darker">
              <h3 className="text-base sm:text-lg mb-4">
                Cảm ơn bạn đã tin dùng!
              </h3>
              <p>www.fakebook.com</p>
            </div>
          </div>
          <div className="mail__meta text-center text-sm text-grey-darker mt-8">
            <div className="meta__social flex justify-center my-4">
              <a
                href="#"
                className="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center bg-black text-white rounded-full w-8 h-8 no-underline"
              >
                <i className="fab fa-twitter" />
              </a>
            </div>
            <div className="meta__help">
              <p className="leading-loose">
                Những câu hỏi hoặc sự liên quan?{" "}
                <a href="#" className="text-green-600 font-bold">
                  help@fakebook.com
                </a>
                <br /> Bạn muốn ngừng nhận thông tin cập nhật?{" "}
                <a href="#" className="text-red-600 font-bold">
                  Hãy đóng tài khoản
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
