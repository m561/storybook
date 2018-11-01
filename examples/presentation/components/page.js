import React, { Children } from 'react';
import styled from '@emotion/styled';

import SplitPane from 'react-split-pane';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const Page = styled.section(({ scroll = false }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: scroll ? 'auto' : 'hidden',
}));

const Pane = styled.div({
  display: 'block',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  '& > *': {
    display: 'block',
    position: 'absolute',
    overflow: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

const Split = styled(({ children, className }) => (
  <SplitPane split="horizontal" className={className}>
    {Children.map(children, child => (
      <Pane>{child}</Pane>
    ))}
  </SplitPane>
))({
  '& > *': {
    position: 'relative',
  },
});

const Centered = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CodePage = ({ children, scope }) => (
  <LiveProvider code={children} scope={scope}>
    <Page>
      <Split>
        <Centered>
          <LiveError />
          <LivePreview />
        </Centered>
        <LiveEditor />
      </Split>
    </Page>
  </LiveProvider>
);

export { Page, CodePage };
