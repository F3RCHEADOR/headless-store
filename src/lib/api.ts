/// <reference types="vite/client" />

import axios from "axios";
import CryptoJS from "crypto-js";

const client_key = import.meta.env.VITE_CLIENT_KEY;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const wordpress_url = import.meta.env.VITE_WORDPRESS_URL;

const generateOAuthSignature = (url: string, method: string = 'GET', params: Record<string, any> = {}) => {
  const nonce = Math.random().toString(36).substring(2);
  const timestamp = Math.floor(Date.now() / 1000);

  const oauthParams = {
    oauth_consumer_key: client_key,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_version: '1.0',
  };

  const allParams = { ...oauthParams, ...params };

  const paramString = Object.keys(allParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
    .join('&');

  const baseUrl = url.split('?')[0]; // Ensure no query params in the base URL
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(paramString)}`;
  const signingKey = `${encodeURIComponent(client_secret)}&`;

  const signature = CryptoJS.HmacSHA1(baseString, signingKey).toString(CryptoJS.enc.Base64);

  return { ...oauthParams, oauth_signature: encodeURIComponent(signature) };
};


const api = axios.create({
  baseURL: wordpress_url
})

export const getAllProducts = async () => {
  try {
    const url = `${wordpress_url}wc/v3/products`;
    const oauthParams = generateOAuthSignature(url);
    console.log("URL:", url);
    const Response = await api.get("wc/v3/products", {
      params: oauthParams
    });
    console.log("Response data:", Response.data);
    return Response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response ? error.response.data : error);
    throw error;
  }
}


export const getExpecificProduct = async (productId: string) => {
  try {
    const url = `${wordpress_url}wc/v3/products/${productId}`;
    const oauthParams = generateOAuthSignature(url);
    console.log("URL:", url);
    const Response = await api.get(`wc/v3/products/${productId}`, {
      params: oauthParams
    });
    console.log("Response data:", Response.data);
    return Response.data;
  } catch (error) {
    console.error("Error fetching expecific product:", error.response ? error.response.data : error);
    throw error;
  }
}

export const registerStoreUser = async (userInfo) => {
  try {
    const response = await api.post(`${wordpress_url}wp/v2/users`, userInfo, {
      headers: { "Authorization": "Basic " + btoa("admin:k)A&Kf$&&dIcRYil!sC9(cJk") }
    });
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
}
