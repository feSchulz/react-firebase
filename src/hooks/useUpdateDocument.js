import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.playload };
    default:
      return { state };
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);
  const [cancelled, setCancelled] = useState(false);
  const checkCancelBeforeDsipatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (id, data) => {
    checkCancelBeforeDsipatch({
      type: "LOADING",
    });

    try {
      const docRef = await doc(db, docCollection, id);
      const updatedDocument = await updateDoc(docRef, data);
      checkCancelBeforeDsipatch({
        type: "UPDATE_DOC",
        playload: updatedDocument,
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

  return { updateDocument, response };
};
