import React, { useState, useRef, ReactElement, createContext } from 'react';
import Input from '../Input/Input';
import Content from './Content/Content';

interface ContextState {
  numberOfContents: any,
  setNumberOfContents: any,
}

const ContentCount = createContext({} as ContextState);

type Props = {}

const Subtitle = React.forwardRef((props: Props, ref) => {

  const [numberOfContents, setNumberOfContents] = useState<number>(1);
  const [contents, setContents] = useState<Array<ReactElement>>([<Content key={numberOfContents} />]);

  function generateContent() {
    setContents([...contents, <Content key={numberOfContents+1} />]);
    setNumberOfContents(numberOfContents + 1);
  }

  return (
    <ContentCount.Provider value={{numberOfContents, setNumberOfContents}} >
      <div id='subtitles' ref={ref as any}>
        <button type='button' onClick={generateContent} className='hover:text-searchFocus ml-4 pb-1 text-navlink-bg block text-xs'>Add Subtitle</button>
        <div id='subtitles-section' className='h-auto min-h-40 max-h-96 border-2 rounded-lg mb-4 border-neutral-700 overflow-y-scroll'>
          {contents}
        </div>
      </div>
    </ContentCount.Provider>
  )
})

export default Subtitle;
export { ContentCount };