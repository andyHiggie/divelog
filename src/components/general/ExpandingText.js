import React, { useState, useEffect, useRef, useCallback } from 'react'

const ExpandingText = ({ text, lines = 2, hide = true }) => {

    const [shortContent, setShortContent] = useState({ text: text, height: 0 });
    const [longContent, setLongContent] = useState({ text: '', height: 0 });
    const [content, setContent] = useState(text);
    const [expanded, setExpanded] = useState(false);
    const [currentText, setCurrentText] = useState("");

    const textHolder = useRef();
    const timer = useRef(null);

    const setUpContent = useCallback(() => {
        const minHeight = (lines + 0.9) * parseFloat(getComputedStyle(textHolder.current).lineHeight);
        textHolder.current.innerHTML = text;
        textHolder.current.style.height = 'auto';
        let height = textHolder.current.getBoundingClientRect().height;
        if (height > minHeight) {
            setLongContent({ text: text, height: height });
            let position = 0;
            let prev = 0;
            let sHeight = 0;
            let sContent = text;
            let loop = 0;
            while (sHeight < minHeight && loop < 200) {
                prev = position;
                position = text.indexOf(' ', position + 1);
                sContent = text.substring(0, position) + ' ...';
                textHolder.current.innerHTML = sContent;
                sHeight = textHolder.current.getBoundingClientRect().height;
                loop++;
            }
            sContent = text.substring(0, prev).replaceAll('<p>', '').replaceAll('</p>', '') + ' ...';
            textHolder.current.innerHTML = sContent;
            sHeight = textHolder.current.getBoundingClientRect().height;
            setShortContent({ text: sContent, height: sHeight });
            if (expanded) {
                textHolder.current.innerHTML = longContent.text;
                textHolder.current.style.height = longContent.height + 'px';
            } else {
                setContent(sContent);
                textHolder.current.style.height = sHeight + 'px';
            }
        } else {
            setLongContent({ text: '', height: 0 });
            setShortContent({ text: text, height: 0 });
            setContent(text);
            setExpanded(false);
        }
    }, [expanded, lines, longContent, text]);

    const changeExpanded = (() => {
        if (expanded) {
            timer.current = setTimeout(() => { setContent(shortContent.text) }, parseFloat(window.getComputedStyle(textHolder.current).getPropertyValue('transition')) * 1000);
            textHolder.current.style.height = shortContent.height + 'px';
        } else {
            setContent(longContent.text);
            textHolder.current.style.height = longContent.height + 'px';
        }
        setExpanded(!expanded);
    });

    useEffect(() => {
        if (textHolder.current) {
            if (currentText !== text) {
                setUpContent();
                setCurrentText(text);
            }
            window.addEventListener('resize', setUpContent);
        }
        return () => window.removeEventListener('resize', setUpContent);
    }, [text, currentText, setUpContent]);

    let className = "expandable para buddy";

    if (hide) {
        className = "expandable para hide-overflow"
    }

    return (
        <>
            <div className={className} ref={textHolder}>
                {content}
            </div>
            {longContent.text === '' ? <></> : expanded ?
                <button className="btn" onClick={() => changeExpanded()}>Less</button> :
                <button className="btn" onClick={() => changeExpanded()}>More</button>}
        </>
    )
}

export default ExpandingText