import React from 'react';

export function Background({width, height, image_path, children}) {
    return (
        <div className="background" style={{backgroundImage: `url(${image_path})`, width, height}}>
          <div className='background-blur' style={{width, height}}>
            {children}
          </div>
        </div>
    );
}