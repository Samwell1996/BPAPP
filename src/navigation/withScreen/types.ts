import { ReactNode } from 'react';

export type RouteObjectProps = {
  children: ReactNode;
  params?: Record<string, any>;
};

export interface RouteObjectContextValue {
  name: string;
  key: string;
  rabbitHoleKey: string;
  previousRouteNameInStack?: string;
  [key: string]: any;
}
