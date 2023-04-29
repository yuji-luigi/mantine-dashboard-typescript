import jwtDecode from 'jwt-decode';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// export const CurrentSpaceContext = createContext<CurrentSpaceContextState>({
//   currentSpace: null,
//   setCurrentSpace: (space: CurrentSpace | null) => {},
// });

// const useStore = () => {
//   const [currentSpace, setCurrentSpace] = useState<CurrentSpace | null>(null);

//   useEffect(() => {
//     if (!currentSpace) {
//       const spaceJWT = localStorage?.getItem('spaceToken');
//       const decodedSpace = spaceJWT ? jwtDecode<CurrentSpace>(spaceJWT) : null;
//       setCurrentSpace(decodedSpace);
//     }
//   }, []);

//   return {
//     currentSpace,
//     setCurrentSpace,
//   };
// };

// export const CurrentSpaceContextProvider = ({ children }: { children: ReactNode }) => (
//   <CurrentSpaceContext.Provider value={useStore()}>{children}</CurrentSpaceContext.Provider>
// );

// export const useCurrentSpaceContext = () => useContext(CurrentSpaceContext);
