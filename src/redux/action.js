export const ActionType = {
    nextText: 'NEXT_TEXT',
    setDictionary: 'SET_DICTIONARY',
    taskEnd: "TASK_END",
    startGame: "START_GAME",
    renderTitle: "RENDER_TITLE",
    selectTextNum: "SELECT_TEXT_NUM",
};

export function setDictionary(dictionary) {
    return {
        type: ActionType.setDictionary,
        dictionary: dictionary,
    }
}

export function setTextNum(textNum) {
    return {
        type: ActionType.selectTextNum,
        textNum: textNum,
    }
};

export const nextText = {
    type: ActionType.nextText,
};

export const taskEnd = {
    type: ActionType.taskEnd,
};

export const startGame = {
    type: ActionType.startGame,
};

export const renderTitle = {
    type: ActionType.renderTitle,
};