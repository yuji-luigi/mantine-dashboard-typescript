import { ColorSchemeToggle } from '../../components/color-schemeToggle/ColorSchemeToggle';
import AuthGuard from '../../guards/AuthGuard';
import GuestGuard from '../../guards/GuestGuard';
import { PropWithChildren } from '../../types/general/config';
import { HomepageHeader } from './HomepageHeader';
import { HomepageHeaderUpdated } from './HomepageHeaderUpdated';

export function HomepageLayout(props: PropWithChildren) {
  return (
    <>
      <HomepageHeader />
      {/* <HomepageHeaderUpdated /> */}
      {props.children}
      <ColorSchemeToggle />
    </>
  );
}
