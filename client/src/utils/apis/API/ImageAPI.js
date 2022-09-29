import authRequest from '../Interceptors';
import { getUser } from '../../Localstorage';

async function UploadImage({ file }) {
  const { role, userId } = getUser();
  const formData = new FormData();

  formData.append('file', file);
  formData.append('users', role);
  try {
    const result = await authRequest.post(`/v1/image/${userId}`, formData, { 'Content-Type': 'multipart/form-data' });
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function UpdateImage({ file }) {
  const { role, userId } = getUser();
  const formData = new FormData();

  formData.append('file', file);
  formData.append('users', role);
  try {
    const result = await authRequest.patch(`/v1/image/${userId}`, formData, { 'Content-Type': 'multipart/form-data' });
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function RemoveImage() {
  const { role, userId } = getUser();
  const formData = new FormData();
  formData.append('users', role);
  try {
    const result = await authRequest.delete(`/v1/image/${userId}`, formData, { 'Content-Type': 'multipart/form-data' });
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export { UploadImage, UpdateImage, RemoveImage };

// <input id="image" type="file" multiple onChange={imageSelectHandle} />
//
//   onChange handler
//   const imageSelectHandle = async (event) => {
//   const imageFiles = event.target.files;
//   setFiles(imageFiles)
//   }
//
