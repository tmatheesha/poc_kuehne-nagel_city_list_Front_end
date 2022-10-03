/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, {useEffect, useState} from "react";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography, Input, Space, Form, Popconfirm, InputNumber,
} from "antd";

import {SearchOutlined, ToTopOutlined} from "@ant-design/icons";
import { Link ,useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
import {loadCitiesAsync, updateCityAsync} from "../redux/reducers/cities/cities.thunk";
import ViewBoxFooter from "../components/viewBoxFooter";
import FormOutlined from "@ant-design/icons/lib/icons/FormOutlined";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const { Title } = Typography;
const { Search } = Input;


// project table start


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function Tables() {

  const dispatch = useDispatch();
// table code start
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const { isLoading, cities,noOfItems, errorMessage } = useSelector((state) => state.cities);

  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
      console.log("record ",record);
    form.setFieldsValue({
      name: record.name,
      picture: record.picture,
      ...record,
    });
    setEditingKey(record.key);
    console.log("record ",record);
    console.log("editingKey ",editingKey);
    console.log("form ",form)
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...cities];
      let picture = '';
      const setPicture = (pic) => {
          picture = pic
      };
      // getBase64(row.picture.file,setPicture);
        picture = await toBase64(row.picture.file);
        picture = picture.replace('data:image/jpeg;base64,','');
        console.log("picture ",picture);
      const city = newData.find((item) => key === item.id);

      if (city != undefined) {
        // const item = newData[index];
        // newData.splice(index, 1, { ...item, ...row });
        // setData(newData);
        setEditingKey('');
          console.log("save started",key);
          dispatch(
              updateCityAsync({
                  id: city.id,
                  updateDto: {
                      id: city.id,
                      name: row.name,
                      picture: picture,
                  },
                  requestHeader: {
                      requestId: "string",
                      timestamp: "2022-09-30T11:24:11.235Z",
                      userId: "string",
                      userName: "string"
                  }
              }, {
                      isDescending: true,
                      isPaginated: true,
                      pageNumber: pageNumber,
                      pageSize: pageSize,
                      paginationDto: {
                          searchBy: search
                      },
                      requestHeader: {
                          requestId: "string",
                          timestamp: "2022-09-30T11:24:11.235Z",
                          userId: "string",
                          userName: "string"
                      }
                  }

          ));
      }
      /*else {
        newData.push(row);
        // setData(newData);
        setEditingKey('');
      }*/
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }

  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "10%",
      editable: false,
    },
    {
      title: "PICTURE",
      dataIndex: "picture",
      key: "picture",
      width: "32%",
      editable: true,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      width: "25%",
      ellipsis: true,
      render: (record) => {
        const editable = isEditing(record);
        return editable ? (
            <span>
            <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'picture' ? 'upload' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    dispatch(loadCitiesAsync({
      isDescending: true,
      isPaginated: true,
      pageNumber: pageNumber,
      pageSize: pageSize,
      paginationDto: {
        searchBy: search
      },
      requestHeader: {
        requestId: "string",
        timestamp: "2022-09-30T11:24:11.235Z",
        userId: "string",
        userName: "string"
      }
    }
    ));
  }, [pageNumber,search]);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  console.log("cities ",cities);
  const newCityList = cities ? cities.map((city) => {
       return {
         key: city.id,
         id: city.id,
         picture: (
             <>
               <Avatar.Group>
                 <Avatar
                     className="shape-avatar"
                     shape="square"
                     size={40}
                     src={`data:image/png;base64,${city.picture}`}
                 ></Avatar>
                {/* <div className="avatar-info">
                   <Title level={5}>Michael John</Title>
                   <p>michael@mail.com</p>
                 </div>*/}
               </Avatar.Group>{" "}
             </>
         ),
         name: city.name,

         status: (
             <>
               <Button type="primary" className="tag-primary">
                 ONLINE
               </Button>
             </>
         )
       }
      }):[]
  console.log("noOfItems ",noOfItems);
  console.log("isLoading ",isLoading);

  function onSearch(input) {
    setSearch(input);
  }
    const EditableCell = ({
                              editing,
                              dataIndex,
                              title,
                              inputType,
                              record,
                              index,
                              children,
                              ...restProps
                          }) => {
        console.log("Editable cell")
        console.log("restProps ",restProps)
        const [loading, setLoading] = useState(false);
        const [imageUrl, setImageUrl] = useState('');
        const getBase64 = (img, callback) => {
            console.log("img ",img)
            console.log("callback ",callback)
            const reader = new FileReader();
            // reader.addEventListener('load', () => callback(reader.result));
            // reader.readAsDataURL(img);
            reader.readAsText(img);
            console.log("result ",reader.result)
        };

        const beforeUpload = (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
                return false;
            }

            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
                return false;
            }
            const reader = new FileReader();

            reader.onload = e => {
                console.log("onload ",e.target.result);
                let picture = e.target.result.replace('data:image/jpeg;base64,','');
                setImageUrl(picture)
            };
            // reader.readAsText(file);
            reader.readAsDataURL(file);
            console.log("reader.result ",reader.result);
            // Prevent upload
            return false;
            // return isJpgOrPng && isLt2M;
        };
        const handleChange = (info) => {
            console.log('info', info);
            if (info.file.status === 'uploading') {
                setLoading(true);
                return;
            }

            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (url) => {
                    setLoading(false);
                    setImageUrl(url);
                });
            }
            /* if (info.file.status !== 'uploading') {
               let reader = new FileReader();
               reader.onload = (e) => {
                 console.log(e.target.result);
               };
               reader.readAsText(info.file.originFileObj);
             }
             if (info.file.status === 'done') {
               message.success(`${info.file.name} file uploaded successfully`);
             } else if (info.file.status === 'error') {
               message.error(`${info.file.name} file upload failed.`);
             }*/
        };

        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </div>
        );
        const uploadPicture = () => {

        };
        const inputNode = inputType === 'upload' ?
            <Upload
                name="picture"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                //     action={uploadPicture}
                // beforeUpload={() => false}
                beforeUpload={beforeUpload}
                // onChange={handleChange}
                maxCount={1}
            >
                {imageUrl ? (
                   /* <img
                        // src={imageUrl}
                        src={`data:image/png;base64,${imageUrl}`}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />*/
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            // size={40}
                            src={`data:image/png;base64,${imageUrl}`}
                        ></Avatar>
                        {/* <div className="avatar-info">
                   <Title level={5}>Michael John</Title>
                   <p>michael@mail.com</p>
                 </div>*/}
                    </Avatar.Group>
                ) : (
                    uploadButton
                )}
            </Upload> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="List of Cities"
              extra={
                /*<>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">ONLINE</Radio.Button>
                  </Radio.Group>
                </>*/

                <Search placeholder="input name to search" enterButton="Search" size="large" loading={isLoading}
                        onSearch={onSearch}/>
              }
            >
              <div className="table-responsive">
                  <Form form={form} component={false}>
                <Table
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                  columns={mergedColumns}
                  dataSource={newCityList}
                  pagination={false}
                    rowClassName="editable-row"
                  className="ant-border-space"
                />
                  </Form>
              </div>
              <div   style ={{float: "right",marginTop: "20px", marginBottom: "10px"}}>
                <ViewBoxFooter
                    onChange={setPageNumber}
                    total={noOfItems}
                    current={pageNumber}
                    showSizeChanger={true}
                    pageSize={pageSize}
                    /* onShowSizeChange={(curent, size) =>
                         dispatch(onPageSizeChange(size))
                     }*/
                    hideOnSinglePage={false}
                    showTotal={(total) => {
                      return `Total ${total} items`;
                    }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
