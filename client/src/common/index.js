import React, {
  useRef,
  Suspense,
  useState,
  useEffect,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import useSWR, { SWRConfig } from 'swr';

import AsyncBoundary from './components/AsyncBoundary';
import ErrorNotice from './components/ErrorNotice';
import Background from './components/Background';
import Spinner from './components/Spinner';
import LoadingBox from './components/LoadingBox';
import Footer from './components/Footer';
import Button from './components/Button';
import Input from './components/Input';
import Div from './components/Div';

import useInput from '../hooks/useInput';
import useFetch from '../hooks/useFetch';
import useInitialEffect from '../hooks/useInitialEffect';
import useErrorBang from '../hooks/useErrorBang';

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
  Suspense,
};

// Etc
export {
  motion,
  AnimatePresence,
  styled,
  SWRConfig,
  ErrorBoundary,
  useErrorHandler,
};
