export const ActionType = {
    nextText: 'NEXT_TEXT',
    setDictionary: 'SET_DICTIONARY',
    taskEnd: "TASK_END",
};

export function setDictionary(key, value) {
    return {
        type: ActionType.setDictionary,
        key: key,
        value: value,
    }
}

export const nextText = {
    type: ActionType.nextText,
};

export const taskEnd = {
    type: ActionType.taskEnd,
};
