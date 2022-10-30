import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Router from "next/router";
import { BaseUrl } from "../constants/constants";
type Props = {
  data: string | string[];
};

const test = (props: Props) => {
  return (
    <div>
      <button onClick={() => Router.push("/test?id=5")}>{props.data}</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data: string | string[];
}> = async ({ resolvedUrl, query }) => {
  console.log(BaseUrl + resolvedUrl);

  let data: string | string[] = "";
  if (query.id !== undefined) {
    data = query.id;
  }

  return {
    props: {
      data,
    },
  };
};
export default test;
