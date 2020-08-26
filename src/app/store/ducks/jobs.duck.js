import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  AddJobs: "[AddJobs] Action",
  AddNewJob: "[AddNewJob] Action",
  RemoveJob: "[RemoveJob] Action",
  EditJob: "[EditJob] Action"
};

const initialAuthState = {
  jobsList: []
};

export const reducer = persistReducer(
  { storage, key: "jobs", whitelist: ["jobsList"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.AddJobs: {
        const { jobs } = action.payload;
        return {
          jobsList: jobs
        };
      }
      case actionTypes.AddNewJob: {
        const { job } = action.payload;
        return {
          jobsList: [...state.jobsList, job]
        };
      }
      case actionTypes.EditJob: {
        const { job } = action.payload;
        const newState = state.jobsList.map(eJob => {
          if (eJob._id === job._id) {
            return {...job}
          } else {
            return eJob
          }
        })
        return {
          jobsList: newState
        };
      }
      case actionTypes.RemoveJob: {
        const { id } = action.payload;
        return {
          jobsList: state.jobsList.filter(job => job._id !== id)
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  addJobs: jobs => ({ type: actionTypes.AddJobs, payload: { jobs } }),
  addNewJob: job => ({ type: actionTypes.AddNewJob, payload: { job } }),
  jobEdit: job => ({ type: actionTypes.EditJob, payload: { job } }),
  removeJob: id => ({
    type: actionTypes.RemoveJob,
    payload: { id }
  }),
  editJob: (data) => ({ type: actionTypes.EditJob, payload: { data } })
};

export function* saga() {

}
