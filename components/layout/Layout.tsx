

import { FC, ReactElement, ReactChild } from "react";
/** 
 *  
 * @date 2022-04-20 
 */
const Layout: FC<LayoutProps> = (props): ReactElement => {
  return (<div>
    {props.children}
    <div>Copyright</div>
  </div>)
}
export type LayoutProps = { children: ReactChild }
export default Layout;