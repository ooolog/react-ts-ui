import { Icon } from '@t-ui/icon';
import React, { useEffect, useRef, useState } from 'react'

interface IETableProps {
    columns?: any[] | {} | {
        title: string,
        dataIndex: string,
        key: string,
        textAlign: string,
        width: number,
        children?: any;
        render: (text?: string, row?: any, index?: number) => void;
    };
    dataSource?: any[],
    bordered?: boolean;
    exclude?: string;
    excludeShow?: boolean;
    line?: number;
    rowSelection?: {
        selectedRowKeys?: (...args: any) => void,
        onChange?: (ev?: any) => void
    },
}

const ETable: React.FC<IETableProps> = (props) => {

    const {
        columns,
        dataSource,
        rowSelection = {},
        exclude,
        excludeShow,
        bordered,
        line
    } = props;
    const {
        selectedRowKeys,
        onChange
    } = rowSelection
    let _numfr = [];

    let _len = (Array.isArray(columns) &&  columns.length);
    if (props.rowSelection) {
        _numfr.push('40px')
    }
    for (let i = 0; i < _len; i++) {
        if (columns[i].width) {
            _numfr.push(`${columns[i].width}px`)
        } else {
            _numfr.push('1fr')
        }
    }

    let _numfrstr = _numfr.join(' ');
    const _style = {
        gridTemplateColumns: _numfrstr
    }
    const _style1 = {
        gridTemplateColumns: '20%'
    }
    const itemsAlinge = {
        justifyContent: 'left',
    }

    let [width, setWidth] = useState<number>(null)
    const _mode = (() => {

        return {
            init() {
                let _width = null;
                if (document.querySelector('.i-etable .g-pack-header')) {
                    let _liAll = document.querySelectorAll('.i-etable .g-pack-header .items');
                    // console.log(_liAll.length, '-_liAll.length')
                    for (var i = 0; i < _liAll.length; i++) {
                        _width += _liAll[i].clientWidth
                        // return _width;
                    }
                    setWidth(_width)

                }
            }
        }
    })();
    useEffect(() => {
        // console.log(document.querySelector('.i-etable .g-pack-header'))
        _mode.init()
    }, [])
    const [toogle, setToogle] = useState<boolean>(false)
    const [zIndex, setzIndex] = useState(1)
    let _colNum = 0, _colArr = [];
    let _gridWidth = [];
    let _s1 = {},_colIndex=0;
    return (
        <div className="i-etable scroll">
            {/* style={{ width: width }} bordered*/}
            <div className={`g-pack ${bordered ? 'is-border' : 'no-border'}`} >
                <div className="g-pack-header" style={_style}>
                    {/* <div className="items items1" style={_style1}></div> */}
                    {
                        Array.isArray(columns) && columns.map((item, index) => {
                            return <React.Fragment key={index}>
                                {
                                    (props.rowSelection && index == 0) &&
                                    <div className="items items1" >
                                        <Icon icon="fangkuang" style={{ color: 'rgb(64, 158, 255)' }} />
                                    </div>
                                }
                                <div className="items items1"
                                    style={{ ...itemsAlinge, textAlign: item.textAlign ? item.textAlign : 'left' }}
                                    key={index}>{item.title}</div>
                            </React.Fragment>
                        })
                    }
                </div>
                <div className="g-pack-body-con">
                    {/* <div className="items items1" style={_style1}></div> */}
                    {
                        dataSource.map((item, n) => {
                            let _excludeArr = [];
                            if (item[exclude]) {
                                _excludeArr = item[exclude];
                            }


                            return <div className="g-pack-body" style={_style} key={n}>
                                {
                                    Array.isArray(columns) && columns.map((v, index) => {
                                        let _title = ''
                                        if (item[v.dataIndex]) {
                                            _title = item[v.dataIndex];
                                        }
                                        v['e_currindex_1'] = index;
                                        v['e_currindex_2'] = index;
                                        v['e_currindex_3'] = index + 1;
                                        // console.log(v, '-v')
                                        let _s = {}
                                        if (v.children && v.children.colSpan) {
                                            // console.log(index,'-index')
                                            _colNum++
                                            _colArr.push(v)
                                            _gridWidth.push(v.width + 'px')
                                            // _colIndex = index
                                            _s = {
                                                display: 'grid',
                                                gridColumn: `8 / span 3`,
                                                border: 'solid 1px #F2F3F5',
                                                gridTemplateColumns: _gridWidth.join(' '),
                                                zIndex
                                            }
                                            
                                        }
                                        if (v.children && v.children.colSpan) {
                                            _s1 = {
                                                display: 'grid',
                                                gridTemplateColumns: '300px 80px 80px'
                                            }
                                        }
                                    //    console.log(v.children ,'v.children.colSpan')
                                        return <React.Fragment key={index}>
                                            {
                                                (props.rowSelection && index === 0) &&
                                                <div className="items items1" >
                                                    <Icon icon="fangkuang" style={{ color: 'rgb(64, 158, 255)' }} /></div>
                                            }
                                            {
                                                !v.children && <div className={`items items`}
                                                    style={{ ...itemsAlinge, textAlign: v.textAlign ? v.textAlign : 'left' }}
                                                    key={index}>
                                                    {
                                                        //  (item[exclude] && item[exclude]) ? null :  
                                                        v.render ?
                                                            v.render(_title, item, index) :
                                                            _title
                                                    }

                                                </div>
                                            }
                                            {
                                               

                                                (v.children && v.children.colSpan &&
                                                    v.children.colSpan && _colNum == 1
                                                ) 
                                                && <div className={` items5-1-c`} style={_s1.gridTemplateColumns && _s}>

                                                    {/* excludeShow, exclude,*/}
                                                    <div className={`items5-1-c-pos ${(exclude && excludeShow) ? 'pos-active':' '}`}>
                                                        <div className={`i-table-info ${toogle ? ' i-table-info-active active ' : ''}`} >
                                                            {
                                                                item[exclude] && item[exclude].map((k, n) => {
                                                                    let _title1 = ''
                                                                    // if (k[v.dataIndex]) {
                                                                    //     _title1 = k[v.dataIndex];
                                                                    // }
                                                                    // console.log(k, '-_title1',item)
                                                                    // console.log(item[exclude], '56-k',k,_title1)
                                                                    return <>
                                                                        <div className="items5-1 items5-1-1" style={_s1}>
                                                                            {
                                                                                v.render ?
                                                                                    v.render(_title1, k,item, n) :
                                                                                    ''
                                                                            }
                                                                        </div>
                                                                    </>
                                                                })
                                                            }
                                                        </div>
                                                        <div className={`i-table-toogle ${toogle ? 'active ' : ''}`} onClick={() => {
                                                            setToogle(!toogle)
                                                            setzIndex(zIndex+1)
                                                        }}>
                                                            <Icon icon={`${toogle ? "shouqi" : "xiala"}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </React.Fragment>
                                    })
                                }
                            </div>
                        })

                    }
                </div>
            </div>
        </div>
    )
}
ETable.defaultProps = {
    columns: [],
    dataSource: [],
    line: 2,
    exclude: '',
    bordered: true,
    excludeShow: true
}

export default ETable
