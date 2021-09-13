import { createStore} from 'redux';
import { ActionType} from './action';

const initialState = {
    typeTexts: [],
    count: 0,
    textNum: 0,
    taskEnd: false,
    startGame: false,
    selectCourse: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.setDictionary:
            return Object.assign({}, state, {
                typeTexts: action.dictionary,
                count: 0,
                textNum: action.dictionary.length,
                taskEnd: false,
            });
        case ActionType.nextText:
            return Object.assign({}, state, {
                count: state.count + 1,
            });
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
            });
        case ActionType.renderTitle:
            return Object.assign({}, state, {
                startGame: false,
            });
        case ActionType.selectCourse:
            return Object.assign({}, state, {
                textNum: action.textNum,
                selectCourse: true,
            });
        case ActionType.resetCourse:
            return Object.assign({}, state, {
                textNum: 0,
                selectCourse: false,
                startGame: false,
            })
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;