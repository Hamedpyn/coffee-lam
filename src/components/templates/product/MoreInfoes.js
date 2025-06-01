import React from "react";

const MoreInfoes = ({weight}) => {
  return (
    <div>
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>وزن</p>
          <p>{weight} گرم</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
