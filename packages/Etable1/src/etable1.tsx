import { Icon } from '@t-ui/icon';
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import classNames from 'classnames';
export interface SourceDataType {
    key: string;
    [key: string]: any;
}
export interface ColumnType {
    title: ReactNode;
    /** 排序等操作用来代替这列的 */
    dataIndex: string;
    sorter?: {
        compare: (a: SourceDataType, b: SourceDataType) => number;
    };
    render?: (v: any, value?: SourceDataType, rowData?: ColumnType) => ReactNode;
    width?: any;
    key?: string,
    textAlign?: string,
    children?: any;

}
interface IETableProps {
    columns?: ColumnType[];
    dataSource?: SourceDataType[],
    bordered?: boolean; //边框
    exclude?: string; //跨行字段
    excludeShow?: boolean; //点击展开 true 悬浮展开 false 伸缩展开
    line?: number;
    height?: string;
    loading?: boolean
    rowSelection?: {
        selectedRowKeys?: (...args: any) => void,
        onChange?: (selectedRowKeys?: any, selectedRows?: any) => void
    },
    renderChild?: () => React.ReactNode
}
const ETable1: React.FC<IETableProps> = (props) => {
    let {
        columns,
        dataSource,
        rowSelection = {},
        exclude,
        excludeShow,
        bordered,
        line,
        height,
        renderChild,
        loading
    } = props;
    const {
        selectedRowKeys,
        onChange
    } = rowSelection;
    dataSource.map((item, index) => (
        item['i_table_index_1'] = index,
        item['i_table_index_2'] = index,
        item['i_table_index_3'] = index + 1,
        item['i_table_index_key'] = index,
        item['i_table_index_key_1'] = index + 1,
        item
    )
    )
    const [toogle, setToogle] = useState<boolean>(false)
    const [zIndex, setzIndex] = useState(1)
    const [selectedRowDatas, setRowDatas] = useState([])
    const [isSelectedRow, setIsSelectedRow] = useState<number>(2); // 1全选 2 反选 3 半选
    const [isSelectedNumber, setIsSelectedNumber] = useState<number>(2); // 1全选 2 反选 3 半选
    const [selectedRowObjs, setRowObjs] = useState({})
    const [toogelCuurIndex, SetToogelCuurIndex] = useState(-1)

    let _numfr = [];
    let _numWidth = 0;
    let _len = (Array.isArray(columns) && columns.length);
    let isFalse = false
    if (props.rowSelection) {
        _numfr.push('40px')
        _numWidth += 40
    }
    if (Array.isArray(columns)) {
        for (let i = 0; i < _len; i++) {
            if (columns[i]!.width) {
                _numWidth += columns[i].width
                _numfr.push(`${columns[i].width}px`)
                isFalse = true
            } else {
                _numWidth += 40
                _numfr.push('1fr')
            }
        }
    }
    let _isClassName = `fangkuang`;
    /**
    * @desc: 勾选每条数据进行判断
    * @author:  zhangyunajiang
    * @creatDate 2021-06-14 21:34:46
    * @param {Object} {}
    * @return  {*}
    */
    function setRowDatasHandel(item, n) {
        // ev.target.classList.add('xuanzhong1')
        // console.log(ev.target,item,'this',n)
        if (selectedRowObjs[n]) { //如果存在就删除
            setRowObjs({
                ...selectedRowObjs,
                [n]: false
            })
            const _datas = selectedRowDatas.filter(item => !item[`table_n_${n}`]);
            setRowDatas([..._datas])
            let _indexs = []
            _datas.forEach(item => {
                _indexs.push(item.id || item.i_table_index_key)
            })
            onChange(_indexs, [..._datas])
            chekboxFalse(_datas);
        } else { //如果不存在就添加数据到数组中
            setRowObjs({
                ...selectedRowObjs,
                [n]: true
            });
            setRowDatas([
                ...selectedRowDatas,
                { ...item, [`table_n_${n}`]: true }
            ])
            const _datas = [
                ...selectedRowDatas,
                { ...item, [`table_n_${n}`]: true }
            ];
            let _indexs = []
            _datas.forEach(item => {
                _indexs.push(item.id || item.i_table_index_key)
            })
            onChange(_indexs, [..._datas]);
            chekboxFalse(_datas);
        }

    }
    /**
    * @desc:  头部勾选判断
    * @author:  zhangyunajiang
    * @creatDate 2021-06-14 21:34:27
    * @param {Object} {}
    * @return  {*}
    */
    function chekboxFalse(_datas) {
        setTimeout(() => {
            if (_datas.length === dataSource.length) {
                setIsSelectedNumber(1)
                setIsSelectedRow(1)
            } else if (_datas.length == 0) {
                setIsSelectedNumber(2)
                setIsSelectedRow(2)
            } else {
                setIsSelectedNumber(3)
                setIsSelectedRow(3)
            }
        }, 24)
    }
    // console.log(selectedRowDatas,'数据-selectedRowDatas',selectedRowObjs)
    let _numfrstr = _numfr.join(' '), _colNum = 0, _gridWidth = [], _lineIndex = 0;;
    const _style = {
        display: 'grid',
        gridTemplateColumns: _numfrstr,
    }
    /**
    * @desc: 标题头
    * @author:  zhangyunajiang
    * @creatDate 2021-05-13 00:06:08
    * @param {Object} {}
    * @return  {*}
    */
    const headetHtml = () => {
        if (isSelectedRow == 1) {
            _isClassName = 'xuanzhong1'
        } else if (isSelectedRow == 2) {
            _isClassName = 'fangkuang'
        } else if (isSelectedRow == 3) {
            _isClassName = 'xuanze1'
        }
        return Array.isArray(columns) && columns.map((item, index) => {
            return <React.Fragment key={index}>
                {
                    (props.rowSelection && index == 0) &&
                    <div className="width100 tds  t-checbox-index" >
                        <Icon icon={`${_isClassName}`} style={{ color: 'rgb(64, 158, 255)' }} classNmae="i-cursor" onClick={() => {
                            if (isSelectedRow == 1) {
                                setIsSelectedNumber(2)
                                setIsSelectedRow(2)
                                setRowObjs({
                                });
                                setRowDatas([])
                                onChange([], []);
                            } else {
                                setIsSelectedNumber(1)
                                setIsSelectedRow(1)
                                let _dataArr = [], _indexs = []
                                dataSource.forEach((v, n) => {
                                    _indexs.push(v.id || v.i_table_index_key)
                                    _dataArr.push({
                                        ...v,
                                        [`table_n_${n}`]: true
                                    });


                                });
                                onChange(_indexs, [..._dataArr]);
                                setRowObjs({
                                    ..._dataArr
                                });
                                setRowDatas([
                                    ..._dataArr
                                ])
                            }
                        }} />
                    </div>
                }
                <div className="width100 tds  t-checbox-index"
                    style={{ textAlign: item.textAlign ? item.textAlign : 'left'}}
                    key={index}>{item.title}</div>
            </React.Fragment>
        })
    }
    /**
    * @desc: 是否跨行展示点击展开
    * @author:  zhangyunajiang
    * @creatDate 2021-05-13 00:06:16
    * @param {Object} {}
    * @return  {*}
    */
    const childrenHtml = (childrenProps) => {
        const { v, _gridChildren, _s1_1, item, _s1, n, line, excludeShow, _index, len, _wChild } = childrenProps
        let _gridTemplateColumns = {
            ..._s1,
        }
        if (_wChild.length == len) {
            _gridTemplateColumns = {
                ..._s1,
                display: 'grid',
                gridTemplateColumns: _wChild.join(' ')
            }
        }
        let dataNone = {}
        if (item[exclude] && item[exclude].length == 0) {
            dataNone = {
                display: 'block',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                border: 0,
                color: '#00000040'
            }
        }
        return (v.children && v.children.colSpan
        ) && <div className={`items5-1-c ${ bordered ? 'i-table-col-pre' : ''}`} style={_gridChildren}>

                <div className={`items5-1-c-pos ${(exclude && excludeShow) ? 'pos-active' : 'pos-exclude-show '}`}
                    style={!excludeShow ? { ..._s1_1, ...dataNone } : { ...dataNone }}>
                    {
                        item[exclude] && item[exclude].length > 0 ?
                            <div className={`i-table-info ${toogle && toogelCuurIndex === n ? ' i-table-info-active active ' : ''}`}
                                style={{ height: toogelCuurIndex === n ? line * 40 : '' }}>
                                {
                                    item[exclude] && item[exclude].map((k, n) => {
                                        let _title1 = ''
                                        if (k[v.dataIndex]) {
                                            _title1 = k[v.dataIndex];
                                        }
                                        return <React.Fragment key={n}>
                                            {/* , padding: !excludeShow ? '10px ' : '10px 0' */}
                                            <div className="items5-1 items5-1-1"
                                                style={{ ..._gridTemplateColumns }}>
                                                {
                                                    v.render && v.render(_title1, k, item, n)
                                                }
                                            </div>
                                        </React.Fragment>
                                    })
                                }
                            </div>
                            : <div
                                className="i-table-col-nodata"
                            >
                                <div>
                                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2660" width="40" height="40"><path d="M708.2 194.6c-4.8 1.1-9.9-0.2-13.5-3.6-2.7-2.5-4.2-5.9-4.2-9.6 0-3.6 1.5-7.1 4.2-9.6l37.2-37.3c2.5-2.7 5.9-4.2 9.6-4.2 3.7 0 7.1 1.5 9.6 4.2 2.7 2.5 4.2 5.9 4.2 9.6 0 3.6-1.5 7.1-4.2 9.6L713.9 191c-2.3 2.3-3.4 3.4-5.7 3.4M791.6 281.6c-1.7 0.9-3.7 1.3-5.7 1.2l-47.3-5.6c-7.5-0.6-13-7.2-12.4-14.7 0.6-7.5 7.2-13 14.7-12.4l47.3 4.5c7.5 0.7 13 7.2 12.4 14.7 0 5.6-3.6 10.6-9 12.3M628.1 176.6c-3.4 1.2-7.2 0.8-10.4-0.9-3.2-1.7-5.5-4.7-6.5-8.1l-15.8-45.2c-2.4-6.8 1.1-14.4 7.9-17 3.4-1.2 7.2-0.9 10.4 0.8 3.2 1.7 5.6 4.6 6.6 8.1l15.8 45.2c1.4 3.3 1.4 7-0.1 10.2-1.5 3.3-4.4 5.7-7.9 6.9M451.2 915.6H279.8c-6.2 0-11.3-5.1-11.3-11.3 0-6.2 5.1-11.3 11.3-11.3h171.3c3.1-0.2 6 0.9 8.2 3.1 2.2 2.2 3.3 5.2 3.1 8.2 0 3-1.2 5.9-3.3 8-2.1 2.1-4.9 3.3-7.9 3.3z m-171.4-60.1c-6.2 0-11.3-5.1-11.3-11.3 0-6.2 5.1-11.3 11.3-11.3l381.1-1.1c6.2 0 11.3 5.1 11.3 11.3 0 6.2-5.1 11.3-11.3 11.3l-381.1 1.1z m0 0" p-id="2661" fill="#cdcdcd"></path><path d="M208.5 390c6.8-2.4 11.6-8.6 12.3-15.8-13-40.7-26-81.5-39.1-122.2-2.4-7.6-11.5-11.5-20.3-8.7-8.8 2.8-14.1 11.2-11.6 18.8 13 41.1 26 82.2 39.1 123.4 5.1 5.2 12.8 7 19.6 4.5z m103.9 320.5c6.8-2.4 11.6-8.6 12.3-15.8-13-40.7-26-81.5-39.1-122.2-2.4-7.6-11.5-11.5-20.3-8.7-8.8 2.8-14.1 11.2-11.6 18.8 13 41.1 26 82.2 39.1 123.4 5 5.3 12.7 7 19.6 4.5z m28 78.8c6.8-2.4 11.6-8.6 12.3-15.8-13-40.7-0.3-0.6-13.3-41.3-2.4-7.6-11.5-11.5-20.3-8.7-8.8 2.8-14.1 11.2-11.6 18.8 13 41.1 0.3 1.4 13.3 42.5 5.1 5.3 12.8 7 19.6 4.5z m-7.3 2.2c41.2-12.7 1.3-0.6 42.5-13.3 7.6-2.3 11.6-11.5 8.9-20.3-2.7-8.8-11.1-14.1-18.7-11.8-40.9 12.5-0.6 0.1-41.5 12.7-5.5 4.7-7.8 12.1-6 19.1 1.8 7 7.6 12.3 14.8 13.6z m-73.1-241c6.8-2.4 11.6-8.6 12.3-15.8-13-40.7-26-81.5-39.1-122.2-2.4-7.6-11.5-11.5-20.3-8.7-8.8 2.8-14.1 11.2-11.6 18.8 13 41.1 26 82.2 39.1 123.4 5.1 5.2 12.8 6.9 19.6 4.5z m479.5 99.6c40.7-14.3 81.4-28.5 122.1-42.8 7.6-2.6 11.1-11.9 8.1-20.6-3-8.7-11.6-13.7-19.1-11.1-40.4 14-80.8 28.1-121.2 42.1-5.3 4.9-7.3 12.4-5.2 19.3 2.1 7 8.1 12.1 15.3 13.1zM419.8 761.3c40.7-14.3 81.4-28.5 122.1-42.8 7.6-2.6 11.1-11.9 8.1-20.6-3-8.7-11.6-13.7-19.1-11.1-40.4 14-80.8 28.1-121.2 42.1-5.3 4.9-7.3 12.4-5.2 19.3 2.1 6.9 8.1 12.1 15.3 13.1zM579.3 707c40.7-14.3 81.4-28.5 122.1-42.8 7.6-2.6 11.1-11.9 8.1-20.6-3-8.7-11.6-13.7-19.1-11.1-40.4 14-80.8 28.1-121.2 42.1-5.3 4.9-7.3 12.4-5.2 19.3 2 7 8 12.1 15.3 13.1z m228.6-102.5M406.7 574.8l42.8-82.9 96.4 49.8c4 2.1 8.6 2.5 12.9 1.1l0.4-0.1c4.4-1.5 8-4.8 9.9-9l102.6-226.5c3.9-8.5 0.1-18.6-8.4-22.4-8.5-3.8-18.6-0.1-22.4 8.4l-95.3 210.2-95.6-49.3c-8.3-4.3-18.5-1-22.8 7.3l-50.6 97.9c-4.3 8.3-1 18.5 7.3 22.8 8.3 4.2 18.5 1 22.8-7.3z m0 0" p-id="2662" fill="#cdcdcd"></path></svg>
                                </div>
                                <p>暂无数据</p>
                            </div>
                    }
                    {
                        item[exclude] && item[exclude].length > 0 &&
                        <div data-index={toogelCuurIndex} data-index-1={n}
                            className={`i-table-toogle ${toogle && toogelCuurIndex === n ? 'active ' : ''}`} onClick={() => {
                                setToogle(!toogle);
                                setzIndex(zIndex + 1);
                                if (_index == n) {
                                    SetToogelCuurIndex(_index);
                                } else {
                                    SetToogelCuurIndex(-1);
                                }
                            }}>
                            <Icon icon={`${toogle && (toogelCuurIndex == n) ? "xiala" : "shouqi"}`} style={{ marginRight: 5 }} />
                            {len && <>(<span style={{ color: toogle && (toogelCuurIndex == n) ? '#67C23A' : '#F56C6C' }}>{len}</span>)</>}
                        </div>
                    }

                </div>
            </div>
    }

    let childProps = {}, childHtml = []
    return (
        <div className="i-etable1 scroll">
            <div className="tabler-wrapper-win scroll">
                <div className="fixed-table-bg table-w-fixed"></div>
                <div className="table-over" >
                    <div className="table1 table">
                        <div className="td-head-bg td-head tds-wi100" style={_style}>
                            {
                                headetHtml()
                            }
                        </div>
                    </div>
                    <div className="scroll table12" style={{ height: height }}>
                        <div className="table12 td-body">
                            {
                                loading && <div
                                    className="i-table-nodate"
                                >
                                    <div
                                        className="i-table-nodate-svg"
                                    >
                                        <svg className="icon i-button-loading" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                                            <path d="M964.388184 477.340047a72.848985 72.848985 0 0 1 22.16189 53.612757c0 20.991625-7.387297 38.691881-22.16189 53.612757a72.044428 72.044428 0 0 1-53.466474 22.16189c-20.845342 0-38.618739-7.460438-53.612757-22.16189a72.848985 72.848985 0 0 1-22.16189-53.612757c0-20.991625 7.387297-38.691881 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.161889c20.7722 0 38.765022 7.460438 53.466474 22.161889m-99.911359 348.885199a73.141551 73.141551 0 0 1-22.527598 53.393332 72.995268 72.995268 0 0 1-53.393332 22.527598c-20.991625 0-38.618739-7.460438-53.612757-22.16189a72.848985 72.848985 0 0 1-22.16189-53.612757c0-20.991625 7.460438-38.618739 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.691881 7.460438 53.612757 22.16189a72.410136 72.410136 0 0 1 22.308173 53.466474m56.904127-590.179175c0 36.717059-13.019196 68.094784-39.13073 93.913751a128.070856 128.070856 0 0 1-93.621185 38.691881c-36.643917 0-68.021642-12.946055-93.913752-38.691881a127.924573 127.924573 0 0 1-38.618739-93.913751c0-36.351351 12.946055-67.582793 38.618739-93.621186a127.924573 127.924573 0 0 1 93.986893-39.13073c36.351351 0 67.582793 13.092338 93.548044 39.203872 26.111534 25.818968 39.13073 57.05041 39.13073 93.548044m-374.192175 658.566525a72.848985 72.848985 0 0 1 22.088748 53.612757c0 20.991625-7.387297 38.691881-22.088748 53.612757a72.848985 72.848985 0 0 1-53.685899 22.16189c-20.991625 0-38.618739-7.460438-53.612757-22.16189a72.410136 72.410136 0 0 1-22.16189-53.612757c0-20.991625 7.460438-38.618739 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.765022 7.460438 53.685899 22.16189M574.251151 33.151408c22.088748 22.16189 33.206264 48.931698 33.206264 80.675131 0 31.743433-11.117516 58.366958-33.206264 80.601989a109.566043 109.566043 0 0 1-80.60199 33.133123c-31.743433 0-58.366958-11.117516-80.601989-33.133123a109.346619 109.346619 0 0 1-33.206264-80.601989c0-31.743433 11.190657-58.366958 33.206264-80.675131A109.785468 109.785468 0 0 1 493.57602 0.018285c31.59715 0 58.366958 11.117516 80.601989 33.133123M252.208901 772.612489a72.848985 72.848985 0 0 1 22.088749 53.612757c0 20.991625-7.387297 38.691881-22.088749 53.685898a72.848985 72.848985 0 0 1-53.685898 22.088749 73.141551 73.141551 0 0 1-53.393332-22.527598 72.995268 72.995268 0 0 1-22.454457-53.393332c0-20.991625 7.387297-38.618739 22.088749-53.612757a72.848985 72.848985 0 0 1 53.685898-22.088748c20.991625 0 38.911305 7.387297 53.75904 22.235031M265.37438 168.975268c18.577954 18.577954 27.866931 40.959269 27.866931 66.92452 0 26.038392-9.288977 48.273424-27.866931 66.99766-18.577954 18.651096-40.959269 28.013214-66.99766 28.013214-25.965251 0-48.273424-9.215835-66.924519-27.940072a91.134373 91.134373 0 0 1-27.866931-66.924519c0-25.965251 9.215835-48.273424 27.866931-66.92452 18.724237-18.724237 40.959269-27.940072 66.924519-27.940072 26.038392 0 48.273424 9.215835 66.99766 27.793789M129.98937 477.340047a72.848985 72.848985 0 0 1 22.161889 53.612757c0 20.991625-7.460438 38.691881-22.161889 53.612757a72.190711 72.190711 0 0 1-53.612757 22.16189c-20.991625 0-38.691881-7.460438-53.612757-22.16189A72.190711 72.190711 0 0 1 0.601966 531.025946c0-20.991625 7.460438-38.691881 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.765022 7.460438 53.612757 22.16189"
                                                fill="#409EFF"></path></svg>
                                    </div>
                                </div>
                            }
                            {
                                dataSource.length > 0 ? dataSource.map((item, n) => {
                                    let _wChild = [];
                                    let _i = [];
                                    _lineIndex = n
                                    let _spanColse = {}
                                    return <React.Fragment key={n}>
                                        <div className={` ${renderChild ? 'width100 tds-r stripe i-table-render-child' : ''}`} style={{ borderTop: 0 }}>
                                            <div className={`width100 tds-r stripe t-imgcenter tds-wi100 ${renderChild ? 'i-table-child-div' : ''} ${!bordered ? ' i-table-border-none':''}`} key={n} style={_style} data-index={n}>
                                                {
                                                    Array.isArray(columns) && columns.map((v, index) => {
                                                        v['e_currindex_1'] = index;
                                                        v['e_currindex_2'] = index;
                                                        v['e_currindex_3'] = index + 1;
                                                        // console.log(item, '-item', v)
                                                        let _title = ''
                                                        if (item[v.dataIndex]) {
                                                            _title = item[v.dataIndex];
                                                        }
                                                        let _gridChildren = {}, _s1 = {}, _spanVal, _len = 0;
                                                        let _s1_1 = {}
                                                        if (v.children && v.children.colSpan) {
                                                            _colNum++
                                                            if (!_spanColse[index + 2]) {
                                                                _spanColse[index + 2] = index + 2;
                                                                _wChild.push(v.width + 'px')
                                                            }
                                                            const sapnVal = Object.values(_spanColse)
                                                            _spanVal = sapnVal[0];
                                                            _gridWidth.push(v.width + 'px');
                                                            // console.log(_gridWidth,'--_gridWidth',index)
                                                            _len = sapnVal.length;
                                                            _gridChildren = {
                                                                display: 'grid',
                                                                gridColumn: `${_spanVal} / span ${_len}`,
                                                                border: 'solid 1px #F2F3F5',
                                                                gridTemplateColumns: _gridWidth.join(' '),
                                                            }

                                                            _i.push(n)
                                                            _s1 = {

                                                                gridTemplateColumns: "300px 100px 80px"//'300px 80px 80px'
                                                            }
                                                            _s1_1 = {
                                                                display: 'grid',
                                                                gridColumn: ` 1 / span 3`
                                                            }
                                                        }

                                                        childProps = {
                                                            v, _gridChildren, _s1_1, item, _s1, n,
                                                            line,
                                                            excludeShow, len: _len,
                                                            _index: n,
                                                            _wChild
                                                        }
                                                        return <React.Fragment key={index}>
                                                            {
                                                                (props.rowSelection && index === 0) &&
                                                                <div className=" width100 tds  t-checbox-index 5" >
                                                                    {/* selectedRowObjs[n] */}
                                                                    <Icon icon={`${(selectedRowObjs[n] && selectedRowObjs[n]) ? 'xuanzhong1' : 'fangkuang'}`} style={{ color: 'rgb(64, 158, 255)' }}
                                                                        classNmae={`i-cursor`}
                                                                        onClick={() => {
                                                                            setRowDatasHandel(item, n)
                                                                        }}
                                                                    /></div>
                                                            }
                                                            {
                                                                !v.children &&
                                                                <div className=" width100 tds  t-checbox-index" >{
                                                                    //  (item[exclude] && item[exclude]) ? null :  
                                                                    v.render ?
                                                                        v.render(_title, item, index, n) :
                                                                        _title
                                                                }</div>
                                                            }
                                                            {
                                                                _spanVal == index && childrenHtml(childProps)
                                                            }
                                                        </React.Fragment>

                                                    })
                                                }

                                            </div>
                                            {
                                                renderChild && <div className="i-table-children-info" >{renderChild()}</div>
                                            }
                                        </div>
                                    </React.Fragment>
                                })
                                    :
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '300px',
                                        color: 'rgba(0, 0, 0, 0.25)',
                                        textAlign: 'center'
                                    }}>
                                        <div>
                                            <div>
                                                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2660" width="40" height="40"><path d="M708.2 194.6c-4.8 1.1-9.9-0.2-13.5-3.6-2.7-2.5-4.2-5.9-4.2-9.6 0-3.6 1.5-7.1 4.2-9.6l37.2-37.3c2.5-2.7 5.9-4.2 9.6-4.2 3.7 0 7.1 1.5 9.6 4.2 2.7 2.5 4.2 5.9 4.2 9.6 0 3.6-1.5 7.1-4.2 9.6L713.9 191c-2.3 2.3-3.4 3.4-5.7 3.4M791.6 281.6c-1.7 0.9-3.7 1.3-5.7 1.2l-47.3-5.6c-7.5-0.6-13-7.2-12.4-14.7 0.6-7.5 7.2-13 14.7-12.4l47.3 4.5c7.5 0.7 13 7.2 12.4 14.7 0 5.6-3.6 10.6-9 12.3M628.1 176.6c-3.4 1.2-7.2 0.8-10.4-0.9-3.2-1.7-5.5-4.7-6.5-8.1l-15.8-45.2c-2.4-6.8 1.1-14.4 7.9-17 3.4-1.2 7.2-0.9 10.4 0.8 3.2 1.7 5.6 4.6 6.6 8.1l15.8 45.2c1.4 3.3 1.4 7-0.1 10.2-1.5 3.3-4.4 5.7-7.9 6.9M451.2 915.6H279.8c-6.2 0-11.3-5.1-11.3-11.3 0-6.2 5.1-11.3 11.3-11.3h171.3c3.1-0.2 6 0.9 8.2 3.1 2.2 2.2 3.3 5.2 3.1 8.2 0 3-1.2 5.9-3.3 8-2.1 2.1-4.9 3.3-7.9 3.3z m-171.4-60.1c-6.2 0-11.3-5.1-11.3-11.3 0-6.2 5.1-11.3 11.3-11.3l381.1-1.1c6.2 0 11.3 5.1 11.3 11.3 0 6.2-5.1 11.3-11.3 11.3l-381.1 1.1z m0 0" p-id="2661" fill="#cdcdcd"></path><path d="M208.5 390c6.8-2.4 11.6-8.6 12.3-15.8-13-40.7-26-81.5-39.1-122.2-2.4-7.6-11.5-11.5-20.3-8.7-8.8 2.8-14.1 11.2-11.6 18.8 13 41.1 26 82.2 39.1 123.4 5.1 5.2 12.8 7 19.6 4.5z m103.9 320.5c6.8-2.4 11.6-8.6 12.3-15.8-13-40.7-26-81.5-39.1-122.2-2.4-7.6-11.5-11.5-20.3-8.7-8.8 2.8-14.1 11.2-11.6 18.8 13 41.1 26 82.2 39.1 123.4 5 5.3 12.7 7 19.6 4.5z m28 78.8c6.8-2.4 11.6-8.6 12.3-15.8-13-40.7-0.3-0.6-13.3-41.3-2.4-7.6-11.5-11.5-20.3-8.7-8.8 2.8-14.1 11.2-11.6 18.8 13 41.1 0.3 1.4 13.3 42.5 5.1 5.3 12.8 7 19.6 4.5z m-7.3 2.2c41.2-12.7 1.3-0.6 42.5-13.3 7.6-2.3 11.6-11.5 8.9-20.3-2.7-8.8-11.1-14.1-18.7-11.8-40.9 12.5-0.6 0.1-41.5 12.7-5.5 4.7-7.8 12.1-6 19.1 1.8 7 7.6 12.3 14.8 13.6z m-73.1-241c6.8-2.4 11.6-8.6 12.3-15.8-13-40.7-26-81.5-39.1-122.2-2.4-7.6-11.5-11.5-20.3-8.7-8.8 2.8-14.1 11.2-11.6 18.8 13 41.1 26 82.2 39.1 123.4 5.1 5.2 12.8 6.9 19.6 4.5z m479.5 99.6c40.7-14.3 81.4-28.5 122.1-42.8 7.6-2.6 11.1-11.9 8.1-20.6-3-8.7-11.6-13.7-19.1-11.1-40.4 14-80.8 28.1-121.2 42.1-5.3 4.9-7.3 12.4-5.2 19.3 2.1 7 8.1 12.1 15.3 13.1zM419.8 761.3c40.7-14.3 81.4-28.5 122.1-42.8 7.6-2.6 11.1-11.9 8.1-20.6-3-8.7-11.6-13.7-19.1-11.1-40.4 14-80.8 28.1-121.2 42.1-5.3 4.9-7.3 12.4-5.2 19.3 2.1 6.9 8.1 12.1 15.3 13.1zM579.3 707c40.7-14.3 81.4-28.5 122.1-42.8 7.6-2.6 11.1-11.9 8.1-20.6-3-8.7-11.6-13.7-19.1-11.1-40.4 14-80.8 28.1-121.2 42.1-5.3 4.9-7.3 12.4-5.2 19.3 2 7 8 12.1 15.3 13.1z m228.6-102.5M406.7 574.8l42.8-82.9 96.4 49.8c4 2.1 8.6 2.5 12.9 1.1l0.4-0.1c4.4-1.5 8-4.8 9.9-9l102.6-226.5c3.9-8.5 0.1-18.6-8.4-22.4-8.5-3.8-18.6-0.1-22.4 8.4l-95.3 210.2-95.6-49.3c-8.3-4.3-18.5-1-22.8 7.3l-50.6 97.9c-4.3 8.3-1 18.5 7.3 22.8 8.3 4.2 18.5 1 22.8-7.3z m0 0" p-id="2662" fill="#cdcdcd"></path></svg>
                                            </div>
                                            <p>暂无数据</p>
                                        </div>
                                    </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ETable1.defaultProps = {
    excludeShow: true,
    line: 1,
    loading: false,
    bordered: true
}
export default ETable1
