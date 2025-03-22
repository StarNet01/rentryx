"use client";
import CloseIcon from "@mui/icons-material/Close";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Button,
  TextField,
  DialogTitle,
  IconButton,
  DialogContent,
  styled,
  Dialog,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import React from "react";
import CustomTabPanel from "@/modules/share/components/ctp/CTP";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import useSWR from "swr";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const accountSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be at least 10 digits")
    .required("Phone number is required"),
  fullName: yup.string().required("Full name is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  role_id: yup.number().required("Role is required"),
});

type AccountFormData = yup.InferType<typeof accountSchema>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    phoneNumber: "1234567890",
    fullName: "John Doe",
    role_id: 1,
    role_title: "Admin",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    phoneNumber: "0987654321",
    fullName: "Jane Smith",
    role_id: 2,
    role_title: "User",
  },
];

const roles = [
  { id: 1, title: "test1" },
  { id: 2, title: "test213" },
  { id: 3, title: "te234t1" },
  { id: 4, title: "tes3465t1" },
];

const CategoryPermission = [
  {
    id: 1,
    name: "cat1",
    role_id: 1,
    permissions: [
      { id: 1, name: "test1", hasSelected: false },
      { id: 2, name: "test2", hasSelected: true },
      { id: 3, name: "teefwfst1", hasSelected: true },
    ],
  },
  {
    id: 2,
    name: "cat1231",
    role_id: 1,
    permissions: [
      { id: 15434, name: "teewfst1", hasSelected: true },
      { id: 4342, name: "testwef2", hasSelected: false },
      { id: 4654635, name: "teefwfrehtrhrthst1", hasSelected: false },
    ],
  },
  {
    id: 3,
    name: "cat21",
    role_id: 3,
    permissions: [
      { id: 435, name: "testrhtrhrt1", hasSelected: false },
      { id: 324, name: "tesrthtrh2", hasSelected: false },
      { id: 23, name: "teefhtrhtrhwfst1", hasSelected: true },
    ],
  },
];

const page = () => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<number | "">("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<number>(1);
  const [permissions, setPermissions] = React.useState(CategoryPermission);
  const [newRoleName, setNewRoleName] = React.useState("");
  const [copyFromRole, setCopyFromRole] = React.useState<number | "">("");
  const [roleToRename, setRoleToRename] = React.useState<number | "">("");
  const [selectedRoleToDelete, setSelectedRoleToDelete] = React.useState<
    number | ""
  >("");
  const [selectedUser, setSelectedUser] = React.useState<number | null>(null);
  const [userList, setUserList] = React.useState(users);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      fullName: "",
      password: "",
      role_id: 0,
    },
  });

  const handleUserSelect = (userId: number) => {
    const user = userList.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(userId);
      reset({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        role_id: user.role_id,
        password: "",
      });
    }
  };

  const onSubmit = (data: AccountFormData) => {
    if (selectedUser) {
      HttpClient.getInstance()
        .put(`users/${selectedUser}`, data)
        .then(() => {
          toast.success("Account updated successfully");
          setUserList((prev) =>
            prev.map((user) =>
              user.id === selectedUser ? { ...user, ...data } : user
            )
          );
        })
        .catch(() => {
          toast.error("Failed to update account");
        });
    } else {
      HttpClient.getInstance()
        .post("users", data)
        .then((response: any) => {
          toast.success("Account created successfully");
          if (!response) return;
          setUserList((prev) => [
            ...prev,
            {
              id: response.data.id,
              ...data,
              role_title: roles.find((r) => r.id === data.role_id)?.title || "",
            },
          ]);
          reset();
        })
        .catch(() => {
          toast.error("Failed to create account");
        });
    }
  };


  const handleDeleteRole = () => {
    if (!selectedRoleToDelete) {
      toast.error("Please select a role to delete");
      return;
    }

    HttpClient.getInstance()
      .delete(`role/${selectedRoleToDelete}`)
      .then(() => {
        toast.success("Role deleted successfully");
        setSelectedRoleToDelete("");
        handleCloseDelete();
         rolesMutate(); // TODO for dev
      })
      .catch(() => {
        toast.error("Failed to delete role");
      });
  };

  const handleRenameRole = () => {
    if (!roleToRename) {
      toast.error("Please select a role");
      return;
    }
    if (!newRoleName.trim()) {
      toast.error("New role name is required");
      return;
    }

    HttpClient.getInstance()
      .put(`role/rename/${roleToRename}`, {
        newName: newRoleName,
      })
      .then(() => {
        toast.success("Role renamed successfully");
        setRoleToRename("");
        setNewRoleName("");
        handleCloseUpdate();
         rolesMutate(); // TODO for dev
      })
      .catch(() => {
        toast.error("Failed to rename role");
      });
  };

  const handleCloseUpdate = () => {
    setOpen(false);
    setRoleToRename("");
    setNewRoleName("");
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) {
      toast.error("Role name is required");
      return;
    }

    const payload = {
      name: newRoleName,
      copyFromRoleId: copyFromRole || undefined,
    };

    HttpClient.getInstance()
      .post("role/add", payload)
      .then(() => {
        toast.success("Role created successfully");
        setNewRoleName("");
        setCopyFromRole("");
        handleCloseAdd();
        rolesMutate(); //TODO for dev
      })
      .catch(() => {
        toast.error("Failed to create role");
      });
  };

  const handlePermissionChange = (
    categoryId: number,
    permissionId: number,
    checked: boolean
  ) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            permissions: category.permissions.map((permission) =>
              permission.id === permissionId
                ? { ...permission, hasSelected: checked }
                : permission
            ),
          };
        }
        return category;
      })
    );
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleRoleChange = (event: SelectChangeEvent<number>) => {
    const newRoleId = event.target.value as number;
    setSelectedRole(newRoleId);

    const firstCategoryForRole = CategoryPermission.find(
      (cat) => cat.role_id === newRoleId
    )?.id;
    if (firstCategoryForRole) {
      setSelectedCategory(firstCategoryForRole);
    }
  };

  const handleClickOpenUpdate = () => {
    setOpen(true);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedRoleToDelete("");
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleUpdate = () => {
    if (!selectedRole) {
      console.log("No role selected");
      return;
    }

    const selectedPermissions = permissions
      .filter((category) => category.role_id === selectedRole)
      .flatMap((category) =>
        category.permissions
          .filter((permission) => permission.hasSelected)
          .map((permission) => ({
            categoryId: category.id,
            permissionId: permission.id,
            permissionName: permission.name,
          }))
      );

    HttpClient.getInstance()
      .put("CategoryPermission", {
        roleId: selectedRole,
        permission: selectedPermissions,
      })
      .then(() => {
        CategoryPermissionMutate() // TODO for dev
        toast.success("updated successfully");
      })
      .catch(() => {
        toast.error("cant update");
      });

    console.log("Selected Role ID:", selectedRole);
    console.log("Selected Permissions:", selectedPermissions);
  };

  const {
    data: roles,
    mutate: rolesMutate,
    isLoading: isLoadingRoles,
  } = useSWR(
    `getRoles`,
    (url) => HttpClient.getInstance().fetcher(url) // TODO for dev
  );

  const {
    data: CategoryPermission,
    mutate: CategoryPermissionMutate,
    isLoading: isLoadingCategoryPermission,
  } = useSWR(
    `getCategoryPermission/${selectedRole}`,
    (url) => HttpClient.getInstance().fetcher(url) // TODO for dev
  );

  const {
    data: users,
    mutate: usersMutate,
    isLoading: isLoadingusers,
  } = useSWR(
    `users`,
    (url) => HttpClient.getInstance().fetcher(url) // TODO for dev
  );

  return (
    <div>
      <DashboardLayout panelType="admin">
        <div className="w-full">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label="Role" {...a11yProps(0)} />
                <Tab label="Accounts" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className="flex gap-3 items-center">
                <h1>Select Role And Change Its Capabilities:</h1>
                <FormControl fullWidth sx={{ maxWidth: "160px" }}>
                  <InputLabel id="role-select-label">Select</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    label="Select"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex gap-10 items-center">
                <div className="mt-5 w-10/12">
                  <span>Categories</span>
                  <Divider className="my-5" flexItem />
                  <div className="flex gap-16 mt-5 max-h-[500px] ">
                    <ul className="space-y-5 overflow-y-scroll px-10 box-category">
                      {selectedRole !== "" &&
                        permissions
                          .filter(
                            (category) => category.role_id === selectedRole
                          )
                          .map((category) => (
                            <li
                              key={category.id}
                              onClick={() => handleCategoryClick(category.id)}
                              className={`cursor-pointer ${
                                selectedCategory === category.id
                                  ? "text-secondary font-bold"
                                  : ""
                              }`}
                            >
                              {category.name}
                            </li>
                          ))}
                    </ul>
                    <Divider orientation="vertical" flexItem />
                    <ul className="space-y-5  overflow-y-scroll w-full">
                      {selectedRole !== "" &&
                        permissions
                          .find(
                            (cat) =>
                              cat.id === selectedCategory &&
                              cat.role_id === selectedRole
                          )
                          ?.permissions.map((permission) => (
                            <li key={permission.id}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={permission.hasSelected}
                                    onChange={(e) => {
                                      handlePermissionChange(
                                        selectedCategory,
                                        permission.id,
                                        e.target.checked
                                      );
                                    }}
                                  />
                                }
                                label={permission.name}
                              />
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleClickOpenAdd}
                  >
                    Add Role
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleClickOpenUpdate}
                  >
                    Rename Role
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleClickOpenDelete}
                  >
                    Delete Role
                  </Button>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="flex gap-5">
                <div className="flex flex-col gap-5 max-h-[500px] overflow-y-scroll">
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSelectedUser(null);
                      reset({
                        username: "",
                        email: "",
                        phoneNumber: "",
                        fullName: "",
                        password: "",
                        role_id: 0,
                      });
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-[#A0A0A0]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                  </Button>
                  {userList.map((user) => (
                    <Button
                      key={user.id}
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => handleUserSelect(user.id)}
                    >
                      {user.username} / {user.role_title}
                    </Button>
                  ))}
                </div>
                <Divider orientation="vertical" flexItem />
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 lg:w-2/5"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="User Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username?.message}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                      />
                    )}
                  />
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                  <Controller
                    name="role_id"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.role_id}>
                        <InputLabel>Role</InputLabel>
                        <Select
                          {...field}
                          value={field.value || ""}
                          label="Role"
                        >
                          {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                              {role.title}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.role_id && (
                          <FormHelperText>
                            {errors.role_id.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                  <Divider />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="self-end"
                  >
                    {selectedUser ? "Update Account" : "Create Account"}
                  </Button>
                </form>
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      </DashboardLayout>

      <BootstrapDialog
        onClose={handleCloseUpdate}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Rename Role
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseUpdate}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex flex-col gap-5">
            <FormControl fullWidth>
              <InputLabel id="rename-role-select-label">Select Role</InputLabel>
              <Select
                labelId="rename-role-select-label"
                value={roleToRename}
                onChange={(e) => setRoleToRename(e.target.value as number)}
                label="Select Role"
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="New Role Name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRenameRole}
            >
              Rename
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseUpdate}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleCloseDelete}
        open={openDelete}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>Delete Role</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDelete}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex flex-col gap-5">
            <FormControl fullWidth>
              <InputLabel id="delete-role-select-label">Select Role</InputLabel>
              <Select
                labelId="delete-role-select-label"
                value={selectedRoleToDelete}
                onChange={(e) =>
                  setSelectedRoleToDelete(e.target.value as number)
                }
                label="Select Role"
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteRole}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseDelete}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleCloseAdd}
        open={openAdd}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>Add New Role</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseAdd}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex flex-col gap-5">
            <TextField
              label="Role Name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel id="copy-role-select-label">Make Copy of</InputLabel>
              <Select
                labelId="copy-role-select-label"
                value={copyFromRole}
                onChange={(e) => setCopyFromRole(e.target.value as number)}
                label="Make Copy of"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddRole}
            >
              Add Role
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseAdd}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default page;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
