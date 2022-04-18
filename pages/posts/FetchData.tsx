import Head from "next/head";
import Link from "next/link";
import React from "react";
/** 
 *  
 * @date 2022-04-15 
 */
export default class FetchData extends React.Component<FetchDataProps, FetchDataState> {
  constructor(props: FetchDataProps) {
    super(props);
    this.state = {
      // 初始化状态
      data: Object.create({})
    };
  }
  async componentDidMount() {
    const request = await fetch("/api/hello");
    const response = await request.json();
    this.setState({
      data: {
        date: response.date
      }
    });
  }
  render() {
    return (<div>
      <Head>
        <meta name="baidu" content="okay" />
      </Head>
      Hello world. @{this.state.data.date}
      <hr />
      <Link href="/">Back to home</Link>
    </div>)
  }
}
export type FetchDataProps = {}
export type FetchDataState = {
  data: {
    date: string
  }
}