export type WithClassName = {
  className?: string;
};

export type WithChildren = {
  children: React.ReactNode;
};

export type PropsWithClassName<T = object> = T & WithClassName;
export type PropsWithChildren<T = object> = T & WithChildren;
