import { FETCH_CATEGORY, FETCH_PRODUCT, FETCH_PRODUCT_BYID } from "./ActionTypes";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = "https://show-case-brand.rhazzid.site";
// const baseUrl = 'http://localhost:3000'

export const productFetch = (payload) => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/product`, {
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(productFetchSuccess(data));
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const productFetchSuccess = (payload) => {
  return {
    type: FETCH_PRODUCT,
    payload: payload,
  };
};

export const productAdd = (payload) => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          console.log(error);
          throw new Error(error.message);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Success:", data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Product Success",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(productFetch());
        redirect("/product");
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
};

export const productDelete = (id) => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/product/${id}`, {
      method: "DELETE",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Success:", data);
        dispatch(productFetch());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const productById = (id) => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/product/${id}`, {
      method: "GET",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Success:", data);
        dispatch(productFetchSuccessById(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const productFetchSuccessById = (payload) => {
  return {
    type: FETCH_PRODUCT_BYID,
    payload: payload,
  };
};

export const categoryFetch = (payload) => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/categories`, {
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(categoryFetchSuccess(data));
        // console.log(data);
      });
  };
};

export const categoryFetchSuccess = (payload) => {
  return {
    type: FETCH_CATEGORY,
    payload: payload,
  };
};

export const categoryAdd = (payload) => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();

          throw new Error(error.message);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Success:", data);
        dispatch(categoryFetch());
        redirect("/category");
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
};

export const categoryDelete = (id) => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/categories/${id}`, {
      method: "DELETE",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        dispatch(categoryFetch());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const editProduct = (id, payload) => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/product/${id}`, {
      method: "PUT",
      headers: {
        access_token: localStorage.access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Success:", data);
        dispatch(productFetch());
        redirect("/product");
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  };
};
