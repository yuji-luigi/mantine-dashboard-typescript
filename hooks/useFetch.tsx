export type FetchMethods = 'POST' | 'GET' | 'PUT' | 'PATCH';
const useFetch = async ({ path, method }: { path: string; method: FetchMethods }) => {
  const res = await fetch(path, {
    method,
  });
  const data = await res.json();
  return data;
};

export default useFetch;
