import React, {useMemo, useRef} from "react";
import {Button, ButtonVariant} from "../button";
import {Icon} from "../../icons";
import "./index.scss"

export type CodeBlockProps = {
    value: string;
    onCopyButtonClick:(args?: any) => void;
    onInfoButtonClick:(args?: any) => void;
};

export const CodeBlock = ({value, onInfoButtonClick, onCopyButtonClick}: CodeBlockProps) => {
    const lineCount = useMemo(() => value.split("\n").length, [value]);
    const linesArr = Array.from({ length: Math.max(lineCount , 14)}, (_, i) => i + 1);

    const lineCounterRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);


    const handleTextareaScroll = () => {
        if (lineCounterRef.current && textareaRef.current) {
            lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    return (
        <div className={"text-area-wrapper"}>
            <div className={"style-header"}>
                <div className={"section"}>
                    <div className={"icon-background"}>
                        <Icon icon={"outline-code"} width={14} height={12} fill={"#000000"}/>
                    </div>
                    <span className={"header-title"}>
                        Command line
                    </span>
                </div>
                <div className={"section"}>
                    <Button onClick={onInfoButtonClick} label={""} iconRight={<Icon icon={"outline-exclamation-circle"} width={13.5} height={13.5} fill={"#000000"}/>} variant={ButtonVariant.Secondary}/>
                    <Button onClick={onCopyButtonClick} label={""} iconRight={<Icon icon={"outline-copy"} width={15} height={15} fill={"#000000"}/>} variant={ButtonVariant.Secondary}/>
                </div>
            </div>
            <div className={"styled-numbers shared-style"} ref={lineCounterRef}>
                {linesArr.map((count) => (
                    <div key={count}>
                        {count}
                    </div>
                ))}
            </div>
            <textarea className={"text-area shared-style"}
                onChange={()=>{}}
                onScroll={handleTextareaScroll}
                ref={textareaRef}
                value={value}
            />
        </div>
    );
};
