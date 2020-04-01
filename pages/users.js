import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import ApiRoutes from "../consts/ApiRoutes";

const CreateUserSchema = Yup.object().shape({
  island: Yup.string().required(),
  name: Yup.string().required()
});

const Users = () => {
  const { data: users } = useSWR(ApiRoutes.User, fetcher)
  
  const createUser = async (name, island) => {
    await fetch(ApiRoutes.User, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, island })
    });
    mutate(ApiRoutes.User);
  };

  return (
    <>
      <Head>
        <title>Turnip Tracker | Users</title>
      </Head>
      <div>
        <h1>Users</h1>
        {!users && <div>Loading...</div>}
        {users && (
          <ul>
            {users.users.map(user => {
              return <li key={user["_id"]}>{user.name} of {user.island}</li>
            })}
          </ul>
        )}
      </div>
      <Formik
        initialValues={{ name: "", island: "" }}
        validationSchema={CreateUserSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await createUser(values.name, values.island);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            Name:
            <Field name="name" />
            <ErrorMessage name="name" />
            Island:
            <Field name="island" />
            <ErrorMessage name="island" />
            <button type="submit" disabled={isSubmitting}>
              Create User
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Users;
