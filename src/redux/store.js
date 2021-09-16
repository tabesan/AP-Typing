import { createStore} from 'redux';
import { ActionType} from './action';

const initialState = {
    typeTexts: [],
    count: 0,
    textNum: 0,
    taskEnd: false,
    startGame: false,
    selectCourse: false,
    finished: false,
    loading: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.taskEnd:
            return Object.assign({}, state, {
                taskEnd: true,
            });
        case ActionType.startGame:
            return Object.assign({}, state, {
                startGame: true,
            });
        case ActionType.restartGame:
            return Object.assign({}, state, {
                startGame: false,
                finished: false,
                loading: true,
            });
        case ActionType.renderTitle:
            return Object.assign({}, state, {
                startGame: false,
            });
        case ActionType.selectCourse:
            return Object.assign({}, state, {
                textNum: action.textNum,
                selectCourse: true,
                loading: true,
            });
        case ActionType.resetCourse:
            return Object.assign({}, state, {
                textNum: 0,
                selectCourse: false,
                startGame: false,
                finished: false,
            });
        case ActionType.finish:
            return Object.assign({}, state, {
                finished: true,
            });
        case ActionType.endLoading: 
            return Object.assign({}, state, {
                loading: false,
            })
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;