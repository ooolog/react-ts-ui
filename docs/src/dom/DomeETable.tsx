import React from 'react'
import { ETable} from 't-ui'
import { useState } from 'react';

export default function DomeETable() {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ]
    const columns1 = [
        {
            title: '缩率图',
            dataIndex: 'img',
            key: 'img',
            textAlign: 'center',
            width: 300,
            render: (text, row, index) => {
                return <img src={text} style={{ maxHeight: 100 }} />
            }
        },
        {
            title: '产品信息',
            dataIndex: 'producd',
            key: 'age',
            width: 300,
        },
        {
            title: '刊登信息',
            dataIndex: 'info',
            key: 'address',
            width: 300,
        },
        {
            title: <>
                <div>代码/国家</div>
                <div>语言/币种</div>
            </>,
            dataIndex: 'address',
            key: 'address',
            width: 300,
        },
        {
            title: <>
                <div>产品状态</div>
                <div>刊登类型</div>
            </>,
            dataIndex: 'producttype',
            key: 'address',
            width: 300,
        },
        {
            title: '是否品牌备案',
            dataIndex: 'beian',
            key: 'address',
            width: 300,
        },
        {
            title: '子sku',
            dataIndex: 'sku',
            key: 'address',
            width: 120,
        },
        {
            title: '销售',
            dataIndex: 'xiaosou',
            key: 'address',
            width: 300,
        },
        {
            title: '操作',
            dataIndex: 'set',
            key: 'set',
            width: 100,
        },
    ];
    const dataSource1 = [
        {
            img: 'https://scpic3.chinaz.net/Files/pic/pic9/202011/apic28924_s.jpg',
            producd: '产品信息',
            info: 'info',
            producttype: 'producttype',
            beian: 'beian',
            sku: 'sku',
            xiaosou: 'xiaosou',
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号西湖区湖底公园1号',
        },
        
    ]
    const columns2 = [
        {
            title: '缩率图',
            dataIndex: 'img',
            key: 'img',
            textAlign: 'center',
            width: 200,
            render: (text, row, index) => {
                return <img src={text} style={{ maxHeight: 60 }} />
            }
        },
        {
            title: '产品信息',
            dataIndex: 'producd',
            key: 'age',
            width: 100,
        },
        {
            title: '刊登信息',
            dataIndex: 'info',
            key: 'address',
            width: 100,
        },
        {
            title: <>
                <div>代码/国家</div>
                <div>语言/币种</div>
            </>,
            dataIndex: 'address',
            key: 'address',
            width: 100,

        },
        {
            title: <>
                <div>产品状态</div>
                <div>刊登类型</div>
            </>,
            dataIndex: 'producttype',
            key: 'address',
            width: 100,
        },
        {
            title: '是否品牌备案',
            dataIndex: 'beian',
            key: 'address',
            width: 120,
        },
        {
            title: '子sku',
            dataIndex: 'sku',
            key: 'address',
            width: 300,
            children:{
                colSpan: 1
            },
            render:(text,row)=>{
                console.log(row,'--rows-子sku')
                return < >
                    <div>{row.sku}</div>
                    <div>{row.xiaosou}</div>
                    <div>{row.kucun}</div>
                </>
            }
            
        },
        {
            title: '销售',
            dataIndex: 'xiaosou',
            key: 'address',
            width: 80,
            children:{
                colSpan: 1
            },
            
        },
        {
            title: '销售库存',
            dataIndex: 'xiaosoukucun',
            key: 'address',
            width: 80,
            children:{
                colSpan: 1
            },
           
        },
        {
            title: '编码',
            dataIndex: 'code3',
            key: 'code3',
            width: 100,
        },
        {
            title: '操作',
            dataIndex: 'set',
            key: 'set',
            width: 100,
        },
    ];
    const dataSource2 = [
        {
            img: 'https://scpic3.chinaz.net/Files/pic/pic9/202011/apic28924_s.jpg',
            producd: '产品信息',
            info: 'info',
            producttype: 'producttype',
            beian: 'beian',
            sku: 'sku',
            xiaosou: 'xiaosou',
            key: '1',
            name: '胡彦斌',
            age: 32,
            code3:'code3',
            address: '西湖区湖底公园1号',
            children_data: [
                {
                    sku: 'MAT190051-Ye2-REG',
                    xiaosou: '30',
                    kucun: 5
                },
                {
                    sku: 'MAT190051-Ye3-REG',
                    xiaosou: '20',
                    kucun: 6
                },
                {
                    sku: 'MAT190051-Ye4-REG',
                    xiaosou: '10',
                    kucun: 7
                }
            ]
        },
        {
            img: 'https://scpic3.chinaz.net/Files/pic/pic9/202011/apic28924_s.jpg',
            producd: '产品信息',
            info: 'info',
            producttype: 'producttype',
            beian: 'beian',
            sku: 'sku',
            xiaosou: 'xiaosou',
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
            children_data: [
                {
                    sku: 'MAT190051-Ye2-REG',
                    xiaosou: '30',
                    kucun: 5
                },
                {
                    sku: 'MAT190051-Ye3-REG',
                    xiaosou: '20',
                    kucun: 6
                },
                {
                    sku: 'MAT190051-Ye4-REG',
                    xiaosou: '10',
                    kucun: 7
                }
            ]
        },
        {
            img: 'https://scpic3.chinaz.net/Files/pic/pic9/202011/apic28924_s.jpg',
            producd: '产品信息',
            info: 'info',
            producttype: 'producttype',
            beian: 'beian',
            sku: 'sku',
            xiaosou: 'xiaosou',
            key: '1',
            name: '胡彦斌',
            age: 32,
            code3:'code3',
            address: '西湖区湖底公园1号',
            children_data: [
                {
                    sku: 'MAT190051-Ye2-REG',
                    xiaosou: '30',
                    kucun: 5
                },
                {
                    sku: 'MAT190051-Ye3-REG',
                    xiaosou: '20',
                    kucun: 6
                },
                {
                    sku: 'MAT190051-Ye4-REG',
                    xiaosou: '10',
                    kucun: 7
                }
            ]
        },
        {
            img: 'https://scpic3.chinaz.net/Files/pic/pic9/202011/apic28924_s.jpg',
            producd: '产品信息',
            info: 'info',
            producttype: 'producttype',
            beian: 'beian',
            sku: 'sku',
            xiaosou: 'xiaosou',
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
            children_data: [
                {
                    sku: 'MAT190051-Ye2-REG',
                    xiaosou: '30',
                    kucun: 5
                },
                {
                    sku: 'MAT190051-Ye3-REG',
                    xiaosou: '20',
                    kucun: 6
                },
                {
                    sku: 'MAT190051-Ye4-REG',
                    xiaosou: '10',
                    kucun: 7
                }
            ]
        }
    ]
    const { loading, selectedRowKeys } = useState();
    const etableProps = {
        columns,
        dataSource,
    }
    const etableProps1 = {
        columns: columns1,
        dataSource: dataSource1,
        rowSelection: {
            selectedRowKeys,
            onChange: (ev) => {
                console.log(ev)
            }
        }
    }

    const etableProps2 = {
        columns: columns2,
        dataSource: dataSource2,
        exclude: 'children_data',
        line: 2,
        rowSelection: {
            selectedRowKeys,
            onChange: (ev) => {
                console.log(ev)
            }
        }
    }
    const etableProps3 = {
        columns: columns2,
        dataSource: dataSource2,
        exclude: 'children_data',
        line: 2,
        excludeShow: true,
        rowSelection: {
            selectedRowKeys,
            onChange: (ev) => {
                console.log(ev)
            }
        }
    }
    return (
        <div>
            <ETable  {...etableProps}></ETable>
            <ETable {...etableProps1}></ETable>
            <ETable {...etableProps2}></ETable>
            
        </div>
    )
}
