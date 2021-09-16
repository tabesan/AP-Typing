import { useState, useEffect } from "react"

import { useSelector, useDispatch } from 'react-redux';
import { startGame, finish, endLoading, setCourse, resetCourse, restartGame } from './redux/action';
import { dictionary } from "./dictionary.js";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = makeStyles(() => ({
    box: {
        width: "600px",
    },
    start: {
        paddingBottom: "20px",
        marginTop: "30px",
        //marginBottom: "30px",
        width: "450px",
        height: "40px",
    },
    course: {
        alignItems: "center",
        height: "90px",
        marginTop: "10px",
    },
    textFont: {
        fontSize: "20px",
    },
    gridPosition: {
        marginTop: "30px",
        position: "relative",
        width: "400px",
    },
    restartButton: {
        position: "relative",
        bottom: "20px",
        marginRight: "20px",
        width: "250px",
        height: "35px",
        borderRadius: "0.3em",
        backgroundColor: "#dcdcdc",
        textAlign: "center",
        paddingTop: "8px",
        cursor: "pointer",
    },
    titleButton: {
        position: "relative",
        bottom: "20px",
        width: "260px",
        height: "35px",
        backgroundColor: "#dcdcdc",
        borderRadius: "0.3em",
        textAlign: "center",
        paddingTop: "8px",
        cursor: "pointer",
    },
    back: {
        border: "3px solid #4169e1",
        //paddingTop: "5px",
        //paddingBottom: "20px",
        //marginBottom: "30px",
        width: "600px",
        height: "110px"
    },
    title: {
        fontSize: "75px",
        fontFamily: "Segoe UI",
        display: "inline",
        color: "#008000",
    },
    inputBox: {
        paddingBottom: "20px",
        marginTop: "15px",
        //marginBottom: "30px",
        width: "600px",
        height: "40px",
        cursor: "none",
    },
    abbreviation: {
        color: "#000000",
        fontFamily: "Times New Roman",
        fontSize: "20px",
        fontWeight: "bold"
    },
    charGreen: {
        color: "#689f38",
        display: "inline",
        fontFamily: "Times New Roman",
        fontSize: "25px",
        fontWeight: "bold"
    },
    charRed: {
        color: "red",
        display: "inline",
        fontFamily: "Times New Roman",
        fontSize: "25px",
        fontWeight: "bold"
    },
    charGrey: {
        color: "gray",
        display: "inline",
        fontFamily: "Times New Roman",
        fontSize: "25px",
        fontWeight: "bold",
    },
    charBlack: {
        color: "#000000",
        display: "inline",
        fontFamily: "Times New Roman",
        fontSize: "25px",
        fontWeight: "bold"
    },
    currentChar: {
        color: "#000000",
        display: "inline",
        fontFamily: "Times New Roman",
        fontSize: "25px",
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
    const courseSelected = useSelector(state => state.selectCourse);

    return (
        <Box>
            {courseSelected ? (
                <Text />
            ) : (
                <Course />
            )}
        </Box>
    )
}

function Course() {
    const style = styles();
    const dispatch = useDispatch();

    const selectCourse = (course) => {
        dispatch(setCourse(course));
    }

    return (
        <Box className={style.course}>
            <Typography className={style.textFont}>出題数</Typography>
            <Button onClick={() => selectCourse(5)} variant="contained" className={style.textFont}>5</Button>    
            <Button onClick={() => selectCourse(10)} variant="contained" className={style.textFont}>10</Button>    
            <Button onClick={() => selectCourse(15)} variant="contained" className={style.textFont}>15</Button>
            <Button onClick={() => selectCourse(20)} variant="contained" className={style.textFont}>20</Button>
        </Box>
    );
}

function Text(){
    const textNum = useSelector(state => state.textNum);
    const start = useSelector(state => state.startGame);
    const finished = useSelector(state => state.finished);
    const loading = useSelector(state => state.loading);
    const dispatch = useDispatch();

    const style = styles();
    const [typeTexts, setTypeTexts] = useState([]);
    const [count, setCount] = useState(0);
    const [abbreviation, setAbbre] = useState("");
    const [text, setText] = useState("");
    const [textLen, setLen] = useState("");
    const [textIdx, setTextIdx] = useState(0);
    const [missed, setMissed] = useState(false);
    const [correctType, setCorrect] = useState(0);
    const [missType, setMissType] = useState(0);

    const initState = () => {
        const randomText = [];
        for(var i = 0;i < textNum;i++){
            var item = dictionary[Math.floor(Math.random() * dictionary.length)]
            randomText.push(item);
        }

        setTypeTexts(randomText);
        setAbbre(randomText[0].abbre);
        const initText = randomText[0].text;
        setText(initText);
        setLen(initText.length);
        setTextIdx(0);
        setMissed(false);
        setCorrect(0);
        setMissType(0);
        setCount(0);
        dispatch(endLoading);
    }

    const setNext = (count) => {
        const nextText = typeTexts[count].text;
        setAbbre(typeTexts[count].abbre);
        setText(nextText);
        setLen(nextText.length);
        setTextIdx(0);
    }

    const checkKey = (e) => {
        if (!finished && (e.key === text[textIdx].toLowerCase() || e.key === text[textIdx])) {
            const newIdx = textIdx + 1;
            setTextIdx(newIdx);
            setCorrect((correctType) => (correctType + 1));
            if (newIdx === textLen){
                if (isTaskEnd()) {
                    dispatch(finish);
                    return;
                }
                setNext(count + 1);
                setCount(count + 1);
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
            start ? (
            <div onKeyDown={(e) => checkKey(e)} tabIndex={0} className={style.inputBox} cursor="none">
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
                        {initState()}
                    </Typography>
                ) : (
                    <div onClick={() => dispatch(startGame)} tabIndex={0} className={style.start}>
                        <Box paddingTop={"10px"}>
                            <Typography>
                                Click here to start
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
    const dispatch = useDispatch();

    return (
        <div align="center">
            <Box className={style.title}>
                AP TYPING
            </Box>
            <div className={style.back}>
                <Board />
            </div>
            <Box className={style.box} align="center">
                <Grid container alignItems="center" justifyContent="center" className={style.gridPosition}>
                    <Grid item xs={4} className={style.restartButton}>
                        <Typography onClick={() => dispatch(restartGame)} className={style.buttonFont}> Restart </Typography>
                    </Grid>
                    <Grid item xs={4} className={style.titleButton}>
                        <Typography onClick={() => dispatch(resetCourse)} className={style.buttonFont}> Select Course </Typography>
                    </Grid>
                </Grid>
            </Box>
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