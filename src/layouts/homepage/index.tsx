import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { PropWithChildren } from '../../types/general/config';
import { HomepageHeader } from './HomepageHeader';

export function HomepageLayout(props: PropWithChildren) {
  return (
    <>
      <HomepageHeader />
      {props.children}
      <ColorSchemeToggle />
    </>
  );
}
