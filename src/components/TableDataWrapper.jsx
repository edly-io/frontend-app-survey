import React, { useState, useMemo } from "react";
import useAxios from "axios-hooks";
import Table from "./Table";


const TableDataWrapper = ({ formIdEn, formIdFr, accessToken }) => {
const [{ data: dataEn, loading: loadingEn, error: errorEn }] = useAxios({
    url: `https://forms.googleapis.com/v1/forms/${formIdEn}/responses`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const [{ data: dataFr, loading: loadingFr, error: errorFr }] = useAxios({
    url: `https://forms.googleapis.com/v1/forms/${formIdFr}/responses`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const responses = useMemo(() => {
  const listEn = dataEn?.responses || [];
  const listFr = dataFr?.responses || [];

  const combinedList = [...listEn, ...listFr];

  return combinedList
    .slice()
    .sort(
      (a, b) => new Date(b.lastSubmittedTime) - new Date(a.lastSubmittedTime)
    );
  }, [dataEn, dataFr]);


  if (loadingEn || loadingFr) return <p>Loading responses…</p>;
  if (errorEn || errorFr) return <p>Error loading data: {errorEn.message || errorFr.message}</p>;

  <Table responses={responses}/>
}


export default TableDataWrapper;