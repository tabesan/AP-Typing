import { useState, useEffect } from "react"

import { useSelector, useDispatch } from 'react-redux';
import { setDictionary, nextText, taskEnd } from './redux/action';
import { dictionary } from "./dictionary.js";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = makeStyles(() => ({
    inputBox:{
        paddingTop: "20px",
        marginBottom: "30px",
        border: "3px solid #4169e1",
        width: "75%",
        height: "50px"
    },
    charGreen: {
        color: "#689f38",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px",
        fontWeight: "bold"
    },
    charRed: {
        background: "#e0e0e0",
        color: "red",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px",
        fontWeight: "bold"
    },
    charGrey: {
        color: "gray",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px",
        fontWeight: "bold"
    },
    charBlack: {
        color: "#e0e0e0",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px",
        fontWeight: "bold"
    }
}));

function Board() {
    const style = styles();
    const [start, setStart] = useState(false);
    const num = 10
    const randomText = []
    for(var i = 0;i < num;i++){
        var item = dictionary[Math.floor(Math.random() * dictionary.length)]
        randomText.push(item)
    }

    const dispatch = useDispatch();
    dispatch(setDictionary(randomText));
    
    const startGame = (e) => {
        console.log("start")
        console.log(e.which)
        if (e.which === 32 || e.keyCode === 32) {
            setStart(true);
        }
        return;
    }

    if (!start) {
        return (
            <div align="center">
                <div onKeyPress={(e) => startGame(e)} tabIndex={0} className={style.inputBox}>
                    <Typography className={style.charBlack}>
                        Press space key to start
                    </Typography>
                </div>
            </div>
        )
    } else {
        return (
            <Text />
        )
    }
}

function Text(){
    const count = useSelector(state => state.count);
    const textNum = useSelector(state => state.textNum);
    const typeTexts = useSelector(state => state.typeTexts);
    const dispatch = useDispatch();

    const style = styles();
    const [abbreviation, setAbbre] = useState("");
    const [text, setText] = useState("");
    const [textLen, setLen] = useState("");
    const [textIdx, setTextIdx] = useState(0);
    const [finished, setFinish] = useState(false);
    const [started, setStart] = useState(false);
    const [missed, setMissed] = useState(false);
    const [loading, setLoading] = useState(true);

    const initState = () => {
        setAbbre(typeTexts[0].abbre);
        const initText = typeTexts[0].text;
        setText(initText);
        setLen(initText.length);
        setTextIdx(0);
        setFinish(false);
        setStart(true);
        setMissed(false);
    }

    useEffect(() => {
        setLoading(true);
        initState();
        setLoading(false);
    }, [])

    const setNext = (count) => {
        const nextText = typeTexts[count].text;
        setAbbre(typeTexts[count].abbre);
        setText(nextText);
        setLen(nextText.length);
        setTextIdx(0);
    }
    const checkKey = (e) => {
        if (e.key === text[textIdx].toLowerCase() || e.key === text[textIdx]) {
            const newIdx = textIdx + 1;
            setTextIdx(newIdx);
            if (newIdx === textLen){
                dispatch(nextText);
                if (isTaskEnd()) {
                    setFinish(true);
                    return;
                }
                setNext(count + 1);
            }
        }
    }

    const isTaskEnd = () => {
        return count + 1 == textNum;
    }

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
                    <Typography className={style.charBlack}>
                        {text.slice(0, textIdx)}
                    </Typography>
                    {missed ? (
                        <Typography className={style.charRed}>
                            {text[textIdx]}
                        </Typography>
                    ) : (
                        <Typography className={style.charGrey}>
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
                </div>
            )
        );
    }
}

function Home() {
    return (
        <div>
            <Board />
        </div>
    );
}

export default Home;