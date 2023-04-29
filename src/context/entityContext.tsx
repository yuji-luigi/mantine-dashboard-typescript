import { createContext, ReactNode, useState } from 'react';
import { Sections } from '../types/general/data/sections-type';

export const EntityContext = createContext<IEntityContext>({
  overrideEntity: '',
  setOverrideEntity(entity: Sections) {},
});

const useStore = () => {
  const [overrideEntity, setOverrideEntity] = useState<Sections | ''>('');
  return {
    overrideEntity,
    setOverrideEntity,
  };
};

export const EntityContextProvider = ({ children }: { children: ReactNode }) => (
  <EntityContext.Provider value={useStore()}>{children}</EntityContext.Provider>
);
