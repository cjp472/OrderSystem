import React, {PropTypes} from 'react';
import styled from 'styled-components';
import AddIcon from './add.png';
import DelIcon from './delete.png';
import { chooseImage } from 'utils/WqJsBridge';
import { getPrefixImgs } from 'redux/modules/comment';

const ImageUpload = styled.div`
  font-size: 14px;
  color: #808080;
  padding: 12px 0;
  margin: 0 12px;
  border-top: 1px solid #e5e5e5;
`;

const Count = styled.span`
  font-size: 12px;
  color: #999;
`;

const ImgCon = styled.div`
  margin-top: 0px;
`;

const Add = styled.img`
  width: 85px;
  height: 85px;
  margin-top: 12px;
`;

const ImgBlock = styled.div`
  display: inline-block;
  width: 85px;
  height: 85px;
  position: relative;
  border: 1px solid #e5e5e5;
  margin-right: 12px;
  margin-top: 12px;
`;

const Del = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: -4px;
  top: -4px;
`;

const Img = styled.img`
  width: 85px;
  height: 85px;
`;

export default class ImgUpload extends React.Component {
  static propTypes = {
    max: PropTypes.number,
    imgIds: PropTypes.array,
    deleteImage: PropTypes.func,
    addImage: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  addImage = () => {
    const { max, imgIds } = this.props;
    const count = max - imgIds.length;
    const params = { sourceType: ['camera'], sizeType: ['original'], count: count };
    try {
      chooseImage(params, (result) => {
        this.props.addImage(result.localIds);
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { max, imgIds } = this.props;
    const prefixImgs = getPrefixImgs(imgIds);
    const count = imgIds.length;
    return (
      <ImageUpload>
        图片上传<Count>({count}/{max})</Count>
        <ImgCon>
          {prefixImgs.map((imgId, index) => (
            <ImgBlock key={index}>
              <Del src={DelIcon} onClick={() => this.props.deleteImage(index)}/>
              <Img src={imgId} />
            </ImgBlock>)
          )}
          {count < max ? <Add src={AddIcon} onClick={this.addImage}/> : null}
        </ImgCon>
      </ImageUpload>
    );
  }
}
