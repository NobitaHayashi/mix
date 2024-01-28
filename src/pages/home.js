import React from 'react';
import Basic, { do_change_document_title } from './component/basic';
import { Background } from './component/layout/background';
import {Trapezoid} from './component/shape/trapezoid';

export default function HomePage({title}) {
    const [search, setSearch] = React.useState("")
    do_change_document_title(title)
    return (
        <>
          <Background
            width="100vw"
            height="100vh"
            image_path="/image/wrapper.jpg"
          >
            <input value={search} onChange={setSearch}></input>
          </Background>
        </>
    );
}