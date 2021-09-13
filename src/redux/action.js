export const ActionType = {
    nextText: 'NEXT_TEXT',
    setDictionary: 'SET_DICTIONARY',
    taskEnd: "TASK_END",
    startGame: "START_GAME",
    restartGame: "RESTART_GAME",
    renderTitle: "RENDER_TITLE",
    selectCourse: "SELECT_COURSE",
    resetCourse: "RESET_COURSE",
};

export function setDictionary(dictionary) {
    return {
        type: ActionType.setDictionary,
        dictionary: dictionary,
    }
}

export function setCourse(textNum) {
    return {
        type: ActionType.selectCourse,
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

export const restartGame = {
    type: ActionType.restartGame,
}
export const renderTitle = {
    type: ActionType.renderTitle,
};

export const resetCourse = {
    type: ActionType.resetCourse,
};