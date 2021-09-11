import { useState, useEffect } from "react"

import { useSelector, useDispatch } from 'react-redux';
import { setDictionary, nextText, startGame, renderTitle } from './redux/action';
import { dictionary } from "./dictionary.js";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = makeStyles(() => ({
    buttonFont: {
        fontSize: "10px",
    },
    gridPosition: {
        position: "relative",
        left: "90px",
    },
    restartButton: {
        position: "relative",
        bottom: "20px",
        paddingRight: "20px",
    },
    titleButton: {
        position: "relative",
        bottom: "20px",
    },
    back: {
        border: "3px solid #4169e1",
        paddingTop: "20px",
        paddingBottom: "20px",
        marginBottom: "30px",
        width: "400px",
        height: "50px"
    },
    title: {
        fontSize: "75px",
        fontFamily: "Segoe UI",
        display: "inline",
        color: "#008000",
    },
    inputBox: {
        paddingBottom: "20px",
        marginBottom: "30px",
        width: "330px",
        height: "50px"
    },
    abbreviation: {
        color: "#000000",
        fontFamily: "Times New Roman",
        fontsize: "80px",
        fontWeight: "bold"
    },
    charGreen: {
        color: "#689f38",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px",
        fontWeight: "bold"
    },
    charRed: {
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
        fontWeight: "bold",
    },
    charBlack: {
        color: "#000000",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px",
        fontWeight: "bold"
    },
    currentChar: {
        color: "#000000",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "50px",
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
    },
    result: {
        color: "#000000",
        display: "inline",
        fontFamily: "Times New Roman",
        fontsize: "70px",
        fontWeight: "bold",
    }
}));

function Board() {
    const style = styles();

    return (
        <div align="center">
            <Text />
        </div>
    )
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
    const [correctType, setCorrect] = useState(0);
    const [missType, setMissType] = useState(0);

    useEffect(() => {
        initState();
        setLoading(() => (false));
    }, [loading]);

    const startGame = (e) => {
        if (e.which === 32 || e.keyCode === 32) {
            setStart(true);
        }
        return;
    }

    const selectText = () => {
        const num = 5;
        const randomText = [];
        for(var i = 0;i < num;i++){
            var item = dictionary[Math.floor(Math.random() * dictionary.length)]
            randomText.push(item);
        }
        dispatch(setDictionary(randomText));
        setLoading(false);
    }

    const initState = () => {
        setAbbre(typeTexts[0].abbre);
        const initText = typeTexts[0].text;
        setText(initText);
        setLen(initText.length);
        setTextIdx(0);
        setFinish(false);
        setMissed(false);
    }

    const setNext = (count) => {
        const nextText = typeTexts[count].text;
        setAbbre(typeTexts[count].abbre);
        setText(nextText);
        setLen(nextText.length);
        setTextIdx(0);
    }

    const checkKey = (e) => {
        if (started && (e.keyCode === 27 || e.which === 27)) {
            setLoading(true);
            setStart(false);
            return;
        } else if (!finished && (e.key === text[textIdx].toLowerCase() || e.key === text[textIdx])) {
            const newIdx = textIdx + 1;
            setTextIdx(newIdx);
            setCorrect((correctType) => (correctType + 1));
            if (newIdx === textLen){
                dispatch(nextText);
                if (isTaskEnd()) {
                    setFinish(true);
                    return;
                }
                setNext(count + 1);
            }
        } else if (!finished) {
            setMissType((missType) => (missType + 1));
        } else if (finished && (e.keyCode === 32 || e.which === 32)) {
            return;
        }
    }

    const isTaskEnd = () => {
        return count + 1 == textNum;
    }


    if (finished){
        return (
            <div onKeyDown={(e) => checkKey(e)} tabIndex={0} className={style.inputBox}>
                <Box>
                    <Typography className={style.result}>
                        正しく打った回数: {correctType}
                    </Typography>
                </Box>
                <Box marginTop={"10px"}>
                    <Typography className={style.result}>
                        間違って打った回数: {missType}
                    </Typography>
                </Box>
            </div>
        );
    } else {
        return (
            started ? (
            <div onKeyDown={(e) => checkKey(e)} tabIndex={0} className={style.inputBox}>
                <Typography className={style.abbreviation}>
                    {abbreviation }
                </Typography>
                <Typography className={style.charGrey}>
                    {text.slice(0, textIdx)}
                </Typography>
                {missed ? (
                    <Typography className={style.charRed}>
                        {text[textIdx]}
                    </Typography>
                ) : (
                    <Typography className={style.currentChar}>
                        {text[textIdx]}
                    </Typography>
                )}
                <Typography className={style.charBlack}>
                    {text.slice(textIdx + 1, text.length)}
                </Typography>
            </div>) : (
                loading ? (
                    <Typography className={style.charBlack}>
                        Loading...
                        {selectText()}
                    </Typography>
                ) : (
                    <div onKeyPress={(e) => startGame(e)} tabIndex={0} className={style.inputBox}>
                        <Box paddingTop={"10px"}>
                            <Typography>
                                Press space key to start
                            </Typography>
                        </Box>
                    </div>
                )
            )
        );
    }    
}

function Home() {
    const style = styles();
    const start = useSelector(state => state.startGame);
    console.log(start);
    return (
        <div align="center">
            <Box className={style.title}>
                AP TYPING
            </Box>
            <div className={style.back}>
                <div>
                    <Board />
                </div>
                <div>
                    <Grid container className={style.gridPosition} >
                        <Grid className={style.restartButton}>
                            <Button variant="contained" xs={10} className={style.buttonFont}> Restart </Button>
                        </Grid>
                        <Grid className={style.titleButton}>
                            <Button variant="contained" className={style.buttonFont}> Select Course </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
    /*if (!start) {
        return (
            <div align="center">
                <Title />
            </div>
        );
    } else {
        return (
            <div>
                <Board />
            </div>
        );
    }*/
}

export default Home;