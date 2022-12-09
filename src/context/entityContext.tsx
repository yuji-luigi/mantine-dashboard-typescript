import { createContext, ReactNode, useState } from "react";

export const EntityContext =
  createContext<IEntityContext>({
    overrideEntity:"",
    setOverrideEntity(entity: Sections){},
  });

const useStore = () => {
  const [overrideEntity, setOverrideEntity] = useState<Sections | ''>('');
  return {
  overrideEntity,
  setOverrideEntity,
  };
};

export const EntityContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
<EntityContext.Provider value={useStore()}>
    {children}
  </EntityContext.Provider>
);
