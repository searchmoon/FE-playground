import { useState } from "react";
import styled from "styled-components";

function AddImage() {
  const [previews, setPreviews] = useState([]);

  const handleChangeImage = (e) => {
    const files = e.target.files;
    const filePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;
        filePreviews.push(fileContent);
        if (filePreviews.length === files.length) {
          setPreviews(filePreviews);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AddFileBtn>
      {previews.map((preview, index) => (
        <Img key={index} width="200" height="200" src={preview} />
      ))}
      <label htmlFor="file">
        <div>사진 첨부</div>
      </label>
      <input
        onChange={handleChangeImage}
        type="file"
        id="file"
        accept="image/*" //이미지만 선택할 수 있게 설정
        multiple //2개 이상 선택가능
        style={{ display: "none" }}
      />
    </AddFileBtn>
  );
}

const AddFileBtn = styled.div`
  label {
    display: flex;
    justify-content: end;
    div {
      height: 30px;
      border: 1px solid rgb(77, 77, 77);
      border-radius: 10px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: rgb(77, 77, 77);
        color: #fff;
      }
    }
  }
`;

const Img = styled.img`
  max-width: 44%;
  aspect-ratio: 1/1;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 10px;
  object-fit: cover;
`;
export default AddImage;
