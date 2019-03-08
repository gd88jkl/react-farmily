import React from 'react'
import { Table, Breadcrumb, Button, Form, Input, Icon, Popconfirm, Modal, Divider, message, Card, Row, Col, InputNumber, DatePicker } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '@redux/actions/userActions'
import CreateForm from './CreateForm'
import './User.less'

const confirm = Modal.confirm
const FormItem = Form.Item;

@connect(
    state => ({ ...state.user }),
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
@Form.create()
class User extends React.Component {

    state = {
        selectedRowKeys: [],
        tableState: {
            pagination: {
                current: 1,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '30', '50', '100'],
                showTotal: total => ('共 ' + total + ' 条记录')
            },
            filters: {},
            sorter: { field: 'age', order: 'descend' }
        },
        expandForm: false,
    }

    columns = [{
        title: '姓名',
        dataIndex: 'name',
        sorter: true,
        width: 80,
        fixed: true,
        render: text => <div style={{ width: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><a title={text}>{text}</a></div>,
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        defaultSortOrder: 'descend',
        sorter: true,
        // width: 100,
    }, {
        title: '分数',
        dataIndex: 'scores',
        key: 'scores',
        defaultSortOrder: 'descend',
        sorter: true,
        // width: 100,
    }, {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
        defaultSortOrder: 'descend',
        sorter: true,
        // width: 100,
    }, {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        // width: 200,
    }, {
        title: '操作',
        key: 'action',
        // width: 100,
        render: record => (
            <div>
                <Popconfirm placement='topRight' title={'确认删除' + record.name + '?'} okType='danger' icon={<Icon type="question-circle" />}
                    onConfirm={() => this.handleDelete([record.id])} >
                    <Icon title='删除' type="delete" theme="twoTone" twoToneColor="#eb2f96" />
                </Popconfirm>
                <Divider type="vertical" />
                <Icon title='编辑' type="edit" theme="twoTone" onClick={() => {
                    const { createTime, ...data } = record
                    this.openUserForm(data)
                }} />
            </div>
        )
    }]

    handleUserFormRef = ref => {
        this.userForm = ref
    }

    openUserForm = data => {
        //打开表单
        if (!this.props.tableState.loading) {
            this.props.actions.showForm()
            if (data) {
                this.userForm.setFieldsValue(data)
            } else {
                this.userForm.resetFields()
            }
        }
    }

    componentWillMount() {
        this.props.actions.loadData(this.state.tableState)
    }

    handleDelete(ids) {
        const { pagination, filters, sorter } = this.state.tableState
        const { current, pageSize, total } = pagination
        const ceil = Math.ceil((total - ids.length) / pageSize)
        const tableState = { pagination: { ...pagination, current: current > ceil ? ceil : current }, filters, sorter }
        this.props.actions.doDelete({ ids, tableState })
    }

    showDeleteConfirm = () => {
        if (this.state.selectedRowKeys.length > 0) {
            confirm({
                title: '确认删除所选记录？',
                okType: 'danger',
                maskClosable: true,
                onOk: () => {
                    this.handleDelete(this.state.selectedRowKeys)
                    this.setState({ selectedRowKeys: [] })
                }
            })
        } else {
            message.warning('至少勾选一条记录！')
        }
    }

    handleSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    handleTableChange = (pagination, _filters, sorter) => {
        const filters = this.formatBirthday(this.props.form.getFieldsValue())
        const tableState = { pagination, sorter, filters }
        this.setState({ selectedRowKeys: [], tableState })
        this.props.actions.loadData(tableState)
    }

    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        const tableState = { ...this.state.tableState, filters: {} }
        this.setState({ tableState });
        this.props.actions.loadData(tableState)
    };

    formatBirthday = (filters) => {
        if(filters.birthday$ge) {
            filters.birthday$ge = filters.birthday$ge.format('YYYY-MM-DD')
        }
        if(filters.birthday$le) {
            filters.birthday$le = filters.birthday$le.format('YYYY-MM-DD')
        }
        return filters
    }

    handleSearch = () => {
        const filters = this.formatBirthday(this.props.form.getFieldsValue())
        const tableState = { ...this.state.tableState, filters }
        this.setState({ tableState });
        this.props.actions.loadData(tableState)
    }

    toggleForm = () => {
        const { expandForm } = this.state;
        this.setState({
            expandForm: !expandForm,
        });
    };

    renderSimpleForm() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                sm: { span: 6 },
                md: { span: 3 },
                xl: { span: 2 },
                xxl: { span: 1 },
            },
            wrapperCol: {
                sm: { span: 18 },
                md: { span: 9 },
                xl: { span: 6 },
                xxl: { span: 5 },
            },
        }
        return (
            <Form layout="inline">
                <Row gutter={24}>
                    <Col xxl={6} xl={8} md={12} sm={24}>
                        <FormItem {...formItemLayout} label="起始生日">
                            {getFieldDecorator('birthday$ge')(<DatePicker format='YYYY_MM_DD' placeholder='起始生日' style={{ width: '100%' }} />)}
                        </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} md={12} sm={24}>
                        <FormItem {...formItemLayout} label="结束生日">
                            {getFieldDecorator('birthday$le')(<DatePicker placeholder='结束生日' style={{ width: '100%' }} />)}
                        </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} md={12} sm={24}>
                        <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator('name$like')(<Input placeholder="请输入姓名" />)}
                        </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} md={12} sm={24}>
                        <span className='submit-buttons'>
                            <Button type="primary" onClick={this.handleSearch}>查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>展开 <Icon type="down" /></a>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderAdvancedForm() {
        const formItemLayout = {
            labelCol: {
                sm: { span: 6 },
                md: { span: 3 },
                xl: { span: 2 },
                xxl: { span: 1 },
            },
            wrapperCol: {
                sm: { span: 18 },
                md: { span: 9 },
                xl: { span: 6 },
                xxl: { span: 5 },
            },
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline">
                <Row gutter={24}>
                    <Col xxl={6} xl={8} md={12} sm={24}>
                        <FormItem {...formItemLayout} label="最小年龄">
                            {getFieldDecorator('age$ge')(<InputNumber placeholder="最小年龄" style={{ width: '100%' }} />)}
                        </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} md={12} sm={24}>
                        <FormItem {...formItemLayout} label="最大年龄">
                            {getFieldDecorator('age$le')(<InputNumber placeholder="最大年龄" style={{ width: '100%' }} />)}
                        </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} md={12} sm={24}>
                        <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator('name$like')(<Input placeholder="请输入姓名" />)}
                        </FormItem>
                    </Col>
                    <Col xxl={6} xl={8} md={12} sm={24}>
                        <FormItem {...formItemLayout} label="地址">
                            {getFieldDecorator('address')(<Input placeholder="请输入地址" />)}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>收起 <Icon type="up" /></a>
                    </div>
                </div>
            </Form>
        );
    }

    renderForm() {
        const { expandForm } = this.state;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    render() {
        const { loading, data, total } = this.props.tableState
        const { selectedRowKeys } = this.state
        const { pagination } = this.state.tableState
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><a href='/home'>首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                <Card style={{ margin: '10px 20px 0' }}>
                    <div className='table-list-form'>{this.renderForm()}</div>
                    <div className='table-list-operator'>
                        <Button type='primary' onClick={() => { this.openUserForm() }}>新建</Button>
                        <Button type='danger' onClick={this.showDeleteConfirm}>批量删除</Button>
                    </div>
                    <div className='content'>
                        <Table
                            rowKey={'id'}
                            // bordered={true}
                            size={'small'}
                            scroll={{ x: 600 }}
                            columns={this.columns}
                            dataSource={data}
                            pagination={{ ...pagination, total }}
                            rowSelection={{ onChange: this.handleSelectChange, selectedRowKeys }}
                            loading={loading}
                            onChange={this.handleTableChange}
                        />
                    </div>
                </Card>
                <CreateForm onRef={this.handleUserFormRef} actions={this.props.actions} tableState={this.state.tableState} formState={this.props.formState} />
            </div>
        )
    }
}

export default User
