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

  // Extraer parámetros de la URL si existen
  const urlObj = new URL(url);
  const urlParams: Record<string, string> = {};
  for (const [key, value] of urlObj.searchParams.entries()) {
    urlParams[key] = value;
  }

  // Unir todo: params manuales, params en URL, y oauth
  const allParams = {
    ...oauthParams,
    ...urlParams,
    ...params,
  };

  // Construir base string
  const sortedParamString = Object.keys(allParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
    .join('&');

  const baseUrl = `${urlObj.origin}${urlObj.pathname}`;
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(sortedParamString)}`;

  const signingKey = `${encodeURIComponent(client_secret)}&`;
  const signature = CryptoJS.HmacSHA1(baseString, signingKey).toString(CryptoJS.enc.Base64);

  return {
    ...oauthParams,
    oauth_signature: signature,
  };
};



const api = axios.create({
  baseURL: wordpress_url
})

export const getEntradas = async (entrada: string) => {
  try {
    const response = await api.get(`${wordpress_url}wp/v2/posts?slug=${entrada}&_embed`);

    const posts: Array<{
      title: string;
      excerpt: string;
      content: string;
      date: string;
      slug: string;
      featuredImage: string | null;
    }> = response.data.map((post: any) => {
      const {
        title: { rendered: title },
        excerpt: { rendered: excerpt },
        content: { rendered: content },
        date,
        slug
      } = post;

      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;

      return { title, excerpt, content, date, slug, featuredImage };
    });

    return posts;
  } catch (error: any) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
};


export const getAllPosts = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await api.get(`${wordpress_url}wp/v2/posts?_embed&page=${page}&per_page=${perPage}`);

    const posts: Array<{
      id: number;
      title: string;
      excerpt: string;
      content: string;
      date: string;
      slug: string;
      featuredImage: string | null;
      author: string;
      categories: string[];
    }> = response.data.map((post: any) => {
      const {
        id,
        title: { rendered: title },
        excerpt: { rendered: excerpt },
        content: { rendered: content },
        date,
        slug,
        _embedded
      } = post;

      const featuredImage = _embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;
      const author = _embedded?.author?.[0]?.name ?? 'Unknown';
      const categories = _embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) ?? [];

      return { 
        id, 
        title, 
        excerpt, 
        content, 
        date, 
        slug, 
        featuredImage, 
        author, 
        categories 
      };
    });

    // Filtrar el post "hola-mundo"
    const filteredPosts = posts.filter(post => post.slug !== 'hola-mundo');

    return filteredPosts;
  } catch (error: any) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const response = await api.get(`${wordpress_url}wp/v2/posts?slug=${slug}&_embed`);

    if (response.data.length === 0) {
      throw new Error('Post not found');
    }

    const post = response.data[0];
    const {
      id,
      title: { rendered: title },
      excerpt: { rendered: excerpt },
      content: { rendered: content },
      date,
      slug: postSlug,
      _embedded
    } = post;

    const featuredImage = _embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;
    const author = _embedded?.author?.[0]?.name ?? 'Unknown';
    const categories = _embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) ?? [];

    return { 
      id, 
      title, 
      excerpt, 
      content, 
      date, 
      slug: postSlug, 
      featuredImage, 
      author, 
      categories 
    };
  } catch (error: any) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
};



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

export const getProductsWithSameTags = async (tagId: string) => {
  try {
    const endpoint = "wc/v3/products";
    const url = `${wordpress_url}${endpoint}?tag=${tagId}`;
    const oauthParams = generateOAuthSignature(url);

    const response = await api.get(url, {
      params: oauthParams,
    });

    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response ? error.response.data : error);
    throw error;
  }
};



export const getExpecificProduct = async (productId: string) => {
  try {
    const url = `${wordpress_url}custom/v1/product/${productId}`;
    const oauthParams = generateOAuthSignature(url);
    console.log("URL:", url);
    const Response = await api.get(`custom/v1/product/${productId}`, {
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


export const loginUser = async (userInfo) => {
  try {
    const response = await api.post(`${wordpress_url}jwt-auth/v1/token`, userInfo)
    return response.data
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
}

//Create Order in Woocommerce

export const newOrder = async (userInfo) => {
  try {
    const cartItems = JSON.parse(localStorage?.getItem?.("cart") || "[]");
    console.log(cartItems);

    if (!cartItems.length) {
      console.log("cart is empty")
      return false
    }

    const lineItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity
    }))

    console.log(lineItems)

    const data = {
      ...userInfo,
      line_items: lineItems

    }

    console.log(data)

    const url = `${wordpress_url}wc/v3/orders`

    const oauthParams = generateOAuthSignature(url, "POST")

    //generate oauth header

    const oauthHeader = Object.keys(oauthParams).map((key) => `${key}=${encodeURIComponent(oauthParams[key])}`).join(", ")

    const response = await api.post(`wc/v3/orders`, data, {
      headers: {
        Authorization: `OAuth ${oauthHeader}`
      }
    })

    return response.data

  } catch (error) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
}


export const getUserData = async (token: string) => {

  try {
    const response = await api.get(`${wordpress_url}wp/v2/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
}

export const getOrdersByCustomer = async (customerId: string) => {

  try {
    const url = `${wordpress_url}wc/v3/orders`;
    const oauthParams = generateOAuthSignature(url, "GET", {
      customer: customerId
    });
    const response = await api.get("wc/v3/orders", {
      params: {
        ...oauthParams,
        customer: customerId
      }
    })
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
}

// SEO manual para cada página
export const manualSeoData = {
  home: {
    title: "Headless Store - Tu tienda moderna",
    description: "Compra los mejores productos en nuestra tienda headless.",
    url: "https://headless-store.com/",
  },
  about: {
    title: "Sobre nosotros - Headless Store",
    description: "Conoce más sobre nuestro equipo y misión.",
    url: "https://headless-store.com/about",
  },
  contact: {
    title: "Contacto - Headless Store",
    description: "Ponte en contacto con nuestro equipo para cualquier consulta.",
    url: "https://headless-store.com/contact",
  },
  products: {
    title: "Productos - Headless Store",
    description: "Descubre nuestra selección de productos.",
    url: "https://headless-store.com/products",
  },
  cart: {
    title: "Carrito - Headless Store",
    description: "Revisa los productos en tu carrito.",
    url: "https://headless-store.com/cart",
  },
  checkout: {
    title: "Checkout - Headless Store",
    description: "Finaliza tu compra de forma segura.",
    url: "https://headless-store.com/checkout",
  },
  myorders: {
    title: "Mis pedidos - Headless Store",
    description: "Consulta el historial de tus pedidos.",
    url: "https://headless-store.com/myorders",
  },
  blogs: {
    title: "Blog - Headless Store",
    description: "Lee las últimas novedades y artículos de nuestro blog.",
    url: "https://headless-store.com/blogs",
  },
  login: {
    title: "Iniciar sesión - Headless Store",
    description: "Accede a tu cuenta para comprar y ver tus pedidos.",
    url: "https://headless-store.com/login",
  },
  account: {
    title: "Mi cuenta - Headless Store",
    description: "Gestiona la información de tu cuenta.",
    url: "https://headless-store.com/account",
  },
  notfound: {
    title: "Página no encontrada - Headless Store",
    description: "La página que buscas no existe.",
    url: "https://headless-store.com/404",
  },
};