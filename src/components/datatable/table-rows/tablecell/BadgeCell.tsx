import { Badge, useMantineTheme } from '@mantine/core';
import TableCell from './TableCell';

export const colors: Record<string, string> = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
  __null: '',
};

const BadgeCell = ({
  cellConfig,
  cellData,
  color,
  rowData,
}: {
  cellConfig: FormFieldInterface;
  // TODO: type
  rowData: any;
  cellData: string;
  color: string;
}) => {
  const theme = useMantineTheme();
  return (
    <Badge
      color={colors[color || '__null']}
      variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
    >
      <TableCell cellData={cellData} cellConfig={cellConfig} rowData={rowData} />
    </Badge>
  );
};
export default BadgeCell;
