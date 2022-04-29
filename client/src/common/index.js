import React, {
  useRef,
  Suspense,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  forwardRef,
} from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import {
  motion,
  motionValue,
  AnimatePresence,
  useViewportScroll,
  useSpring,
  useTransform,
  usePresence,
  useAnimation,
} from "framer-motion";
import styled from "styled-components";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import { useInView } from "react-intersection-observer";

import AsyncBoundary from "./components/AsyncBoundary";
import ErrorNotice from "./components/ErrorNotice";
import Background from "./components/Background";
import Spinner from "./components/Spinner";
import LoadingBox from "./components/LoadingBox";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Input from "./components/Input";
import Div from "./components/Div";
import Logo from "./components/Logo";
import VideoLogo from "./components/VideoLogo";

import useInput from "../hooks/useInput";
import useFetch from "../hooks/useFetch";
import useInitialEffect from "../hooks/useInitialEffect";
import useErrorBang from "../hooks/useErrorBang";
import useFocus from "../hooks/useFocus";

import validate from "./functions/validate";
import getToken, { getTokenHeader } from "./functions/getToken";
import setToken from "./functions/setToken";
import toSummary from "./functions/toSummary";

export * from "./constants";
export * from "../store";

// Functions
export { validate, getToken, getTokenHeader, setToken, toSummary };

// Custom Components
export {
  AsyncBoundary,
  ErrorNotice,
  Background,
  Spinner,
  LoadingBox,
  Footer,
  Button,
  Input,
  Div,
  Logo,
  VideoLogo,
};

// Hooks
export {
  useDispatch,
  useSelector,
  useSWR,
  useInput,
  useFetch,
  useInitialEffect,
  useErrorBang,
  useFocus,
};

// React
export {
  React,
  ReactDOM,
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useRef,
  useState,
  useEffect,
  useCallback,
  useNavigate,
  useLocation,
  useLayoutEffect,
  useSearchParams,
  useParams,
  Suspense,
  forwardRef,
};

// Etc
export {
  motion,
  motionValue,
  useViewportScroll,
  useSpring,
  useTransform,
  useAnimation,
  AnimatePresence,
  styled,
  SWRConfig,
  useSWRConfig,
  ErrorBoundary,
  useErrorHandler,
  usePresence,
  useInView,
};
