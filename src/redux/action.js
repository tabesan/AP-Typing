export const ActionType = {
    taskEnd: "TASK_END",
    startGame: "START_GAME",
    restartGame: "RESTART_GAME",
    renderTitle: "RENDER_TITLE",
    selectCourse: "SELECT_COURSE",
    resetCourse: "RESET_COURSE",
    finish: "FINISH",
    endLoading: "END_LOADING",
};

export function setDictionary(dictionary) {
    console.log("func", dictionary);
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

export const finish = {
    type: ActionType.finish,
};

export const endLoading = {
    type: ActionType.endLoading,
};