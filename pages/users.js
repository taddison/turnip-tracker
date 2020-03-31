import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useSWR, { mutate } from "swr";

const ApiRoutes = {
  User: "/api/user"
}

const fetcher = (...args) => {
  return fetch(...args).then(res => res.json());
};

const Home = () => {
  const { data: users } = useSWR(ApiRoutes.User, fetcher)
  console.log(users);
  
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
        validate={values => {
          const errors = {};
          if (!values.island) {
            errors.island = "You must have an island";
          }
          if (!values.name) {
            errors.name = "You must have a name";
          }
          return errors;
        }}
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

export default Home;
