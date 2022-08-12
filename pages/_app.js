import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import AuthProvider from "components/auth";

Router.events.on("routeChangeStart", (url) => {
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <AuthProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Sun'iy Idrok</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    );
  }
}
