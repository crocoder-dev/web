import type { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

type NavigationLinkButtonProperties = React.PropsWithChildren<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
>;

type CustomLinkButtonProperties = {
  color: keyof typeof colorStyles;
};

type NavigationButtonProperties = React.PropsWithChildren<
  NavigationLinkButtonProperties & CustomLinkButtonProperties
>;

const defaultStyles = `
  flex
  font-medium
  h-[45px]
  items-center
  px-4
  py-2
  rounded-md
  text-base
  text-center
  whitespace-nowrap
`;

const colorStyles = {
  gray: 'bg-[#545664] text-[#ffffff] hover:opacity-90',
  yellow: 'bg-[#FEC343] text-[#1E1A1A] hover:opacity-90',
}

export const NavigationLinkButton = ({
  children,
  className,
  color,
  ...properties
}: NavigationButtonProperties) => {
  return (
    <a
      className={`
      ${defaultStyles} 
      ${colorStyles[color]}
      ${className}`}
      {...properties}
    >
      {children}
    </a>
  );
};
