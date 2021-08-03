import React from 'react'
import { Button } from '@t-ui/button'
/**
* @desc: 上传组件
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:36:43
* @param {Object} {}
* @return  {*}
*/
const Upload: React.FC = () => {
    return (
        <div className="i-upload">
            <div className="container">
                <div className="item">
                    <h3>单一文件上传「FORM-DATA」</h3>
                    <section className="upload_box" id="upload1">
                        {/* <!-- accept=".png" 限定上传文件的格式 --> */}
                        <input type="file" className="upload_inp" accept=".png,.jpg,.jpeg" />
                        <div className="upload_Button_box">
                            <Button >选择文件</Button>
                            <Button btnType="success">上传到服务器</Button>
                        </div>
                        <div className="upload_tip">只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB</div>
                        <ul className="upload_list">
                            <li>
                                <span>文件：...</span>
                                <span><em>移除</em></span>
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="item">
                    <h3>单一文件上传「BASE64」，只适合图片</h3>
                    <section className="upload_box" id="upload2">
                        <input type="file" className="upload_inp" accept=".jpg,.jpeg,.png" />
                        <div className="upload_Button_box">
                            <Button btnType="success">上传图片</Button>
                        </div>
                        <div className="upload_tip">只能上传jpg/png格式图片，且大小不能超过2mb</div>
                    </section>
                </div>

                <div className="item">
                    <h3>单一文件上传「缩略图处理」</h3>
                    <section className="upload_box" id="upload3">
                        <input type="file" className="upload_inp" accept=".jpg,.jpeg,.png" />
                        <div className="upload_Button_box">
                            <Button >选择文件</Button>
                            <Button btnType="success">上传到服务器</Button>
                        </div>
                        <div className="upload_abbre">
                            <img src="" alt="" />
                        </div>
                    </section>
                </div>
            </div>

            <div className="container">
                <div className="item">
                    <h3>单一文件上传「进度管控」</h3>
                    <section className="upload_box" id="upload4">
                        <input type="file" className="upload_inp" />
                        <div className="upload_Button_box">
                            <Button >上传文件</Button>
                        </div>
                        <div className="upload_progress">
                            <div className="value"></div>
                        </div>
                    </section>
                </div>

                <div className="item">
                    <h3>多文件上传</h3>
                    <section className="upload_box" id="upload5">
                        <input type="file" className="upload_inp" multiple />
                        <div className="upload_Button_box">
                            <Button >选择文件</Button>
                            <Button btnType="success">上传到服务器</Button>
                        </div>
                        <ul className="upload_list">
                            <li key='xx'>
                                <span>文件：xxxxx</span>
                                <span><em>移除</em></span>
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="item">
                    <h3>拖拽上传</h3>
                    <section className="upload_box" id="upload6">
                        <input type="file" className="upload_inp" />
                        <div className="upload_drag">
                            <i className="icon"></i>
                            <span className="text">将文件拖到此处，或<a href="javascript:;" className="upload_submit">点击上传</a></span>
                        </div>
                        <div className="upload_mark">正在上传中，请稍等...</div>
                    </section>
                </div>
            </div>

            <div className="container">
                <div className="item">
                    <h3>大文件上传</h3>
                    <section className="upload_box" id="upload7">
                        <input type="file" className="upload_inp" />
                        <div className="upload_Button_box">
                            <Button>上传图片</Button>
                        </div>
                        <div className="upload_progress">
                            <div className="value"></div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default Upload
