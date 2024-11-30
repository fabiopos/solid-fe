import AparitionTableLayout from "../AparitionTableLayout";
import AparitionHeaderCell from "./AparitionHeaderCell";
import {
  Check,
  CheckCheck,
  Clock,
  GitPullRequest,
  Goal,
  SquareActivity,
  User,
} from "lucide-react";

function AparitionHeader() {
  return (
    <AparitionTableLayout>
        <AparitionHeaderCell>
        <div className="flex gap-2 justify-center items-center">
          <GitPullRequest size={18} />
          <span>Position</span>
        </div>
      </AparitionHeaderCell>
      <AparitionHeaderCell>
        <div className="flex gap-2 justify-center items-center">
          <User size={18} />
          <span>Player</span>
        </div>
      </AparitionHeaderCell>
      <AparitionHeaderCell>
        <div className="flex gap-2 justify-center items-center">
          <Check size={18} />
          <span>Confirmed</span>
        </div>
      </AparitionHeaderCell>
      <AparitionHeaderCell>
        <div className="flex gap-2 justify-center items-center">
          <CheckCheck size={18} />
          <span>Played</span>
        </div>
      </AparitionHeaderCell>
      <AparitionHeaderCell>
        <span className="text-yellow-400">Yellow Cards</span>
      </AparitionHeaderCell>
      <AparitionHeaderCell><span className="text-red-400">Red Cards</span></AparitionHeaderCell>
      <AparitionHeaderCell>
        <div className="flex gap-2 justify-center items-center">
          <Clock size={18} />
          <span>Minutes</span>
        </div>
      </AparitionHeaderCell>
      <AparitionHeaderCell>
        <div className="flex gap-2 justify-center items-center">
          <Goal size={18} />
          <span>Goals</span>
        </div>
      </AparitionHeaderCell>
      <AparitionHeaderCell>
        <div className="flex gap-2 justify-center items-center">
          <SquareActivity size={18} />
          <span>Rating</span>
        </div>
      </AparitionHeaderCell>
    </AparitionTableLayout>
  );
}

export default AparitionHeader;
