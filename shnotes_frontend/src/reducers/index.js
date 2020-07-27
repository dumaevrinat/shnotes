import { combineReducers} from "redux"

import notes from './notes'
import taskers from './taskers'
import notebook from './notebook'
import error from "./error"

export default combineReducers({notes, taskers, notebook, error})