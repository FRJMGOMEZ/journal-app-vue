export const setEntries = (state, entries) => {
     state.entries = [...state.entries, ...entries];
     state.isLoading = false;
}

export const updateEntry = ( state ,  {id,  data }) => {
     const entryIndex = state.entries.map(entry => entry.id).indexOf(id);
     state.entries[entryIndex] =  {...state.entries[entryIndex],...data};
}

export const addEntry = (state,entry) => {
     state.entries.unshift(entry);
}

export const deleteEntry = (state, id) => {
     state.entries = state.entries.filter(entry => entry.id !== id);
}