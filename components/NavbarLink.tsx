import Link from 'next/link';
import { ReactNode } from "react";

// import '../styles/dagshub.css';

export interface NavbarLinkProps {
    href: string,
    children: ReactNode,
}

export default function NavbarLink({ href, children }: NavbarLinkProps) {
    return <Link className='dagshub navbar_link' href={href}>{children}</Link>;
}
