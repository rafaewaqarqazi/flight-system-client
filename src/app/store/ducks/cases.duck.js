import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  AddCases: "[AddCases] Action",
  CasesLoading: "[CasesLoading] Action",
  UpdateCase: "[UpdateCase] Action"
};

const initialAuthState = {
  isLoading: false,
  casesList: []
};

export const reducer = persistReducer(
  { storage, key: "cases", whitelist: ["casesList"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.AddCases: {
        const { cases } = action.payload;
        return {
          isLoading: false,
          casesList: cases
        };
      }
      case actionTypes.CasesLoading: {
        return {
          isLoading: true,
          casesList: []
        };
      }

      case actionTypes.UpdateCase: {
        const { sCase } = action.payload;
        return {
          ...state,
          casesList: state.casesList.map(c => {
            if (c._id === sCase._id) {
              return {
                ...sCase
              }
            } else {
              return c
            }
          })
        };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  addCases: cases => ({ type: actionTypes.AddCases, payload: { cases } }),
  casesLoading: () => ({ type: actionTypes.CasesLoading }),
  updateCases: sCase => ({ type: actionTypes.UpdateCase, payload: { sCase } })
};

export function* saga() {

}
