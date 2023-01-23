import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function SpecificTableCell({
  rowData,
  cellData,
  cellConfig,
}: {
  cellData: string;
  cellConfig: FormFieldInterface;
  rowData: any;
}) {
  const { query } = useRouter();

  return (
    <>
      {cellConfig.cellType === 'link-children' && (
        <Group spacing="sm">
          <Link href={`/dashboard/access/${query.entity as string}/${rowData._id}` || ''}>
            <Text size="sm" weight={500}>
              {cellData}
            </Text>
          </Link>
        </Group>
      )}
    </>
  );
}
