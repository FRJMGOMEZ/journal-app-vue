import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import journalState from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: { ...journal, state: { ...initialState } },
    },
  });

describe("Vuex - pruebas en journal module", () => {
  // básicas
  test("Este es el estado inicial, debe de tener este state", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeTruthy();
    expect(entries).toEqual(journalState.entries);
  });

  /// Mutations
  test("Mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test("Mutation: updateEntry", () => {
    const store = createVuexStore({
      ...journalState,
      entries: [...journalState.entries],
    });
    const updatedEntry = {
      id: "-NxMnT67gwVa2bylMx32",
      date: 1715165038723,
      picture:
        "https://res.cloudinary.com/deqvbpmxn/image/upload/v1715165060/iat8berbgb2kqctpmvof.jpg",
      text: "Texto modificado para pruebas",
    };
    store.commit("journal/updateEntry", {
      id: updatedEntry.id,
      data: updatedEntry,
    });
    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.entries).toContainEqual(updatedEntry);
  });

  test("Mutation: addEntry deleteEntry", () => {
    const store = createVuexStore({
      ...journalState,
      entries: [...journalState.entries],
    });
    const newEntry = {
      id: "ABC-123",
      text: "Esta es una nueva entry",
    };

    store.commit("journal/addEntry", newEntry);
    let entries = store.state.journal.entries;
    expect(entries.length).toBe(3);
    expect(entries.find((entry) => entry.id === "ABC-123")).toBeTruthy();

    store.commit("journal/deleteEntry", "ABC-123");
    entries = store.state.journal.entries;
    expect(entries.length).toBe(2);
    expect(entries.find((entry) => entry.id === "ABC-123")).toBeFalsy();
  });

  //Getters
  test("Getters: getEntriesByTerm getEntryById", () => {
    const store = createVuexStore(journalState);
    const [entry1, entry2] = journalState.entries;
    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(2);
    expect(store.getters["journal/getEntriesByTerm"]("oso").length).toBe(1);
    expect(store.getters["journal/getEntriesByTerm"]("oso")).toEqual([entry1]);
    expect(store.getters["journal/getEntryById"](entry2.id)).toEqual(entry2);
  });

  //Actions
/*   test("Actions: loadEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch('journal/loadEntries');
    expect(store.state.journal.entries.length).toBe(1);
  });
 */
 /*  test("Actions: updateEntry", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    const updatedEntry = {
      id:'-NxMnT67gwVa2bylMx32',
      date: 1715165038723,
      text:'Hola mundo desde mock data'
    }
    await store.dispatch('journal/updateEntry',updatedEntry);
    expect(store.state.journal.entries.length).toBe(3);
    expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry);
  }); */
});
