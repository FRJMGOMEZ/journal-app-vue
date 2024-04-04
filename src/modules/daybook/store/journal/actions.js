import journalApi from "@/api/journalApi"

export const loadEntries = async ({commit} ) => {
  const {data} = await journalApi.get('entries.json');
  const entries = Object.keys(data).map(id => ({id,...data[id]}));
  commit('setEntries',entries)
}

export const updateEntry = async (/* {commit} */) => {

}

export const createEntry = async (/* {commit} */) => {

}