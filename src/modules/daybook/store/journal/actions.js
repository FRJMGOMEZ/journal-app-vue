import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get('entries.json');
  if(!data){
     commit('setEntries', [])
      return;
  }
  const entries = Object.keys(data).map(id => ({ id, ...data[id] }));
  commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, { date, text, picture, id }) => {
  const { data } = await journalApi.put(`entries/${id}.json`, { date, text, picture });
  commit('updateEntry', { id, data });
}

export const createEntry = async ({ commit }, { text, date, picture}) => {
  return new Promise((resolve) =>
    journalApi.post('entries.json', { text, date, picture }).then(({ data }) => {
      const { name } = data;
      const newEntry = { text, date, id: name, picture};
      commit('addEntry', newEntry);
      resolve(newEntry)
    })
  )
}

export const deleteEntry = async ({ commit }, id) => {
  return new Promise((resolve) =>
    journalApi.delete(`entries/${id}.json`).then(() => {
      commit('deleteEntry', id);
      resolve();
    })
  )
}