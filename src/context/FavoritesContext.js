import React, { createContext, useContext, useMemo, useState } from 'react';

const FavContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useState({}); // { [id]: true }

  const toggleFav = (id) => setFavs((p) => ({ ...p, [id]: !p[id] }));
  const clearFavs = () => setFavs({});

  const value = useMemo(() => ({
    favs,
    toggleFav,
    clearFavs,
    favIds: Object.keys(favs).filter((k) => favs[k]).map((k) => Number(k)),
  }), [favs]);

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export function useFavorites() {
  return useContext(FavContext);
}
