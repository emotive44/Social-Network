import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './ProfileHeader.scss';

import useModal from '../hooks/useModal';

import { Modal, Button, ImageUpload } from '../common';

const ProfileHeader = ({
  user,
  meId,
  setAlert,
  loadUser,
  followUser,
  toggleFollowers,
  toggleFollowing,
  deleteUserProfile,
}) => {
  const { toggleModal, showModal, closeModal } = useModal();
  const [newAvatarUrl, setNewAvatarUrl] = useState(null);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const followUnfollowUser = () => followUser(user._id);
  const avatarUrl =
    user && user.avatar && user.avatar.split('images\\users').join('');
  const isAdmin = localStorage.role === 'admin' ? true : false;

  const uploadAvatar = async (body) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}users/avatar`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.put(url, body, config);
      setAlert('Upload your avatar successfully.', 'success');
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  };

  const submit = (data) => {
    const formData = new FormData();
    formData.append('avatar', data && data.avatar && data.avatar[0]);
    uploadAvatar(formData);
    setTimeout(() => {
      closeModal();
      loadUser();
    }, 300);
  };

  return (
    <div className="profile-header">
      {toggleModal && (
        <Modal closeModal={closeModal} title="Upload Your Profile Image">
          <form onSubmit={handleSubmit(submit)}>
            <ImageUpload
              name="avatar"
              ref={register}
              setImage={setNewAvatarUrl}
              style={{ border: '1px solid white' }}
            />
            <Button type="submit" light animation>
              Send
            </Button>
          </form>
        </Modal>
      )}
      <div className="profile-image">
        <div
          className="avatar-image"
          style={{
            backgroundImage: `url(${
              newAvatarUrl
                ? newAvatarUrl
                : user.avatar
                ? avatarUrl.startsWith('http')
                  ? avatarUrl
                  : `${process.env.REACT_APP_ASSET_URL}images/users/${avatarUrl}`
                : '/avatar.jpg'
            })`,
          }}
        >
          {user._id === meId && (
            <span className="avatar-upload" onClick={showModal}>
              <i className="fas fa-camera" />
            </span>
          )}
        </div>
        <p>{user.name && user.name.toUpperCase()}</p>
        <p>{user.email}</p>
        {user._id !== meId && !isAdmin && (
          <div>
            {user.followers && user.followers.includes(meId) ? (
              <Button
                type="button"
                danger
                animation
                clickHandler={followUnfollowUser}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                type="button"
                info
                animation
                clickHandler={followUnfollowUser}
              >
                Follow
              </Button>
            )}
          </div>
        )}
        {(user._id === meId || isAdmin) && (
          <Link to="/users">
            <Button
              type="button"
              danger
              animation
              style={{ marginBottom: '1rem' }}
              clickHandler={() =>
                deleteUserProfile(
                  history,
                  localStorage.role === 'admin' && user._id
                )
              }
            >
              {isAdmin ? 'Delete User Profile' : 'Delete Your Profile'}
            </Button>
          </Link>
        )}
      </div>
      <div className="profile-nav">
        <ul>
          <li
            onClick={() => {
              toggleFollowers(false);
              toggleFollowing(false);
            }}
          >
            Information
          </li>
          <li
            onClick={() => {
              toggleFollowers(true);
              toggleFollowing(false);
            }}
          >
            {user.followers && user.followers.length} Followers
          </li>
          <li
            onClick={() => {
              toggleFollowing(true);
              toggleFollowers(false);
            }}
          >
            {user.following && user.following.length} Following
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileHeader;
