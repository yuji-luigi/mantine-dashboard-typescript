import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
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
