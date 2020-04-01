import Head from "next/head";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import fetcher from "../lib/fetcher";
import ApiRoutes from "../consts/ApiRoutes";

const selectUserDefault = "selectauser"

const Prices = () => {
  const { data: users } = useSWR(ApiRoutes.User, fetcher);
  
  const [ selectedUser, setSelectedUser ] = useState(selectUserDefault);
  const { data: prices } = useSWR(() => {
    if(selectedUser === selectUserDefault) {
      throw new Error();
    }
    return `/api/user/${selectedUser}/prices`
  }, fetcher);

  const handleSelectedUserChanged = e => {
    setSelectedUser(e.target.value)
  };

  return (
    <>
      <Head>
        <title>Turnip Tracker | Prices</title>
      </Head>
      <select onChange={handleSelectedUserChanged} defaultValue={selectUserDefault}>
        <option key={selectUserDefault} value={selectUserDefault} disabled>
          Select a User
        </option>
        {users?.users.map(user => (
          <option key={user._id} value={user._id}>
            {user.name} of {user.island}
          </option>
        ))}
      </select>
      <div>
        {prices ? prices.map(p => {
            return <div key={p._id}>{p.weekStart} {p.dayOfWeek} {p.isMorning ? "AM" : "PM"} {p.price}</div>
          }
        ) : <div>No price data</div>}
      </div>
    </>
  );
};

export default Prices;
