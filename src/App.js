import { useState, useEffect } from "react"
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

function Text(){
    const style = styles();
    const abbreviation = "ROI";
    const typeText = "tousitaikouka";
    const len = typeText.length;
    const [text, setText] = useState(typeText);
    const [textIdx, setTextIdx] = useState(0);
    const [textEnd, setTextEnd] = useState(len);
    const [finished, setFinish] = useState(false);
    const [started, setStart] = useState(false);
    const [str, setString] = useState("");
    const [missed, setMissed] = useState(false); 

    useEffect(() => {
        if (finished){
            console.log("Effect");
        }
    }, [finished]);

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
                setFinish(true);
                return;
            }
        }
    }

    const displayText = (missed) => {
        switch (missed) {
            case true:
                <Typography className={style.charRed}>
                    typeText[textIdx]
                </Typography>
            case false:
                <Typography className={style.charBlack}>
                    typeText[textIdx]
                </Typography>
        }
    }

    console.log("finish", finished);
    if (!finished) {
        return (
            <div align="center">
                <p> {abbreviation}</p>
                <div onKeyPress={(e) => checkKey(e)} tabIndex={0} className={style.inputBox}>
                    <Typography className={style.charGreen}>
                        {typeText.slice(0, textIdx)}
                    </Typography>
                    {missed ? (
                        <Typography className={style.charRed}>
                            {typeText[textIdx]}
                        </Typography>
                    ) : (
                        <Typography className={style.charBlack}>
                            {typeText[textIdx]}
                        </Typography>
                    )}
                    <Typography className={style.charGrey}>
                        {typeText.slice(textIdx + 1, typeText.length)}
                    </Typography>
                </div>
            </div>
        );
    } else {
        return (
            <div align="center">
                <p>clear</p>
            </div>
        )
    }
}

function Box() {
    return (
        <div>
            <Text />
        </div>
    );
}

export default Box;