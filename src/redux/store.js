import { createStore} from 'redux';
import { ActionType} from './action';

const initialState = {
    textKey: [],
    textValue: [],
    count: 0,
    textNum: 0,
    taskEnd: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.setDictionary:
            return Object.assign({}, state, {
                textKey: action.key,
                textValue: action.value,
                textNum: action.key.length,
                taskEnd: false,
            });
        case ActionType.nextText:
            console.log("dispatch");
            return Object.assign({}, state, {
                count: state.count + 1,
            });
        case ActionType.taskEnd:
            return Object.assign({}, state, {
                taskEnd: true,
            });
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;