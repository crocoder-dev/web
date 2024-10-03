import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

type NavigationLinkProperties = React.PropsWithChildren<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
>;

export const NavigationLink = ({ children, ...properties }: NavigationLinkProperties) => {
  return <a className='font-medium text-lg text-[#E8E8E8] hover:text-white' {...properties}>{children}</a>
}