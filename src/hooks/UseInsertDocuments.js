import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
  
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.playload };
    default:
      return { state };
  }
};

export const useIsertDocument = (dbCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
  const [cancelled, setCancelled] = useState(false);
  const checkCancelBeforeDsipatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const insertedDocument = await addDoc(
        collection(db, dbCollection),
        newDocument
      );
      checkCancelBeforeDsipatch({
        type: "INSERTED DOC",
        playload: insertedDocument,
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

  return { insertDocument, response };
};
