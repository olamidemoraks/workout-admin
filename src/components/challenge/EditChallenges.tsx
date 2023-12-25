import React from "react";
import CreateChallenges from "./CreateChallenges";

type EditChallengesProps = {
  id: string;
};

const EditChallenges: React.FC<EditChallengesProps> = (id) => {
  return <CreateChallenges />;
};
export default EditChallenges;
