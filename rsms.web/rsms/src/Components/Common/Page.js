import React from "react";
import Layout from "./Layout/Layout";

const Page = (props) => {
  const PageComponent = props.component;

  return (
    <Layout {...props}>
      <PageComponent {...props} />
    </Layout>
  );
};

export default Page;
