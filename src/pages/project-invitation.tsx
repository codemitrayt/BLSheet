import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { Button } from "antd";

import useUserInfo from "../hooks/useUserInfo";
import projectService from "../services/project-service";
import useErrorHandler from "../hooks/useErrorHandler";
import { ProjectMemberStatus, UpdateTeamMember } from "../types";

import { MdKeyboardBackspace } from "react-icons/md";

const ProjectInvitationPage = () => {
  const navigate = useNavigate();
  const { isAuth, user, authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");

  const email = searchParams.get("email");
  const projectName = searchParams.get("projectName");
  const invitationToken = searchParams.get("invitationToken");

  const { mutate, isLoading } = useMutation({
    mutationKey: ["update-project-member"],
    mutationFn: ({ data }: { data: UpdateTeamMember }) =>
      projectService().updateProjectMember({ data, authToken }),
    onSuccess: () => {
      backToProjectsPage();
    },
    onError: (error) => {
      console.log("ERROR :: update project member ::", error);
      handleError(error);
    },
  });

  const handleAcceptInvite = async () => {
    setStatus(ProjectMemberStatus.ACCEPTED);
    mutate({
      data: {
        memberEmailId: email as string,
        invitationToken,
        status: ProjectMemberStatus.ACCEPTED,
      },
    });
  };

  const handleRejectInvite = () => {
    setStatus(ProjectMemberStatus.REJECTED);
    mutate({
      data: {
        memberEmailId: email as string,
        invitationToken,
        status: ProjectMemberStatus.REJECTED,
      },
    });
  };

  const backToProjectsPage = () => {
    const url = "/dashboard/projects";
    navigate(url);
  };

  if (!isAuth || email !== user?.email) {
    return (
      <div className="h-screen w-screen flex items-center justify-center p-3">
        <div className="p-6 border rounded-xl max-w-[500px]">
          <p className="text-center">
            To access the page, please sign in using the email{" "}
            <span className="text-primary font-medium">{email}</span>
          </p>
          <p className="mt-3 text-center text-sm text-gray-600">
            If you don't have an account associated with this email, please sign
            up for one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center p-3">
      <div className="max-w-[500px] border p-6 rounded-xl bg-turnary">
        <h1 className="text-sm">
          Hi, <span className="text-primary">{email}</span>
        </h1>

        <h1 className="text-lg text-center mt-3 font-bold">
          You've been invited to collaborate on a{" "}
          <span className="text-primary">{projectName}</span> project.
        </h1>

        <p className="text-gray-800 text-center text-sm mt-3">
          Join the project and start contributing right away. We’re excited to
          have you on board!
        </p>

        <div className="flex items-center justify-center space-x-4 mt-8">
          <Button
            type="primary"
            className="ring-0"
            onClick={handleAcceptInvite}
            loading={status === ProjectMemberStatus.ACCEPTED && isLoading}
          >
            Accept
          </Button>

          <Button
            danger
            type="primary"
            className="ring-0"
            onClick={handleRejectInvite}
            loading={status === ProjectMemberStatus.REJECTED && isLoading}
          >
            Reject
          </Button>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={backToProjectsPage}
            className="flex items-center justify-center space-x-1 text-sm mt-4 text-center text-secondary hover:text-secondary/80 hover:underline transition-all"
          >
            <MdKeyboardBackspace />
            <span>Back to projects page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInvitationPage;
