import React from 'react';

export function do_change_document_title(title) {
  document.title = title;
}

export default function Basic({title, children}) {
    return (
       <html lang='en'>
          <head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='stylesheet' href='/css/styles.css' />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
             <title>{title}</title>
          </head>
          <body>
            <main>
              {children}
            </main>
          </body>
       </html>
    );
}