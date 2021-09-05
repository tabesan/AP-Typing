export const ActionType = {
    nextText: 'NEXT_TEXT',
    setDictionary: 'SET_DICTIONARY',
    taskEnd: "TASK_END",
};

export function setDictionary(dictionary) {
    return {
        type: ActionType.setDictionary,
        dictionary: dictionary,
    }
}

export const nextText = {
    type: ActionType.nextText,
};

export const taskEnd = {
    type: ActionType.taskEnd,
};
