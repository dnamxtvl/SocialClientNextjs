"use client";

import * as React from "react";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Link from "next/link";
import services from "@/services/Index";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearToken } from "@/redux/slices/AuthSlice";
import HTTP_CODE from "@/constants/http-code";
import { deleteCookie } from "cookies-next";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open: boolean = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const [logoutSuccess, setLogoutSucess] = useState(false);
  const handleClickMenuNavbar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const handleCloseMenuNavbar = () => {
    setAnchorEl(null);
  };

  const options: Array<Object> = [
    {
      icon: AccountCircleIcon,
      label: "Trang cá nhân",
      link: "/profile",
    },
    {
      icon: SettingsIcon,
      label: "Cài đặt và riêng tư",
      link: "/settings",
    },
    {
      icon: BookmarkIcon,
      label: "Nhật ký",
      link: "/allactivity",
    },
  ];

  const ITEM_HEIGHT: number = 48;

  const logout = async () => {
    setLoading(true);
    try {
      let res;
      res = await services.auth.logout();
      removeToken();
      setLoading(false);
      router.push("/auth/login");
    } catch (error: any) {
      setLoading(false);
      setLogoutSucess(true);
      if (error.code == HTTP_CODE.UNAUTHORIZED) {
        removeToken();
        setTimeout(function () {
          router.push("/auth/login");
        }, 2000);
      }
    }
  };

  const removeToken = () => {
    dispatch(clearToken());
    deleteCookie("isLogined");
    deleteCookie("token");
  };

  const handleCloseNotification: Function = () => {
    setLogoutSucess(false);
  };

  return (
    <main>
      <Snackbar
        open={logoutSuccess}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Đã xảy ra lỗi!
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
      <header className="bg-white shadow fixed z-20 w-full h-14 flex justify-between items-center">
        <section className="w-80 h-full flex items-center justify-start px-4">
          <a href="#" className="mr-2">
            <svg
              viewBox="0 0 36 36"
              fill="url(#jsc_s_b)"
              height={40}
              width={40}
            >
              <defs>
                <linearGradient
                  x1="50%"
                  x2="50%"
                  y1="97.0782153%"
                  y2="0%"
                  id="jsc_s_b"
                >
                  <stop offset="0%" stopColor="#0062E0" />
                  <stop offset="100%" stopColor="#19AFFF" />
                </linearGradient>
              </defs>
              <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" />
              <path
                d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
                fill="#fff"
              />
            </svg>
          </a>
          <div className="relative">
            <svg
              className="absolute top-3 left-3"
              fill="#666666"
              viewBox="0 0 16 16"
              width="1em"
              height="1em"
            >
              <g fillRule="evenodd" transform="translate(-448 -544)">
                <g fillRule="nonzero">
                  <path
                    d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                    transform="translate(448 544)"
                  />
                  <path
                    d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                    transform="translate(448 544)"
                  />
                  <path
                    d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                    transform="translate(448 544)"
                  />
                  <path
                    d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                    transform="translate(448 544)"
                  />
                </g>
              </g>
            </svg>
            <input
              type="text"
              placeholder="Search Facebook"
              className="bg-[#f0f2f5] rounded-full pl-9 pr-2 py-2 text-[#050505] font-light outline-0 placeholder:text-gray-500 placeholder:font-light placeholder:leading-6 placeholder:text-[15px]"
            />
          </div>
        </section>
        <section className="center-menu h-full w-[590px]">
          <ul className="h-full flex justify-between items-center">
            <li className="h-full w-[112px] active lg:ml-[-6rem]">
              <a
                href="#"
                className="h-full border-y-[3px] border-t-transparent border-[#1b74e4] flex items-center justify-center"
                title="Home"
              >
                <svg viewBox="0 0 28 28" height={28} width={28} fill="#1b74e4">
                  <path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29" />
                </svg>
              </a>
            </li>
            <li className="h-full w-[132px]">
              <a
                href="#"
                className="h-full border-x-8 border-y-4 border-transparent rounded-2xl hover:bg-[#f0f2f5] hover:border-white flex items-center justify-center"
                title="Watch"
              >
                <svg viewBox="0 0 28 28" fill="#65676B" height={28} width={28}>
                  <path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.163 11.654C17.612 11.924 17.612 12.575 17.163 12.846ZM21.75 20.25C22.992 20.25 24 19.242 24 18L24 6.5C24 5.258 22.992 4.25 21.75 4.25L6.25 4.25C5.008 4.25 4 5.258 4 6.5L4 18C4 19.242 5.008 20.25 6.25 20.25L21.75 20.25ZM21.75 21.75 6.25 21.75C4.179 21.75 2.5 20.071 2.5 18L2.5 6.5C2.5 4.429 4.179 2.75 6.25 2.75L21.75 2.75C23.821 2.75 25.5 4.429 25.5 6.5L25.5 18C25.5 20.071 23.821 21.75 21.75 21.75Z" />
                </svg>
              </a>
            </li>
            <li className="h-full w-[132px]">
              <a
                href="#"
                className="h-full border-x-8 border-y-4 border-transparent rounded-2xl hover:bg-[#f0f2f5] hover:border-white flex items-center justify-center"
                title="Marketplace"
              >
                <svg viewBox="0 0 28 28" fill="#65676B" height={28} width={28}>
                  <path d="M17.5 23.75 21.75 23.75C22.164 23.75 22.5 23.414 22.5 23L22.5 14 22.531 14C22.364 13.917 22.206 13.815 22.061 13.694L21.66 13.359C21.567 13.283 21.433 13.283 21.34 13.36L21.176 13.497C20.591 13.983 19.855 14.25 19.095 14.25L18.869 14.25C18.114 14.25 17.382 13.987 16.8 13.506L16.616 13.354C16.523 13.278 16.39 13.278 16.298 13.354L16.113 13.507C15.53 13.987 14.798 14.25 14.044 14.25L13.907 14.25C13.162 14.25 12.439 13.994 11.861 13.525L11.645 13.35C11.552 13.275 11.419 13.276 11.328 13.352L11.155 13.497C10.57 13.984 9.834 14.25 9.074 14.25L8.896 14.25C8.143 14.25 7.414 13.989 6.832 13.511L6.638 13.351C6.545 13.275 6.413 13.275 6.32 13.351L5.849 13.739C5.726 13.84 5.592 13.928 5.452 14L5.5 14 5.5 23C5.5 23.414 5.836 23.75 6.25 23.75L10.5 23.75 10.5 17.5C10.5 16.81 11.06 16.25 11.75 16.25L16.25 16.25C16.94 16.25 17.5 16.81 17.5 17.5L17.5 23.75ZM3.673 8.75 24.327 8.75C24.3 8.66 24.271 8.571 24.238 8.483L23.087 5.355C22.823 4.688 22.178 4.25 21.461 4.25L6.54 4.25C5.822 4.25 5.177 4.688 4.919 5.338L3.762 8.483C3.729 8.571 3.7 8.66 3.673 8.75ZM24.5 10.25 3.5 10.25 3.5 12C3.5 12.414 3.836 12.75 4.25 12.75L4.421 12.75C4.595 12.75 4.763 12.69 4.897 12.58L5.368 12.193C6.013 11.662 6.945 11.662 7.59 12.193L7.784 12.352C8.097 12.609 8.49 12.75 8.896 12.75L9.074 12.75C9.483 12.75 9.88 12.607 10.194 12.345L10.368 12.2C11.01 11.665 11.941 11.659 12.589 12.185L12.805 12.359C13.117 12.612 13.506 12.75 13.907 12.75L14.044 12.75C14.45 12.75 14.844 12.608 15.158 12.35L15.343 12.197C15.989 11.663 16.924 11.663 17.571 12.197L17.755 12.35C18.068 12.608 18.462 12.75 18.869 12.75L19.095 12.75C19.504 12.75 19.901 12.606 20.216 12.344L20.38 12.208C21.028 11.666 21.972 11.666 22.62 12.207L23.022 12.542C23.183 12.676 23.387 12.75 23.598 12.75 24.097 12.75 24.5 12.347 24.5 11.85L24.5 10.25ZM24 14.217 24 23C24 24.243 22.993 25.25 21.75 25.25L6.25 25.25C5.007 25.25 4 24.243 4 23L4 14.236C2.875 14.112 2 13.158 2 12L2 9.951C2 9.272 2.12 8.6 2.354 7.964L3.518 4.802C4.01 3.563 5.207 2.75 6.54 2.75L21.461 2.75C22.793 2.75 23.99 3.563 24.488 4.819L25.646 7.964C25.88 8.6 26 9.272 26 9.951L26 11.85C26 13.039 25.135 14.026 24 14.217ZM16 23.75 16 17.75 12 17.75 12 23.75 16 23.75Z" />
                </svg>
              </a>
            </li>
            <li className="h-full w-[132px]">
              <a
                href="#"
                className="h-full border-x-8 border-y-4 border-transparent rounded-2xl hover:bg-[#f0f2f5] hover:border-white flex items-center justify-center"
                title="Groups"
              >
                <svg viewBox="0 0 28 28" fill="#65676B" height={28} width={28}>
                  <path d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.274 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.878 19L21.364 19C21.139 19 20.97 18.802 20.997 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.667 15.491 20.067 14.591 19.899 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.441 13.5 12.828 13.5L15.172 13.5ZM16.75 9C16.75 10.655 15.517 12 14 12 12.484 12 11.25 10.655 11.25 9 11.25 7.15 12.304 6 14 6 15.697 6 16.75 7.15 16.75 9Z" />
                </svg>
              </a>
            </li>
            <li className="h-full w-[132px]">
              <a
                href="#"
                className="h-full border-x-8 border-y-4 border-transparent rounded-2xl hover:bg-[#f0f2f5] hover:border-white flex items-center justify-center"
                title="Gaming"
              >
                <svg
                  fill="#65676B"
                  viewBox="0 0 28 28"
                  width={34}
                  height={34}
                  className="relative top-1 left-1"
                >
                  <g fillRule="evenodd" transform="translate(-444 -204)">
                    <g>
                      <path
                        fillRule="nonzero"
                        d="M98.5 5.75v4a.75.75 0 1 0 1.5 0v-4a.75.75 0 1 0-1.5 0z"
                        transform="translate(351.5 208.5)"
                      />
                      <path
                        fillRule="nonzero"
                        d="M97.25 8.5h4a.75.75 0 1 0 0-1.5h-4a.75.75 0 1 0 0 1.5z"
                        transform="translate(351.5 208.5)"
                      />
                      <path
                        fillRule="nonzero"
                        d="M109.5 14.5h-10a7 7 0 0 1 0-14h10a7 7 0 0 1 0 14zm0-1.5a5.5 5.5 0 0 0 0-11h-10a5.5 5.5 0 0 0 0 11h10z"
                        transform="translate(351.5 208.5)"
                      />
                      <path
                        d="M109 9.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0m3-3a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0"
                        transform="translate(351.5 208.5)"
                      />
                    </g>
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </section>
        <section className="h-full pr-3">
          <ul className="h-full flex justify-between items-center">
            <li className="w-[49px] h-full flex items-center justify-center border-x-8 border-y-8 border-transparent">
              <a
                href="#"
                className="bg-[#E4E6EB] hover:bg-[#d5d8e0] p-2.5 rounded-full"
                title="Create"
              >
                <svg fill="#050505" viewBox="0 0 20 20" width={20} height={20}>
                  <g fillRule="evenodd" transform="translate(-446 -350)">
                    <g fillRule="nonzero">
                      <path
                        d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
                        transform="translate(354.5 159.5)"
                      />
                      <path
                        d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                        transform="translate(354.5 159.5)"
                      />
                    </g>
                  </g>
                </svg>
              </a>
            </li>
            <li className="w-[49px] h-full flex items-center justify-center border-x-8 border-y-8 border-transparent">
              <a
                href="#"
                className="bg-[#E4E6EB] hover:bg-[#d5d8e0] p-2.5 rounded-full"
                title="Messages"
              >
                <svg viewBox="0 0 28 28" fill="#050505" height={20} width={20}>
                  <path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z" />
                </svg>
              </a>
            </li>
            <li className="w-[49px] h-full flex items-center justify-center border-x-8 border-y-8 border-transparent">
              <a
                href="#"
                className="bg-[#E4E6EB] hover:bg-[#d5d8e0] p-2.5 rounded-full"
                title="Notifications"
              >
                <svg viewBox="0 0 28 28" fill="#050505" height={20} width={20}>
                  <path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z" />
                </svg>
              </a>
            </li>
            <li className="w-[49px] h-full flex items-center justify-center">
              <Button
                aria-label="more"
                id="long-button-show-right-header-dropdown"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClickMenuNavbar}
              >
                <img
                  src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/927.jpg"
                  width={40}
                  height={40}
                  alt="Account"
                  className="rounded-full"
                />
              </Button>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button-show-right-header-dropdown",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenuNavbar}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.label} onClick={handleCloseMenuNavbar}>
                    <option.icon />
                    <Link href={option.link}>{option.label}</Link>
                  </MenuItem>
                ))}
                <MenuItem key="logout" onClick={logout} id="button-logout">
                  <LogoutIcon />
                  Đăng xuất
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </section>
      </header>
    </main>
  );
}
