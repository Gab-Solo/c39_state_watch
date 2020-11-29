import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Image, Row, Col, Card, Button } from 'react-bootstrap';
import Favorites from '../components/Favorites';
import { set } from 'mongoose';
import axios from 'axios';

const Profile = () => {
  const { loginData, setLoginData, setLoading } = useContext(AppContext);

  console.log('login data object', loginData);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageSelect = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const avatar = new FormData();
    avatar.append('avatar', image, image.name);
    setLoading(true);
    try {
      const updatedUser = await axios({
        method: 'POST',
        url: '/api/users/avatar',
        data: avatar,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoginData(updatedUser.data);
      // setLoginData((loginData) => [
      //   ...loginData,
      //   {avatar: updatedUser.data.secure_url}
      // ]);
      console.log('after submit: ', updatedUser.data);
      console.log('Sweet!', 'Your image has been updated!', 'success');
    } catch (error) {
      console.log('Errsor', 'Oops, something went wrong.');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="profile">
        <Row className="profilePic">
          <Col xs={6} md={4}>
            <Image
              className="profilePicture"
              src={
                preview
                  ? preview
                  : loginData?.avatar
                  ? loginData?.avatar
                  : 'https://www.flaticon.com/svg/static/icons/svg/1946/1946429.svg'
              }
              alt="profile-pictures"
              roundedCircle
            />
          </Col>
        </Row>
        <Card className="userInfoCard" style={{ width: '18rem' }} key="1">
          <Card.Body align="center">
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageSelect(e)}
              />
              <Button type="submit" size="sm" className="mt-4">
                Save Image
              </Button>
            </form>
            <Card.Title>{loginData?.name}</Card.Title>
            <Card.Text>{loginData?.email}</Card.Text>
            <Card.Text>{loginData?.address}</Card.Text>
            <Button variant="primary">change password</Button>
          </Card.Body>
        </Card>
        {/* <Favorites /> */}
      </div>
    </>
  );
};

export default Profile;
