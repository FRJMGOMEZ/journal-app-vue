

export const getEntriesByTerm = ( state ) => (term = '') => {
   return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLocaleLowerCase()));
}

export const getEntryById = (state ) => (id) => {
   const entry = state.entries.find(entry => entry.id === id);
   return entry ? {...entry} : null;
}