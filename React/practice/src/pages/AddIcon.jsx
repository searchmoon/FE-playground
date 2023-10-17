import { useState } from "react";

function AddIcon() {
  const [textValue, setTextValue] = useState([]);
  const handleSmileAdd = (e) => {
    e.stopPropagation();
    console.log(e);
    console.log(e.target);
    setTextValue([...textValue, e.target]);
    console.log(textValue);
  };

  return (
    <>
      <div className="container" contentEditable="true" autoFocus={true}>
        {textValue.map((item) => (
          <img
            key={item.timeStamp}
            className={item.class}
            src={item.src}
            width={item.width}
          />
        ))}
      </div>
      <div onClick={handleSmileAdd}>
        <img
          className="smile"
          width="20px"
          src="http://t2.gstatic.com/images?q=tbn:ANd9GcQCze-mfukcuvzKk7Ilj2zQ0CS6PbOkq7ZhRInnNd1Yz3TQzU4e&t=1"
        />
      </div>
      <img src="{받아오는이미지url}" />
    </>
  );
}

export default AddIcon;
