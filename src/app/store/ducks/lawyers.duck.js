import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  AddLawyers: "[AddLawyers] Action",
  UpdateLawyer: "[UpdateLawyer] Action"
};

const initialAuthState = {
  lawyersList: []
};

export const reducer = persistReducer(
  { storage, key: "lawyers", whitelist: ["lawyersList"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.AddLawyers: {
        const { lawyers } = action.payload;
        return {
          lawyersList: lawyers
        };
      }
      case actionTypes.UpdateLawyer: {
        const { lawyer } = action.payload;
        return {
          lawyersList: state.lawyersList.map(l => {
            if (l._id === lawyer._id) {
              return {
                ...lawyer
              }
            } else {
              return l
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
  addLawyers: lawyers => ({ type: actionTypes.AddLawyers, payload: { lawyers } }),
  updateLawyer: lawyer => ({ type: actionTypes.UpdateLawyer, payload: { lawyer } })
};

export function* saga() {

}
