import { RecipesGridColumnsType } from './recipes-grid-columns.type';

export const RECIPES_GRID_TEST_DATA: RecipesGridColumnsType[] = [
  {
    id: "1",
    name: "Luxusní kola s rumem",
    description: "Popis receptu",
    defaultPortions: 2,
    preparationLength: 20,
    materials: [
      {
        material: {
          id: "1",
          name: "Limetka",
          unit: "ks"
        },
        amount: 0,
      },
      {
        material: {
          id: "2",
          name: "Plantation XO",
          unit: "ml"
        },
        amount: 200,
      },
      {
        material: {
          id: "3",
          name: "Coca Cola",
          unit: "ml"
        },
        amount: 300,
      },
  ]
  },
  {
    id: "2",
    name: "GT",
    description: "Popis receptu",
    defaultPortions: 2,
    preparationLength: 20,
    materials: [{
      material: {
        id: "1",
        name: "Tonic",
        unit: "ml"
      },
      amount: 300,
    },
    {
      material: {
        id: "2",
        name: "Gin Mare",
        unit: "ml"
      },
      amount: 200,
    },
    {
      material: {
        id: "2",
        name: "Fuckin tymiánová větev",
        unit: "ks"
      },
      amount: 2,
    },
    {
      material: {
        id: "2",
        name: "Oliva černá",
        unit: "ks"
      },
      amount: 4,
    },
  ]
  }
];
