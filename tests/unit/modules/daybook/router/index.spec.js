import daybookRouter from "@/modules/daybook/router";

describe("Pruebas en el router module de Daybook", () => {
  test("El router debe de tener esta configuración", async () => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });
    const routes = (
      await Promise.all(
        daybookRouter.children.map((child) => child.component())
      )
    ).map((c) => c.default.name);
    expect(routes).toContain("NoEntrySelected");
    expect(routes).toContain("EntryView");
  });

  test('debe de retornar el id de la ruta',()=>{
     const route = {
      params:{
        id:'ABC-123'
      }
     };
     const entryRoute = daybookRouter.children.find(r => r.name === 'entry');
     expect(entryRoute.props(route)).toEqual({id:'ABC-123'});
  })
});
