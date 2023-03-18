import { UseFormReturnType } from '@mantine/form';

export type UseFormReturnTypeCustom = UseFormReturnTypeWithMedia &
  UseFormReturnType<Record<string, unknown>>;
