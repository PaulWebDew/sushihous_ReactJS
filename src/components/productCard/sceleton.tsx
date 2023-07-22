import React from "react"
import ContentLoader from "react-content-loader"

import style from "./style.module.scss";

const Sceleton:React.FC = () => (
     <ContentLoader
      speed={4}
      width={250}
      height={400}
      viewBox="0 0 250 400"
      backgroundColor="#3a3636"
      foregroundColor="#968d8d"
    >
      <rect x="0" y="14" rx="15" ry="15" width="250" height="166" />
      <rect x="66" y="133" rx="0" ry="0" width="0" height="1" />
      <rect x="0" y="197" rx="5" ry="5" width="200" height="26" />
      <rect x="13" y="406" rx="0" ry="0" width="51" height="10" />
      <rect x="150" y="327" rx="15" ry="15" width="100" height="30" />
      <rect x="0" y="283" rx="5" ry="5" width="150" height="25" />
      <rect x="0" y="237" rx="5" ry="5" width="109" height="14" />
    </ContentLoader>
)

export default Sceleton