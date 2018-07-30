import React from 'react';

const FilesContainer = ({
                            files = [], onSelect = () => {
    }
                        }) => {
    return (
        <div className="files-container">
            {files.map(elem => {
                let url = elem.slice(-3) !== "pdf" ? `url("http://localhost:3090/resized/${elem}")` : `url("../../resources/icons/pdf-ico.png")`;
                return (
                    <div className="file-elem" key={elem} onClick={() => {
                        onSelect(elem)
                    }}>
                        <div className="file-image" style={{backgroundImage: url}}/>
                        <div className="file-action">
                            <div>X</div>
                            <div>Y</div>
                            <div>Z</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FilesContainer