import NavbarLink  from "./NavbarLink";

import '../styles/dagshub.css';

export interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
    return <nav className="dagshub navbar">
        <NavbarLink href='/issues'>Issues</NavbarLink>
        <NavbarLink href='/pulls'>Pull Requests</NavbarLink>
        <NavbarLink href='/resources'>
            <ul>
                <li><p>
                    This is a list inside a Link
                </p></li>
                <li><p>
                    Just an example
                </p></li>
            </ul>
        </NavbarLink>
        <NavbarLink href='/explore/repos'>Explore</NavbarLink>
        <NavbarLink href='/pricing'>Pricing</NavbarLink>
    </nav>
}