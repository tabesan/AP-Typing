import { useState, useEffect } from "react"

import { useSelector, useDispatch } from 'react-redux';
import { setDictionary, nextText, taskEnd } from './redux/action';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles(() => ({
    inputBox:{
        padding: "30px",
        marginBottom: "30px",
    },
    charGreen: {
        color: "#689f38",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px"
    },
    charRed: {
        background: "#e0e0e0",
        color: "red",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px"
    },
    charGrey: {
        color: "gray",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px"
    },
    charBlack: {
        color: "#e0e0e0",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px"
    }
}));

function Box() {
    const dictKey = ["ROI", "ARP"];
    const dictValue = ["return on investment", "address resolution protocol"];
    const dispatch = useDispatch();
    dispatch(setDictionary(dictKey, dictValue));

    return (
        <Text />
    )
}

function Text(){
    const count = useSelector(state => state.count);
    const textNum = useSelector(state => state.textNum);
    const textKey = useSelector(state => state.textKey);
    const textValue = useSelector(state => state.textValue);
    const dispatch = useDispatch();

    const style = styles();
    const [abbreviation, setAbbre] = useState("");
    const [text, setText] = useState("");
    const [len, setLen] = useState("");
    const [textIdx, setTextIdx] = useState(0);
    const [textEnd, setTextEnd] = useState(len);
    const [finished, setFinish] = useState(false);
    const [started, setStart] = useState(false);
    const [missed, setMissed] = useState(false);
    const [loading, setLoading] = useState(true);

    const initState = () => {
        setAbbre(textKey[0]);
        const initText = textValue[0];
        setText(initText);
        setLen(initText.length);
        setTextIdx(0);
        setTextEnd(initText.length);
        setFinish(false);
        setStart(true);
        setMissed(false);
    }

    useEffect(() => {
        setLoading(true);
        initState();
        setLoading(false);
    }, [])

    const checkKey = (e) => {
        if (finished) {
            console.log("finished");
            return;
        }
        if (e.key === text[textIdx]) {
            const newIdx = textIdx + 1;
            setTextIdx(newIdx);
            if (newIdx === len){
                console.log("finished");
                dispatch(nextText);
                if (count + 1 >= textNum) {
                    dispatch(taskEnd);
                    setFinish(true);
                    return;
                }
                const newCount = count + 1;
                console.log("update", count);
                setAbbre(textKey[newCount]);
                const value = textValue[newCount];
                setText(value);
                setLen(value.length);
                setTextIdx(0);
                setTextEnd(value.length);
            }
        }
    }

    const isTaskEnd = () => {
        console.log("count", count, textNum);
        if (count == textNum){
            dispatch(taskEnd);
        }
        return;
    }

    console.log("count", count)

    if (finished){
        return (
            <div align="center"> clear </div>
        );
    } else {
        return (
            started ? (
            <div align="center">
                <p> {abbreviation}</p>
                <div onKeyPress={(e) => checkKey(e)} tabIndex={0} className={style.inputBox}>
                    <Typography className={style.charGreen}>
                        {text.slice(0, textIdx)}
                    </Typography>
                    {missed ? (
                        <Typography className={style.charRed}>
                            {text[textIdx]}
                        </Typography>
                    ) : (
                        <Typography className={style.charBlack}>
                            {text[textIdx]}
                        </Typography>
                    )}
                    <Typography className={style.charGrey}>
                        {text.slice(textIdx + 1, text.length)}
                    </Typography>
                </div>
            </div>) : (
                <div>
                    <p> Loading </p>
                    { initState() }
                </div>
            )
        );
    }
}

function Home() {
    return (
        <div>
            <Box />
        </div>
    );
}

export default Home;