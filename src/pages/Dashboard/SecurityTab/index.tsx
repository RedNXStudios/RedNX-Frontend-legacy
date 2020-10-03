import React from "react";

import ChangeEmailCard from "./ChangeEmailCard";
import ChangePasswordCard from "./ChangePasswordCard";

function SecurityTab() {
  return (
    <div className="tab-pane fade show" id="security">
        <ChangeEmailCard />
        <ChangePasswordCard />
    </div>
  );
}

export default SecurityTab;
