export const useLocalStorage = () => {

    const setLocalStorage = (key: string, value: any) => localStorage.setItem(key, value)
    
    const getLocalStorage = (key: string) => localStorage.getItem(key)
    
  return { getLocalStorage, setLocalStorage }
}
