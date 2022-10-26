import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { PropWithChildren } from '../../types/general/config';
import { MainHeader } from './MainHeader';

export function MainLayout(props: PropWithChildren) {
  return (
    <>
      <MainHeader />
      {props.children}
      <ColorSchemeToggle />
    </>
  );
}
