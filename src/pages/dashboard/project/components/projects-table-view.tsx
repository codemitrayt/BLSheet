import { Table, TableProps, Tag, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CgEye } from "react-icons/cg";

import UpdateProject from "../helpers/update";
import DeleteProject from "../helpers/delete";

import { MemberRoles, Project } from "../../../../types";
import { capitalizeFirstLetter } from "../../../../utils";
import { RoleColorMap } from "../../../../constants";

interface ProjectsTableViewProps {
  projects: Project[];
  refetchProjectList: () => void;
}

const columns: TableProps<Project>["columns"] = [
  {
    title: <span className="text-primary font-medium">Project Name</span>,
    key: "projectName",
    dataIndex: "name",
    render: (name, { _id }) => (
      <div className="w-[200px] text-xs lg:text-sm">
        <Link
          to={`/dashboard/projects/${_id}/details`}
          className="hover:text-primary/80 text-primary font-medium"
        >
          {name}
        </Link>
      </div>
    ),
  },
  {
    title: <span className="text-primary font-medium">Description</span>,
    key: "description",
    dataIndex: "description",
    render: (description) => (
      <p className="w-[250px] text-xs lg:text-sm">{description}</p>
    ),
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
    render: (_, { user }) => (
      <div className="w-[200px] text-xs lg:text-sm">{user.fullName}</div>
    ),
  },
  {
    title: <span className="text-primary font-medium">Role</span>,
    key: "role",
    dataIndex: "role",
    render: (role: MemberRoles) => (
      <Tag
        color={RoleColorMap[role ?? "member"]}
        className="w-[100px] flex items-center justify-center"
      >
        {capitalizeFirstLetter(role ? role : "Member")}
      </Tag>
    ),
  },
];

const ProjectsTableView = ({
  projects,
  refetchProjectList,
}: ProjectsTableViewProps) => {
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

              {project.role === MemberRoles.OWNER && (
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
