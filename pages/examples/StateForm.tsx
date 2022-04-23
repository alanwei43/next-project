import React from "react";
import fetch from "node-fetch";

/** 
 *  
 * @date 2022-04-21 
 */
export default class StateForm extends React.Component<StateFormProps, StateFormState> {
  constructor(props: StateFormProps) {
    super(props);
    this.state = {
      // 初始化状态
      userName: "Alan",
      password: "123"
    };
  }
  render() {
    const { userName, password } = this.state;
    return (<div>
      <div>
        <div>{(this.props.tags || []).join(", ")}</div>
      </div>
      <div>{userName}</div>
      <div>
        UserName: <input type="text" value={userName} onChange={e => this.onChangeUserName(e.target.value)} />
      </div>
      <div>
        Password: <input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
      </div>
      <input type="submit" value="Submit" />
    </div>)
  }
  onChangeUserName(val: string) {
    this.setState({
      userName: val
    });
  }
}
export type StateFormProps = {
  tags: Array<string>
}
export type StateFormState = {
  userName: string
  password: string
}

export async function getStaticProps() {
  const response = await fetch("https://movie.douban.com/j/search_tags?type=movie&source=index")
  const data: any = await response.json();
  return {
    props: {
      tags: data.tags
    }
  };
}