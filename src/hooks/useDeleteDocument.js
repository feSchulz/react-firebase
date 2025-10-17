import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.playload };
    default:
      return { state };
  }
};

export const useDeleteDocument = (docColection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);
  const [cancelled, setCancelled] = useState(false);
  const checkCancelBeforeDsipatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    try {
      const deletedDocument = await deleteDoc(doc(db,docColection, id));

      checkCancelBeforeDsipatch({
        type: "DELETE_DOC",
        playload: deleteDocument,
      });
    } catch (error) {
      checkCancelBeforeDsipatch({
        type: "ERROR",
        playload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};
