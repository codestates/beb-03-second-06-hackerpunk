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
} from 'react-router-dom';

import styled from 'styled-components';
import useSWR, { SWRConfig } from 'swr';

import AsyncBoundary from './components/AsyncBoundary';
import ErrorNotice from './components/ErrorNotice';
import Background from './components/Background';
import Spinner from './components/Spinner';

import useInput from '../hooks/useInput';

// Custom Components
export { AsyncBoundary, ErrorNotice, Background, Spinner };

// Hooks
export { useSWR, useInput };

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
  Suspense,
};

// Etc
export { styled, SWRConfig };
