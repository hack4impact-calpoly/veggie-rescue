import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const API_URL = `${SERVER_URL}/api/fields/`;

interface EditFieldDataObject {
  fieldName: string;
  oldValue: string;
  newValue: string;
}

interface FieldDataObject {
  fieldName: string;
  value: string;
}

const getFields = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getFieldByName = async (fieldName: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}${fieldName}`, config);
  return response.data;
};

const createField = async (fieldData: FieldDataObject, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(`${API_URL}add/`, fieldData, config);
  return response.data;
};

const editField = async (fieldData: EditFieldDataObject, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(`${API_URL}edit/`, fieldData, config);
  return response.data;
};

const deleteField = async (fieldData: FieldDataObject, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(`${API_URL}delete/`, fieldData, config);
  return response.data;
};

const fieldService = {
  getFields,
  getFieldByName,
  createField,
  editField,
  deleteField
};

export default fieldService;
