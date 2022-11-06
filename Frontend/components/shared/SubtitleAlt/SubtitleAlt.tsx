import { Subtitles } from '@mui/icons-material';
import { subtle } from 'crypto';
import { setRevalidateHeaders } from 'next/dist/server/send-payload';
import React, { useState } from 'react';
import ExerciseAlt from './ExerciseAlt/ExerciseAlt';

type Props = {
    subtitles: any,
    setSubtitles: any,
}

const SubtitleAlt = (props: Props) => {

    const newSubtitle = {
        header: "",
        contents: [
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            }
        ],
        exercise: {
            exerciseTitle: "",
            questions: [
                {
                    question: "",
                    choices: [""],
                    answer: "",
                }
            ],
        },
        totalMinutes: 0,
    }

    function addNewSubtitle() {
        props.setSubtitles([...props.subtitles, newSubtitle]);
    }

    function setHeader(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].header = e.target.value;
        props.setSubtitles(values);
    }

    function setContentTitle(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].contentTitle = e.target.value;
        props.setSubtitles(values);
    }

    function setContentVideo(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].video = e.target.value;
        props.setSubtitles(values);
    }

    function setContentPreview(e: any, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].preview = e.target.checked;
        props.setSubtitles(values);
    }

    function setContentDuration(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].duration = e.target.value;
        props.setSubtitles(values);
    }

    function setContentDescription(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].description = e.target.value;
        props.setSubtitles(values);
    }

    function addNewContent(subtitleIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents.push({
            contentTitle: "",
            video: "",
            preview: false,
            duration: 0,
            description: "",
        });
        props.setSubtitles(values);
    }

    function removeContent(subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        console.log(values[subtitleIndex].contents.splice(contentIndex, 1));
        props.setSubtitles(values);
    }

    function removeSubtitle(subtitleIndex: number) {
        const values = [...props.subtitles];
        values.splice(subtitleIndex, 1);
        props.setSubtitles(values);
    }

  return (
    <div>
        { // Add Subtitles
            props.subtitles.map((subtitle: any, subtitleIndex: number) => (
                <div key={subtitleIndex}>
                    <input value={subtitle.header} placeholder="Header" onChange={(e) => setHeader(e, subtitleIndex)} />
                    { // Add relative subtitle's Content
                        subtitle.contents.map((content: any, contentIndex: number) => (
                            <div className='my-3' key={contentIndex}>
                                <input value={content.contentTitle} placeholder="Content Title" onChange={(e) => setContentTitle(e, subtitleIndex, contentIndex)} />
                                <input value={content.video} placeholder="Video" onChange={(e) => setContentVideo(e, subtitleIndex, contentIndex)} />
                                <input type="checkbox" checked={content.preview} onChange={(e) => setContentPreview(e, subtitleIndex, contentIndex)} />
                                <input placeholder='Duration' value={content.duration} onChange={(e) => setContentDuration(e, subtitleIndex, contentIndex)} />
                                <input value={content.description} placeholder="Content Description" onChange={(e) => setContentDescription(e, subtitleIndex, contentIndex)} />
                                <button type='button' onClick={() => removeContent(subtitleIndex, contentIndex)}>Remove Content</button>
                            </div>
                        ))
                    }
                    <button type='button' onClick={() => addNewContent(subtitleIndex)}>Add Content</button>
                    <ExerciseAlt subtitleIndex={subtitleIndex} subtitles={props.subtitles} setSubtitles={props.setSubtitles} />
                    <button type='button' onClick={() => removeSubtitle(subtitleIndex)} >Remove Subtitle</button>
                </div>
            ))
        }
        <button type='button' onClick={addNewSubtitle} >Add Subtitle</button>
        <button type='button' onClick={() => console.log(props.subtitles)}>Print all</button>
    </div>
  )
}

export default SubtitleAlt;