import axios from 'axios';
import fetch from 'node-fetch';

const API_TOKEN = "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";
const BASE_URL = "https://api-inference.huggingface.co/models/";
const STATUS_URL = "https://huggingface.co/api/models";

const commonAxiosOptions = {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

export const getStatusModels = async (query) => {
  const fullUrl = `${STATUS_URL}?search=${query}`;

  try {
    const response = await fetch(fullUrl, { method: 'GET' });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error with fetch:', error);

    try {
      const axiosResponse = await axios.get(fullUrl, commonAxiosOptions);

      if (axiosResponse.status !== 200) {
        throw new Error('Axios request failed');
      }

      return axiosResponse.data;
    } catch (axiosError) {
      console.error('Error with Axios:', axiosError);
      return null;
    }
  }
};

export const HuggingFace = async (MODEL, INPUT) => {
  const apiUrl = `${BASE_URL}${MODEL}`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: INPUT,
      options: {
        wait_for_model: true
      }
    }),
  };

  try {
    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error with fetch:', error);

    try {
      const axiosResponse = await axios.post(apiUrl, {
        inputs: INPUT,
        options: {
          wait_for_model: true
        }
      }, commonAxiosOptions);

      if (axiosResponse.status !== 200) {
        throw new Error('Axios request failed');
      }

      return axiosResponse.data;
    } catch (axiosError) {
      console.error('Error with Axios:', axiosError);
      return null;
    }
  }
};

export const HuggingFaceBuffer = async (MODEL, INPUT) => {
  const apiUrl = `${BASE_URL}${MODEL}`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: INPUT,
      options: {
        wait_for_model: true
      }
    }),
  };

  try {
    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    console.error('Error with fetch:', error);

    try {
      const axiosResponse = await axios.post(apiUrl, {
        inputs: INPUT,
        options: {
          wait_for_model: true
        }
      }, {
        ...commonAxiosOptions,
        responseType: 'arraybuffer',
      });

      if (axiosResponse.status !== 200) {
        throw new Error('Axios request failed');
      }

      const arrayBuffer = axiosResponse.data;
      return Buffer.from(arrayBuffer);
    } catch (axiosError) {
      console.error('Error with Axios:', axiosError);
      return null;
    }
  }
};
