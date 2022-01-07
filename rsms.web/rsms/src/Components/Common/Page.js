import React from "react";
import Layout from "./Layout/Layout";
import auth from "../../services/authService";
import { Redirect } from "react-router-dom";

const Page = (props) => {
  const canAccess =
    props.authenticationRequired === true
      ? auth.isAuthorized(props.user)
      : true;
  const PageComponent = props.component;
  if (canAccess === true) {
    return (
      <Layout {...props}>
        <PageComponent {...props} />
      </Layout>
    );
  }
  return <Redirect to="/login" />;
};

export default Page;
