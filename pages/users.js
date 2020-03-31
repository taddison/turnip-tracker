import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Home = () => {
  const createUser = async (name, island) => {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, island })
    });
  };

  return (
    <>
      <Head>
        <title>Turnip Tracker | Users</title>
      </Head>
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
