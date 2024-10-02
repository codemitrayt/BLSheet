import { Table, TableProps, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { CgEye } from "react-icons/cg";

import UpdateProject from "../helpers/update";
import DeleteProject from "../helpers/delete";

import useAuth from "../../../../hooks/useAuth";
import { Project } from "../../../../types";
import { capitalizeFirstLetter } from "../../../../utils";

interface ProjectsTableViewProps {
  projects: Project[];
  refetchProjectList: () => void;
}

const columns: TableProps<Project>["columns"] = [
  {
    title: <span className="text-primary font-medium">Project Name</span>,
    key: "projectName",
    dataIndex: "name",
  },
  {
    title: <span className="text-primary font-medium">Description</span>,
    key: "description",
    dataIndex: "description",
  },
  {
    title: <span className="text-primary font-medium">Tags</span>,
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <div className="flex items-center">
        {tags.map((tag: string) => (
          <Tag color="#539BBB" key={tag} className="rounded-full px-3">
            {capitalizeFirstLetter(tag)}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: <span className="text-primary font-medium">Owner</span>,
    key: "owner",
    dataIndex: "user.fullName",
    render: (_, { user }) => <span>{user.fullName}</span>,
  },
  {
    title: <span className="text-primary font-medium">Role</span>,
    key: "role",
    dataIndex: "isAdmin",
    render: (isAdmin) => (
      <Tag color={isAdmin ? "orange" : "blue"}>
        {isAdmin ? "Admin" : "Member"}
      </Tag>
    ),
  },
];

const ProjectsTableView = ({
  projects,
  refetchProjectList,
}: ProjectsTableViewProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleRedirect = (projectId: string) => {
    const url = `/dashboard/projects/${projectId}/details`;
    navigate(url);
  };

  return (
    <Table
      bordered
      pagination={false}
      columns={[
        ...columns,

        {
          title: <span className="text-primary font-medium">Actions</span>,
          key: "actions",
          render: (_, project) => (
            <div className="flex items-center justify-center space-x-3">
              <Tooltip title="View Project">
                <button
                  onClick={() => handleRedirect(project._id)}
                  className="text-orange-500 hover:text-orange-500/80"
                >
                  <CgEye />
                </button>
              </Tooltip>

              {user?._id === project.userId && (
                <>
                  <UpdateProject
                    project={project}
                    refetchProjectList={refetchProjectList}
                  />

                  <DeleteProject
                    objectId={project._id}
                    refetchProjectList={refetchProjectList}
                  />
                </>
              )}
            </div>
          ),
        },
      ]}
      rowKey="_id"
      dataSource={projects}
    />
  );
};

export default ProjectsTableView;
