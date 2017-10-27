import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Navigate from 'components/Navigate';
import Message from 'containers/OrderConfirm/Message';
import Score from './Score';
import Toast from 'components/Toast';
import ImgUpload from './ImgUpload';
import { connect } from 'react-redux';
import { push, goBack, replace } from 'react-router-redux';
import { initData, submitComment, setGrade, addImage, deleteImage, setLocation, contentChange, getUploadDir, getUploadImgs } from 'redux/modules/comment';
import { confirmSign } from 'redux/modules/stock';
import { getLocation, uploadImage } from 'utils/WqJsBridge';
import { setBackEnable } from 'utils/WqJsBridge';
import { getLocalData } from 'utils/localStorage';


const Root = styled.div`
  padding-top: 44px;
  background-color: #FFF;
  border-bottom: 1px solid #e5e5e5;
`;

@connect(state => ({
  star: state.comment.star,
  content: state.comment.content,
  latitude: state.comment.latitude,
  longitude: state.comment.longitude,
  imgIds: state.comment.imgIds
}), {
  submitComment,
  setGrade,
  addImage,
  deleteImage,
  contentChange,
  confirmSign,
  setLocation,
  initData,
  pushState: push,
  goBack,
  replace
})
export default class Comment extends React.Component {
  static propTypes = {
    star: PropTypes.number,
    content: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    imgIds: PropTypes.array,
    submitComment: PropTypes.func,
    setGrade: PropTypes.func,
    contentChange: PropTypes.func,
    addImage: PropTypes.func,
    deleteImage: PropTypes.func,
    setLocation: PropTypes.func,
    initData: PropTypes.func,
    pushState: PropTypes.func,
    goBack: PropTypes.func,
    replace: PropTypes.func,
    confirmSign: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      toastShow: false
    };
  }

  componentDidMount() {
    this.props.initData();
    try {
      getLocation((result) => {
        this.props.setLocation(result.latitude, result.longitude);
      });
    } catch (error) {
      console.log(error);
    }
    // 注册给客户端调用的返回事件
    try {
      setBackEnable(true);
    } catch (error) {
      console.log(error);
    }
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    try {
      setBackEnable(false);
    } catch (error) {
      console.log(error);
    }
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  setGrade = (num) => { // 评价打分
    this.props.setGrade(num);
  }

  contentChange = (content) => {
    this.props.contentChange(content);
  }

  submitComment = () => {
    const { type, orderId, tenantId, customerId, supplierId } = this.props.params; // eslint-disable-line
    const { content, star, latitude, longitude, imgIds } = this.props;

    const params = {
      customer_id: customerId,
      em_order_type: type,
      order_id: orderId,
      review_content: content,
      review_image: getUploadImgs(imgIds).join(','),
      review_lat: latitude,
      review_lon: longitude,
      review_score: star,
      source_type: 'camera',
      tenant_id: tenantId
    };
    this.props.submitComment(params).then((result) => {
      if (result.code === '1') { // 提交成功之后上传图片
        const uploadDir = getUploadDir();
        const uploadParams = {uploadDir, localIds: imgIds};
        uploadImage(uploadParams);
        // 显示提交成功,跳转上一个页面
        this.setState({toastShow: true});
        // 提示显示
        setTimeout(() => {
          this.setState({toastShow: false});
          if (type !== 'PSI') {
            const signParams = getLocalData('stock', 'signData');
            this.props.confirmSign(signParams).then((result2) => {
              if (result2.code === '1') {
                this.props.replace(`/_react_/order/detail/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}`);
              } else {
                alert('确认失败，请稍后重试');
              }
            });
          } else {
            this.props.replace(`/_react_/order/detail/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}`);
          }
        }, 300);
      } else {
        alert('评价提交失败，请稍后重试');
      }
    });
  }

  render() {
    const { star, content, imgIds } = this.props;
    const { toastShow } = this.state;
    return (
      <Root>
        <Navigate title="签收评价" menu={'提交'} rightClick={this.submitComment} />
        <Score star={star} setGrade={this.setGrade} />
        <Message
          label={'输入内容（200字）：'}
          placeholder={'如果您对本次订单或配送服务有啥想说的，请在这里输入反馈'}
          onChange={this.contentChange}
          value={content}
          marginTop={0}
        />
        <ImgUpload max={5} imgIds={imgIds} addImage={this.props.addImage} deleteImage={this.props.deleteImage}/>
        <Toast show={toastShow} title={'提交成功'} />
      </Root>
    );
  }
}
