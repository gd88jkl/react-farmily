import React from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'

const { TextArea } = Input;
const FormItem = Form.Item;

@Form.create()
class CreateForm extends React.Component {

    componentDidMount() {
        this.props.onRef(this.props.form)
    }

    handleOk = () => {
        //保存操作
        const { tableState } = this.props
        this.props.actions.doSave({ data: this.props.form.getFieldsValue(), tableState })
    }

    handleCancel = () => {
        //隐藏表单
        this.props.actions.hideForm()
    }

    render() {
        const { formVisible, confirmLoading } = this.props.formState
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        return (
            <Modal
                visible={formVisible}
                centered={true}
                confirmLoading={confirmLoading}
                width={800}
                title="Title"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form>
                    {getFieldDecorator('id', {})(
                        <Input type='hidden' />
                    )}
                    <FormItem {...formItemLayout} label="姓名">
                        {getFieldDecorator('name', {})(
                            <Input placeholder="请输入姓名" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="年龄">
                        {getFieldDecorator('age', {})(
                            <InputNumber min={0} max={150} placeholder="请输入年龄" style={{width: '120px'}} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="地址">
                        {getFieldDecorator('address', {})(
                            <TextArea rows={3}  placeholder="请输入地址"  />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default CreateForm