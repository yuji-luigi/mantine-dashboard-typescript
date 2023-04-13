import { ColorSchemeToggle } from '../../components/colorSchemeToggle/ColorSchemeToggle';
import { PropWithChildren } from '../../types/general/config';
import { HomepageHeader } from './MainPageHeader';

export function MainPageLayout(props: PropWithChildren) {
  return (
    <>
      <HomepageHeader />
      {props.children}
      <ColorSchemeToggle />
    </>
  );
}
